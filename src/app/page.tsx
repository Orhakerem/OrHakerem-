'use client';

import toast from 'react-hot-toast';

import React, { useState } from 'react';

import Image from 'next/image';

import { sendContactEmail } from '@/actions/contact';
import FAQ from '@/components/FAQ';

interface ServiceCardProps {
  emoji: string;
  title: string;
  description: string;
}

function ServiceCard({ emoji, title, description }: ServiceCardProps) {
  return (
    <div className="text-center p-6 bg-secondary-lighter rounded-lg transition-transform hover:scale-105">
      <div className="inline-block p-4 bg-primary rounded-full mb-4">
        <span className="text-4xl">{emoji}</span>
      </div>
      <h3 className="font-playfair text-xl font-bold text-secondary mb-2">{title}</h3>
      <p className="text-secondary-light">{description}</p>
    </div>
  );
}

const Home: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(new FormData(e.currentTarget));
      if (result.success) {
        toast.success(result.message || 'Message sent successfully!');
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <video autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40">
          <div className="max-w-7xl mx-auto px-4 h-full flex mt-30 ml-20">
            <div className="text-secondary">
              <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">
                Discover Or Hakerem
              </h1>
              <p className="text-xl max-w-2xl">
                Experience in a unique place with our luxury living in the heart of Tel Aviv
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Building Description */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/penthouse/2-salon-angle.jpg"
                width={500}
                height={500}
                alt="Building Interior"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-playfair text-3xl font-bold text-primary mb-6">
                Luxury living in the kerem
              </h2>
              <p className="text-primary/80 leading-relaxed mb-4">
                Located in the Kerem, our property offers a unique experience combining modern
                comforts with local charm.
              </p>
              <p className="text-primary/80 leading-relaxed">
                Whether you&apos;re looking for a romantic getaway, a family holiday or a break with
                friends, Or Hakerem is the place to be for unforgettable memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Services */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-playfair text-3xl font-bold text-secondary mb-12">
            Guest Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              emoji="🕯️"
              title="Shabbat Delivery"
              description="Candle kits & meals available upon request for a peaceful Shabbat experience"
            />
            <ServiceCard
              emoji="🎁"
              title="Welcome Packs"
              description="Complimentary essentials basket upon arrival to make you feel at home"
            />
            <ServiceCard
              emoji="📺"
              title="Streaming Included"
              description="Free access to premium streaming platforms during your stay"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-primary mb-4">Get in Touch</h2>
            <p className="text-primary/80 text-lg max-w-2xl mx-auto">
              Have questions? We&apos;re here to help make your stay exceptional.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
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
                      placeholder="Enter your name"
                      required
                      className="w-full h-12 px-4 bg-cream border-2 border-transparent hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg transition-all duration-300 outline-none text-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-primary/80 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      required
                      className="w-full h-12 px-4 bg-cream border-2 border-transparent hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg transition-all duration-300 outline-none text-base"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-primary/80 mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-cream border-2 border-transparent hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg transition-all duration-300 outline-none resize-none text-base"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-secondary h-12 rounded-xl text-base font-medium hover:bg-primary/90 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message →'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default Home;
