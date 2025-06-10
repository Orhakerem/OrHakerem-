'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building, Calendar, Sparkles } from 'lucide-react';
import Image from 'next/image';

function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full w-[90%] max-w-4xl ${
        isScrolled
          ? 'bg-primary shadow-lg backdrop-blur-md'
          : 'bg-primary/40 backdrop-blur-sm hover:bg-primary/60'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <div className="shrink-0 flex items-center">
            <Link href="/" aria-label="Or Hakerem - Home" className="flex items-center">
              <div className="relative w-8 h-8 mr-3">
                <Image
                  src="/IMG_4760.jpg"
                  alt="Or Hakerem Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-secondary font-playfair font-bold text-lg">
                Or Hakerem
              </span>
            </Link>
          </div>
          <div className="flex space-x-2">
            <Link
              href="/"
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;