'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Anchor, Scale, Send, Instagram, Facebook } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate newsletter subscription
    setTimeout(() => {
      toast.success('Thank you for subscribing to our luxury newsletter!');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer className="bg-[#121212] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Column 1: Contact */}
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-[#D4AF37]/20 rounded-lg mr-3">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h3 className="font-lato text-lg font-bold text-[#D4AF37]">Stay Connected</h3>
              </div>
              
              <div className="space-y-4 font-lato text-base">
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-[#D4AF37] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white/90">Kerem HaTeimanim</p>
                    <p className="text-white/90">Tel Aviv, Israel</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-[#D4AF37] mr-3 flex-shrink-0" />
                  <a href="tel:+33123456789" className="text-white/90 hover:text-[#D4AF37] transition-colors">
                    +33 1 23 45 67 89
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-[#D4AF37] mr-3 flex-shrink-0" />
                  <a href="mailto:contact@orhakerem.com" className="text-white/90 hover:text-[#D4AF37] transition-colors">
                    contact@orhakerem.com
                  </a>
                </div>
                
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors font-semibold"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </a>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-[#D4AF37]/20 rounded-lg mr-3">
                  <Anchor className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h3 className="font-lato text-lg font-bold text-[#D4AF37]">Quick Links</h3>
              </div>
              
              <nav className="space-y-3 font-lato text-base">
                <Link href="/properties" className="block text-white/90 hover:text-[#D4AF37] transition-colors">
                  Accommodations
                </Link>
                <Link href="/concierge-services" className="block text-white/90 hover:text-[#D4AF37] transition-colors">
                  Concierge Services
                </Link>
                <Link href="/events" className="block text-white/90 hover:text-[#D4AF37] transition-colors">
                  Events
                </Link>
                <Link href="/faq" className="block text-white/90 hover:text-[#D4AF37] transition-colors">
                  FAQ
                </Link>
                <Link href="/" className="block text-white/90 hover:text-[#D4AF37] transition-colors">
                  Contact
                </Link>
              </nav>
            </div>

            {/* Column 3: Legal */}
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-[#D4AF37]/20 rounded-lg mr-3">
                  <Scale className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h3 className="font-lato text-lg font-bold text-[#D4AF37]">Policies</h3>
              </div>
              
              <nav className="space-y-3 font-lato text-base">
                <Link href="/terms" className="block text-white/90 hover:text-[#D4AF37] transition-colors">
                  Terms & Conditions
                </Link>
                <Link href="/privacy" className="block text-white/90 hover:text-[#D4AF37] transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/cancellation" className="block text-white/90 hover:text-[#D4AF37] transition-colors">
                  Cancellation Policy
                </Link>
                <Link href="/accessibility" className="block text-white/90 hover:text-[#D4AF37] transition-colors">
                  Accessibility Statement
                </Link>
              </nav>
            </div>

            {/* Column 4: Newsletter */}
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-[#D4AF37]/20 rounded-lg mr-3">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h3 className="font-lato text-lg font-bold text-[#D4AF37]">Stay Updated</h3>
              </div>
              
              <div className="space-y-4">
                <p className="font-lato text-base text-white/90">
                  Subscribe to our luxury newsletter
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your elegant address"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors font-lato text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#121212] px-4 py-3 rounded-lg font-semibold hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-300 disabled:opacity-50 flex items-center justify-center font-lato text-base"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Joining...' : 'Join'}
                  </button>
                </form>
                
                {/* Social Icons */}
                <div className="flex space-x-4 pt-4">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-lg hover:bg-[#D4AF37]/20 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-[#D4AF37]" />
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-lg hover:bg-[#D4AF37]/20 transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-[#D4AF37]" />
                  </a>
                  <a 
                    href="https://pinterest.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-lg hover:bg-[#D4AF37]/20 transition-colors"
                  >
                    <div className="w-5 h-5 text-[#D4AF37] flex items-center justify-center font-bold text-sm">P</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="font-lato text-base text-white/70">
              © 2025 Or Hakerem. All rights reserved.
            </div>
            
            {/* Badge */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                <span className="text-[#121212] font-bold text-sm">C</span>
              </div>
              <span className="font-lato text-base text-white/90">
                Member of Clefs d'Or Concierge Association
              </span>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-[#D4AF37] text-[#121212] rounded font-semibold font-lato text-base">
                EN
              </button>
              <button className="px-3 py-1 bg-white/10 text-white/70 rounded hover:bg-white/20 transition-colors font-lato text-base">
                FR
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}