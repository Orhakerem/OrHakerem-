'use client';

import React, { useState } from 'react';
import { Calendar, Users, Moon, Mail, Phone, MessageSquare } from 'lucide-react';
import { sendEmail } from '@/actions/email';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface EventOptionProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

function EventOption({ title, description, icon: Icon }: EventOptionProps) {
  return (
    <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm">
      <div className="inline-block p-4 bg-secondary rounded-full mb-4 relative">
        <div className="absolute inset-0 rounded-full bg-tertiary/20"></div>
        <Icon className="w-8 h-8 text-primary relative z-10" />
      </div>
      <h3 className="font-playfair text-xl font-bold text-secondary mb-2">{title}</h3>
      <p className="text-secondary-light">{description}</p>
    </div>
  );
}

export default function Events() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactMethod, setContactMethod] = useState('email');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.set('property', 'Event Space Request');

      const result = await sendEmail(formData);
      if (result.success) {
        toast.success(result.message || 'Event inquiry sent successfully!');
        setIsSuccess(true);
        setShowForm(false);
      } else {
        toast.error(result.error || 'Failed to send event inquiry');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit event request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative h-[500px] rounded-xl overflow-hidden mb-20">
          <Image
            src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80"
            alt="Event Space"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0  flex items-center">
            <div className="max-w-3xl mx-auto text-center px-4">
              <h1 className="font-playfair text-5xl font-bold text-secondary mb-6">
                Host Your Special Events
              </h1>
              <p className="text-xl text-secondary-light">
                Experience luxury and elegance in our exclusive event spaces
              </p>
            </div>
          </div>
        </div>

        {/* Event Options */}
        <div className="mb-20">
          <h2 className="text-center font-playfair text-3xl font-bold text-primary mb-12">
            Available Event Spaces
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <EventOption
              icon={Calendar}
              title="Rooftop Terrace"
              description="An elegant open-air space perfect for cocktail parties and intimate gatherings, featuring breathtaking city views."
            />
            <EventOption
              icon={Users}
              title="Private Dining Room"
              description="Sophisticated indoor venue ideal for dinner parties and small celebrations with full catering options."
            />
            <EventOption
              icon={Moon}
              title="Garden Pavilion"
              description="Beautiful outdoor setting surrounded by landscaped gardens, perfect for daytime events and ceremonies."
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="font-playfair text-3xl font-bold text-primary mb-6">Plan Your Event</h2>
          <p className="text-primary/80 mb-8 max-w-2xl mx-auto">
            Let us help you create an unforgettable experience. Contact our events team to discuss
            your requirements.
          </p>
          {isSuccess ? (
            <div className="bg-green-50 text-green-800 p-4 rounded-lg max-w-2xl mx-auto">
              <h3 className="font-bold mb-2">Thank you for your inquiry!</h3>
              <p>Our events team will contact you within 24 hours.</p>
            </div>
          ) : (
            <>
              <button
                onClick={() => setShowForm(true)}
                className="bg-primary text-secondary px-8 py-3 rounded-full font-semibold hover:bg-primary-light transition"
              >
                <span className="transition-colors duration-300 hover:text-[#D8B084]">
                  Inquire About Events
                </span>
              </button>

              {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <h3 className="font-playfair text-2xl font-bold text-primary mb-6">
                      Event Inquiry Form
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="eventType"
                          className="block text-sm font-medium text-primary/80 mb-1"
                        >
                          Event Type
                        </label>
                        <select
                          id="eventType"
                          name="eventType"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                        >
                          <option value="">Select event type</option>
                          <option value="cocktail">Cocktail Party</option>
                          <option value="dinner">Private Dinner</option>
                          <option value="celebration">Celebration</option>
                          <option value="corporate">Corporate Event</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="eventDate"
                            className="block text-sm font-medium text-primary/80 mb-1"
                          >
                            Event Date
                          </label>
                          <input
                            type="date"
                            id="eventDate"
                            name="checkIn"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="guestCount"
                            className="block text-sm font-medium text-primary/80 mb-1"
                          >
                            Number of Guests
                          </label>
                          <input
                            type="number"
                            id="guestCount"
                            name="guestCount"
                            required
                            min="1"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-primary/80 mb-1"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-primary/80 mb-1"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-primary/80 mb-1"
                        >
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
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

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-primary/80 mb-1"
                        >
                          Event Details
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                          placeholder="Please share any specific requirements or questions about your event..."
                        ></textarea>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="flex-1 px-6 py-3 border border-gray-300 rounded-md text-primary hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 bg-primary text-secondary px-6 py-3 rounded-md font-semibold hover:bg-primary-light transition disabled:opacity-50"
                        >
                          <span className="transition-colors duration-300 hover:text-[#D8B084]">
                            {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}