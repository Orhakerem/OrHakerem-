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

  // Only show floating navbar on homepage
  const isHomePage = pathname === '/';

  if (isHomePage) {
    return (
      <>
        {/* Desktop Floating Navbar - Homepage Only */}
        <nav className="hidden md:block floating-navbar" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between w-full">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" aria-label="Or Hakerem - Home" className="flex items-center">
                <div className="relative h-[55px] w-[55px] mr-[30px]">
                  <Image
                    src="/orhakerem_logo_original.jpg"
                    alt="Or Hakerem Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="nav-links-container">
              <Link
                href="/"
                className={`nav-item ${isActive('/') ? 'active' : ''}`}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Home</span>
              </Link>

              <Link
                href="/properties"
                className={`nav-item ${isActive('/properties') ? 'active' : ''}`}
                aria-current={isActive('/properties') ? 'page' : undefined}
              >
                <Building className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Properties</span>
              </Link>

              <Link
                href="/concierge-services"
                className={`nav-item ${isActive('/concierge-services') ? 'active' : ''}`}
                aria-current={isActive('/concierge-services') ? 'page' : undefined}
              >
                <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Services</span>
              </Link>

              <Link
                href="/events"
                className={`nav-item ${isActive('/events') ? 'active' : ''}`}
                aria-current={isActive('/events') ? 'page' : undefined}
              >
                <Users className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Events</span>
              </Link>

              <Link
                href="/contact"
                className={`nav-item ${isActive('/contact') ? 'active' : ''}`}
                aria-current={isActive('/contact') ? 'page' : undefined}
              >
                <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Contact</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Floating Navbar - Homepage Only */}
        <nav className="md:hidden floating-navbar" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Link href="/" aria-label="Or Hakerem - Home" className="flex items-center" onClick={closeMobileMenu}>
                <div className="relative h-[45px] w-[45px] mr-4">
                  <Image
                    src="/orhakerem_logo_original.jpg"
                    alt="Or Hakerem Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="hamburger-menu"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="flex flex-col">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive('/')
                      ? 'bg-yellow-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-current={isActive('/') ? 'page' : undefined}
                >
                  <Home className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Home</span>
                </Link>
                
                <Link
                  href="/properties"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive('/properties')
                      ? 'bg-yellow-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-current={isActive('/properties') ? 'page' : undefined}
                >
                  <Building className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Properties</span>
                </Link>
                
                <Link
                  href="/concierge-services"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive('/concierge-services')
                      ? 'bg-yellow-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-current={isActive('/concierge-services') ? 'page' : undefined}
                >
                  <Sparkles className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Services</span>
                </Link>
                
                <Link
                  href="/events"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive('/events')
                      ? 'bg-yellow-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-current={isActive('/events') ? 'page' : undefined}
                >
                  <Users className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Events</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive('/contact')
                      ? 'bg-yellow-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-current={isActive('/contact') ? 'page' : undefined}
                >
                  <Mail className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Contact</span>
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-[99]"
            onClick={closeMobileMenu}
          />
        )}
      </>
    );
  }

  // Regular navbar for other pages
  return (
    <>
      {/* Desktop Navbar - Other Pages */}
      <nav
        className="hidden md:block fixed top-0 left-0 right-0 z-[1000] bg-white shadow-lg"
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

            {/* Navigation Items */}
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
                <span>Properties</span>
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
                href="/events"
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive('/events')
                    ? 'bg-secondary text-primary'
                    : 'text-primary hover:text-secondary hover:bg-secondary/10'
                }`}
                aria-current={isActive('/events') ? 'page' : undefined}
              >
                <Users className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Events</span>
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

      {/* Mobile Navbar - Other Pages */}
      <nav
        className="md:hidden fixed top-0 left-0 right-0 z-[1000] bg-white shadow-lg"
        style={{ height: '80px' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-4 h-full">
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
            
            <button
              onClick={toggleMobileMenu}
              className="fixed right-5 top-6 p-3 text-primary hover:text-secondary transition-colors duration-200 bg-white rounded-lg shadow-sm"
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
                  <span>Properties</span>
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
                  <span>Events</span>
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