'use server';

import { Resend } from 'resend';
import { reservationSchema, eventSchema } from '@/validation';
import type { ReservationData, EventData } from '@/validation';

export async function sendEmail(formData: FormData) {
  try {
    // Get and validate environment variables
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const recipientEmail = process.env.RECIPIENT_EMAIL?.trim();

    console.log('Environment check:', {
      hasApiKey: !!apiKey,
      hasRecipientEmail: !!recipientEmail,
      apiKeyLength: apiKey?.length || 0
    });

    if (!apiKey) {
      console.error('Missing RESEND_API_KEY environment variable');
      return {
        success: false,
        error: 'Email service configuration error: Missing API key'
      };
    }

    if (!recipientEmail) {
      console.error('Missing RECIPIENT_EMAIL environment variable');
      return {
        success: false,
        error: 'Email service configuration error: Missing recipient email'
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

      subject = `New Event Inquiry - ${validatedData.eventType}`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: #a5382b; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">New Event Inquiry</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Or Hakerem - Luxury Properties</p>
          </div>
          <div style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #a5382b; margin-top: 0;">Event Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Event Type:</td>
                <td style="padding: 8px 0;">${validatedData.eventType}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Event Date:</td>
                <td style="padding: 8px 0;">${validatedData.checkIn}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Expected Guests:</td>
                <td style="padding: 8px 0;">${validatedData.guestCount}</td>
              </tr>
            </table>
            
            <h2 style="color: #a5382b; margin-top: 20px;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Name:</td>
                <td style="padding: 8px 0;">${validatedData.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${validatedData.email}" style="color: #a5382b;">${validatedData.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${validatedData.phone}" style="color: #a5382b;">${validatedData.phone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Preferred Contact:</td>
                <td style="padding: 8px 0;">${validatedData.contactMethod}</td>
              </tr>
            </table>
            
            ${validatedData.message ? `
              <h2 style="color: #a5382b; margin-top: 20px;">Additional Details</h2>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #d8b084;">
                ${validatedData.message}
              </div>
            ` : ''}
          </div>
        </div>
      `.trim();
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

      subject = `New Booking Request for ${validatedData.property}`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: #a5382b; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">New Booking Request</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Or Hakerem - Luxury Properties</p>
          </div>
          <div style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #a5382b; margin-top: 0;">Reservation Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Property:</td>
                <td style="padding: 8px 0;">${validatedData.property}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Check-in:</td>
                <td style="padding: 8px 0;">${validatedData.checkIn}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Check-out:</td>
                <td style="padding: 8px 0;">${validatedData.checkOut}</td>
              </tr>
            </table>
            
            <h2 style="color: #a5382b; margin-top: 20px;">Guest Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Name:</td>
                <td style="padding: 8px 0;">${validatedData.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${validatedData.email}" style="color: #a5382b;">${validatedData.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${validatedData.phone}" style="color: #a5382b;">${validatedData.phone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Preferred Contact:</td>
                <td style="padding: 8px 0;">${validatedData.contactMethod}</td>
              </tr>
            </table>
          </div>
        </div>
      `.trim();
    }

    // Initialize Resend with API key
    const resend = new Resend(apiKey);

    console.log('Attempting to send email with Resend...');

    // Send email using Resend API
    const { data, error } = await resend.emails.send({
      from: 'Or Hakerem <onboarding@resend.dev>',
      to: recipientEmail,
      subject,
      html: emailContent,
      replyTo: validatedData.email,
    });

    if (error) {
      console.error('Resend API error:', error);
      return {
        success: false,
        error: `Email service error: ${error.message}`
      };
    }

    console.log('Email sent successfully:', data?.id);
    return { 
      success: true,
      message: 'Email sent successfully!'
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to send email';
    return {
      success: false,
      error: `Email sending failed: ${errorMessage}`
    };
  }
}