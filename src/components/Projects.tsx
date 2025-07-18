'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'Full-Stack'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: '/api/placeholder/400/250',
      technologies: ['Next.js', 'TypeScript', 'Socket.io', 'MongoDB', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'Frontend'
    },
    {
      title: 'AI Chat Assistant',
      description: 'An intelligent chatbot powered by machine learning, featuring natural language processing and contextual responses.',
      image: '/api/placeholder/400/250',
      technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'Redis'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'AI/ML'
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with Next.js and Framer Motion, featuring smooth animations and optimal performance.',
      image: '/api/placeholder/400/250',
      technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'Frontend'
    },
    {
      title: 'Weather Dashboard',
      description: 'A beautiful weather application with real-time data, interactive maps, and detailed forecasting capabilities.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'D3.js', 'OpenWeather API', 'Chart.js', 'CSS3'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'Frontend'
    },
    {
      title: 'Inventory Management System',
      description: 'A comprehensive inventory management solution for businesses, featuring barcode scanning, reporting, and analytics.',
      image: '/api/placeholder/400/250',
      technologies: ['Vue.js', 'Node.js', 'MySQL', 'Express', 'Bootstrap'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'Full-Stack'
    }
  ];

  const categories = ['All', 'Full-Stack', 'Frontend', 'AI/ML', 'Mobile'];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore my latest work and see how I bring ideas to life through innovative design and development.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Eye className="text-white" size={24} />
                    </div>
                    <p className="text-gray-600 text-sm">Project Preview</p>
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-4">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.liveUrl}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors duration-200"
                    >
                      <ExternalLink className="text-gray-700" size={20} />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.githubUrl}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors duration-200"
                    >
                      <Github className="text-gray-700" size={20} />
                    </motion.a>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.liveUrl}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow duration-200"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.githubUrl}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:border-blue-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Github size={16} />
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-semibold mb-4">
              Have a Project in Mind?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              I'm always excited to work on new and challenging projects. 
              Let's discuss how we can bring your ideas to life together.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:shadow-lg transition-shadow duration-200"
            >
              Let's Talk
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 