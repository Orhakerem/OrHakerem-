'use server';

import { Resend } from 'resend';
import { contactSchema } from '@/validation';
import type { ContactData } from '@/validation';

export async function sendContactEmail(formData: FormData) {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const recipientEmail = process.env.RECIPIENT_EMAIL?.trim();

    console.log('Contact form environment check:', {
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

    const data = {
      name: formData.get('name')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      message: formData.get('message')?.toString().trim() || '',
    };

    const validatedData = contactSchema.parse(data) as ContactData;

    const resend = new Resend(apiKey);

    console.log('Attempting to send contact email with Resend...');

    const { data: emailData, error } = await resend.emails.send({
      from: 'Or Hakerem <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `New Contact Message from ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: #a5382b; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Or Hakerem - Luxury Properties</p>
          </div>
          <div style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #a5382b; margin-top: 0;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Name:</td>
                <td style="padding: 8px 0;">${validatedData.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${validatedData.email}" style="color: #a5382b;">${validatedData.email}</a></td>
              </tr>
            </table>
            
            <h2 style="color: #a5382b; margin-top: 20px;">Message</h2>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #d8b084; white-space: pre-wrap;">${validatedData.message}</div>
          </div>
        </div>
      `.trim(),
      replyTo: validatedData.email,
    });

    if (error) {
      console.error('Resend API error:', error);
      return {
        success: false,
        error: `Email service error: ${error.message}`
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
      error: `Contact form error: ${errorMessage}`
    };
  }
}