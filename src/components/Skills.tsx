// Skills.tsx

"use client";

import { motion } from "framer-motion";
import { Code, Palette, Database, Cloud } from "lucide-react";

const Skills = () => {
	const skillCategories = [
		{
			title: "Frontend Development",
			icon: Code,
			color: "from-blue-500 to-cyan-500",
			skills: [
				{ name: "React", level: 95 },
				{ name: "Next.js", level: 90 },
				{ name: "TypeScript", level: 85 },
				{ name: "HTML/CSS", level: 95 },
				{ name: "Tailwind CSS", level: 90 },
			],
		},
		{
			title: "Design & UX",
			icon: Palette,
			color: "from-purple-500 to-pink-500",
			skills: [
				{ name: "UI/UX Design", level: 85 },
				{ name: "Figma", level: 80 },
				{ name: "Adobe Creative Suite", level: 75 },
				{ name: "Prototyping", level: 85 },
				{ name: "Design Systems", level: 80 },
			],
		},
		{
			title: "Backend Development",
			icon: Database,
			color: "from-green-500 to-emerald-500",
			skills: [
				{ name: "Node.js", level: 85 },
				{ name: "Python", level: 80 },
				{ name: "PostgreSQL", level: 75 },
				{ name: "MongoDB", level: 70 },
				{ name: "REST APIs", level: 90 },
			],
		},
		{
			title: "DevOps & Tools",
			icon: Cloud,
			color: "from-orange-500 to-red-500",
			skills: [
				{ name: "AWS", level: 75 },
				{ name: "Docker", level: 70 },
				{ name: "Git", level: 90 },
				{ name: "CI/CD", level: 75 },
				{ name: "Linux", level: 80 },
			],
		},
	];

	return (
		<section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
						My <span className="gradient-text">Skills</span>
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						A comprehensive overview of my technical expertise and professional
						capabilities.
					</p>
				</motion.div>

				<div className="grid lg:grid-cols-2 gap-8">
					{skillCategories.map((category, categoryIndex) => (
						<motion.div
							key={category.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
							viewport={{ once: true }}
							className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl dark:shadow-gray-700/25 dark:hover:shadow-gray-700/40 transition-shadow duration-300"
						>
							<div className="flex items-center gap-4 mb-6">
								<div
									className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}
								>
									<category.icon className="text-white" size={24} />
								</div>
								<h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
									{category.title}
								</h3>
							</div>

							<div className="space-y-4">
								{category.skills.map((skill, skillIndex) => (
									<motion.div
										key={skill.name}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.6, delay: skillIndex * 0.1 }}
										viewport={{ once: true }}
									>
										<div className="flex justify-between items-center mb-2">
											<span className="text-gray-700 dark:text-gray-300 font-medium">
												{skill.name}
											</span>
											<span className="text-sm text-gray-500 dark:text-gray-400">
												{skill.level}%
											</span>
										</div>
										<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
											<motion.div
												initial={{ width: 0 }}
												whileInView={{ width: `${skill.level}%` }}
												transition={{ duration: 1, delay: skillIndex * 0.1 }}
												viewport={{ once: true }}
												className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
											/>
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>
					))}
				</div>

				{/* Additional Skills */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
					viewport={{ once: true }}
					className="mt-16"
				>
					<h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-8">
						Additional Skills & Tools
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
						{[
							"JavaScript",
							"TypeScript",
							"React",
							"Next.js",
							"Node.js",
							"Python",
							"PostgreSQL",
							"MongoDB",
							"AWS",
							"Docker",
							"Git",
							"Figma",
							"Tailwind CSS",
							"Sass",
							"GraphQL",
							"REST APIs",
							"Jest",
							"Cypress",
							"Webpack",
							"Vite",
							"NPM",
							"Yarn",
							"VS Code",
							"Postman",
						].map((skill, index) => (
							<motion.div
								key={skill}
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, delay: index * 0.05 }}
								viewport={{ once: true }}
								className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-lg dark:shadow-gray-700/25 dark:hover:shadow-gray-700/40 transition-shadow duration-300 text-center"
							>
								<span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
									{skill}
								</span>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Experience Summary */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.8 }}
					viewport={{ once: true }}
					className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
				>
					<h3 className="text-2xl font-semibold mb-4">
						Ready to Bring Your Ideas to Life
					</h3>
					<p className="text-lg opacity-90 max-w-2xl mx-auto">
						With a diverse skill set spanning frontend, backend, design, and
						DevOps, I&apos;m equipped to handle projects from concept to
						deployment. Let&apos;s collaborate to create something amazing
						together.
					</p>
				</motion.div>
			</div>
		</section>
	);
};

export default Skills;
