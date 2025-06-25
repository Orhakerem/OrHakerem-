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
      {/* Desktop Navbar - Fixed height 80px, bigger than before */}
      <nav
        className={`hidden md:block fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
        style={{ height: '80px' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo Section */}
            <div className="shrink-0 flex items-center">
              <Link href="/" aria-label="Or Hakerem - Home" className="flex items-center">
                <div className="relative w-[60px] h-[60px] mr-4">
                  <Image
                    src="/orhakerem_logo_original.jpg"
                    alt="Or Hakerem Logo"
                    fill
                    className="object-contain rounded-lg"
                    priority
                  />
                </div>
                <span className="text-primary font-playfair font-bold text-2xl">
                  Or Hakerem
                </span>
              </Link>
            </div>

            {/* Navigation Items - Properly spaced, not taking full height */}
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive('/')
                    ? 'bg-secondary text-primary'
                    : 'text-primary hover:text-secondary hover:bg-secondary/10'
                }`}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Home</span>
              </Link>

              <Link
                href="/properties"
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive('/properties')
                    ? 'bg-secondary text-primary'
                    : 'text-primary hover:text-secondary hover:bg-secondary/10'
                }`}
                aria-current={isActive('/properties') ? 'page' : undefined}
              >
                <Building className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Accommodations</span>
              </Link>

              <Link
                href="/concierge-services"
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive('/concierge-services')
                    ? 'bg-secondary text-primary'
                    : 'text-primary hover:text-secondary hover:bg-secondary/10'
                }`}
                aria-current={isActive('/concierge-services') ? 'page' : undefined}
              >
                <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Services</span>
              </Link>

              <Link
                href="/properties"
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  pathname.includes('/gallery')
                    ? 'bg-secondary text-primary'
                    : 'text-primary hover:text-secondary hover:bg-secondary/10'
                }`}
                aria-current={pathname.includes('/gallery') ? 'page' : undefined}
              >
                <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Gallery</span>
              </Link>

              <Link
                href="/events"
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive('/events')
                    ? 'bg-secondary text-primary'
                    : 'text-primary hover:text-secondary hover:bg-secondary/10'
                }`}
                aria-current={isActive('/events') ? 'page' : undefined}
              >
                <Users className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>About</span>
              </Link>

              <Link
                href="/contact"
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive('/contact')
                    ? 'bg-secondary text-primary'
                    : 'text-primary hover:text-secondary hover:bg-secondary/10'
                }`}
                aria-current={isActive('/contact') ? 'page' : undefined}
              >
                <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar - Fixed height 80px */}
      <nav
        className={`md:hidden fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
        style={{ height: '80px' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-4 h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-full">
            <div className="shrink-0 flex items-center">
              <Link href="/" aria-label="Or Hakerem - Home" className="flex items-center" onClick={closeMobileMenu}>
                <div className="relative w-[50px] h-[50px] mr-3">
                  <Image
                    src="/orhakerem_logo_original.jpg"
                    alt="Or Hakerem Logo"
                    fill
                    className="object-contain rounded-lg"
                    priority
                  />
                </div>
                <span className="text-primary font-playfair font-bold text-xl">
                  Or Hakerem
                </span>
              </Link>
            </div>
            
            {/* Mobile Menu Button - Fixed position */}
            <button
              onClick={toggleMobileMenu}
              className="fixed right-5 top-6 p-3 text-primary hover:text-secondary transition-colors duration-200 bg-white/90 rounded-lg shadow-sm"
              aria-label="Toggle mobile menu"
              style={{ zIndex: 1001 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu - Opens below navbar */}
          {isMobileMenuOpen && (
            <div 
              className="absolute left-0 right-0 bg-white border-t border-gray-200 shadow-lg rounded-b-lg"
              style={{ top: '80px' }}
            >
              <div className="flex flex-col py-2">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive('/')
                      ? 'bg-secondary text-primary'
                      : 'text-primary hover:text-secondary hover:bg-secondary/10'
                  }`}
                  aria-current={isActive('/') ? 'page' : undefined}
                >
                  <Home className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Home</span>
                </Link>
                
                <Link
                  href="/properties"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive('/properties')
                      ? 'bg-secondary text-primary'
                      : 'text-primary hover:text-secondary hover:bg-secondary/10'
                  }`}
                  aria-current={isActive('/properties') ? 'page' : undefined}
                >
                  <Building className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Accommodations</span>
                </Link>
                
                <Link
                  href="/concierge-services"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive('/concierge-services')
                      ? 'bg-secondary text-primary'
                      : 'text-primary hover:text-secondary hover:bg-secondary/10'
                  }`}
                  aria-current={isActive('/concierge-services') ? 'page' : undefined}
                >
                  <Sparkles className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Services</span>
                </Link>

                <Link
                  href="/properties"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    pathname.includes('/gallery')
                      ? 'bg-secondary text-primary'
                      : 'text-primary hover:text-secondary hover:bg-secondary/10'
                  }`}
                  aria-current={pathname.includes('/gallery') ? 'page' : undefined}
                >
                  <Calendar className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Gallery</span>
                </Link>
                
                <Link
                  href="/events"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive('/events')
                      ? 'bg-secondary text-primary'
                      : 'text-primary hover:text-secondary hover:bg-secondary/10'
                  }`}
                  aria-current={isActive('/events') ? 'page' : undefined}
                >
                  <Users className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>About</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive('/contact')
                      ? 'bg-secondary text-primary'
                      : 'text-primary hover:text-secondary hover:bg-secondary/10'
                  }`}
                  aria-current={isActive('/contact') ? 'page' : undefined}
                >
                  <Mail className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Contact</span>
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
          style={{ top: '80px' }}
        />
      )}
    </>
  );
}

export default Navbar;