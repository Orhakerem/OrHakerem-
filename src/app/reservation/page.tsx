'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar, Mail, Phone, MessageSquare } from 'lucide-react';
import { sendEmail } from '@/actions/email';
import toast from 'react-hot-toast';

function Reservation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyTitle = searchParams.get('property') || 'Property';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactMethod, setContactMethod] = useState('email');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sendEmail(new FormData(e.currentTarget));
      if (result.success) {
        toast.success(result.message || 'Reservation request sent successfully!');
        setIsSuccess(true);
      } else {
        toast.error(result.error || 'Failed to send reservation request');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-cream">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
              Thank you for your reservation request!
            </h2>
            <p className="text-navy-light mb-6">
              We&apos;ll contact you via your chosen method within 24 hours.
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-gold text-navy px-6 py-2 rounded-md font-semibold hover:bg-gold/90 transition"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="font-playfair text-3xl font-bold text-navy mb-2">Reservation Request</h1>
          <p className="text-navy-light mb-8">
            Your reservation request will be handled by our team. Please provide your contact
            preferences.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="property" className="block text-sm font-medium text-navy-light mb-1">
                Property
              </label>
              <input
                type="text"
                id="property"
                name="property"
                value={propertyTitle}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="checkIn" className="block text-sm font-medium text-navy-light mb-1">
                  Check-in Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-light" />
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="checkOut"
                  className="block text-sm font-medium text-navy-light mb-1"
                >
                  Check-out Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-light" />
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-navy-light mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy-light mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-light" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-navy-light mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-light" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary/80 mb-3">
                <span className="transition-colors duration-300 hover:text-[#D8B084]">
                  Preferred Contact Method
                </span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="relative flex items-center justify-center p-4 border rounded-md cursor-pointer transition-colors hover:border-secondary hover:bg-secondary/5 group">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="email"
                    checked={contactMethod === 'email'}
                    onChange={e => setContactMethod(e.target.value)}
                    className="absolute opacity-0"
                  />
                  <Mail
                    className={`w-5 h-5 ${contactMethod === 'email' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-[#D8B084]`}
                  />
                  <span
                    className={`ml-2 ${contactMethod === 'email' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-[#D8B084]`}
                  >
                    Email
                  </span>
                </label>

                <label className="relative flex items-center justify-center p-4 border rounded-md cursor-pointer transition-colors hover:border-secondary hover:bg-secondary/5 group">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="phone"
                    checked={contactMethod === 'phone'}
                    onChange={e => setContactMethod(e.target.value)}
                    className="absolute opacity-0"
                  />
                  <Phone
                    className={`w-5 h-5 ${contactMethod === 'phone' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-[#D8B084]`}
                  />
                  <span
                    className={`ml-2 ${contactMethod === 'phone' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-[#D8B084]`}
                  >
                    Phone
                  </span>
                </label>

                <label className="relative flex items-center justify-center p-4 border rounded-md cursor-pointer transition-colors hover:border-secondary hover:bg-secondary/5 group">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="whatsapp"
                    checked={contactMethod === 'whatsapp'}
                    onChange={e => setContactMethod(e.target.value)}
                    className="absolute opacity-0"
                  />
                  <MessageSquare
                    className={`w-5 h-5 ${contactMethod === 'whatsapp' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-[#D8B084]`}
                  />
                  <span
                    className={`ml-2 ${contactMethod === 'whatsapp' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-[#D8B084]`}
                  >
                    WhatsApp
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold text-navy py-3 rounded-md font-semibold hover:bg-gold/90 transition disabled:opacity-50"
            >
              <span className="transition-colors duration-300 hover:text-[#D8B084]">
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reservation;