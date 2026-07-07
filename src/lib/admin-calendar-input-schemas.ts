import { z } from 'zod';

import {
  BOOKABLE_PROPERTY_IDS,
  type BookablePropertyId,
} from './bookable-properties';
import { compareIsoDates, isIsoDateString } from './booking-dates';

/**
 * Zod input schemas for the admin calendar mutations. Kept out of
 * `admin-calendar.ts` (which is `server-only`) so client components can run
 * the same validation before calling the server action — the action still
 * re-parses server-side as the authority.
 */

const CALENDAR_EVENT_TYPES = [
  'booking',
  'hold',
  'manual_block',
  'maintenance',
  'owner_block',
  'private_event',
] as const;
const CALENDAR_EVENT_STATUSES = ['confirmed', 'tentative', 'cancelled'] as const;
const CALENDAR_RULE_TYPES = [
  'min_nights',
  'max_nights',
  'allowed_check_in_days',
  'allowed_check_out_days',
  'advance_notice',
  'booking_window',
  'gap_prevention',
  'turnover_buffer',
  'cleaning_buffer',
  'property_combination',
  'manual_exception',
] as const;
const CALENDAR_VALIDATION_SEVERITIES = ['allow', 'warn', 'block'] as const;

const bookablePropertyIdSchema = z.enum(BOOKABLE_PROPERTY_IDS as [BookablePropertyId, ...BookablePropertyId[]]);
const nullableBookablePropertyIdSchema = z.preprocess(
  (value) => (value === '' || value === undefined ? null : value),
  bookablePropertyIdSchema.nullable(),
);
const optionalIsoDateSchema = z.preprocess(
  (value) => (value === '' || value === undefined ? null : value),
  z.string().refine((value) => isIsoDateString(value), 'Expected YYYY-MM-DD date').nullable(),
);
const optionalIntegerSchema = z.preprocess(
  (value) => (value === '' || value === undefined ? null : value),
  z.coerce.number().int().nullable(),
);
const optionalDayListSchema = z.preprocess((value) => {
  if (value === '' || value === undefined || value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    return value;
  }

  return String(value)
    .split(',')
    .map((item) => Number(item.trim()))
    .filter((item) => Number.isInteger(item));
}, z.array(z.number().int().min(0).max(6)).nullable());

export const adminCalendarBlockInputSchema = z
  .object({
    id: z.string().uuid().optional(),
    propertyId: bookablePropertyIdSchema,
    eventType: z.enum(CALENDAR_EVENT_TYPES).default('manual_block'),
    status: z.enum(CALENDAR_EVENT_STATUSES).default('confirmed'),
    checkIn: z.string().refine((value) => isIsoDateString(value), 'Expected YYYY-MM-DD date'),
    checkOut: z.string().refine((value) => isIsoDateString(value), 'Expected YYYY-MM-DD date'),
    title: z.string().trim().min(1),
    notes: z.string().trim().optional().default(''),
  })
  .superRefine((value, ctx) => {
    if (compareIsoDates(value.checkOut, value.checkIn) <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['checkOut'],
        message: 'Check-out must be after check-in',
      });
    }
  });

export const adminCalendarRuleInputSchema = z
  .object({
    id: z.string().uuid().optional(),
    propertyId: nullableBookablePropertyIdSchema,
    ruleType: z.enum(CALENDAR_RULE_TYPES),
    name: z.string().trim().min(1),
    isActive: z.boolean().default(true),
    priority: z.coerce.number().int().min(0).default(0),
    severity: z.enum(CALENDAR_VALIDATION_SEVERITIES).default('block'),
    startsOn: optionalIsoDateSchema,
    endsOn: optionalIsoDateSchema,
    minNights: optionalIntegerSchema,
    maxNights: optionalIntegerSchema,
    allowedCheckInDays: optionalDayListSchema,
    allowedCheckOutDays: optionalDayListSchema,
    minDaysBeforeCheckIn: optionalIntegerSchema,
    maxDaysBeforeCheckIn: optionalIntegerSchema,
    gapSizeNights: optionalIntegerSchema,
    bufferNights: optionalIntegerSchema,
    appliesToCombination: z.boolean().default(false),
    reason: z.string().trim().optional().default(''),
  })
  .superRefine((value, ctx) => {
    if (value.startsOn && value.endsOn && compareIsoDates(value.endsOn, value.startsOn) < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endsOn'],
        message: 'End date must be on or after start date',
      });
    }
  });

export type AdminCalendarBlockInput = z.input<typeof adminCalendarBlockInputSchema>;
export type AdminCalendarRuleInput = z.input<typeof adminCalendarRuleInputSchema>;
