'use server';

import { reservationSchema, eventSchema, type ReservationData, type EventData } from '@/validation';
import { getPropertyAvailability } from '@/lib/airbnb-calendar';
import { isValidBookingRange } from '@/lib/booking-dates';
import { getBookablePropertyIdFromLabel } from '@/lib/bookable-properties';
import { getEmailConfig, sanitizeForHeader, sendResendEmail } from '@/lib/email-service';

export async function sendEmail(formData: FormData) {
  try {
    const { config, error: configError } = getEmailConfig();

    if (!config) {
      return {
        success: false,
        error: configError,
      };
    }

    // Extract and sanitize common form fields
    const property = formData.get('property')?.toString().trim() || '';
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const phone = formData.get('phone')?.toString().trim() || '';
    const contactMethod = formData.get('contactMethod')?.toString().trim() || '';

    // Determine if this is an event request
    const isEvent = property === 'Event Space Request';

    let validatedData;
    let emailContent: string;
    let subject: string;

    if (isEvent) {
      // Validate event data
      const eventData = {
        eventType: formData.get('eventType')?.toString().trim() || '',
        checkIn: formData.get('checkIn')?.toString().trim() || '',
        guestCount: formData.get('guestCount')?.toString().trim() || '',
        name,
        email,
        phone,
        contactMethod,
        message: formData.get('message')?.toString().trim(),
      };

      validatedData = eventSchema.parse(eventData) as EventData;

      // Sanitize validated data for use in headers
      const sanitizedEmail = sanitizeForHeader(validatedData.email);

      subject = sanitizeForHeader(`New Event Inquiry - ${validatedData.eventType}`);
      emailContent = `
        <h2>New Event Inquiry</h2>
        <p><strong>Event Type:</strong> ${validatedData.eventType}</p>
        <p><strong>Event Date:</strong> ${validatedData.checkIn}</p>
        <p><strong>Expected Guests:</strong> ${validatedData.guestCount}</p>
        <p><strong>Guest Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone}</p>
        <p><strong>Preferred Contact Method:</strong> ${validatedData.contactMethod}</p>
        ${validatedData.message ? `<p><strong>Additional Details:</strong> ${validatedData.message}</p>` : ''}
      `.trim();

      const { error } = await sendResendEmail(config, {
        subject,
        html: emailContent,
        replyTo: sanitizedEmail,
      });

      if (error) {
        console.error('Resend API error:', error);
        return {
          success: false,
          error: error.message
        };
      }

      return { 
        success: true,
        message: 'Email sent successfully!'
      };
    } else {
      // Validate reservation data
      const reservationData = {
        property,
        checkIn: formData.get('checkIn')?.toString().trim() || '',
        checkOut: formData.get('checkOut')?.toString().trim() || '',
        name,
        email,
        phone,
        contactMethod,
      };

      validatedData = reservationSchema.parse(reservationData) as ReservationData;

      const propertyId = getBookablePropertyIdFromLabel(validatedData.property);

      if (!propertyId) {
        return {
          success: false,
          error: 'Please select a valid property',
        };
      }

      const availability = await getPropertyAvailability(propertyId);

      if (availability.status === 'error') {
        return {
          success: false,
          error: 'Airbnb availability is temporarily unavailable. Please try again in a moment.',
        };
      }

      if (
        !isValidBookingRange(
          {
            checkIn: validatedData.checkIn,
            checkOut: validatedData.checkOut,
          },
          undefined,
          availability.blockedDates,
        )
      ) {
        return {
          success: false,
          error: 'Those dates are no longer available. Please choose different dates.',
        };
      }

      // Sanitize validated data for use in headers
      const sanitizedEmail = sanitizeForHeader(validatedData.email);

      subject = sanitizeForHeader(`New Booking Request for ${validatedData.property}`);
      emailContent = `
        <h2>New Booking Request</h2>
        <p><strong>Property:</strong> ${validatedData.property}</p>
        <p><strong>Check-in:</strong> ${validatedData.checkIn}</p>
        <p><strong>Check-out:</strong> ${validatedData.checkOut}</p>
        <p><strong>Guest Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone}</p>
        <p><strong>Preferred Contact Method:</strong> ${validatedData.contactMethod}</p>
      `.trim();

      const { error } = await sendResendEmail(config, {
        subject,
        html: emailContent,
        replyTo: sanitizedEmail,
      });

      if (error) {
        console.error('Resend API error:', error);
        return {
          success: false,
          error: error.message
        };
      }

      return { 
        success: true,
        message: 'Email sent successfully!'
      };
    }
  } catch (error) {
    console.error('Email sending failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to send email';
    return {
      success: false,
      error: errorMessage
    };
  }
}
