'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Mail, Phone } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-primary hover:text-secondary transition-colors duration-300 flex items-center text-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
              Privacy Policy
            </h1>
            <p className="text-primary/80 text-lg max-w-2xl mx-auto">
              Your privacy and data protection are important to us.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 md:p-12 text-center mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-6">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h2 className="font-playfair text-2xl font-bold text-blue-800 mb-4">
                  Privacy Policy in Development
                </h2>
                <p className="text-blue-700 text-lg leading-relaxed mb-8">
                  We are currently preparing our comprehensive privacy policy to ensure full compliance 
                  with data protection regulations and to clearly communicate how we handle your personal information.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 mb-8">
                <h3 className="font-bold text-blue-800 mb-4 text-lg">
                  In the meantime, for any data inquiries:
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <a 
                      href="mailto:keremliving@gmail.com"
                      className="text-blue-700 hover:text-blue-800 font-semibold transition-colors"
                    >
                      keremliving@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <a 
                      href="tel:+33651179925"
                      className="text-blue-700 hover:text-blue-800 font-semibold transition-colors"
                    >
                      +33 6 51 17 99 25
                    </a>
                  </div>
                </div>
              </div>

              <div className="text-blue-600 text-sm">
                <p>
                  We are committed to protecting your privacy and will update this page 
                  with our complete privacy policy soon.
                </p>
              </div>
            </div>
          </div>

          {/* Temporary Data Handling Notice */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-yellow-800 mb-3">Current Data Handling</h3>
            <p className="text-yellow-700">
              Currently, any personal information you provide through our contact forms or booking inquiries 
              is used solely for the purpose of responding to your request and providing our services. 
              We do not share your information with third parties without your consent.
            </p>
          </div>

          {/* Or Hakerem Signature Section */}
          <section className="text-center pt-8 border-t border-gray-200">
            <div className="mb-6">
              <p className="text-primary/70 text-sm mb-4">
                Authorized Representative
              </p>
              <div className="flex justify-center items-center">
                <span className="font-playfair text-4xl font-bold text-secondary">
                  Or Hakerem
                </span>
              </div>
              <p className="font-playfair text-lg text-primary mt-2">
                Luxury Properties
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}