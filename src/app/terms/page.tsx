'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer, FileText, Clock, CreditCard, Shield, AlertTriangle, ArrowUp } from 'lucide-react';

export default function TermsPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="text-primary hover:text-secondary transition-colors duration-300 flex items-center text-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 print:shadow-none print:p-0">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-4">
              Rental Terms & Conditions
            </h1>
          </div>

          {/* Section 1: Cancellation Policies */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-primary to-primary-light rounded-full mr-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-primary">1. Cancellation Policies</h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-secondary to-tertiary mb-6"></div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-l-4 border-green-500">
                  <span className="font-bold text-green-800">30+ days prior:</span>
                  <span className="text-green-700 ml-2">30% deposit refunded</span>
                </div>
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border-l-4 border-yellow-500">
                  <span className="font-bold text-yellow-800">30-15 days prior:</span>
                  <span className="text-yellow-700 ml-2">30% of reservation kept</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border-l-4 border-orange-500">
                  <span className="font-bold text-orange-800">15-7 days prior:</span>
                  <span className="text-orange-700 ml-2">50% of reservation kept</span>
                </div>
                <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border-l-4 border-red-500">
                  <span className="font-bold text-red-800">Less than 7 days/no show:</span>
                  <span className="text-red-700 ml-2">100% kept</span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <h3 className="font-bold text-red-800">Non-refundable circumstances:</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3 text-red-700">
                <div>• Theft/damage to personal belongings</div>
                <div>• External noises/construction</div>
                <div>• Building maintenance issues</div>
                <div>• Insects/natural hazards</div>
                <div>• Internet service issues</div>
                <div>• Pandemic policy changes</div>
              </div>
            </div>
          </section>

          {/* Section 2: Payments & Schedule */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-secondary to-secondary-light rounded-full mr-4">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-primary">2. Payments & Schedule</h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-secondary to-tertiary mb-6"></div>
            
            <p className="text-primary/80 text-lg leading-relaxed mb-8">
              All prices exclude VAT (18%) and are due in NIS. Foreign travelers must provide proof of non-Israeli citizenship for VAT exemption.
            </p>

            <div className="bg-gradient-to-br from-cream to-white rounded-xl p-6 border border-secondary/20">
              <h3 className="font-bold text-primary mb-6 text-lg">Payment Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                  <div className="flex-1 p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-semibold text-primary">30% deposit at booking</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-secondary text-primary rounded-full flex items-center justify-center font-bold mr-4">2</div>
                  <div className="flex-1 p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-semibold text-primary">20% 15 days before arrival</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-tertiary text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                  <div className="flex-1 p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-semibold text-primary">50% 7 days before arrival</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-light text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                  <div className="flex-1 p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-semibold text-primary">Security deposit released 5 days post-departure</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Guest Responsibilities */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-tertiary to-tertiary-light rounded-full mr-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-primary">3. Guest Responsibilities</h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-secondary to-tertiary mb-6"></div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-primary/80">Provide valid passport/visa at arrival</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-primary/80">Responsible for damages during stay</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-primary/80">Turn off lights/AC when leaving</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-primary/80">Use property responsibly</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-primary/80">Report damages immediately</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: Or Hakerem Responsibilities */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-primary to-primary-light rounded-full mr-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-primary">4. Or Hakerem Responsibilities</h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-secondary to-tertiary mb-6"></div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-secondary/10">
                <div className="text-4xl mb-4">🧹</div>
                <h3 className="font-bold text-primary mb-2">Cleanliness</h3>
                <p className="text-primary/80">Pre-arrival cleaning to company standards</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-secondary/10">
                <div className="text-4xl mb-4">🛏️</div>
                <h3 className="font-bold text-primary mb-2">Linen Provision</h3>
                <p className="text-primary/80">Quality linens for registered guests</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-secondary/10">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="font-bold text-primary mb-2">Maintenance</h3>
                <p className="text-primary/80">Timely resolution of issues</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-secondary/10">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="font-bold text-primary mb-2">Relocation</h3>
                <p className="text-primary/80">Alternative arrangements if needed</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-bold text-yellow-800 mb-3">Limitations of responsibility:</h3>
              <p className="text-yellow-700">
                Or Hakerem is not responsible for theft/damage to personal belongings, external noises/construction, 
                building maintenance issues, insects/natural hazards, internet service issues, or pandemic policy changes.
              </p>
            </div>
          </section>

          {/* Section 5: Penalties & Termination */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-full mr-4">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-primary">5. Penalties & Termination</h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-secondary to-tertiary mb-6"></div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-800 leading-relaxed">
                Rental terminates automatically at contract end. Unauthorized overstay incurs 2x daily rate penalty. 
                Breach of terms results in immediate eviction without reimbursement.
              </p>
            </div>
          </section>

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

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-secondary to-secondary-light text-primary p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 hover:scale-110"
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}