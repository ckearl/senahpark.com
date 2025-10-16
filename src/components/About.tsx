'use client';

import { Download } from 'lucide-react';

const About = () => {
  const education = [
    {
      degree: 'MBA - Finance & Brand Management',
      school: 'Brigham Young University',
      year: '2024 - 2026',
    },
    {
      degree: 'Bachelor of Science - Business',
      school: 'Brigham Young University',
      year: '2020 - 2024',
    },
  ];

  const experience = [
    {
      role: 'Brand Manager',
      company: 'BYU Marriott School of Business',
      period: '2022 - Present',
    },
    {
      role: 'Marketing Strategist',
      company: 'Various Projects',
      period: '2021 - 2022',
    },
  ];

  return (
    <section id="about" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* About Summary */}
          <div className="section-fade-in text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-shrikhand)] text-gray-700 mb-6">
              About Me
            </h2>
            <p className="text-lg text-gray-600 font-[family-name:var(--font-inter)] font-light leading-relaxed">
              I&apos;m an MBA student passionate about the intersection of finance and brand
              management. I love creating compelling brand experiences and strategic marketing
              initiatives that drive real business results.
            </p>
          </div>

          {/* Education & Experience Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Education */}
            <div className="section-fade-in">
              <h3 className="text-2xl font-[family-name:var(--font-inter)] font-medium text-[var(--color-red)] mb-6">
                Education
              </h3>
              <div className="space-y-6">
                {education.map((item, index) => (
                  <div key={index} className="border-l-4 border-[var(--color-pink)] rounded-l-lg pl-4">
                    <h4 className="font-[family-name:var(--font-inter)] font-medium text-gray-800">
                      {item.degree}
                    </h4>
                    <p className="text-gray-600 font-[family-name:var(--font-inter)] font-light">
                      {item.school}
                    </p>
                    <p className="text-sm text-gray-500 font-[family-name:var(--font-inter)] font-light">
                      {item.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="section-fade-in">
              <h3 className="text-2xl font-[family-name:var(--font-inter)] font-medium text-[var(--color-red)] mb-6">
                Experience
              </h3>
              <div className="space-y-6">
                {experience.map((item, index) => (
                  <div key={index} className="border-l-4 border-[var(--color-pink)] rounded-l-lg pl-4">
                    <h4 className="font-[family-name:var(--font-inter)] font-medium text-gray-800">
                      {item.role}
                    </h4>
                    <p className="text-gray-600 font-[family-name:var(--font-inter)] font-light">
                      {item.company}
                    </p>
                    <p className="text-sm text-gray-500 font-[family-name:var(--font-inter)] font-light">
                      {item.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resume Download Button */}
          <div className="section-fade-in text-center">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-pink)] to-[var(--color-red)] text-white px-8 py-3 rounded-full font-[family-name:var(--font-inter)] font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Download size={20} />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
