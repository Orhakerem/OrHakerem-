'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Send, User, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendContactEmail } from '@/actions/contact';

interface ContactFormProps {
  className?: string;
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
  variant?: 'default' | 'compact' | 'minimal';
}

interface FormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm({ 
  className = '', 
  title = 'Get in Touch',
  subtitle = 'Have questions? We\'re here to help make your stay exceptional',
  showTitle = true,
  variant = 'default'
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name.trim());
      formDataObj.append('email', formData.email.trim());
      formDataObj.append('message', formData.message.trim());

      const result = await sendContactEmail(formDataObj);
      
      if (result.success) {
        toast.success(result.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
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

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'p-4 md:p-6';
      case 'minimal':
        return 'p-3 md:p-4';
      default:
        return 'p-6 md:p-8';
    }
  };

  const getInputClasses = (fieldName: keyof FormErrors) => {
    const baseClasses = "w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 outline-none text-base text-white placeholder-white/60";
    const errorClasses = errors[fieldName] ? "border-red-400 focus:border-red-500" : "border-white/20 hover:border-secondary/50 focus:border-secondary";
    const focusClasses = "focus:ring-2 focus:ring-secondary/20";
    
    return `${baseClasses} ${errorClasses} ${focusClasses}`;
  };

  return (
    <div className={`w-full ${className}`}>
      {showTitle && (
        <div className="text-center mb-8">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <div className={`group relative bg-white/10 backdrop-blur-sm rounded-3xl transition-all duration-500 hover:bg-white/20 hover:shadow-2xl border border-white/20 ${getVariantClasses()}`}>
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-tertiary/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group/input">
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-white/90 mb-2 group-hover/input:text-secondary transition-colors duration-300"
                >
                  Your Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 group-hover/input:text-secondary transition-colors duration-300" />
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`${getInputClasses('name')} pl-10 pr-4 group-hover/input:bg-white/20`}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/10 to-tertiary/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-300" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="group/input">
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-white/90 mb-2 group-hover/input:text-secondary transition-colors duration-300"
                >
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 group-hover/input:text-secondary transition-colors duration-300" />
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`${getInputClasses('email')} pl-10 pr-4 group-hover/input:bg-white/20`}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/10 to-tertiary/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-300" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Phone Field (Optional) */}
            <div className="group/input">
              <label
                htmlFor="contact-phone"
                className="block text-sm font-medium text-white/90 mb-2 group-hover/input:text-secondary transition-colors duration-300"
              >
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 group-hover/input:text-secondary transition-colors duration-300" />
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={`${getInputClasses('phone')} pl-10 pr-4 group-hover/input:bg-white/20`}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/10 to-tertiary/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-300" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="group/input">
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-white/90 mb-2 group-hover/input:text-secondary transition-colors duration-300"
              >
                Your Message *
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-white/60 group-hover/input:text-secondary transition-colors duration-300" />
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message here..."
                  rows={variant === 'compact' ? 3 : 4}
                  required
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${getInputClasses('message')} pl-10 pr-4 py-3 resize-none group-hover/input:bg-white/20`}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/10 to-tertiary/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.message && (
                <p id="message-error" className="mt-1 text-sm text-red-300" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <div className="inline-block relative group/button">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-tertiary rounded-full blur-lg opacity-50 group-hover/button:opacity-75 transition-opacity duration-300"></div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-3 rounded-full font-semibold text-lg hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 focus:ring-offset-transparent"
                  aria-describedby="submit-status"
                >
                  <span className="mr-2">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                    <Send className="w-3 h-3 text-primary" />
                  </div>
                </button>
              </div>
              
              {/* Subtitle under button */}
              <p id="submit-status" className="text-white/70 text-sm mt-4 font-medium">
                {isSubmitting ? 'Sending your message...' : 'We\'ll get back to you within 24 hours'}
              </p>
            </div>
          </form>

          {/* Decorative corner elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-secondary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-tertiary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  );
}