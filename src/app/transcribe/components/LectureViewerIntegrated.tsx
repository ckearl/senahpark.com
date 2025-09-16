"use client";

import React, { useState, useEffect, useRef } from "react";
import {
	Play,
	Pause,
	SkipBack,
	SkipForward,
	Volume2,
	ChevronDown,
	ChevronRight,
	Loader2,
} from "lucide-react";
import { useLectures, useLecture } from "../../../../hooks/useLectures";
import { Lecture, TranscriptSegment } from "../../../../types/lecture";

const formatTime = (seconds: number): string => {
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
};

interface LectureViewerProps {
	initialLectureId?: string;
}

export default function LectureViewer({
	initialLectureId,
}: LectureViewerProps) {
	const {
		lectures,
		loading: lecturesLoading,
		error: lecturesError,
	} = useLectures();
	const [selectedLectureId, setSelectedLectureId] = useState<string | null>(
		initialLectureId || null
	);
	const {
		lecture: lectureData,
		loading: lectureLoading,
		// error: lectureError,
	} = useLecture(selectedLectureId);

	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [expandedClasses, setExpandedClasses] = useState<Set<string>>(
		new Set()
	);
	const [audioUrl, setAudioUrl] = useState<string>("");

	const audioRef = useRef<HTMLAudioElement>(null);
	const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);

	// Set initial expanded classes when lectures load
	useEffect(() => {
		if (lectures.length > 0 && expandedClasses.size === 0) {
			setExpandedClasses(new Set([lectures[0].class_number]));
		}
	}, [lectures, expandedClasses.size]);

	// Set initial lecture if none selected
	useEffect(() => {
		if (
			!selectedLectureId &&
			lectures.length > 0 &&
			lectures[0].lectures.length > 0
		) {
			setSelectedLectureId(lectures[0].lectures[0].id);
		}
	}, [lectures, selectedLectureId]);

	const segments = lectureData?.segments || [];
	const insights = lectureData?.insights;
	const selectedLecture = lectureData?.lecture;

	// Get current class lectures
	const currentClassLectures = selectedLecture
		? lectures.find((c) => c.class_number === selectedLecture.class_number)
				?.lectures || []
		: [];

	// Find current active segment
	const activeSegmentIndex = segments.findIndex((segment, index) => {
		const nextSegment = segments[index + 1];
		return (
			currentTime >= segment.start_time &&
			(!nextSegment || currentTime < nextSegment.start_time)
		);
	});

	// Audio event handlers
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
		const handleLoadedMetadata = () => setDuration(audio.duration);
		const handlePlay = () => setIsPlaying(true);
		const handlePause = () => setIsPlaying(false);

		audio.addEventListener("timeupdate", handleTimeUpdate);
		audio.addEventListener("loadedmetadata", handleLoadedMetadata);
		audio.addEventListener("play", handlePlay);
		audio.addEventListener("pause", handlePause);

		return () => {
			audio.removeEventListener("timeupdate", handleTimeUpdate);
			audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
			audio.removeEventListener("play", handlePlay);
			audio.removeEventListener("pause", handlePause);
		};
	}, []);

	// Auto-scroll to active segment
	useEffect(() => {
		if (activeSegmentIndex >= 0 && segmentRefs.current[activeSegmentIndex]) {
			segmentRefs.current[activeSegmentIndex]?.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [activeSegmentIndex]);

	// Set audio URL when lecture changes (you'll need to implement audio URL logic)
	useEffect(() => {
		if (selectedLecture) {
			const url = `/api/audio/${selectedLecture.id}`;
			console.log("Setting audio URL:", url);
			console.log("Lecture details:", selectedLecture);
			setAudioUrl(url);
		}
	}, [selectedLecture]);

	const togglePlayPause = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
		}
	};

	const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!audioRef.current || !duration) return;

		const rect = e.currentTarget.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const newTime = (clickX / rect.width) * duration;

		audioRef.current.currentTime = newTime;
		setCurrentTime(newTime);
	};

	const handleSegmentClick = (segment: TranscriptSegment) => {
		if (audioRef.current) {
			audioRef.current.currentTime = segment.start_time;
			setCurrentTime(segment.start_time);
		}
	};

	const skipSeconds = (seconds: number) => {
		if (audioRef.current) {
			const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
			audioRef.current.currentTime = newTime;
			setCurrentTime(newTime);
		}
	};

	const handleLectureSelect = (lecture: Lecture) => {
		setSelectedLectureId(lecture.id);
		setCurrentTime(0);
		setIsPlaying(false);
	};

	const toggleClassExpansion = (classNumber: string) => {
		const newExpanded = new Set(expandedClasses);
		if (newExpanded.has(classNumber)) {
			newExpanded.delete(classNumber);
		} else {
			newExpanded.add(classNumber);
		}
		setExpandedClasses(newExpanded);
	};

	if (lecturesLoading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="flex items-center space-x-2">
					<Loader2 className="w-6 h-6 animate-spin" />
					<span>Loading lectures...</span>
				</div>
			</div>
		);
	}

	if (lecturesError) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-xl font-semibold text-red-600 mb-2">
						Error loading lectures
					</h2>
					<p className="text-gray-600">{lecturesError}</p>
				</div>
			</div>
		);
	}

	if (!selectedLecture) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-xl font-semibold text-gray-700 mb-2">
						No lecture selected
					</h2>
					<p className="text-gray-600">Please select a lecture to view.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						{selectedLecture.class_number} Operations Management |{" "}
						{formatDate(selectedLecture.date)}
					</h1>
					<h2 className="text-xl text-gray-600">{selectedLecture.title}</h2>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
					{/* Main Content */}
					<div className="lg:col-span-3 space-y-6">
						{/* Audio Player */}
						<div className="bg-white rounded-lg shadow-lg p-6">
							{audioUrl ? (
								<audio ref={audioRef} preload="metadata">
									<source src={audioUrl} type="audio/mpeg" />
									Your browser does not support the audio element.
								</audio>
							) : (
								<audio ref={audioRef} preload="none">
									{/* No source until audioUrl is available */}
								</audio>
							)}

							{/* Progress Bar */}
							<div
								className="w-full h-2 bg-gray-200 rounded-full mb-4 cursor-pointer"
								onClick={handleSeek}
							>
								<div
									className="h-full bg-blue-600 rounded-full transition-all duration-100"
									style={{
										width: `${duration ? (currentTime / duration) * 100 : 0}%`,
									}}
								/>
							</div>

							{/* Controls */}
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<button
										onClick={() => skipSeconds(-10)}
										className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
									>
										<SkipBack className="w-5 h-5" />
									</button>

									<button
										onClick={togglePlayPause}
										className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
									>
										{isPlaying ? (
											<Pause className="w-6 h-6" />
										) : (
											<Play className="w-6 h-6" />
										)}
									</button>

									<button
										onClick={() => skipSeconds(10)}
										className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
									>
										<SkipForward className="w-5 h-5" />
									</button>

									<Volume2 className="w-5 h-5 text-gray-500" />
								</div>

								<div className="text-sm text-gray-600">
									{formatTime(currentTime)} / {formatTime(duration)}
								</div>
							</div>
						</div>

						{/* Transcript */}
						{lectureLoading ? (
							<div className="bg-white rounded-lg shadow-lg p-6">
								<div className="flex items-center space-x-2">
									<Loader2 className="w-4 h-4 animate-spin" />
									<span>Loading transcript...</span>
								</div>
							</div>
						) : segments.length > 0 ? (
							<div className="bg-white rounded-lg shadow-lg p-6">
								<h3 className="text-lg font-semibold mb-4">Transcript</h3>
								<div className="space-y-4 max-h-96 overflow-y-auto">
									{segments.map((segment, index) => (
										<div
											key={segment.id}
											ref={(el) => {
												segmentRefs.current[index] = el;
											}}
											className={`p-3 rounded-lg cursor-pointer transition-colors ${
												activeSegmentIndex === index
													? "bg-blue-100 border-l-4 border-blue-600"
													: "bg-gray-50 hover:bg-gray-100"
											}`}
											onClick={() => handleSegmentClick(segment)}
										>
											<div className="flex items-start space-x-3">
												<span className="text-xs text-gray-500 font-mono mt-1 min-w-16">
													{formatTime(segment.start_time)}
												</span>
												<p className="text-sm text-gray-800 leading-relaxed">
													{segment.text}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						) : (
							<div className="bg-white rounded-lg shadow-lg p-6">
								<h3 className="text-lg font-semibold mb-4">Transcript</h3>
								<p className="text-gray-500">
									No transcript available for this lecture.
								</p>
							</div>
						)}

						{/* Text Insights */}
						{insights && (
							<div className="bg-white rounded-lg shadow-lg p-6">
								<h3 className="text-lg font-semibold mb-6">Text Insights</h3>
								
								<div className="grid gap-6">
									{/* Key Terms */}
									<div>
										<h4 className="font-medium text-gray-900 mb-2">
											Key Terms
										</h4>
										<div className="flex flex-wrap gap-2">
											{insights.key_terms.map((term, index) => (
												<span
													key={index}
													className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
												>
													{term}
												</span>
											))}
										</div>
									</div>

									{/* Summary */}
									<div>
										<h4 className="font-medium text-gray-900 mb-2">Summary</h4>
										<p className="text-sm text-gray-700 leading-relaxed">
											{insights.summary}
										</p>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* Main Ideas */}
									<div>
										<h4 className="font-medium text-gray-900 mb-2">
											Main Ideas
										</h4>
										<ul className="space-y-1">
											{insights.main_ideas.map((idea, index) => (
												<li
													key={index}
													className="text-sm text-gray-700 flex items-start"
												>
													<span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
													{idea}
												</li>
											))}
										</ul>
									</div>

									{/* Review Questions */}
									<div>
										<h4 className="font-medium text-gray-900 mb-2">
											Questions for Review
										</h4>
										<ul className="space-y-1">
											{insights.review_questions.map((question, index) => (
												<li
													key={index}
													className="text-sm text-gray-700 flex items-start"
												>
													<span className="text-blue-600 mr-2 flex-shrink-0">
														Q{index + 1}:
													</span>
													{question}
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						)}

						{/* All Classes */}
						<div className="bg-white rounded-lg shadow-lg p-6">
							<h3 className="text-lg font-semibold mb-4">All Classes</h3>
							<div className="space-y-2">
								{lectures.map((classGroup) => (
									<div key={classGroup.class_number}>
										<button
											onClick={() =>
												toggleClassExpansion(classGroup.class_number)
											}
											className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg"
										>
											<span className="font-medium text-gray-900">
												{classGroup.class_number}
											</span>
											{expandedClasses.has(classGroup.class_number) ? (
												<ChevronDown className="w-4 h-4" />
											) : (
												<ChevronRight className="w-4 h-4" />
											)}
										</button>

										{expandedClasses.has(classGroup.class_number) && (
											<div className="ml-4 space-y-1">
												{classGroup.lectures.map((lecture) => (
													<button
														key={lecture.id}
														onClick={() => handleLectureSelect(lecture)}
														className={`w-full text-left p-2 rounded text-sm hover:bg-gray-50 ${
															selectedLecture?.id === lecture.id
																? "bg-blue-50 text-blue-700 border-l-2 border-blue-600 pl-3"
																: "text-gray-600"
														}`}
													>
														<div className="font-medium">{lecture.title}</div>
														<div className="text-xs opacity-75">
															{formatDate(lecture.date)} •{" "}
															{formatTime(lecture.duration_seconds)}
														</div>
													</button>
												))}
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
							<h3 className="text-lg font-semibold mb-4">All lectures</h3>
							<div className="space-y-2">
								{currentClassLectures.map((lecture) => (
									<button
										key={lecture.id}
										onClick={() => handleLectureSelect(lecture)}
										className={`w-full text-left p-3 rounded-lg transition-colors ${
											selectedLecture?.id === lecture.id
												? "bg-blue-100 text-blue-900 border border-blue-200"
												: "hover:bg-gray-50 text-gray-700"
										}`}
									>
										<div className="font-medium text-sm mb-1">
											{lecture.title}
										</div>
										<div className="text-xs opacity-75">
											{formatDate(lecture.date)}
										</div>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
