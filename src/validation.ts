import { z } from 'zod';

import {
  compareIsoDates,
  getTodayIsoInTimeZone,
  ISO_DATE_REGEX,
  isIsoDateString,
} from '@/lib/booking-dates';
import { BOOKABLE_PROPERTY_TITLES } from '@/lib/bookable-properties';

export const DEFAULT_RESERVATION_GUESTS_COUNT = 1;

const isoDateSchema = z
  .string()
  .regex(ISO_DATE_REGEX, 'Date must use YYYY-MM-DD format')
  .refine((value) => isIsoDateString(value), 'Invalid calendar date');

const guestsCountSchema = z.preprocess(
  (value) => (value === undefined || value === null || value === '' ? DEFAULT_RESERVATION_GUESTS_COUNT : value),
  z.coerce.number().int('Guest count must be a whole number').min(1, 'Guest count must be at least 1'),
);

const listingIdSchema = z
  .string()
  .trim()
  .min(1, 'Please select a valid property')
  .regex(/^[a-z0-9][a-z0-9_-]*$/, 'Please select a valid property');

export const reservationSchema = z.object({
  property: z.enum(BOOKABLE_PROPERTY_TITLES, {
    errorMap: () => ({ message: 'Please select a valid property' }),
  }),
  listingId: listingIdSchema,
  checkIn: isoDateSchema,
  checkOut: isoDateSchema,
  guestsCount: guestsCountSchema,
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  contactMethod: z.enum(['email', 'phone', 'whatsapp'], {
    errorMap: () => ({ message: 'Please select a contact method' }),
  }),
}).superRefine((data, ctx) => {
  const todayIso = getTodayIsoInTimeZone();

  if (compareIsoDates(data.checkIn, todayIso) < 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['checkIn'],
      message: 'Check-in date cannot be in the past',
    });
  }

  if (compareIsoDates(data.checkOut, data.checkIn) <= 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['checkOut'],
      message: 'Check-out must be after check-in',
    });
  }
});

export const eventSchema = z.object({
  eventType: z.string().min(1, 'Event type is required'),
  checkIn: z.string().min(1, 'Event date is required'),
  guestCount: z.string().min(1, 'Guest count is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  contactMethod: z.enum(['email', 'phone', 'whatsapp'], {
    errorMap: () => ({ message: 'Please select a contact method' }),
  }),
  message: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

export type ReservationData = z.infer<typeof reservationSchema>;
export type EventData = z.infer<typeof eventSchema>;
export type ContactData = z.infer<typeof contactSchema>;
