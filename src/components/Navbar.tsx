'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building, Calendar, Sparkles, Menu, X, Users, Mail } from 'lucide-react';
import Image from 'next/image';

function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      {/* Desktop Navbar - Rounded corners */}
      <nav
        className="navbar-rounded hidden md:block"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container-rounded">
          {/* Logo Section - Left positioned */}
          <div className="logo-section-rounded">
            <Link href="/" aria-label="Or Hakerem - Home" className="flex items-center">
              <div className="relative w-[60px] h-[60px] mr-4">
                <Image
                  src="/orhakerem_logo_original.jpg"
                  alt="Or Hakerem Logo"
                  fill
                  className="object-contain rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                  priority
                />
              </div>
              <span className="logo-text-rounded">
                Or Hakerem
              </span>
            </Link>
          </div>

          {/* Navigation Items - Center */}
          <div className="nav-items-rounded">
            <Link
              href="/"
              className={`nav-item-rounded ${isActive('/') ? 'active' : ''}`}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              <Home className="w-5 h-5 mr-2" aria-hidden="true" />
              <span>Home</span>
            </Link>

            <Link
              href="/properties"
              className={`nav-item-rounded ${isActive('/properties') ? 'active' : ''}`}
              aria-current={isActive('/properties') ? 'page' : undefined}
            >
              <Building className="w-5 h-5 mr-2" aria-hidden="true" />
              <span>Properties</span>
            </Link>

            <Link
              href="/concierge-services"
              className={`nav-item-rounded ${isActive('/concierge-services') ? 'active' : ''}`}
              aria-current={isActive('/concierge-services') ? 'page' : undefined}
            >
              <Sparkles className="w-5 h-5 mr-2" aria-hidden="true" />
              <span>Services</span>
            </Link>

            <Link
              href="/events"
              className={`nav-item-rounded ${isActive('/events') ? 'active' : ''}`}
              aria-current={isActive('/events') ? 'page' : undefined}
            >
              <Users className="w-5 h-5 mr-2" aria-hidden="true" />
              <span>Events</span>
            </Link>

            <Link
              href="/contact"
              className={`nav-item-rounded ${isActive('/contact') ? 'active' : ''}`}
              aria-current={isActive('/contact') ? 'page' : undefined}
            >
              <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
              <span>Contact</span>
            </Link>
          </div>

          {/* Empty space for balance - no language selector */}
          <div className="flex-shrink-0 w-[120px]"></div>
        </div>
      </nav>

      {/* Mobile Navbar - Rounded corners */}
      <nav
        className="navbar-rounded md:hidden"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container-rounded">
          <div className="logo-section-rounded">
            <Link href="/" aria-label="Or Hakerem - Home" className="flex items-center" onClick={closeMobileMenu}>
              <div className="relative w-[50px] h-[50px] mr-3">
                <Image
                  src="/orhakerem_logo_original.jpg"
                  alt="Or Hakerem Logo"
                  fill
                  className="object-contain rounded-xl shadow-lg"
                  priority
                />
              </div>
              <span className="logo-text-rounded mobile">
                Or Hakerem
              </span>
            </Link>
          </div>
          
          <button
            onClick={toggleMobileMenu}
            className="mobile-menu-button-rounded"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {isMobileMenuOpen && (
            <div className="mobile-menu-rounded">
              <div className="mobile-menu-items-rounded">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-rounded ${isActive('/') ? 'active' : ''}`}
                  aria-current={isActive('/') ? 'page' : undefined}
                >
                  <Home className="w-5 h-5 mr-3" aria-hidden="true" />
                  <span>Home</span>
                </Link>
                
                <Link
                  href="/properties"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-rounded ${isActive('/properties') ? 'active' : ''}`}
                  aria-current={isActive('/properties') ? 'page' : undefined}
                >
                  <Building className="w-5 h-5 mr-3" aria-hidden="true" />
                  <span>Properties</span>
                </Link>
                
                <Link
                  href="/concierge-services"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-rounded ${isActive('/concierge-services') ? 'active' : ''}`}
                  aria-current={isActive('/concierge-services') ? 'page' : undefined}
                >
                  <Sparkles className="w-5 h-5 mr-3" aria-hidden="true" />
                  <span>Services</span>
                </Link>
                
                <Link
                  href="/events"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-rounded ${isActive('/events') ? 'active' : ''}`}
                  aria-current={isActive('/events') ? 'page' : undefined}
                >
                  <Users className="w-5 h-5 mr-3" aria-hidden="true" />
                  <span>Events</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-rounded ${isActive('/contact') ? 'active' : ''}`}
                  aria-current={isActive('/contact') ? 'page' : undefined}
                >
                  <Mail className="w-5 h-5 mr-3" aria-hidden="true" />
                  <span>Contact</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay-rounded"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}

export default Navbar;