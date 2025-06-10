'use client';

import { Calendar, Mail, MessageSquare, Phone, ArrowLeft, Home } from 'lucide-react';
import toast from 'react-hot-toast';

import React, { Suspense, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { sendEmail } from '@/actions/email';

function ReservationContent() {
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
            <h2 className="font-playfair text-2xl font-bold text-primary mb-4">
              Thank you for your reservation request!
            </h2>
            <p className="text-primary/80 mb-6">
              We&apos;ll contact you via your chosen method within 24 hours.
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-secondary text-primary px-6 py-2 rounded-md font-semibold hover:bg-secondary-light transition"
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
        {/* Enhanced Back Navigation */}
        <div className="mb-8">
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Link
              href="/"
              className="relative inline-flex items-center bg-white/80 backdrop-blur-sm text-primary px-6 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-primary/20"
            >
              <div className="relative mr-3">
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                <div className="absolute inset-0 bg-secondary/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
              </div>
              <Home className="w-5 h-5 mr-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Back to Home</span>
            </Link>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="font-playfair text-3xl font-bold text-primary mb-2">Reservation Request</h1>
          <p className="text-primary/80 mb-8">
            Your reservation request will be handled by our team. Please provide your contact
            preferences.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="property" className="block text-sm font-medium text-primary/80 mb-1">
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
                <label htmlFor="checkIn" className="block text-sm font-medium text-primary/80 mb-1">
                  Check-in Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
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
                  className="block text-sm font-medium text-primary/80 mb-1"
                >
                  Check-out Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
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
              <label htmlFor="name" className="block text-sm font-medium text-primary/80 mb-1">
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
              <label htmlFor="email" className="block text-sm font-medium text-primary/80 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
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
              <label htmlFor="phone" className="block text-sm font-medium text-primary/80 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
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
                <span className="transition-colors duration-300 hover:text-secondary">
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
                    onChange={(e) => setContactMethod(e.target.value)}
                    className="absolute opacity-0"
                  />
                  <Mail
                    className={`w-5 h-5 ${contactMethod === 'email' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
                  />
                  <span
                    className={`ml-2 ${contactMethod === 'email' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
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
                    onChange={(e) => setContactMethod(e.target.value)}
                    className="absolute opacity-0"
                  />
                  <Phone
                    className={`w-5 h-5 ${contactMethod === 'phone' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
                  />
                  <span
                    className={`ml-2 ${contactMethod === 'phone' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
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
                    onChange={(e) => setContactMethod(e.target.value)}
                    className="absolute opacity-0"
                  />
                  <MessageSquare
                    className={`w-5 h-5 ${contactMethod === 'whatsapp' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
                  />
                  <span
                    className={`ml-2 ${contactMethod === 'whatsapp' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
                  >
                    WhatsApp
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-secondary text-primary py-3 rounded-md font-semibold hover:bg-secondary-light transition disabled:opacity-50"
            >
              <span className="transition-colors duration-300 hover:text-primary">
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ReservationLoadingFallback() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-6">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="grid grid-cols-2 gap-6">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Reservation() {
  return (
    <Suspense fallback={<ReservationLoadingFallback />}>
      <ReservationContent />
    </Suspense>
  );
}

export default Reservation;