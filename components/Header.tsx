'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Compass, Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const { language, setLanguage, dict } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  const navLinks = [
    { href: '/', label: dict.nav.home },
    { href: '/destinations', label: dict.nav.destinations },
    { href: '/tours', label: dict.nav.tours },
    { href: '/admin', label: dict.nav.admin },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card-bg/90 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-10 h-[72px] flex items-center justify-between">
        <Link href="/" className="flex flex-col justify-center">
          <Image 
            src="/logo.png" 
            alt="AsiaTerra Travel Logo" 
            width={160} 
            height={60} 
            className="object-contain h-12 w-auto"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          <ul className="flex items-center gap-8 text-sm font-medium text-gray-600 h-full">
            {navLinks.map((link) => (
              <li key={link.href} className="h-full flex items-center">
                <Link 
                  href={link.href}
                  className={`h-full flex items-center border-b-2 transition-colors hover:text-primary ${pathname === link.href ? 'text-primary border-primary' : 'border-transparent'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 uppercase transition-colors"
          >
            <span className={language === 'en' ? 'text-primary' : 'text-gray-400'}>EN</span>
            <span className="text-gray-300">|</span>
            <span className={language === 'fr' ? 'text-primary' : 'text-gray-400'}>FR</span>
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase"
          >
            <span className={language === 'en' ? 'text-primary' : 'text-gray-400'}>EN</span>
            <span className="text-gray-300">|</span>
            <span className={language === 'fr' ? 'text-primary' : 'text-gray-400'}>FR</span>
          </button>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="md:hidden border-top border-gray-100 bg-white">
          <ul className="flex flex-col px-4 py-4 gap-4 text-base font-medium text-gray-700">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block hover:text-primary ${pathname === link.href ? 'text-primary' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
