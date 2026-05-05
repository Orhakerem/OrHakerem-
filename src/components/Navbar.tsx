'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const propertiesHref = '/properties';

  const isActive = (path: string) => {
    return pathname === path;
  };

  const isPropertiesActive = pathname === '/properties' || pathname.startsWith('/properties/');

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
            <Link href="/" aria-label="Or Hakerem - Home" className="nav-brand-floating">
              <Image
                src="/orhakerem_logo_original.jpg"
                alt="Or Hakerem logo"
                width={30}
                height={30}
                className="nav-logo-floating"
                sizes="64px"
              />
              <span className="logo-text-floating">
                Or Hakerem
              </span>
            </Link>
          </div>

          {/* Navigation Items - Centrés et épurés */}
          <div className="nav-items-floating">
            <Link
              href={propertiesHref}
              className={`nav-item-floating ${isPropertiesActive ? 'active' : ''}`}
              aria-current={isPropertiesActive ? 'page' : undefined}
            >
              
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
              <span>Events</span>
            </Link>

            <Link
              href="/about"
              className={`nav-item-floating ${isActive('/about') ? 'active' : ''}`}
              aria-current={isActive('/about') ? 'page' : undefined}
            >
              <span>About</span>
            </Link>

            <Link
              href="/faq"
              className={`nav-item-floating ${isActive('/faq') ? 'active' : ''}`}
              aria-current={isActive('/faq') ? 'page' : undefined}
            >
              <span>FAQ</span>
            </Link>
          </div>

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
            <Link href="/" aria-label="Or Hakerem - Home" className="nav-brand-floating" onClick={closeMobileMenu}>
              <Image
                src="/orhakerem_logo_original.jpg"
                alt="Or Hakerem logo"
                width={24}
                height={24}
                className="nav-logo-floating"
                sizes="45px"
              />
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
                  href={propertiesHref}
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-floating ${isPropertiesActive ? 'active' : ''}`}
                  aria-current={isPropertiesActive ? 'page' : undefined}
                >
                  
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
                  
                  <span>Events</span>
                </Link>

                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-floating ${isActive('/about') ? 'active' : ''}`}
                  aria-current={isActive('/about') ? 'page' : undefined}
                >
                  <span>About</span>
                </Link>

                <Link
                  href="/faq"
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-floating ${isActive('/faq') ? 'active' : ''}`}
                  aria-current={isActive('/faq') ? 'page' : undefined}
                >
                  <span>FAQ</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay-floating tap-reset"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}

export default Navbar;
