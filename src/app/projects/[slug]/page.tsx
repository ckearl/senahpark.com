"use client";

import { use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projectData } from "@/data/projects";

export default function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = use(params);
	const project = projectData[slug as keyof typeof projectData];

	// Get all project slugs for navigation
	const projectSlugs = Object.keys(projectData);
	const currentIndex = projectSlugs.indexOf(slug);
	const nextSlug = projectSlugs[(currentIndex + 1) % projectSlugs.length];
	const prevSlug =
		projectSlugs[
			(currentIndex - 1 + projectSlugs.length) % projectSlugs.length
		];
	const nextProject = projectData[nextSlug as keyof typeof projectData];
	const prevProject = projectData[prevSlug as keyof typeof projectData];

	// Intersection Observer for fade-in animations
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("visible");
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: "0px 0px -50px 0px",
			}
		);

		const elements = document.querySelectorAll(".section-fade-in");
		elements.forEach((el) => observer.observe(el));

		return () => {
			elements.forEach((el) => observer.unobserve(el));
		};
	}, []);

	if (!project) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-[family-name:var(--font-shrikhand)] text-gray-700 mb-4">
						Project Not Found
					</h1>
					<Link
						href="/"
						className="text-[var(--color-pink)] hover:text-[var(--color-red)] transition-colors"
					>
						Go back home
					</Link>
				</div>
			</div>
		);
	}

	return (
		<main className="min-h-screen">
			<Header />

			{/* Hero Section */}
			<section className="pt-32 pb-12 bg-white/40">
				<div className="container mx-auto px-6">
					<div className="grid lg:grid-cols-5 gap-12 items-center">
						{/* Logo */}
						<div className="lg:col-span-2 flex justify-center section-fade-in">
							<Image
								src={project.logo}
								alt={project.title}
								width={400}
								height={200}
								className="w-3/4 h-auto"
							/>
						</div>

						{/* Project Details */}
						<div className="lg:col-span-3 space-y-8">
							{/* Links */}
							<div className="space-y-2 section-fade-in">
								{project.links.map((link, index) => (
									<div key={index}>
										<a
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-[var(--color-red)] hover:text-[var(--color-pink)] transition-colors font-[family-name:var(--font-inter)] font-light italic underline"
										>
											{link.text}
										</a>
									</div>
								))}
							</div>

							{/* Overview & Role Cards */}
							<div className="grid md:grid-cols-2 gap-6 section-fade-in">
								<div className="space-y-2">
									<h3 className="text-[var(--color-red)] font-[family-name:var(--font-inter)] text-sm uppercase tracking-wide">
										Overview
									</h3>
									<div className="space-y-3 font-[family-name:var(--font-inter)] font-light text-gray-700">
										{project.overview.map((paragraph, index) => (
											<p key={index}>{paragraph}</p>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<h3 className="text-[var(--color-red)] font-[family-name:var(--font-inter)] text-sm uppercase tracking-wide">
										Role
									</h3>
									<p className="font-[family-name:var(--font-inter)] font-medium text-gray-800">
										{project.role}
									</p>
									<p className="font-[family-name:var(--font-inter)] font-light text-gray-700">
										{project.responsibilities}
									</p>
									<p className="font-[family-name:var(--font-inter)] font-light text-gray-600 text-sm">
										{project.date}
									</p>
								</div>
							</div>

							{/* Project Type */}
							<div className="text-3xl md:text-4xl font-[family-name:var(--font-inter)] font-medium text-[var(--color-light-pink)] section-fade-in">
								{project.subtitle}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Timeline Sections */}
			<section className="py-12 bg-white/40">
				<div className="container mx-auto px-6 max-w-5xl">
					<div className="relative pt-8">
						{/* Timeline Line - Always on left */}
						<div className="absolute left-8 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-[#D73234] via-[#F283B6] to-[#FFD966]" />

						{/* Timeline Items */}
						<div className="space-y-20">
							{project.sections.map((section, index) => {
								const gradientColors = [
									"#D73234", // red
									"#F283B6", // pink
									"#F6BAC6", // light pink
									"#FFD966", // yellow
								];
								const circleColor =
									gradientColors[index % gradientColors.length];

								return (
									<div key={index} className="relative flex gap-8">
										{/* Timeline Circle - Positioned at center of image */}
										<div
											className="absolute left-[1.35rem] w-6 h-6 rounded-full border-4 bg-white z-10"
											style={{
												borderColor: circleColor,
												top: "calc(33.333% + 0rem)",
											}}
										/>

										{/* Content Container */}
										<div className="flex-1 ml-20">
											<div className="section-fade-in relative">
												{/* Image */}
												<div className="mb-6">
													<div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1">
														<Image
															src={section.image}
															alt={section.title}
															width={600}
															height={400}
															className="w-full h-auto"
														/>
													</div>
												</div>

												{/* Text Content */}
												<div>
													<h3 className="text-xl md:text-2xl font-[family-name:var(--font-inter)] font-medium text-gray-800 mb-4">
														{section.title}
													</h3>
													<p className="font-[family-name:var(--font-inter)] font-light text-gray-700 leading-relaxed">
														{section.description}
													</p>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			{/* Bottom Links */}
			<section className="py-12 bg-white/40">
				<div className="container mx-auto px-6">
					<div className="flex justify-center gap-8">
						{project.links.map((link, index) => (
							<a
								key={index}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-[var(--color-red)] hover:text-[var(--color-pink)] transition-colors font-[family-name:var(--font-inter)] font-light italic underline"
							>
								{link.text}
							</a>
						))}
					</div>
				</div>
			</section>

			{/* Project Navigation */}
			<section className="py-16 bg-white/40 border-t border-gray-200">
				<div className="container mx-auto px-6">
					<div className="flex justify-between items-center">
						<Link
							href={`/projects/${prevSlug}`}
							className="group flex items-center gap-3 hover:opacity-80 transition-opacity"
						>
							<span className="text-3xl text-[var(--color-pink)] group-hover:-translate-x-1 transition-transform">
								←
							</span>
							<div>
								<p className="text-sm text-gray-500 font-[family-name:var(--font-inter)] font-light">
									Previous Project
								</p>
								<p className="text-lg font-[family-name:var(--font-inter)] font-medium text-gray-800">
									{prevProject.title}
								</p>
							</div>
						</Link>

						<Link
							href="/"
							className="text-[var(--color-red)] hover:text-[var(--color-pink)] transition-colors font-[family-name:var(--font-inter)] font-medium"
						>
							Back to Home
						</Link>

						<Link
							href={`/projects/${nextSlug}`}
							className="group flex items-center gap-3 hover:opacity-80 transition-opacity"
						>
							<div className="text-right">
								<p className="text-sm text-gray-500 font-[family-name:var(--font-inter)] font-light">
									Next Project
								</p>
								<p className="text-lg font-[family-name:var(--font-inter)] font-medium text-gray-800">
									{nextProject.title}
								</p>
							</div>
							<span className="text-3xl text-[var(--color-pink)] group-hover:translate-x-1 transition-transform">
								→
							</span>
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
