'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Properties', href: '/properties', match: '/properties' },
  { label: 'Services', href: '/services', match: '/services' },
  { label: 'Events', href: '/events', match: '/events' },
  { label: 'About', href: '/about', match: '/about' },
  { label: 'Blog', href: '/blog', match: '/blog' },
  { label: 'FAQ', href: '/faq', match: '/faq' },
  { label: 'Contact', href: '/#contact', match: null },
];

function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFaded, setIsFaded] = useState(false);
  const lastScrollYRef = useRef(0);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      return;
    }

    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;
      const last = lastScrollYRef.current;

      if (current > last && current > 80) {
        setIsFaded(true);
      } else if (current < last) {
        setIsFaded(false);
      }

      lastScrollYRef.current = current;

      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      inactivityTimerRef.current = setTimeout(() => {
        setIsFaded(false);
      }, 1500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  const fadedClass = isFaded && !isMobileMenuOpen ? ' is-faded' : '';
  const isListingDetail =
    pathname.startsWith('/properties/') && pathname !== '/properties';

  const isActive = (match: string | null) => {
    if (!match) {
      return false;
    }

    return pathname === match || pathname.startsWith(`${match}/`);
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
        className={`navbar-floating hidden md:block${fadedClass}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container-floating">
          <div className="logo-section-floating">
            <Link href="/" aria-label="Or Hakerem - Home" className="nav-brand-floating">
              <span className="nav-logo-slot-floating">
                <Image
                  src="/logo/Logo_beige.png"
                  alt="Or Hakerem"
                  fill
                  className="object-contain object-left"
                  priority
                  sizes="150px"
                />
              </span>
            </Link>
          </div>

          <div className="nav-items-floating">
            {navItems.map((item) => {
              const active = isActive(item.match);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item-floating ${active ? 'active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <a
              href="https://wa.me/972526869791?text=Hi%20I%20am%20interested%20in%20your%20properties"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-whatsapp-floating"
              aria-label="Contact on WhatsApp"
            >
              <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
                <path fill="white" d="M16 3C9.4 3 4 8.3 4 14.8c0 2.6.9 5 2.4 7L5 29l7-2.3c1.8.9 3.8 1.4 5.9 1.4 6.6 0 12-5.3 12-11.8S22.6 3 16 3zm0 21.5c-1.8 0-3.6-.5-5.2-1.5l-.4-.2-4.1 1.3 1.4-4-.3-.4c-1.1-1.6-1.6-3.4-1.6-5.2C5.8 9.1 10.4 5 16 5s10.2 4.1 10.2 9.8S21.6 24.5 16 24.5zm5.6-7.3c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.6-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-1-2.2-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.8 4.4 3.9.6.3 1.1.5 1.5.6.6.2 1.2.2 1.7.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4 0-.1-.1-.2-.3-.3z"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      {!isListingDetail && (
      <nav
        className={`navbar-floating md:hidden${fadedClass}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container-floating">
          <div className="logo-section-floating">
            <Link href="/" aria-label="Or Hakerem - Home" className="nav-brand-floating" onClick={closeMobileMenu}>
              <span className="nav-logo-slot-floating">
                <Image
                  src="/logo/Logo_beige.png"
                  alt="Or Hakerem"
                  fill
                  className="object-contain object-left"
                  priority
                  sizes="150px"
                />
              </span>
            </Link>
          </div>
          
          <button
            onClick={toggleMobileMenu}
            className="mobile-menu-button-floating"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </nav>
      )}

      {isMobileMenuOpen && (
        <div
          className="mobile-overlay-floating tap-reset"
          onClick={closeMobileMenu}
        >
          <div
            className="mobile-menu-items-floating"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => {
              const active = isActive(item.match);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`mobile-nav-item-floating ${active ? 'active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
