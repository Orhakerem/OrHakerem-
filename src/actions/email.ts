'use server';

import { Resend } from 'resend';
import { reservationSchema, eventSchema } from '@/validation';
import type { ReservationData, EventData } from '@/validation';

// Helper function to sanitize strings for HTTP headers
function sanitizeForHeader(str: string): string {
  return str.replace(/[^\x00-\x7F]/g, '?');
}

export async function sendEmail(formData: FormData) {
  try {
    // Get and validate environment variables
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const recipientEmail = process.env.RECIPIENT_EMAIL?.trim();

    if (!apiKey) {
      return {
        success: false,
        error: 'Missing Resend API key'
      };
    }

    if (!recipientEmail) {
      return {
        success: false,
        error: 'Missing recipient email'
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
      const sanitizedEventType = sanitizeForHeader(validatedData.eventType);
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

      // Initialize Resend with API key
      const resend = new Resend(apiKey);

      // Send email using Resend API
      const { data, error } = await resend.emails.send({
        from: 'Or Hakerem <onboarding@resend.dev>',
        to: recipientEmail,
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

      console.log('Email sent successfully:', data?.id);
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

      // Sanitize validated data for use in headers
      const sanitizedProperty = sanitizeForHeader(validatedData.property);
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

      // Initialize Resend with API key
      const resend = new Resend(apiKey);

      // Send email using Resend API
      const { data, error } = await resend.emails.send({
        from: 'Or Hakerem <onboarding@resend.dev>',
        to: recipientEmail,
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

      console.log('Email sent successfully:', data?.id);
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