'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building, Menu, X, Users, Key } from 'lucide-react';

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
      {/* Desktop Navbar - Design épuré et amélioré */}
      <nav
        className="navbar-floating hidden md:block"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container-floating">
          {/* Logo Section - Centré verticalement */}
          <div className="logo-section-floating">
            <Link href="/" aria-label="Or Hakerem - Home" className="flex items-center">
              <span className="logo-text-floating">
                Or Hakerem
              </span>
            </Link>
          </div>

          {/* Navigation Items - Centrés et épurés */}
          <div className="nav-items-floating">
            <Link
              href="/"
              className={`nav-item-floating ${isActive('/') ? 'active' : ''}`}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              <Home className="w-4 h-4 mr-2" aria-hidden="true" />
              <span>Home</span>
            </Link>

            <Link
              href="/properties"
              className={`nav-item-floating ${isActive('/properties') ? 'active' : ''}`}
              aria-current={isActive('/properties') ? 'page' : undefined}
            >
              <Building className="w-4 h-4 mr-2" aria-hidden="true" />
              <span>Properties</span>
            </Link>

            <Link
              href="/concierge-services"
              className={`nav-item-floating ${isActive('/concierge-services') ? 'active' : ''}`}
              aria-current={isActive('/concierge-services') ? 'page' : undefined}
            >
              <span>Services</span>
            </Link>

            <Link
              href="/events"
              className={`nav-item-floating ${isActive('/events') ? 'active' : ''}`}
              aria-current={isActive('/events') ? 'page' : undefined}
            >
              <Users className="w-4 h-4 mr-2" aria-hidden="true" />
              <span>Events</span>
            </Link>

            <Link
              href="/short-term-rentals"
              className={`nav-item-floating ${isActive('/short-term-rentals') ? 'active' : ''}`}
              aria-current={isActive('/short-term-rentals') ? 'page' : undefined}
            >
              <Key className="w-4 h-4 mr-2" aria-hidden="true" />
              <span>Rentals</span>
            </Link>
          </div>

          {/* Espace pour équilibrer la mise en page */}
          <div className="flex-shrink-0 w-[120px]"></div>
        </div>
      </nav>

      {/* Mobile Navbar - Design épuré */}
      <nav
        className="navbar-floating md:hidden"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container-floating">
          <div className="logo-section-floating">
            <Link href="/" aria-label="Or Hakerem - Home" className="flex items-center" onClick={closeMobileMenu}>
              <span className="logo-text-floating mobile">
                Or Hakerem
              </span>
            </Link>
          </div>
          
          <button
            onClick={toggleMobileMenu}
            className="mobile-menu-button-floating"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {isMobileMenuOpen && (
            <div className="mobile-menu-floating">
              <div className="mobile-menu-items-floating">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-floating ${isActive('/') ? 'active' : ''}`}
                  aria-current={isActive('/') ? 'page' : undefined}
                >
                  <Home className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Home</span>
                </Link>
                
                <Link
                  href="/properties"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-floating ${isActive('/properties') ? 'active' : ''}`}
                  aria-current={isActive('/properties') ? 'page' : undefined}
                >
                  <Building className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Properties</span>
                </Link>
                
                <Link
                  href="/concierge-services"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-floating ${isActive('/concierge-services') ? 'active' : ''}`}
                  aria-current={isActive('/concierge-services') ? 'page' : undefined}
                >
                  <span>Services</span>
                </Link>
                
                <Link
                  href="/events"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-floating ${isActive('/events') ? 'active' : ''}`}
                  aria-current={isActive('/events') ? 'page' : undefined}
                >
                  <Users className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Events</span>
                </Link>

                <Link
                  href="/short-term-rentals"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-floating ${isActive('/short-term-rentals') ? 'active' : ''}`}
                  aria-current={isActive('/short-term-rentals') ? 'page' : undefined}
                >
                  <Key className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Short Term Rentals</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay-floating"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}

export default Navbar;