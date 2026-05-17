'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Properties', href: '/properties', match: '/properties' },
  { label: 'Services', href: '/concierge-services', match: '/concierge-services' },
  { label: 'Events', href: '/events', match: '/events' },
  { label: 'About', href: '/about', match: '/about' },
  { label: 'Blog', href: '/blog', match: '/blog' },
  { label: 'Contact', href: '/#contact', match: null },
];

function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        className="navbar-floating hidden md:block"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container-floating">
          <div className="logo-section-floating">
            <Link href="/" aria-label="Or Hakerem - Home" className="nav-brand-floating">
              <span className="nav-logo-slot-floating" aria-hidden="true" />
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
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav
        className="navbar-floating md:hidden"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container-floating">
          <div className="logo-section-floating">
            <Link href="/" aria-label="Or Hakerem - Home" className="nav-brand-floating" onClick={closeMobileMenu}>
              <span className="nav-logo-slot-floating" aria-hidden="true" />
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
