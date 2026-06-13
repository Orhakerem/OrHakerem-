'use server';

import { contactSchema } from '@/validation';
import { getEmailConfig, sanitizeForHeader, sendResendEmail } from '@/lib/email-service';

export async function sendContactEmail(formData: FormData) {
  try {
    const { config, error: configError } = getEmailConfig();

    if (!config) {
      return {
        success: false,
        error: configError,
      };
    }

    const data = {
      name: formData.get('name')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      message: formData.get('message')?.toString().trim() || '',
    };

    const validatedData = contactSchema.parse(data);

    // Sanitize validated data for use in headers
    const sanitizedEmail = sanitizeForHeader(validatedData.email);

    const { error } = await sendResendEmail(config, {
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
