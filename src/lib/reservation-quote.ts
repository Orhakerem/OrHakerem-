import { z } from 'zod';

import { DEFAULT_INVOICE_SENDER_NAME } from './invoice-email-sender';

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
  qty: z.string(),
  unit: z.string(),
  amount: z.string(),
});

const senderNameSchema = z
  .string()
  .trim()
  .min(1, 'Sender name is required')
  .max(80, 'Sender name must be 80 characters or less')
  .refine(
    (value) => !/[\r\n]/.test(value),
    'Sender name cannot contain header control characters',
  )
  .refine((value) => !/[<>]/.test(value), 'Sender name cannot contain angle brackets');

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
  vatNote: z.string(),
  total: z.string(),
  // Payment
  paymentMethod: z.string(),
  depositPaid: z.string(),
  paidOn: z.string(),
  balanceDue: z.string(),
  dueOn: z.string(),
  securityDeposit: z.string(),
  balanceRemaining: z.string(),
  // Closing + delivery
  closingNote: z.string(),
  senderName: senderNameSchema,
  customerEmail: z.string().trim().email('A valid customer email is required'),
});

export type ReservationLineItem = z.infer<typeof lineItemSchema>;
export type ReservationQuoteData = z.infer<typeof reservationQuoteSchema>;

/**
 * Prefilled defaults taken from the original "Shirel Diler" estimate so the form
 * is fast to use and to test. The host edits these per booking.
 */
export const DEFAULT_RESERVATION_QUOTE: ReservationQuoteData = {
  reservationNumber: 'OH-2026-SHIREL',
  issuedOn: '11 / 06 / 2026',
  guestName: 'Shirel Diler',
  idPassport: '',
  nationality: '',
  contact: '',
  apartment: 'Penthouse Rooftop',
  travellers: '1 adult',
  orderDate: '11 / 06 / 2026',
  nights: '1',
  checkInDate: '25 / 06 / 2026',
  checkInTime: '17:00',
  checkOutDate: '26 / 06 / 2026',
  checkOutTime: '11:00',
  apartmentAccess: 'Code sent on arrival',
  currency: 'NIS (₪)',
  lineItems: [
    { description: 'Event & night stay', qty: '1', unit: '3,800 ₪', amount: '3,800 ₪' },
    { description: 'Cleaning fee', qty: '1', unit: '—', amount: 'Included' },
  ],
  subtotal: '3,800 ₪',
  vatNote: 'Exempt — foreign traveller',
  total: '3,800 ₪',
  paymentMethod: 'Bit',
  depositPaid: '1,400 ₪',
  paidOn: '',
  balanceDue: '2,400 ₪',
  dueOn: '',
  securityDeposit: '— ₪ · refundable',
  balanceRemaining: '2,400 ₪',
  closingNote:
    'Thank you for choosing Or Hakerem. This document confirms your reservation and serves as your invoice. The detailed terms and conditions of your stay are provided in a separate document — by completing the payment, you acknowledge and accept them.',
  senderName: DEFAULT_INVOICE_SENDER_NAME,
  customerEmail: '',
};
