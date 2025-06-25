'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building, Calendar, Sparkles, Menu, X, Users, Mail } from 'lucide-react';
import Image from 'next/image';

function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 20);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`hidden md:block fixed top-0 left-0 right-0 z-[1000] transition-none h-[70px] overflow-hidden ${
          isScrolled
            ? 'bg-white shadow-lg'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
        role="navigation"
        aria-label="Main navigation"
        style={{ position: 'sticky', top: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo Section */}
            <div className="shrink-0 flex items-center">
              <Link href="/" aria-label="Or Hakerem - Home" className="flex items-center">
                <div className="relative w-[50px] h-[50px] mr-3">
                  <Image
                    src="/orhakerem_logo_original.jpg"
                    alt="Or Hakerem Logo"
                    fill
                    className="object-contain"
                    style={{ objectFit: 'contain', maxHeight: '50px' }}
                    priority
                  />
                </div>
                <span className="text-primary font-playfair font-bold text-xl">
                  Or Hakerem
                </span>
              </Link>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-1">
              <Link
                href="/"
                className={`nav-item flex items-center transition-none max-h-[70px] ${
                  isActive('/')
                    ? 'bg-secondary text-primary'
                    : 'text-primary'
                }`}
                style={{ padding: '23px 15px' }}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className="text-sm font-medium">Home</span>
              </Link>

              <Link
                href="/properties"
                className={`nav-item flex items-center transition-none max-h-[70px] ${
                  isActive('/properties')
                    ? 'bg-secondary text-primary'
                    : 'text-primary'
                }`}
                style={{ padding: '23px 15px' }}
                aria-current={isActive('/properties') ? 'page' : undefined}
              >
                <Building className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className="text-sm font-medium">Accommodations</span>
              </Link>

              <Link
                href="/concierge-services"
                className={`nav-item flex items-center transition-none max-h-[70px] ${
                  isActive('/concierge-services')
                    ? 'bg-secondary text-primary'
                    : 'text-primary'
                }`}
                style={{ padding: '23px 15px' }}
                aria-current={isActive('/concierge-services') ? 'page' : undefined}
              >
                <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className="text-sm font-medium">Services</span>
              </Link>

              <Link
                href="/properties"
                className={`nav-item flex items-center transition-none max-h-[70px] ${
                  pathname.includes('/gallery')
                    ? 'bg-secondary text-primary'
                    : 'text-primary'
                }`}
                style={{ padding: '23px 15px' }}
                aria-current={pathname.includes('/gallery') ? 'page' : undefined}
              >
                <Building className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className="text-sm font-medium">Gallery</span>
              </Link>

              <Link
                href="/events"
                className={`nav-item flex items-center transition-none max-h-[70px] ${
                  isActive('/events')
                    ? 'bg-secondary text-primary'
                    : 'text-primary'
                }`}
                style={{ padding: '23px 15px' }}
                aria-current={isActive('/events') ? 'page' : undefined}
              >
                <Users className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className="text-sm font-medium">About</span>
              </Link>

              <Link
                href="/contact"
                className={`nav-item flex items-center transition-none max-h-[70px] ${
                  isActive('/contact')
                    ? 'bg-secondary text-primary'
                    : 'text-primary'
                }`}
                style={{ padding: '23px 15px' }}
                aria-current={isActive('/contact') ? 'page' : undefined}
              >
                <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className="text-sm font-medium">Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav
        className={`md:hidden fixed top-0 left-0 right-0 z-[1000] transition-none h-[70px] overflow-hidden ${
          isScrolled
            ? 'bg-white shadow-lg'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
        role="navigation"
        aria-label="Main navigation"
        style={{ position: 'sticky', top: 0 }}
      >
        <div className="px-4 h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-full">
            <div className="shrink-0 flex items-center">
              <Link href="/" aria-label="Or Hakerem - Home" className="flex items-center" onClick={closeMobileMenu}>
                <div className="relative w-[40px] h-[40px] mr-2">
                  <Image
                    src="/orhakerem_logo_original.jpg"
                    alt="Or Hakerem Logo"
                    fill
                    className="object-contain"
                    style={{ objectFit: 'contain', maxHeight: '40px' }}
                    priority
                  />
                </div>
                <span className="text-primary font-playfair font-bold text-lg">
                  Or Hakerem
                </span>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-primary transition-none"
              style={{ position: 'fixed', right: '20px' }}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div 
              className="absolute left-0 right-0 bg-white border-t border-gray-200 shadow-lg"
              style={{ top: '70px' }}
            >
              <div className="flex flex-col py-2">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className={`nav-item flex items-center transition-none max-h-[70px] ${
                    isActive('/')
                      ? 'bg-secondary text-primary'
                      : 'text-primary'
                  }`}
                  style={{ padding: '15px 20px' }}
                  aria-current={isActive('/') ? 'page' : undefined}
                >
                  <Home className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span className="text-sm font-medium">Home</span>
                </Link>
                
                <Link
                  href="/properties"
                  onClick={closeMobileMenu}
                  className={`nav-item flex items-center transition-none max-h-[70px] ${
                    isActive('/properties')
                      ? 'bg-secondary text-primary'
                      : 'text-primary'
                  }`}
                  style={{ padding: '15px 20px' }}
                  aria-current={isActive('/properties') ? 'page' : undefined}
                >
                  <Building className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span className="text-sm font-medium">Accommodations</span>
                </Link>
                
                <Link
                  href="/concierge-services"
                  onClick={closeMobileMenu}
                  className={`nav-item flex items-center transition-none max-h-[70px] ${
                    isActive('/concierge-services')
                      ? 'bg-secondary text-primary'
                      : 'text-primary'
                  }`}
                  style={{ padding: '15px 20px' }}
                  aria-current={isActive('/concierge-services') ? 'page' : undefined}
                >
                  <Sparkles className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span className="text-sm font-medium">Services</span>
                </Link>

                <Link
                  href="/properties"
                  onClick={closeMobileMenu}
                  className={`nav-item flex items-center transition-none max-h-[70px] ${
                    pathname.includes('/gallery')
                      ? 'bg-secondary text-primary'
                      : 'text-primary'
                  }`}
                  style={{ padding: '15px 20px' }}
                  aria-current={pathname.includes('/gallery') ? 'page' : undefined}
                >
                  <Building className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span className="text-sm font-medium">Gallery</span>
                </Link>
                
                <Link
                  href="/events"
                  onClick={closeMobileMenu}
                  className={`nav-item flex items-center transition-none max-h-[70px] ${
                    isActive('/events')
                      ? 'bg-secondary text-primary'
                      : 'text-primary'
                  }`}
                  style={{ padding: '15px 20px' }}
                  aria-current={isActive('/events') ? 'page' : undefined}
                >
                  <Users className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span className="text-sm font-medium">About</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className={`nav-item flex items-center transition-none max-h-[70px] ${
                    isActive('/contact')
                      ? 'bg-secondary text-primary'
                      : 'text-primary'
                  }`}
                  style={{ padding: '15px 20px' }}
                  aria-current={isActive('/contact') ? 'page' : undefined}
                >
                  <Mail className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span className="text-sm font-medium">Contact</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-[999]"
          onClick={closeMobileMenu}
          style={{ top: '70px' }}
        />
      )}
    </>
  );
}

export default Navbar;