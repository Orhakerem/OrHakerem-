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
      {/* Desktop Navbar - Luxury Design */}
      <nav
        className={`hidden md:block fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-secondary/20'
            : 'bg-white/90 backdrop-blur-sm shadow-lg'
        }`}
        style={{ height: '80px' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo Section - Enhanced */}
            <div className="shrink-0 flex items-center group">
              <Link href="/" aria-label="Or Hakerem - Home" className="flex items-center">
                <div className="relative w-[60px] h-[60px] mr-4 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/orhakerem_logo_original.jpg"
                    alt="Or Hakerem Logo"
                    fill
                    className="object-contain rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
                    priority
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary/20 to-tertiary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-primary font-playfair font-bold text-2xl leading-none group-hover:text-secondary transition-colors duration-300">
                    Or Hakerem
                  </span>
                  <span className="text-primary/70 text-xs font-medium tracking-wider uppercase leading-none">
                    Luxury Properties
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation Items - Luxury Style */}
            <div className="flex items-center space-x-1">
              <Link
                href="/"
                className={`group relative flex items-center px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  isActive('/')
                    ? 'bg-gradient-to-r from-secondary to-secondary-light text-primary shadow-lg'
                    : 'text-primary hover:text-secondary hover:bg-gradient-to-r hover:from-secondary/10 hover:to-secondary-light/10'
                }`}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary/20 to-tertiary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Home className="w-4 h-4 mr-2 relative z-10 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                <span className="relative z-10">Home</span>
              </Link>

              <Link
                href="/properties"
                className={`group relative flex items-center px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  isActive('/properties')
                    ? 'bg-gradient-to-r from-secondary to-secondary-light text-primary shadow-lg'
                    : 'text-primary hover:text-secondary hover:bg-gradient-to-r hover:from-secondary/10 hover:to-secondary-light/10'
                }`}
                aria-current={isActive('/properties') ? 'page' : undefined}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary/20 to-tertiary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Building className="w-4 h-4 mr-2 relative z-10 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                <span className="relative z-10">Properties</span>
              </Link>

              <Link
                href="/concierge-services"
                className={`group relative flex items-center px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  isActive('/concierge-services')
                    ? 'bg-gradient-to-r from-secondary to-secondary-light text-primary shadow-lg'
                    : 'text-primary hover:text-secondary hover:bg-gradient-to-r hover:from-secondary/10 hover:to-secondary-light/10'
                }`}
                aria-current={isActive('/concierge-services') ? 'page' : undefined}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary/20 to-tertiary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Sparkles className="w-4 h-4 mr-2 relative z-10 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                <span className="relative z-10">Services</span>
              </Link>

              <Link
                href="/events"
                className={`group relative flex items-center px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  isActive('/events')
                    ? 'bg-gradient-to-r from-secondary to-secondary-light text-primary shadow-lg'
                    : 'text-primary hover:text-secondary hover:bg-gradient-to-r hover:from-secondary/10 hover:to-secondary-light/10'
                }`}
                aria-current={isActive('/events') ? 'page' : undefined}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary/20 to-tertiary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Users className="w-4 h-4 mr-2 relative z-10 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                <span className="relative z-10">Events</span>
              </Link>

              <Link
                href="/contact"
                className={`group relative flex items-center px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  isActive('/contact')
                    ? 'bg-gradient-to-r from-secondary to-secondary-light text-primary shadow-lg'
                    : 'text-primary hover:text-secondary hover:bg-gradient-to-r hover:from-secondary/10 hover:to-secondary-light/10'
                }`}
                aria-current={isActive('/contact') ? 'page' : undefined}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary/20 to-tertiary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Mail className="w-4 h-4 mr-2 relative z-10 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                <span className="relative z-10">Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar - Luxury Design */}
      <nav
        className={`md:hidden fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-secondary/20'
            : 'bg-white/90 backdrop-blur-sm shadow-lg'
        }`}
        style={{ height: '80px' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-4 h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-full">
            <div className="shrink-0 flex items-center group">
              <Link href="/" aria-label="Or Hakerem - Home" className="flex items-center" onClick={closeMobileMenu}>
                <div className="relative w-[50px] h-[50px] mr-3 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/orhakerem_logo_original.jpg"
                    alt="Or Hakerem Logo"
                    fill
                    className="object-contain rounded-lg shadow-md"
                    priority
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-secondary/20 to-tertiary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-primary font-playfair font-bold text-xl leading-none group-hover:text-secondary transition-colors duration-300">
                    Or Hakerem
                  </span>
                  <span className="text-primary/70 text-xs font-medium tracking-wider uppercase leading-none">
                    Luxury Properties
                  </span>
                </div>
              </Link>
            </div>
            
            {/* Mobile Menu Button - Enhanced */}
            <button
              onClick={toggleMobileMenu}
              className="fixed right-5 top-6 p-3 text-primary hover:text-secondary transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-secondary/20 hover:border-secondary/40 group"
              aria-label="Toggle mobile menu"
              style={{ zIndex: 1001 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary/10 to-tertiary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Mobile Menu - Enhanced */}
          {isMobileMenuOpen && (
            <div 
              className="absolute left-0 right-0 bg-white/95 backdrop-blur-md border-t border-secondary/20 shadow-2xl rounded-b-2xl"
              style={{ top: '80px' }}
            >
              <div className="flex flex-col py-4">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className={`group relative flex items-center px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                    isActive('/')
                      ? 'bg-gradient-to-r from-secondary/20 to-secondary-light/20 text-secondary border-r-4 border-secondary'
                      : 'text-primary hover:text-secondary hover:bg-gradient-to-r hover:from-secondary/10 hover:to-secondary-light/10'
                  }`}
                  aria-current={isActive('/') ? 'page' : undefined}
                >
                  <Home className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  <span>Home</span>
                </Link>
                
                <Link
                  href="/properties"
                  onClick={closeMobileMenu}
                  className={`group relative flex items-center px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                    isActive('/properties')
                      ? 'bg-gradient-to-r from-secondary/20 to-secondary-light/20 text-secondary border-r-4 border-secondary'
                      : 'text-primary hover:text-secondary hover:bg-gradient-to-r hover:from-secondary/10 hover:to-secondary-light/10'
                  }`}
                  aria-current={isActive('/properties') ? 'page' : undefined}
                >
                  <Building className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  <span>Properties</span>
                </Link>
                
                <Link
                  href="/concierge-services"
                  onClick={closeMobileMenu}
                  className={`group relative flex items-center px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                    isActive('/concierge-services')
                      ? 'bg-gradient-to-r from-secondary/20 to-secondary-light/20 text-secondary border-r-4 border-secondary'
                      : 'text-primary hover:text-secondary hover:bg-gradient-to-r hover:from-secondary/10 hover:to-secondary-light/10'
                  }`}
                  aria-current={isActive('/concierge-services') ? 'page' : undefined}
                >
                  <Sparkles className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  <span>Services</span>
                </Link>
                
                <Link
                  href="/events"
                  onClick={closeMobileMenu}
                  className={`group relative flex items-center px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                    isActive('/events')
                      ? 'bg-gradient-to-r from-secondary/20 to-secondary-light/20 text-secondary border-r-4 border-secondary'
                      : 'text-primary hover:text-secondary hover:bg-gradient-to-r hover:from-secondary/10 hover:to-secondary-light/10'
                  }`}
                  aria-current={isActive('/events') ? 'page' : undefined}
                >
                  <Users className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  <span>Events</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className={`group relative flex items-center px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                    isActive('/contact')
                      ? 'bg-gradient-to-r from-secondary/20 to-secondary-light/20 text-secondary border-r-4 border-secondary'
                      : 'text-primary hover:text-secondary hover:bg-gradient-to-r hover:from-secondary/10 hover:to-secondary-light/10'
                  }`}
                  aria-current={isActive('/contact') ? 'page' : undefined}
                >
                  <Mail className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  <span>Contact</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay - Enhanced */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-[999]"
          onClick={closeMobileMenu}
          style={{ top: '80px' }}
        />
      )}
    </>
  );
}

export default Navbar;