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
} from "lucide-react";

// Types based on your SQL schema
interface Lecture {
	id: string;
	title: string;
	professor: string;
	date: string;
	duration_seconds: number;
	class_number: string;
	language: string;
}

interface TranscriptSegment {
	id: string;
	lecture_id: string;
	start_time: number;
	end_time: number;
	text: string;
	speaker_name: string | null;
	segment_order: number;
}

interface TextInsights {
	id: string;
	lecture_id: string;
	summary: string;
	key_terms: string[];
	main_ideas: string[];
	review_questions: string[];
}

interface ClassGroup {
	class_number: string;
	lectures: Lecture[];
}

// Mock data for demonstration
const mockLectures: Lecture[] = [
	{
		id: "1",
		title: "Process Fundamentals",
		professor: "Dr. Smith",
		date: "2025-09-01",
		duration_seconds: 4200,
		class_number: "MBA 530",
		language: "en-US",
	},
	{
		id: "2",
		title: "Donner Company part 1",
		professor: "Dr. Smith",
		date: "2025-09-08",
		duration_seconds: 3800,
		class_number: "MBA 530",
		language: "en-US",
	},
	{
		id: "3",
		title: "Donner Company part 2",
		professor: "Dr. Smith",
		date: "2025-09-15",
		duration_seconds: 4320,
		class_number: "MBA 530",
		language: "en-US",
	},
	{
		id: "4",
		title: "Fabrictek",
		professor: "Dr. Smith",
		date: "2025-09-15",
		duration_seconds: 4623,
		class_number: "MBA 530",
		language: "en-US",
	},
	{
		id: "5",
		title: "Financial Analysis Basics",
		professor: "Dr. Johnson",
		date: "2025-09-10",
		duration_seconds: 3900,
		class_number: "MBA 540",
		language: "en-US",
	},
];

const mockSegments: TranscriptSegment[] = [
	{
		id: "1",
		lecture_id: "4",
		start_time: 0,
		end_time: 15.5,
		text: "Welcome to today's lecture on Fabrictek. We're going to explore some fascinating operational challenges.",
		speaker_name: "Professor",
		segment_order: 1,
	},
	{
		id: "2",
		lecture_id: "4",
		start_time: 15.5,
		end_time: 45.2,
		text: "And here's the other one. If you've got operational time on your planet, if you have capacity, do you want to fill that capacity?",
		speaker_name: "Professor",
		segment_order: 2,
	},
	{
		id: "3",
		lecture_id: "4",
		start_time: 45.2,
		end_time: 78.9,
		text: "And sometimes they don't want to get that capacity up because of the other products in their line less properly.",
		speaker_name: "Professor",
		segment_order: 3,
	},
	{
		id: "4",
		lecture_id: "4",
		start_time: 78.9,
		end_time: 82.1,
		text: "So there's a readme at all these different things.",
		speaker_name: "Professor",
		segment_order: 4,
	},
	{
		id: "5",
		lecture_id: "4",
		start_time: 82.1,
		end_time: 106.8,
		text: "And you within your organization, you need to understand what your role is.",
		speaker_name: "Professor",
		segment_order: 5,
	},
	{
		id: "6",
		lecture_id: "4",
		start_time: 106.8,
		end_time: 134.2,
		text: "Just like I knew Marie Calder's was supposed to be a profit driver.",
		speaker_name: "Professor",
		segment_order: 6,
	},
	{
		id: "7",
		lecture_id: "4",
		start_time: 134.2,
		end_time: 154.0,
		text: "Do you understand what your role is?",
		speaker_name: "Professor",
		segment_order: 7,
	},
];

const mockInsights: TextInsights = {
	id: "1",
	lecture_id: "4",
	summary:
		"This lecture explores operational capacity management and organizational role clarity, using real-world case studies to illustrate key decision-making frameworks in operations management.",
	key_terms: [
		"Operational Capacity",
		"Product Mix",
		"Role Clarity",
		"Profit Driver",
		"Resource Allocation",
	],
	main_ideas: [
		"Capacity utilization decisions impact overall product line performance",
		"Understanding organizational roles is crucial for effective operations",
		"Trade-offs exist between maximizing individual capacity vs. optimizing the entire system",
		"Case study analysis reveals practical applications of theoretical concepts",
	],
	review_questions: [
		"How do you determine when to fill operational capacity vs. leaving it unused?",
		"What factors should be considered when evaluating product line interactions?",
		"How can organizations ensure role clarity across different departments?",
		"What are the key metrics for evaluating operational effectiveness?",
	],
};

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

export default function LectureViewer() {
	const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(
		mockLectures[3]
	); // Default to Fabrictek
	const [segments, setSegments] = useState<TranscriptSegment[]>(mockSegments);
	const [insights, setInsights] = useState<TextInsights | null>(mockInsights);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [expandedClasses, setExpandedClasses] = useState<Set<string>>(
		new Set(["MBA 530"])
	);
	const [showSkipPopover, setShowSkipPopover] = useState<{
		type: "forward" | "backward" | null;
		show: boolean;
	}>({ type: null, show: false });

	const audioRef = useRef<HTMLAudioElement>(null);
	const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);

	// Group lectures by class
	const classGroups: ClassGroup[] = mockLectures.reduce((acc, lecture) => {
		const existingClass = acc.find(
			(c) => c.class_number === lecture.class_number
		);
		if (existingClass) {
			existingClass.lectures.push(lecture);
		} else {
			acc.push({
				class_number: lecture.class_number,
				lectures: [lecture],
			});
		}
		return acc;
	}, [] as ClassGroup[]);

	// Get current class lectures
	const currentClassLectures = selectedLecture
		? mockLectures.filter(
				(l) => l.class_number === selectedLecture.class_number
		  )
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

			// Show popover
			setShowSkipPopover({
				type: seconds > 0 ? "forward" : "backward",
				show: true,
			});

			// Hide popover after 500ms
			setTimeout(() => {
				setShowSkipPopover({ type: null, show: false });
			}, 500);
		}
	};

	const handleLectureSelect = (lecture: Lecture) => {
		setSelectedLecture(lecture);
		// In a real app, you'd fetch the segments and insights for this lecture
		if (lecture.id === "4") {
			setSegments(mockSegments);
			setInsights(mockInsights);
		} else {
			setSegments([]);
			setInsights(null);
		}
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

	if (!selectedLecture) {
		return <div className="p-8">Please select a lecture to view.</div>;
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
							<audio ref={audioRef} preload="metadata">
								<source src="/api/audio/sample.mp3" type="audio/mpeg" />
								Your browser does not support the audio element.
							</audio>

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
									<div className="relative">
										<button
											onClick={() => skipSeconds(-10)}
											className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
										>
											<SkipBack className="w-5 h-5" />
										</button>
										{showSkipPopover.show && showSkipPopover.type === "backward" && (
											<div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm font-medium whitespace-nowrap animate-fade-in">
												-10s
											</div>
										)}
									</div>

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

									<div className="relative">
										<button
											onClick={() => skipSeconds(10)}
											className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
										>
											<SkipForward className="w-5 h-5" />
										</button>
										{showSkipPopover.show && showSkipPopover.type === "forward" && (
											<div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm font-medium whitespace-nowrap animate-fade-in">
												+10s
											</div>
										)}
									</div>

									<Volume2 className="w-5 h-5 text-gray-500" />
								</div>

								<div className="text-sm text-gray-600">
									{formatTime(currentTime)} / {formatTime(duration)}
								</div>
							</div>
						</div>

						{/* Transcript */}
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
								{classGroups.map((classGroup) => (
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
