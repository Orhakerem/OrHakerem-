import type { PricingNightKind } from './pricing-date-helpers';
import type { SeasonType } from './pricing-seasons';

export type SupabasePublicEnvName =
  | 'NEXT_PUBLIC_SUPABASE_URL'
  | 'NEXT_PUBLIC_SUPABASE_ANON_KEY';

export class MissingSupabaseEnvError extends Error {
  readonly code = 'missing_supabase_env';

  constructor(readonly envName: SupabasePublicEnvName) {
    super(`Missing ${envName}`);
    this.name = 'MissingSupabaseEnvError';
  }
}

export class PricingDataFetchError extends Error {
  readonly code = 'pricing_data_fetch_failed';

  constructor(
    readonly tableName: string,
    message: string,
  ) {
    super(`Failed to fetch ${tableName}: ${message}`);
    this.name = 'PricingDataFetchError';
  }
}

export class PricingListingNotFoundError extends Error {
  readonly code = 'listing_not_found';

  constructor(readonly listingId: string) {
    super(`Listing not found: ${listingId}`);
    this.name = 'PricingListingNotFoundError';
  }
}

export class PricingTierNotFoundError extends Error {
  readonly code = 'pricing_tier_not_found';

  constructor(
    readonly listingId: string,
    readonly seasonType: SeasonType,
    readonly dayType: PricingNightKind,
    readonly totalNights: number,
  ) {
    super(
      `No pricing tier found for listing ${listingId}, ${seasonType} season, ${dayType}, ${totalNights} nights.`,
    );
    this.name = 'PricingTierNotFoundError';
  }
}

export type KnownPricingError =
  | MissingSupabaseEnvError
  | PricingDataFetchError
  | PricingListingNotFoundError
  | PricingTierNotFoundError;

export function getPricingErrorCode(error: unknown) {
  return error instanceof MissingSupabaseEnvError ||
    error instanceof PricingDataFetchError ||
    error instanceof PricingListingNotFoundError ||
    error instanceof PricingTierNotFoundError
    ? error.code
    : 'unknown_pricing_error';
}
