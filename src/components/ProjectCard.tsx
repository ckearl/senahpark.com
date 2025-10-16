'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  logoSrc?: string;
  href: string;
  layout?: 'left' | 'right';
}

export default function ProjectCard({
  title,
  category,
  description,
  imageSrc,
  logoSrc,
  href,
  layout = 'left',
}: ProjectCardProps) {
  return (
    <section className="min-h-[80vh] py-20">
      <div
        className={`container mx-auto px-6 h-full flex items-center ${
          layout === 'right' ? 'flex-row-reverse' : ''
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Image */}
          <div className="section-fade-in">
            <Link href={href} className="block group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:-translate-y-1">
                <Image
                  src={imageSrc}
                  alt={title}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </Link>
          </div>

          {/* Description Card */}
          <div className="section-fade-in">
            <div className="space-y-4">
              <h2 className="text-base md:text-lg font-light text-[var(--color-red)] font-[family-name:var(--font-inter)]">
                {category}
              </h2>
              {logoSrc && (
                <Link href={href} className="block hover:opacity-80 transition-opacity">
                  <Image
                    src={logoSrc}
                    alt={`${title} logo`}
                    width={200}
                    height={80}
                    className="w-1/2 h-auto"
                  />
                </Link>
              )}
              <h4 className="text-lg md:text-xl font-[family-name:var(--font-inter)] text-gray-700">
                {description}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
