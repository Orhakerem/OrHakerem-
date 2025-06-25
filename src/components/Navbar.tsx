'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building, Calendar, Sparkles, Menu, X } from 'lucide-react';
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
        className={`hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full w-[95%] max-w-5xl ${
          isScrolled
            ? 'bg-primary shadow-lg backdrop-blur-md'
            : 'bg-primary/40 backdrop-blur-sm hover:bg-primary/60'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-6 sm:px-8">
          <div className="flex items-center justify-between h-18">
            <div className="shrink-0 flex items-center">
              <Link href="/" aria-label="Or Hakerem - Home" className="flex items-center">
                <div className="relative w-12 h-12 mr-4">
                  <Image
                    src="/orhakerem_logo_original.jpg"
                    alt="Or Hakerem Logo"
                    fill
                    className="object-contain rounded-lg"
                    priority
                  />
                </div>
                <span className="text-secondary font-playfair font-bold text-2xl">
                  Or Hakerem
                </span>
              </Link>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/"
                className={`flex items-center px-6 py-3 rounded-full text-base font-medium transition-all duration-200 ${
                  isActive('/')
                    ? 'bg-secondary text-primary shadow-sm'
                    : 'text-cream hover:bg-tertiary/30 hover:shadow-sm'
                }`}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                <Home className="w-5 h-5 mr-3" aria-hidden="true" />
                <span>Home</span>
              </Link>
              <Link
                href="/properties"
                className={`flex items-center px-6 py-3 rounded-full text-base font-medium transition-all duration-200 ${
                  isActive('/properties')
                    ? 'bg-secondary text-primary shadow-sm'
                    : 'text-cream hover:bg-tertiary/30 hover:shadow-sm'
                }`}
                aria-current={isActive('/properties') ? 'page' : undefined}
              >
                <Building className="w-5 h-5 mr-3" aria-hidden="true" />
                <span>Properties</span>
              </Link>
              <Link
                href="/concierge-services"
                className={`flex items-center px-6 py-3 rounded-full text-base font-medium transition-all duration-200 ${
                  isActive('/concierge-services')
                    ? 'bg-secondary text-primary shadow-sm'
                    : 'text-cream hover:bg-tertiary/30 hover:shadow-sm'
                }`}
                aria-current={isActive('/concierge-services') ? 'page' : undefined}
              >
                <Sparkles className="w-5 h-5 mr-3" aria-hidden="true" />
                <span>Services</span>
              </Link>
              <Link
                href="/events"
                className={`flex items-center px-6 py-3 rounded-full text-base font-medium transition-all duration-200 ${
                  isActive('/events')
                    ? 'bg-secondary text-primary shadow-sm'
                    : 'text-cream hover:bg-tertiary/30 hover:shadow-sm'
                }`}
                aria-current={isActive('/events') ? 'page' : undefined}
              >
                <Calendar className="w-5 h-5 mr-3" aria-hidden="true" />
                <span>Events</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar - Fixed for landscape orientation */}
      <nav
        className={`md:hidden fixed top-2 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-2xl w-[98%] max-w-lg ${
          isScrolled
            ? 'bg-primary shadow-lg backdrop-blur-md'
            : 'bg-primary/40 backdrop-blur-sm'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-3">
          {/* Mobile Header - Reduced height for landscape */}
          <div className="flex items-center justify-between h-12">
            <div className="shrink-0 flex items-center">
              <Link href="/" aria-label="Or Hakerem - Home" className="flex items-center" onClick={closeMobileMenu}>
                <div className="relative w-8 h-8 mr-2">
                  <Image
                    src="/orhakerem_logo_original.jpg"
                    alt="Or Hakerem Logo"
                    fill
                    className="object-contain rounded-lg"
                    priority
                  />
                </div>
                <span className="text-secondary font-playfair font-bold text-lg">
                  Or Hakerem
                </span>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full text-cream hover:bg-tertiary/30 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu - Horizontal layout for landscape, vertical for portrait */}
          {isMobileMenuOpen && (
            <div className="pb-3 border-t border-white/20 mt-1">
              {/* Landscape: Horizontal layout */}
              <div className="landscape:hidden flex flex-col space-y-1 pt-3">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive('/')
                      ? 'bg-secondary text-primary shadow-sm'
                      : 'text-cream hover:bg-tertiary/30 hover:shadow-sm'
                  }`}
                  aria-current={isActive('/') ? 'page' : undefined}
                >
                  <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span>Home</span>
                </Link>
                
                <Link
                  href="/properties"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive('/properties')
                      ? 'bg-secondary text-primary shadow-sm'
                      : 'text-cream hover:bg-tertiary/30 hover:shadow-sm'
                  }`}
                  aria-current={isActive('/properties') ? 'page' : undefined}
                >
                  <Building className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span>Properties</span>
                </Link>
                
                <Link
                  href="/concierge-services"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive('/concierge-services')
                      ? 'bg-secondary text-primary shadow-sm'
                      : 'text-cream hover:bg-tertiary/30 hover:shadow-sm'
                  }`}
                  aria-current={isActive('/concierge-services') ? 'page' : undefined}
                >
                  <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span>Services</span>
                </Link>
                
                <Link
                  href="/events"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive('/events')
                      ? 'bg-secondary text-primary shadow-sm'
                      : 'text-cream hover:bg-tertiary/30 hover:shadow-sm'
                  }`}
                  aria-current={isActive('/events') ? 'page' : undefined}
                >
                  <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span>Events</span>
                </Link>
              </div>

              {/* Portrait: Horizontal grid layout for landscape mode */}
              <div className="portrait:hidden grid grid-cols-4 gap-1 pt-2">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className={`flex flex-col items-center px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive('/')
                      ? 'bg-secondary text-primary shadow-sm'
                      : 'text-cream hover:bg-tertiary/30 hover:shadow-sm'
                  }`}
                  aria-current={isActive('/') ? 'page' : undefined}
                >
                  <Home className="w-4 h-4 mb-1" aria-hidden="true" />
                  <span>Home</span>
                </Link>
                
                <Link
                  href="/properties"
                  onClick={closeMobileMenu}
                  className={`flex flex-col items-center px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive('/properties')
                      ? 'bg-secondary text-primary shadow-sm'
                      : 'text-cream hover:bg-tertiary/30 hover:shadow-sm'
                  }`}
                  aria-current={isActive('/properties') ? 'page' : undefined}
                >
                  <Building className="w-4 h-4 mb-1" aria-hidden="true" />
                  <span>Properties</span>
                </Link>
                
                <Link
                  href="/concierge-services"
                  onClick={closeMobileMenu}
                  className={`flex flex-col items-center px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive('/concierge-services')
                      ? 'bg-secondary text-primary shadow-sm'
                      : 'text-cream hover:bg-tertiary/30 hover:shadow-sm'
                  }`}
                  aria-current={isActive('/concierge-services') ? 'page' : undefined}
                >
                  <Sparkles className="w-4 h-4 mb-1" aria-hidden="true" />
                  <span>Services</span>
                </Link>
                
                <Link
                  href="/events"
                  onClick={closeMobileMenu}
                  className={`flex flex-col items-center px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive('/events')
                      ? 'bg-secondary text-primary shadow-sm'
                      : 'text-cream hover:bg-tertiary/30 hover:shadow-sm'
                  }`}
                  aria-current={isActive('/events') ? 'page' : undefined}
                >
                  <Calendar className="w-4 h-4 mb-1" aria-hidden="true" />
                  <span>Events</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-40"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}

export default Navbar;