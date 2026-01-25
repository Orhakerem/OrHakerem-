'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, Building2, TrendingUp, Shield, Clock, Star, Users, CheckCircle, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendContactEmail } from '@/actions/contact';
import Link from 'next/link';

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay: number;
}

function ServiceCard({ icon: Icon, title, description, delay }: ServiceCardProps) {
  return (
    <div
      className="group relative bg-white rounded-xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-100"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-tertiary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative inline-block mb-4">
        <div className="relative p-3 bg-gradient-to-br from-secondary to-secondary-light rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <div className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300"></div>
          <Icon className="w-6 h-6 text-primary relative z-10 group-hover:text-primary/90 transition-colors duration-300" />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-secondary/30 animate-pulse group-hover:border-secondary/50 transition-colors duration-300"></div>
      </div>

      <h3 className="font-playfair text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300 relative z-10">
        {title}
      </h3>
      <p className="text-primary/80 leading-relaxed text-sm group-hover:text-primary transition-colors duration-300 relative z-10">
        {description}
      </p>

      <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-secondary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-tertiary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-start text-left group"
      >
        <h3 className="font-playfair text-lg font-bold text-primary group-hover:text-secondary transition-colors duration-300 pr-8">
          {question}
        </h3>
        <span className={`flex-shrink-0 text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}
      >
        <p className="text-primary/80 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function PropertyManagementPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const services = [
    {
      icon: Building2,
      title: 'Professional Photography & Listing Optimization',
      description: 'First impressions drive bookings. We create stunning visual presentations and craft compelling property descriptions optimized for maximum visibility across Airbnb, Booking.com, and direct booking channels.'
    },
    {
      icon: TrendingUp,
      title: 'Dynamic Pricing & Revenue Management',
      description: 'Our data-driven pricing strategy adjusts rates in real-time based on demand, seasonality, local events, and market trends. Property owners typically see 20-30% revenue increases.'
    },
    {
      icon: Users,
      title: 'Guest Screening & 24/7 Communication',
      description: 'Every guest is carefully vetted before confirmation. Our multilingual team handles all inquiries, check-in coordination, and guest support around the clock.'
    },
    {
      icon: Star,
      title: 'Professional Housekeeping & Turnover',
      description: 'Meticulous cleaning and turnover services between every guest maintain your property\'s premium standards. Fresh linens, restocked amenities, and inspection protocols.'
    },
    {
      icon: Shield,
      title: 'Proactive Maintenance & Support',
      description: 'From routine inspections to emergency repairs, we handle everything. Our local Tel Aviv network of trusted vendors responds immediately to any issue.'
    },
    {
      icon: CheckCircle,
      title: 'Legal Compliance & Tax Support',
      description: 'Navigate Tel Aviv\'s short-term rental regulations with confidence. We ensure full compliance with local laws, handle tax documentation, and keep you informed of regulatory changes.'
    }
  ];

  const faqs = [
    {
      question: 'What are your property management fees?',
      answer: 'Our commission-based structure aligns our success with yours—we only earn when you earn. Fees typically range from 20-25% of rental revenue, covering all management services, guest communication, cleaning coordination, and maintenance oversight. No revenue, no fees. We\'ll provide a detailed proposal during your property evaluation.'
    },
    {
      question: 'How do you determine pricing for my property?',
      answer: 'We employ dynamic pricing algorithms that analyze hundreds of data points: comparable properties, seasonal demand, local events, booking lead time, and real-time market conditions. Prices adjust automatically to maximize both occupancy and revenue. Property owners can review and approve our pricing strategy.'
    },
    {
      question: 'Do I need to provide furnishings and amenities?',
      answer: 'Your property should be move-in ready with quality furnishings, essential appliances, and basic amenities. We\'ll conduct a walk-through and recommend any additions that could increase bookings or justify premium pricing.'
    },
    {
      question: 'How often will I receive payments?',
      answer: 'Monthly payments are processed within 5 business days after month-end. You\'ll receive detailed statements showing all bookings, revenue, cleaning costs, maintenance expenses, and our management fee. Your owner portal provides real-time financial tracking.'
    },
    {
      question: 'What happens if guests damage my property?',
      answer: 'All guests are screened and covered by security deposits plus platform protection programs. When damage occurs, we document everything, file claims, coordinate repairs using our trusted vendors, and pursue full reimbursement. You\'re never responsible for guest-caused damage.'
    },
    {
      question: 'Can I still use my property occasionally?',
      answer: 'Absolutely. We\'ll block your personal dates in our calendar system, ensuring your property remains available when you need it. Many owners reserve holidays, family visits, or specific weeks while maximizing revenue the rest of the year.'
    },
    {
      question: 'What areas of Tel Aviv do you serve?',
      answer: 'We specialize in Kerem HaTeimanim and manage properties throughout central Tel Aviv. Our local expertise in these neighborhoods gives your property distinct advantages. Contact us to discuss your specific location.'
    },
    {
      question: 'How quickly can you start managing my property?',
      answer: 'Most properties launch within 2-3 weeks after our initial consultation. This timeline includes professional photography, listing creation, platform setup, and operational preparation. Expedited launches can be arranged for ready-to-rent properties.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const originalMessage = formData.get('message') as string;
      formData.set('message', `Property Management Inquiry: ${originalMessage}`);

      const result = await sendContactEmail(formData);
      if (result.success) {
        toast.success(result.message || 'Your inquiry has been sent successfully! We\'ll be in touch soon.');
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(result.error || 'Failed to send inquiry');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast.error('Failed to send inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <section className="relative min-h-[85vh] w-full overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-tertiary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-40 right-20 w-32 h-32 border-4 border-secondary/30 rounded-lg rotate-12 animate-spin-slow"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 border-4 border-tertiary/30 rounded-full animate-bounce-slow"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[85vh] px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Building2 className="w-5 h-5 text-secondary animate-pulse" />
              <span className="text-white font-semibold text-sm tracking-wider uppercase">
                For Property Owners
              </span>
            </div>

            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in">
              Professional Property Management
              <br />
              <span className="text-secondary">& Airbnb Management in Tel Aviv</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
              Maximize revenue, optimize occupancy, and enjoy complete peace of mind with Tel Aviv&apos;s most trusted property management service.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Higher Revenue</span>
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>85%+ Occupancy</span>
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Zero Stress</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 8.33333C120 16.6667 240 33.3333 360 41.6667C480 50 600 50 720 41.6667C840 33.3333 960 16.6667 1080 16.6667C1200 16.6667 1320 33.3333 1380 41.6667L1440 50V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V0Z" fill="#FAF7F2"/>
          </svg>
        </div>
      </section>

      <section className="relative py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
              Turn Your Tel Aviv Property Into a Profitable Investment
            </h2>
            <p className="text-primary/80 text-lg max-w-4xl mx-auto leading-relaxed">
              Own a property in Tel Aviv but overwhelmed by the demands of short-term rental management? You&apos;re not alone. Between coordinating guest communications, managing pricing strategies, handling maintenance emergencies, and ensuring consistent five-star reviews, property management can quickly become a full-time job. Or Hakerem specializes in <strong>luxury rental Tel Aviv</strong> properties, transforming your investment into a revenue-generating asset while you focus on what matters most. Our comprehensive <strong>Airbnb management Tel Aviv</strong> service delivers higher occupancy rates, premium guest experiences, and transparent monthly reporting—without the stress of day-to-day operations.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-tertiary/10 rounded-full">
              <div className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></div>
              <span className="text-tertiary font-semibold text-sm tracking-wider uppercase">
                Comprehensive Services
              </span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              Property Management
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-tertiary">
                Services
              </span>
            </h2>
            <p className="text-primary/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Full-service <strong>property management</strong> tailored to maximize your investment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
              How Our Property Management Process Works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Property Evaluation & Strategy Session',
                description: 'We conduct a comprehensive assessment of your property, discussing your financial goals and ownership preferences.'
              },
              {
                step: '2',
                title: 'Professional Setup & Launch',
                description: 'Within two weeks, we transform your listing with professional photography, optimize your presence, and implement dynamic pricing.'
              },
              {
                step: '3',
                title: 'Active Management & Guest Services',
                description: 'Your property enters our premium management program. We handle every booking, coordinate all services, and ensure excellence.'
              },
              {
                step: '4',
                title: 'Transparent Reporting & Payment',
                description: 'Receive detailed monthly reports showing bookings, revenue, expenses, and occupancy metrics. Payments are processed promptly.'
              }
            ].map((item, index) => (
              <div key={index} className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-secondary to-secondary-light rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-primary font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="font-playfair text-xl font-bold text-primary mb-3 mt-4">
                  {item.title}
                </h3>
                <p className="text-primary/80 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
              Why Property Owners Choose Or Hakerem
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                title: 'Higher Occupancy Rates',
                description: 'Our strategic pricing and multi-channel distribution achieve 85%+ average occupancy.'
              },
              {
                icon: Building2,
                title: 'Maximized Revenue',
                description: 'Property owners typically experience 20-30% revenue increases with our short-term rental management Tel Aviv service.'
              },
              {
                icon: Shield,
                title: 'Zero Owner Stress',
                description: 'From guest complaints to emergencies, we handle everything so you can enjoy passive income.'
              },
              {
                icon: Star,
                title: 'Premium Experiences',
                description: 'Happy guests leave five-star reviews, rebook for future visits, and recommend your property.'
              },
              {
                icon: CheckCircle,
                title: 'Property Protection',
                description: 'Regular inspections, preventive maintenance, and guest screening protocols protect your investment.'
              },
              {
                icon: Users,
                title: 'Local Expertise',
                description: 'Located in Kerem HaTeimanim, we understand what makes properties succeed in Tel Aviv.'
              },
              {
                icon: Clock,
                title: 'Transparent Communication',
                description: 'Access your owner portal anytime to view bookings, revenue, and property status.'
              },
              {
                icon: Building2,
                title: 'Proven Track Record',
                description: 'Years of experience managing premium Tel Aviv properties with consistent results.'
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-cream rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-light rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-primary/80 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
              Property Management Frequently Asked Questions
            </h2>
            <p className="text-primary/70 text-lg max-w-2xl mx-auto">
              Everything you need to know about our <strong>Airbnb management Tel Aviv</strong> services
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-gradient-to-br from-primary via-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-5 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-5 w-32 h-32 bg-tertiary/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              Partner With Or Hakerem Today
            </h2>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Transform your Tel Aviv property into a thriving short-term rental with Israel&apos;s premier property management service. Whether you own a luxury apartment in Kerem HaTeimanim or an investment property elsewhere in Tel Aviv, Or Hakerem delivers the expertise, systems, and dedication that maximize your returns while eliminating the stress of self-management.
            </p>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Our proven approach to <strong>Airbnb management Tel Aviv</strong> property owners trust combines local market knowledge, hospitality excellence, and data-driven revenue optimization. You&apos;ve invested in Tel Aviv real estate—now invest in professional management that protects your property and grows your income.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      required
                      className="w-full h-12 px-4 bg-white/10 backdrop-blur-sm border border-white/20 focus:border-secondary focus:ring-1 focus:ring-secondary/20 rounded-lg transition-all duration-300 outline-none text-white placeholder-white/60"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      required
                      className="w-full h-12 px-4 bg-white/10 backdrop-blur-sm border border-white/20 focus:border-secondary focus:ring-1 focus:ring-secondary/20 rounded-lg transition-all duration-300 outline-none text-white placeholder-white/60"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                    Tell Us About Your Property
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Share details about your property location, type, and your property management goals..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 focus:border-secondary focus:ring-1 focus:ring-secondary/20 rounded-lg transition-all duration-300 outline-none resize-none text-white placeholder-white/60"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-4 rounded-full font-semibold text-lg hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    <span>{isSubmitting ? 'Sending...' : 'Schedule Free Consultation'}</span>
                  </button>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    <span>Contact Us</span>
                  </Link>
                </div>

                <p className="text-white/70 text-sm text-center">
                  Ready to maximize your property&apos;s potential? We&apos;ll respond within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

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
  );
}
