import { NextResponse } from 'next/server';
import { z } from 'zod';

import {
  compareIsoDates,
  getTodayIsoInTimeZone,
  ISO_DATE_REGEX,
  isIsoDateString,
} from '@/lib/booking-dates';
import {
  getPricingErrorCode,
  getPriceCalculationFailureError,
  MissingSupabaseEnvError,
  PricingDataFetchError,
  PricingListingNotFoundError,
  PricingTierNotFoundError,
} from '@/lib/pricing-errors';
import { getPricingBreakdown } from '@/lib/pricing-engine';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function createIsoDateSchema(fieldName: string) {
  return z
    .string({
      required_error: `${fieldName} is required`,
      invalid_type_error: `${fieldName} must use YYYY-MM-DD format`,
    })
    .regex(ISO_DATE_REGEX, 'Date must use YYYY-MM-DD format')
    .refine((value) => isIsoDateString(value), 'Invalid calendar date');
}

const calculatePriceRequestSchema = z
  .object({
    listing_id: z
      .string({
        required_error: 'listing_id is required',
        invalid_type_error: 'listing_id is required',
      })
      .trim()
      .min(1, 'listing_id is required')
      .regex(/^[a-z0-9][a-z0-9_-]*$/, 'Invalid listing_id'),
    check_in: createIsoDateSchema('check_in'),
    check_out: createIsoDateSchema('check_out'),
  })
  .strict()
  .superRefine((data, ctx) => {
    const todayIso = getTodayIsoInTimeZone();

    if (compareIsoDates(data.check_in, todayIso) < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['check_in'],
        message: 'check_in cannot be in the past',
      });
    }

    if (compareIsoDates(data.check_out, data.check_in) <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['check_out'],
        message: 'check_out must be after check_in',
      });
    }
  });

const previewResponse = {
  ok: true,
  endpoint: '/api/calculate-price',
  method: 'POST',
  content_type: 'application/json',
  example_request: {
    listing_id: 'studio',
    check_in: '2026-06-01',
    check_out: '2026-06-06',
  },
  example_response: {
    available: true,
    listing_id: 'studio',
    nights: 5,
    nightly_breakdown: [],
    night_total: 0,
    cleaning_fee: 0,
    total_price: 0,
    currency: 'ILS',
  },
};

function jsonError(status: number, code: string, message: string) {
  return NextResponse.json(
    {
      available: false,
      error: {
        code,
        message,
      },
    },
    { status },
  );
}

function getValidationMessage(error: z.ZodError) {
  return error.issues[0]?.message ?? 'Invalid request body';
}

async function readJsonBody(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function logPriceCalculationFailure(
  error: unknown,
  requestData: z.infer<typeof calculatePriceRequestSchema>,
) {
  const baseContext = {
    endpoint: '/api/calculate-price',
    listing_id: requestData.listing_id,
    check_in: requestData.check_in,
    check_out: requestData.check_out,
    error_code: getPricingErrorCode(error),
  };

  if (error instanceof MissingSupabaseEnvError) {
    console.error('Price calculation configuration failed:', {
      ...baseContext,
      missing_env: error.envName,
    });
    return;
  }

  if (error instanceof PricingDataFetchError) {
    console.error('Price calculation Supabase fetch failed:', {
      ...baseContext,
      table: error.tableName,
      message: error.message,
    });
    return;
  }

  if (error instanceof PricingTierNotFoundError) {
    console.error('Price calculation tier lookup failed:', {
      ...baseContext,
      season_type: error.seasonType,
      day_type: error.dayType,
      total_nights: error.totalNights,
    });
    return;
  }

  console.error('Price calculation failed:', baseContext, error);
}

export function GET() {
  const previewJson = JSON.stringify(previewResponse, null, 2);

  return new Response(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Calculate Price API</title>
    <style>
      body {
        margin: 0;
        background: #ffffff;
        color: #111111;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      }

      pre {
        margin: 0;
        padding: 24px;
        white-space: pre-wrap;
      }
    </style>
  </head>
  <body>
    <pre>${previewJson}</pre>
  </body>
</html>`,
    {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    },
  );
}

export async function POST(request: Request) {
  const body = await readJsonBody(request);

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return jsonError(400, 'invalid_request', 'Request body must be a JSON object');
  }

  const result = calculatePriceRequestSchema.safeParse(body);

  if (!result.success) {
    return jsonError(400, 'invalid_request', getValidationMessage(result.error));
  }

  try {
    const quote = await getPricingBreakdown({
      listingId: result.data.listing_id,
      checkIn: result.data.check_in,
      checkOut: result.data.check_out,
    });

    return NextResponse.json(quote);
  } catch (error) {
    if (error instanceof PricingListingNotFoundError) {
      return jsonError(404, 'listing_not_found', 'Invalid listing_id');
    }

    logPriceCalculationFailure(error, result.data);
    const failureError = getPriceCalculationFailureError(error);

    return jsonError(500, failureError.code, failureError.message);
  }
}
