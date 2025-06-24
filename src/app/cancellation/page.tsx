'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle, XCircle, Home } from 'lucide-react';

export default function CancellationPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full mb-6">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
              Cancellation Policy
            </h1>
            <p className="text-primary/80 text-lg max-w-2xl mx-auto">
              Please review our cancellation terms carefully before making your reservation.
            </p>
          </div>

          {/* Cancellation Timeline */}
          <section className="mb-12">
            <h2 className="font-playfair text-2xl font-bold text-primary mb-8 text-center">
              Cancellation Timeline & Refunds
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-l-4 border-green-500 shadow-lg">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="font-bold text-green-800 text-lg">30+ days prior</span>
                  </div>
                  <p className="text-green-700 font-medium">30% deposit refunded</p>
                  <p className="text-green-600 text-sm mt-2">Most flexible cancellation option</p>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border-l-4 border-yellow-500 shadow-lg">
                  <div className="flex items-center mb-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
                    <span className="font-bold text-yellow-800 text-lg">30-15 days prior</span>
                  </div>
                  <p className="text-yellow-700 font-medium">30% of reservation kept</p>
                  <p className="text-yellow-600 text-sm mt-2">Moderate cancellation fee applies</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border-l-4 border-orange-500 shadow-lg">
                  <div className="flex items-center mb-3">
                    <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
                    <span className="font-bold text-orange-800 text-lg">15-7 days prior</span>
                  </div>
                  <p className="text-orange-700 font-medium">50% of reservation kept</p>
                  <p className="text-orange-600 text-sm mt-2">Higher cancellation fee</p>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border-l-4 border-red-500 shadow-lg">
                  <div className="flex items-center mb-3">
                    <XCircle className="w-6 h-6 text-red-600 mr-3" />
                    <span className="font-bold text-red-800 text-lg">Less than 7 days/no show</span>
                  </div>
                  <p className="text-red-700 font-medium">100% kept</p>
                  <p className="text-red-600 text-sm mt-2">No refund available</p>
                </div>
              </div>
            </div>
          </section>

          {/* Non-refundable Circumstances */}
          <section className="mb-12">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-8 h-8 text-red-600 mr-4" />
                <h3 className="font-playfair text-2xl font-bold text-red-800">Non-refundable Circumstances</h3>
              </div>
              
              <p className="text-red-700 mb-6 text-lg">
                Please note that refunds are not available for the following circumstances:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-red-700">Theft/damage to personal belongings</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-red-700">External noises/construction</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-red-700">Building maintenance issues</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-red-700">Insects/natural hazards</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-red-700">Internet service issues</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-red-700">Pandemic policy changes</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Important Notes */}
          <section className="mb-8">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
              <h3 className="font-playfair text-xl font-bold text-blue-800 mb-4">Important Notes</h3>
              <ul className="space-y-3 text-blue-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>All cancellations must be submitted in writing via email</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Refunds will be processed within 7-14 business days</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Cancellation fees may apply depending on payment method</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Force majeure events will be considered on a case-by-case basis</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8">
            <h3 className="font-playfair text-xl font-bold text-primary mb-4">
              Questions About Cancellations?
            </h3>
            <p className="text-primary/80 mb-6">
              Our team is here to help you understand our cancellation policy and assist with any changes to your reservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:keremliving@gmail.com"
                className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-light transition-colors duration-300"
              >
                Email Us
              </a>
              <a
                href="tel:+33651179925"
                className="inline-flex items-center justify-center bg-secondary text-primary px-6 py-3 rounded-full font-semibold hover:bg-secondary-light transition-colors duration-300"
              >
                Call Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}