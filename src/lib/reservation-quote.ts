import { z } from 'zod';

/**
 * Shape + validation for a reservation/invoice quote entered in the admin
 * back-office. Most fields are free-text strings on purpose: the source estimate
 * mixes values like "1 adult", "Included", "Exempt — foreign traveller" and
 * "— ₪ · refundable" that should be reproduced verbatim in the email. Only the
 * fields we actually depend on are validated (reservation number, guest name,
 * at least one line item, and a deliverable customer email).
 *
 * This module is deliberately NOT `server-only` so the client form can import
 * the type + defaults while the server action imports the schema.
 */
const lineItemSchema = z.object({
  description: z.string(),
  unit: z.string(),
  amount: z.string(),
});

export const reservationQuoteSchema = z.object({
  // Document
  reservationNumber: z.string().trim().min(1, 'Reservation number is required'),
  issuedOn: z.string(),
  // Guest & stay
  guestName: z.string().trim().min(1, 'Guest name is required'),
  idPassport: z.string(),
  nationality: z.string(),
  contact: z.string(),
  apartment: z.string(),
  travellers: z.string(),
  orderDate: z.string(),
  nights: z.string(),
  // Stay times
  checkInDate: z.string(),
  checkInTime: z.string(),
  checkOutDate: z.string(),
  checkOutTime: z.string(),
  apartmentAccess: z.string(),
  // Invoice
  currency: z.string(),
  lineItems: z.array(lineItemSchema).min(1, 'At least one line item is required'),
  subtotal: z.string(),
  total: z.string(),
  // Payment
  paymentMethod: z.string(),
  depositPaid: z.string(),
  paidOn: z.string(),
  balanceDue: z.string(),
  balanceRemaining: z.string(),
  // Closing + delivery
  closingNote: z.string(),
  customerEmail: z.string().trim().email('A valid customer email is required'),
});

export type ReservationLineItem = z.infer<typeof lineItemSchema>;
export type ReservationQuoteData = z.infer<typeof reservationQuoteSchema>;

/**
 * Neutral prefill for a blank admin quote. Identity fields (guest name,
 * reservation number, email, dates, amounts) stay EMPTY on purpose so a quote
 * can never go out carrying another guest's details by accident — the Zod
 * schema blocks sending until they are filled. Dates default via
 * `createInitialAdminQuote`; request-based drafts override everything relevant
 * in `buildQuoteDraftFromAdminRequest`.
 */
export const DEFAULT_RESERVATION_QUOTE: ReservationQuoteData = {
  reservationNumber: '',
  issuedOn: '',
  guestName: '',
  idPassport: '',
  nationality: '',
  contact: '',
  apartment: 'Penthouse',
  travellers: '',
  orderDate: '',
  nights: '',
  checkInDate: '',
  checkInTime: '17:00',
  checkOutDate: '',
  checkOutTime: '11:00',
  apartmentAccess: 'Code sent on arrival',
  currency: 'NIS (₪)',
  lineItems: [
    { description: '', unit: '', amount: '' },
    { description: 'Cleaning fee', unit: '—', amount: 'Included' },
  ],
  subtotal: '',
  total: '',
  paymentMethod: '',
  depositPaid: '',
  paidOn: '',
  balanceDue: '',
  balanceRemaining: '',
  closingNote:
    'Thank you for choosing Or Hakerem. This document confirms your reservation and serves as your invoice. The detailed terms and conditions of your stay are provided in a separate document — by completing the payment, you acknowledge and accept them.',
  customerEmail: '',
};
