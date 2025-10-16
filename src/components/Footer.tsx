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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo & Contact Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="w-fit">
              <Image
                src="/img/newsenahsig.png"
                alt="Senah Park Kearl"
                width={200}
                height={100}
                className="w-auto h-24"
              />
            </Link>
            <div className="font-[family-name:var(--font-inter)] font-light text-gray-600">
              <p className="flex items-center gap-2">
                <span className="text-[var(--color-red)]">✉</span>
                <a href="mailto:parksenah@gmail.com" className="hover:text-[var(--color-pink)] transition-colors">
                  parksenah@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Social Icons and Back to Top */}
          <div className="flex flex-col items-center gap-6 self-end pb-4">
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

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex flex-col items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <div className="text-3xl text-[var(--color-pink)] group-hover:-translate-y-1 transition-transform">
                ↑
              </div>
              <span className="text-xs text-gray-600 font-[family-name:var(--font-inter)] font-light">
                Back to Top
              </span>
            </button>
          </div>

          {/* Flower Decorations (Hidden on mobile) */}
          <div className="hidden lg:flex gap-6 justify-end">
            {flowers.map((flower, index) => (
              <div
                key={index}
                className="group relative w-20 h-20 cursor-pointer"
              >
                <Image
                  src={flower}
                  alt={`Flower decoration ${index + 1}`}
                  width={82}
                  height={82}
                  className="w-20 h-20 opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
