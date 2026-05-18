'use client';

import HomeContactForm from '@/components/HomeContactForm';

interface ContactFormProps {
  showTitle?: boolean;
  variant?: 'default' | 'light';
}

export default function ContactForm({ variant = 'default' }: ContactFormProps) {
  const theme = variant === 'light' ? 'light' : 'dark';
  return <HomeContactForm theme={theme} />;
}
