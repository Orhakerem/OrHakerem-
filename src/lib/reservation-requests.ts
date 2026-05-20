import type { SupabaseClient } from '@supabase/supabase-js';

import { getPricingBreakdown, type PricingBreakdown } from './pricing-engine';

export interface PendingReservationRequestInput {
  listingId: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestsCount: number;
}

export interface ReservationInsertRow {
  listing_id: string;
  check_in: string;
  check_out: string;
  nights: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guests_count: number;
  night_total: number;
  cleaning_fee: number;
  total_price: number;
  currency: string;
  status: 'pending';
}

async function getSupabaseClient() {
  const { supabase } = await import('./supabase');

  return supabase;
}

function createInsertError(message: string) {
  return new Error(`Failed to save reservation request: ${message}`);
}

export function buildPendingReservationRow(
  input: PendingReservationRequestInput,
  quote: PricingBreakdown,
): ReservationInsertRow {
  return {
    listing_id: quote.listing_id,
    check_in: input.checkIn,
    check_out: input.checkOut,
    nights: quote.nights,
    guest_name: input.guestName,
    guest_email: input.guestEmail,
    guest_phone: input.guestPhone,
    guests_count: input.guestsCount,
    night_total: quote.night_total,
    cleaning_fee: quote.cleaning_fee,
    total_price: quote.total_price,
    currency: quote.currency,
    status: 'pending',
  };
}

export async function savePendingReservationRequest(
  input: PendingReservationRequestInput,
  client?: SupabaseClient,
) {
  const supabase = client ?? await getSupabaseClient();
  const quote = await getPricingBreakdown(
    {
      listingId: input.listingId,
      checkIn: input.checkIn,
      checkOut: input.checkOut,
    },
    supabase,
  );
  const row = buildPendingReservationRow(input, quote);
  const { error } = await supabase
    .from('reservations')
    .insert(row);

  if (error) {
    throw createInsertError(error.message);
  }

  return {
    quote,
    row,
  };
}
