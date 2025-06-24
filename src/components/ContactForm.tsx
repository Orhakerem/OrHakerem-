'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Send, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendContactEmail } from '@/actions/contact';

interface ContactFormProps {
  className?: string;
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
}

export default function ContactForm({ 
  className = '', 
  title = 'Get in Touch',
  subtitle = 'Have questions? We\'re here to help make your stay exceptional',
  showTitle = true 
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('email', formData.email);
      formDataObj.append('message', formData.message);

      const result = await sendContactEmail(formDataObj);
      
      if (result.success) {
        toast.success(result.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
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
        <div className="group relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 transition-all duration-500 hover:bg-white/20 hover:shadow-2xl border border-white/20">
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
                  Your Name
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
                    className="w-full h-12 pl-10 pr-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-secondary/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20 rounded-xl transition-all duration-300 outline-none text-base text-white placeholder-white/60 group-hover/input:bg-white/20"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/10 to-tertiary/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              <div className="group/input">
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-white/90 mb-2 group-hover/input:text-secondary transition-colors duration-300"
                >
                  Email Address
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
                    className="w-full h-12 pl-10 pr-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-secondary/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20 rounded-xl transition-all duration-300 outline-none text-base text-white placeholder-white/60 group-hover/input:bg-white/20"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/10 to-tertiary/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Message Field */}
            <div className="group/input">
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-white/90 mb-2 group-hover/input:text-secondary transition-colors duration-300"
              >
                Your Message
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-white/60 group-hover/input:text-secondary transition-colors duration-300" />
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message here..."
                  rows={4}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-secondary/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20 rounded-xl transition-all duration-300 outline-none resize-none text-base text-white placeholder-white/60 group-hover/input:bg-white/20"
                ></textarea>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/10 to-tertiary/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <div className="inline-block relative group/button">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-tertiary rounded-full blur-lg opacity-50 group-hover/button:opacity-75 transition-opacity duration-300"></div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-3 rounded-full font-semibold text-lg hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
              <p className="text-white/70 text-sm mt-4 font-medium">
                We&apos;ll get back to you within 24 hours
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