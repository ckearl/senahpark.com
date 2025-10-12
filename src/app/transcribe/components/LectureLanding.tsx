"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Loader2, Calendar, Clock, User } from "lucide-react";
import { useLectures } from "../../../../hooks/useLectures";
import { Lecture } from "../../../../types/lecture";
import { classMetadata } from "../../../../utils/classMetadata";

interface ClassMetadata {
	days: string;
	lecture_time: string;
	course_title: string;
	course_number: string;
	professor_name: string;
	lecture_titles: Record<string, string>;
}

const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
};

const formatTime = (seconds: number): string => {
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, "0")}`;
};

interface LectureLandingProps {
	onLectureSelect: (lectureId: string) => void;
}

export default function LectureLanding({ onLectureSelect }: LectureLandingProps) {
	const { lectures, loading, error } = useLectures();
	const [expandedClasses, setExpandedClasses] = useState<Set<string>>(new Set());

	const toggleClassExpansion = (classNumber: string) => {
		const newExpanded = new Set(expandedClasses);
		if (newExpanded.has(classNumber)) {
			newExpanded.delete(classNumber);
		} else {
			newExpanded.add(classNumber);
		}
		setExpandedClasses(newExpanded);
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="flex items-center space-x-2">
					<Loader2 className="w-6 h-6 animate-spin" />
					<span>Loading lectures...</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-xl font-semibold text-red-600 mb-2">
						Error loading lectures
					</h2>
					<p className="text-gray-600">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 p-4 md:p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-6 md:mb-8">
					<h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
						Lecture Library
					</h1>
					<p className="text-base md:text-lg text-gray-600">
						Select a class to view available lecture recordings
					</p>
				</div>

				{/* Desktop: Classes Table */}
				<div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Course
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Professor
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Schedule
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Lectures
									</th>
									<th className="px-6 py-3"></th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{lectures.map((classGroup) => {
									const metadata = classMetadata[classGroup.class_number];
									const isExpanded = expandedClasses.has(classGroup.class_number);

									return (
										<React.Fragment key={classGroup.class_number}>
											<tr
												className="hover:bg-gray-50 cursor-pointer transition-colors"
												onClick={() => toggleClassExpansion(classGroup.class_number)}
											>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="flex items-center">
														<div>
															<div className="text-sm font-medium text-gray-900">
																{metadata?.course_number || classGroup.class_number}
															</div>
															<div className="text-sm text-gray-500">
																{metadata?.course_title || ""}
															</div>
														</div>
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="flex items-center text-sm text-gray-900">
														<User className="w-4 h-4 mr-2 text-gray-400" />
														{metadata?.professor_name || "N/A"}
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="text-sm text-gray-900">
														<div className="flex items-center mb-1">
															<Calendar className="w-4 h-4 mr-2 text-gray-400" />
															{metadata?.days || "N/A"}
														</div>
														<div className="flex items-center text-gray-500">
															<Clock className="w-4 h-4 mr-2 text-gray-400" />
															{metadata?.lecture_time || "N/A"}
														</div>
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
														{classGroup.lectures.length} available
													</span>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
													<button className="text-blue-600 hover:text-blue-900">
														{isExpanded ? (
															<ChevronDown className="w-5 h-5" />
														) : (
															<ChevronRight className="w-5 h-5" />
														)}
													</button>
												</td>
											</tr>

											{isExpanded && (
												<tr>
													<td colSpan={5} className="px-6 py-4 bg-gray-50">
														<div className="space-y-2">
															<h4 className="text-sm font-semibold text-gray-700 mb-3">
																Available Lectures
															</h4>
															<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
																{classGroup.lectures.map((lecture: Lecture) => (
																	<button
																		key={lecture.id}
																		onClick={(e) => {
																			e.stopPropagation();
																			onLectureSelect(lecture.id);
																		}}
																		className="text-left p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
																	>
																		<div className="text-sm font-medium text-gray-900 mb-1">
																			{lecture.title}
																		</div>
																		<div className="text-xs text-gray-500 mb-2">
																			{formatDate(lecture.date)}
																		</div>
																		<div className="flex items-center text-xs text-gray-400">
																			<Clock className="w-3 h-3 mr-1" />
																			{formatTime(lecture.duration_seconds)}
																		</div>
																	</button>
																))}
															</div>
														</div>
													</td>
												</tr>
											)}
										</React.Fragment>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>

				{/* Mobile: Classes Cards */}
				<div className="md:hidden space-y-4">
					{lectures.map((classGroup) => {
						const metadata = classMetadata[classGroup.class_number];
						const isExpanded = expandedClasses.has(classGroup.class_number);

						return (
							<div
								key={classGroup.class_number}
								className="bg-white rounded-lg shadow-md overflow-hidden"
							>
								<button
									onClick={() => toggleClassExpansion(classGroup.class_number)}
									className="w-full p-4 text-left"
								>
									<div className="flex items-start justify-between mb-2">
										<div className="flex-1 min-w-0 pr-3">
											<h3 className="text-base font-semibold text-gray-900 truncate">
												{metadata?.course_number || classGroup.class_number}
											</h3>
											<p className="text-sm text-gray-500 truncate">
												{metadata?.course_title || ""}
											</p>
										</div>
										<div className="flex-shrink-0 flex items-center">
											<span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
												{classGroup.lectures.length}
											</span>
											<div className="ml-2">
												{isExpanded ? (
													<ChevronDown className="w-5 h-5 text-gray-500" />
												) : (
													<ChevronRight className="w-5 h-5 text-gray-500" />
												)}
											</div>
										</div>
									</div>

									<div className="flex items-center gap-4 text-xs text-gray-500">
										{metadata?.professor_name && (
											<div className="flex items-center">
												<User className="w-3 h-3 mr-1" />
												{metadata.professor_name}
											</div>
										)}
										{metadata?.days && (
											<div className="flex items-center">
												<Calendar className="w-3 h-3 mr-1" />
												{metadata.days}
											</div>
										)}
									</div>
								</button>

								{isExpanded && (
									<div className="border-t border-gray-200 p-4 bg-gray-50">
										<h4 className="text-sm font-semibold text-gray-700 mb-3">
											Available Lectures
										</h4>
										<div className="space-y-2">
											{classGroup.lectures.map((lecture: Lecture) => (
												<button
													key={lecture.id}
													onClick={(e) => {
														e.stopPropagation();
														onLectureSelect(lecture.id);
													}}
													className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 active:border-blue-600 hover:shadow-sm transition-all"
												>
													<div className="text-sm font-medium text-gray-900 mb-1">
														{lecture.title}
													</div>
													<div className="flex items-center justify-between text-xs text-gray-500">
														<span>{formatDate(lecture.date)}</span>
														<div className="flex items-center">
															<Clock className="w-3 h-3 mr-1" />
															{formatTime(lecture.duration_seconds)}
														</div>
													</div>
												</button>
											))}
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>

				{lectures.length === 0 && (
					<div className="text-center py-12">
						<p className="text-sm md:text-base text-gray-500">No lectures available yet.</p>
					</div>
				)}
			</div>
		</div>
	);
}
