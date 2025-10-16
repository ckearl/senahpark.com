'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative pt-20">
      <div className="text-center px-4">
        <div className={`${mounted ? 'drawing-animation' : 'opacity-0'}`}>
          <Image
            src="/img/hi-index.png"
            alt="Hi, it's nice to meet you"
            width={800}
            height={300}
            className="w-full max-w-2xl mx-auto"
            priority
          />
        </div>
        <h4
          className={`mt-8 text-xl md:text-2xl font-[family-name:var(--font-shrikhand)] text-gray-700 ${
            mounted ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}
        >
          it&apos;s nice to meet you
        </h4>
      </div>

      <div className={`absolute bottom-20 ${mounted ? 'appear-delayed' : 'opacity-0'}`}>
        <Image
          src="/img/down-arrow.png"
          alt="Scroll down"
          width={40}
          height={40}
          className="bouncing-arrow cursor-pointer"
        />
      </div>
    </section>
  );
};

export default Hero;
