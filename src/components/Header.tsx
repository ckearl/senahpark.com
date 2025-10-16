'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#footer' },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href === '#footer') {
      e.preventDefault();
      const footer = document.querySelector('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    } else if (href === '#about') {
      e.preventDefault();
      const about = document.querySelector('#about');
      if (about) {
        about.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/img/newsenahsig.png"
              alt="Senah Park Kearl"
              width={200}
              height={100}
              className="w-auto h-20 hover:opacity-80 transition-opacity duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8 font-[family-name:var(--font-inter)] font-light">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.href.startsWith('#') ? (
                  <button
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="text-gray-700 hover:text-[var(--color-pink)] transition-colors duration-300"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-[var(--color-pink)] transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-[var(--color-pink)] transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-4">
            <ul className="flex flex-col gap-4 font-[family-name:var(--font-inter)] font-light">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.href.startsWith('#') ? (
                    <button
                      onClick={(e) => handleNavClick(item.href, e)}
                      className="text-gray-700 hover:text-[var(--color-pink)] transition-colors duration-300 block w-full text-left"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-700 hover:text-[var(--color-pink)] transition-colors duration-300 block"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
