'use client';

import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/senah-park-kearl/',
      darkIcon: '/img/icon/link-dark.png',
      lightIcon: '/img/icon/link-light.png',
    },
    {
      name: 'Pinterest',
      href: 'https://www.pinterest.com/senahpomaikai/',
      darkIcon: '/img/icon/pin-dark.png',
      lightIcon: '/img/icon/pin-light.png',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/senahpomaikai/',
      darkIcon: '/img/icon/insta-dark.png',
      lightIcon: '/img/icon/insta-light.png',
    },
    {
      name: 'Spotify',
      href: 'https://open.spotify.com/user/1249033780?si=TFSPC6ceQp2KzQinOJAVgg&nd=1',
      darkIcon: '/img/icon/spot-dark.png',
      lightIcon: '/img/icon/spot-light.png',
    },
  ];

  const flowers = [
    '/img/flower/flower1.png',
    '/img/flower/flower2.png',
    '/img/flower/flower3.png',
    '/img/flower/flower4.png',
  ];

  return (
    <footer className="min-h-[30vh] bg-transparent py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/img/newsenahsig.png"
                alt="Senah Park Kearl"
                width={120}
                height={60}
                className="w-auto h-16"
              />
            </Link>
          </div>

          {/* Social Links and Contact Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-[var(--color-pink)] to-[var(--color-red)] text-white px-6 py-2 rounded-full font-[family-name:var(--font-inter)] font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Get in touch
            </Link>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10"
                >
                  <Image
                    src={social.darkIcon}
                    alt={social.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <Image
                    src={social.lightIcon}
                    alt={social.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Flower Decorations (Hidden on mobile) */}
          <div className="hidden lg:flex gap-6">
            {flowers.map((flower, index) => (
              <Image
                key={index}
                src={flower}
                alt={`Flower decoration ${index + 1}`}
                width={82}
                height={82}
                className="w-20 h-20 opacity-80 hover:scale-110 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
