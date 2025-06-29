'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building, Calendar, Sparkles, Menu, X, Users, Mail, Globe } from 'lucide-react';
import Image from 'next/image';

function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle scroll behavior for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar - Consistent across all pages */}
      <nav
        className="navbar-primary hidden md:block"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container-primary">
          {/* Logo Section - Left positioned */}
          <div className="logo-section">
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
              <span className="logo-text-primary">
                Or Hakerem
              </span>
            </Link>
          </div>

          {/* Navigation Items - Center */}
          <div className="nav-items-primary">
            <Link
              href="/"
              className={`nav-item-primary ${isActive('/') ? 'active' : ''}`}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              <Home className="w-4 h-4 mr-2" aria-hidden="true" />
              Home
            </Link>

            <Link
              href="/properties"
              className={`nav-item-primary ${isActive('/properties') ? 'active' : ''}`}
              aria-current={isActive('/properties') ? 'page' : undefined}
            >
              <Building className="w-4 h-4 mr-2" aria-hidden="true" />
              Properties
            </Link>

            <Link
              href="/concierge-services"
              className={`nav-item-primary ${isActive('/concierge-services') ? 'active' : ''}`}
              aria-current={isActive('/concierge-services') ? 'page' : undefined}
            >
              <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
              Services
            </Link>

            <Link
              href="/events"
              className={`nav-item-primary ${isActive('/events') ? 'active' : ''}`}
              aria-current={isActive('/events') ? 'page' : undefined}
            >
              <Users className="w-4 h-4 mr-2" aria-hidden="true" />
              Events
            </Link>

            <Link
              href="/contact"
              className={`nav-item-primary ${isActive('/contact') ? 'active' : ''}`}
              aria-current={isActive('/contact') ? 'page' : undefined}
            >
              <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
              Contact
            </Link>
          </div>

          {/* Language Selector - Right positioned */}
          <div className="language-selector-primary">
            <button className="language-button-primary">
              <Globe className="w-4 h-4 mr-2" />
              <select className="language-select-primary">
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="he">HE</option>
              </select>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar - Consistent across all pages */}
      <nav
        className="navbar-primary md:hidden"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container-primary">
          <div className="logo-section">
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
              <span className="logo-text-primary mobile">
                Or Hakerem
              </span>
            </Link>
          </div>
          
          <button
            onClick={toggleMobileMenu}
            className="mobile-menu-button-primary"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {isMobileMenuOpen && (
            <div className="mobile-menu-primary">
              <div className="mobile-menu-items-primary">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-primary ${isActive('/') ? 'active' : ''}`}
                  aria-current={isActive('/') ? 'page' : undefined}
                >
                  <Home className="w-4 h-4 mr-3" aria-hidden="true" />
                  Home
                </Link>
                
                <Link
                  href="/properties"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-primary ${isActive('/properties') ? 'active' : ''}`}
                  aria-current={isActive('/properties') ? 'page' : undefined}
                >
                  <Building className="w-4 h-4 mr-3" aria-hidden="true" />
                  Properties
                </Link>
                
                <Link
                  href="/concierge-services"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-primary ${isActive('/concierge-services') ? 'active' : ''}`}
                  aria-current={isActive('/concierge-services') ? 'page' : undefined}
                >
                  <Sparkles className="w-4 h-4 mr-3" aria-hidden="true" />
                  Services
                </Link>
                
                <Link
                  href="/events"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-primary ${isActive('/events') ? 'active' : ''}`}
                  aria-current={isActive('/events') ? 'page' : undefined}
                >
                  <Users className="w-4 h-4 mr-3" aria-hidden="true" />
                  Events
                </Link>

                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-primary ${isActive('/contact') ? 'active' : ''}`}
                  aria-current={isActive('/contact') ? 'page' : undefined}
                >
                  <Mail className="w-4 h-4 mr-3" aria-hidden="true" />
                  Contact
                </Link>

                {/* Mobile Language Selector */}
                <div className="mobile-language-selector-primary">
                  <button className="mobile-language-button-primary">
                    <Globe className="w-4 h-4 mr-2" />
                    Language
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay-primary"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}

export default Navbar;