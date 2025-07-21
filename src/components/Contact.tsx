'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
		{
			icon: Mail,
			title: "Email",
			value: "parksenah@gmail.com",
			link: "mailto:parksenah@gmail.com",
		},
		{
			icon: Phone,
			title: "Phone",
			value: "+1 (801) 915-6099",
			link: "tel:+18019156099",
		},
		{
			icon: MapPin,
			title: "Location",
			value: "Salt Lake City, UT",
			link: "https://maps.app.goo.gl/6jK2Th9v2BY2CA5W9",
		},
	];

  const socialLinks = [
		{
			icon: Instagram,
			name: "Instagram",
			url: "https://www.instagram.com/senahpomaikai/",
		},
		{
			icon: Linkedin,
			name: "LinkedIn",
			url: "https://linkedin.com/in/senahpark",
		},
	];

  return (
		<section id="contact" className="py-20 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						Get In <span className="gradient-text">Touch</span>
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Ready to start a project or just want to chat? I&apos;d love to hear
						from you!
					</p>
				</motion.div>

				<div className="grid lg:grid-cols-2 gap-12">
					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="bg-white rounded-2xl p-8 shadow-lg"
					>
						<h3 className="text-2xl font-semibold text-gray-900 mb-6">
							Send a Message
						</h3>

						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Name
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
										placeholder="Your name"
									/>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										required
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
										placeholder="your.email@example.com"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="subject"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Subject
								</label>
								<input
									type="text"
									id="subject"
									name="subject"
									value={formData.subject}
									onChange={handleInputChange}
									required
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
									placeholder="What's this about?"
								/>
							</div>

							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium text-gray-700 mb-2"
								>
									Message
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleInputChange}
									required
									rows={6}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
									placeholder="Tell me about your project..."
								/>
							</div>

							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								type="submit"
								className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-shadow duration-200"
							>
								<Send size={20} />
								Send Message
							</motion.button>
						</form>
					</motion.div>

					{/* Contact Info */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="space-y-8"
					>
						{/* Contact Information */}
						<div className="bg-white rounded-2xl p-8 shadow-lg">
							<h3 className="text-2xl font-semibold text-gray-900 mb-6">
								Contact Information
							</h3>

							<div className="space-y-6">
								{contactInfo.map((info, index) => (
									<motion.a
										key={info.title}
										href={info.link}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
										viewport={{ once: true }}
										className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
									>
										<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
											<info.icon className="text-white" size={24} />
										</div>
										<div>
											<p className="text-sm text-gray-500 font-medium">
												{info.title}
											</p>
											<p className="text-gray-900 font-semibold">
												{info.value}
											</p>
										</div>
									</motion.a>
								))}
							</div>
						</div>

						{/* Social Links */}
						<div className="bg-white rounded-2xl p-8 shadow-lg">
							<h3 className="text-2xl font-semibold text-gray-900 mb-6">
								Follow Me
							</h3>

							<div className="flex gap-4">
								{socialLinks.map((social, index) => (
									<motion.a
										key={social.name}
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
										viewport={{ once: true }}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-colors transition-bg duration-200`}
									>
										<social.icon className="text-gray-700 group-hover:text-white transition-colors duration-200" size={24} />
									</motion.a>
								))}
							</div>
						</div>

						{/* Availability */}
						<div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
							<h3 className="text-2xl font-semibold mb-4">
								Let&apos;s Work Together
							</h3>
							<p className="text-lg opacity-90 mb-6">
								I&apos;m currently available for freelance projects and
								full-time opportunities. Let&apos;s discuss how we can create
								something amazing together.
							</p>
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
								<span className="font-medium">Available for new projects</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Contact; 