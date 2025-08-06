'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Heart, ArrowUp } from 'lucide-react';

const LinksPage = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const links = [
    {
      name: 'Portfolio Website',
      url: 'https://senahpark.com',
      description: 'My main portfolio and work showcase',
      icon: '🌐'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/senahpark',
      description: 'Check out my code and projects',
      icon: '💻'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/senahpark',
      description: 'Professional profile and experience',
      icon: '💼'
    },
    {
      name: 'Twitter/X',
      url: 'https://twitter.com/senahpark',
      description: 'Follow me for updates and thoughts',
      icon: '🐦'
    },
    {
      name: 'Resume',
      url: '#',
      description: 'Download my latest resume',
      icon: '📄'
    },
    {
      name: 'Blog',
      url: '#',
      description: 'Read my latest articles and insights',
      icon: '✍️'
    },
    {
      name: 'Contact',
      url: 'mailto:hello@senahpark.com',
      description: 'Get in touch for collaborations',
      icon: '📧'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Senah Park
          </h1>
          <p className="text-gray-300 text-lg">
            Creative Developer & Designer
          </p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto mb-12 text-center"
        >
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
            SP
          </div>
          <p className="text-gray-300 leading-relaxed">
            Building beautiful digital experiences with code and creativity. 
            Passionate about web development, UI/UX design, and creating 
            meaningful solutions.
          </p>
        </motion.div>

        {/* Links */}
        <div className="max-w-md mx-auto space-y-4">
          {links.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{link.icon}</span>
                  <div className="text-left">
                    <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors duration-200">
                      {link.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {link.description}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-300 transition-colors duration-200" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="max-w-md mx-auto mt-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-6">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>by Senah Park</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 mx-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/15 transition-all duration-200"
          >
            <ArrowUp size={16} />
            Back to Top
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default LinksPage; 