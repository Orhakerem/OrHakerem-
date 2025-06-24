'use server';

import { Resend } from 'resend';
import { contactSchema } from '@/validation';
import type { ContactData } from '@/validation';

// Helper function to sanitize strings for HTTP headers
function sanitizeForHeader(str: string): string {
  return str.replace(/[^\x00-\x7F]/g, '?');
}

export async function sendContactEmail(formData: FormData) {
  try {
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

    const data = {
      name: formData.get('name')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      message: formData.get('message')?.toString().trim() || '',
    };

    const validatedData = contactSchema.parse(data) as ContactData;

    // Sanitize validated data for use in headers
    const sanitizedName = sanitizeForHeader(validatedData.name);
    const sanitizedEmail = sanitizeForHeader(validatedData.email);

    const resend = new Resend(apiKey);

    const { data: emailData, error } = await resend.emails.send({
      from: 'Or Hakerem <onboarding@resend.dev>',
      to: recipientEmail,
      subject: sanitizeForHeader(`New message from ${validatedData.name}`),
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
      `.trim(),
      replyTo: sanitizedEmail,
    });

    if (error) {
      return {
        success: false,
        error: error.message
      };
    }

    console.log('Contact email sent successfully:', emailData?.id);
    return { 
      success: true,
      message: 'Message sent successfully!'
    };
  } catch (error) {
    console.error('Contact email sending failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
    return {
      success: false,
      error: errorMessage
    };
  }
}