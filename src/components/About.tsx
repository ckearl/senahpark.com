'use client';

import { motion } from 'framer-motion';
import { User, MapPin, Calendar, Award } from 'lucide-react';

const About = () => {
  const personalInfo = [
    { icon: User, label: 'Name', value: 'Senah Park' },
    { icon: MapPin, label: 'Location', value: 'Salt Lake City, UT' },
    { icon: Calendar, label: 'Experience', value: '5+ Years' },
    { icon: Award, label: 'Specialization', value: 'Full-Stack Development' },
  ];

  const skills = [
    'React & Next.js', 'TypeScript', 'Node.js', 'Python', 
    'UI/UX Design', 'AWS', 'Docker', 'PostgreSQL'
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get to know me better and understand my journey in the world of technology and design.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Who I Am
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                I&apos;m a passionate full-stack developer and designer with over 5 years of experience 
                creating innovative digital solutions. I believe in the power of technology to 
                transform ideas into impactful experiences that make a difference in people&apos;s lives.
              </p>
              <p className="text-gray-600 leading-relaxed">
                My approach combines technical expertise with creative problem-solving, 
                ensuring that every project I work on is not only functional but also 
                beautiful and user-friendly. I&apos;m constantly learning and adapting to 
                new technologies to stay at the forefront of the industry.
              </p>
            </div>

            {/* Personal Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              {personalInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <info.icon className="text-blue-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{info.label}</p>
                    <p className="text-gray-900 font-semibold">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Skills & Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Profile Image Placeholder */}
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User size={48} className="text-white" />
                  </div>
                  <p className="text-gray-600">Profile Photo</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full opacity-20"></div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Core Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-blue-600" size={32} />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Award Winner</h4>
            <p className="text-gray-600">
              Recognized for excellence in web development and design innovation.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-purple-600" size={32} />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Team Player</h4>
            <p className="text-gray-600">
              Collaborative approach with strong communication and leadership skills.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-green-600" size={32} />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Always Learning</h4>
            <p className="text-gray-600">
              Continuously updating skills and staying current with industry trends.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 