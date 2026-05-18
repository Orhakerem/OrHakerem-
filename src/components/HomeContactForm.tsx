'use client';

import { type FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { sendContactEmail } from '@/actions/contact';
import LiquidGlassButton from '@/components/LiquidGlassButton';
import { Send } from 'lucide-react';

interface HomeContactFormProps {
  theme?: 'light' | 'dark';
}

export default function HomeContactForm({ theme = 'dark' }: HomeContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLight = theme === 'light';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(new FormData(form));
      if (result.success) {
        toast.success(result.message || 'Message sent successfully!');
        form.reset();
      } else {
        toast.error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const cardClass = isLight
    ? 'home-contact-card relative w-full rounded-2xl border border-secondary/30 bg-white p-6 shadow-sm'
    : 'home-contact-card relative rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm';
  const labelClass = isLight
    ? 'mb-2 block text-sm font-medium text-primary/80'
    : 'mb-2 block text-sm font-medium text-white/90';
  const inputClass = isLight
    ? 'h-12 w-full rounded-xl border-2 border-secondary/40 bg-white px-4 text-base text-primary placeholder-primary/40 outline-none transition-colors duration-300 focus:border-primary/60 focus:ring-2 focus:ring-primary/15'
    : 'h-12 w-full rounded-xl border-2 border-white/20 bg-white/10 px-4 text-base text-white placeholder-white/60 outline-none transition-colors duration-300 focus:border-white/35 focus:ring-2 focus:ring-white/15';
  const textareaClass = isLight
    ? 'w-full resize-none rounded-xl border-2 border-secondary/40 bg-white px-4 py-3 text-base text-primary placeholder-primary/40 outline-none transition-colors duration-300 focus:border-primary/60 focus:ring-2 focus:ring-primary/15'
    : 'w-full resize-none rounded-xl border-2 border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder-white/60 outline-none transition-colors duration-300 focus:border-white/35 focus:ring-2 focus:ring-white/15';
  const helperClass = isLight ? 'text-primary/60 text-sm mt-4 font-medium' : 'text-white/70 text-sm mt-4 font-medium';

  const containerWrap = isLight
    ? 'w-full'
    : 'max-w-2xl mx-auto';

  return (
    <div className={containerWrap} data-animate="scale" data-delay="2">
      <div className={cardClass}>
        <form onSubmit={handleSubmit} className="home-contact-form space-y-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className={labelClass}>
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              rows={4}
              required
              className={textareaClass}
            ></textarea>
          </div>

          <div className="text-center">
            {isLight ? (
              <LiquidGlassButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="w-4 h-4" />
              </LiquidGlassButton>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="button-hover-clean inline-flex items-center rounded-full bg-gradient-to-r from-secondary to-secondary-light px-8 py-3 text-lg font-semibold text-primary shadow-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="mr-2">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
                <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary text-sm">→</span>
                </div>
              </button>
            )}

            <p className={helperClass}>
              We&apos;ll get back to you within 24 hours
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
