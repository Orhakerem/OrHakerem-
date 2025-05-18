import { z } from 'zod';

export const reservationSchema = z.object({
  property: z.string().min(1, 'Property is required'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  contactMethod: z.enum(['email', 'phone', 'whatsapp'], {
    errorMap: () => ({ message: 'Please select a contact method' }),
  }),
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
