"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useLectures, useLecture } from "../../../../hooks/useLectures";
import { Lecture, TranscriptSegment } from "../../../../types/lecture";
import AudioPlayer from "./AudioPlayer";
import TranscriptPanel from "./TranscriptPanel";
import InsightsPanel from "./InsightsPanel";
import LectureSidebar from "./LectureSidebar";
import ClassList from "./ClassList";

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
	} = useLecture(selectedLectureId);

	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [expandedClasses, setExpandedClasses] = useState<Set<string>>(
		new Set()
	);
	const [audioUrl, setAudioUrl] = useState<string>("");
	const [showSkipPopover, setShowSkipPopover] = useState<{
		type: "forward" | "backward" | null;
		show: boolean;
	}>({ type: null, show: false });
	const [volume, setVolume] = useState(1);

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

	// Set audio URL when lecture changes
	useEffect(() => {
		if (selectedLecture) {
			const url = `/api/audio/${selectedLecture.id}`;
			setAudioUrl(url);
		}
	}, [selectedLecture]);

	// Keyboard shortcuts
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			// Ignore if user is typing in an input field
			if (
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement
			) {
				return;
			}

			switch (e.key.toLowerCase()) {
				case " ":
					e.preventDefault();
					togglePlayPause();
					break;
				case "arrowright":
					e.preventDefault();
					skipSeconds(10);
					break;
				case "arrowleft":
					e.preventDefault();
					skipSeconds(-10);
					break;
				case "m":
					e.preventDefault();
					setVolume((prev) => (prev > 0 ? 0 : 1));
					break;
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
					e.preventDefault();
					const digit = parseInt(e.key);
					const targetTime = (digit / 10) * duration;
					setCurrentTime(targetTime);
					break;
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [duration, currentTime]);

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!duration) return;

		const rect = e.currentTarget.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const newTime = (clickX / rect.width) * duration;

		setCurrentTime(newTime);
	};

	const handleSegmentClick = (segment: TranscriptSegment) => {
		setCurrentTime(segment.start_time);
	};

	const skipSeconds = (seconds: number) => {
		const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
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
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(e.target.value);
		setVolume(newVolume);
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
						<AudioPlayer
							audioUrl={audioUrl}
							currentTime={currentTime}
							duration={duration}
							isPlaying={isPlaying}
							volume={volume}
							showSkipPopover={showSkipPopover}
							onTimeUpdate={setCurrentTime}
							onDurationChange={setDuration}
							onPlayStateChange={setIsPlaying}
							onSeek={handleSeek}
							onSkip={skipSeconds}
							onVolumeChange={handleVolumeChange}
							onTogglePlayPause={togglePlayPause}
						/>

						<TranscriptPanel
							segments={segments}
							activeSegmentIndex={activeSegmentIndex}
							loading={lectureLoading}
							onSegmentClick={handleSegmentClick}
						/>

						<InsightsPanel insights={insights} />

						<ClassList
							lectures={lectures}
							expandedClasses={expandedClasses}
							selectedLectureId={selectedLecture?.id}
							onToggleClassExpansion={toggleClassExpansion}
							onLectureSelect={handleLectureSelect}
						/>
					</div>

					{/* Sidebar */}
					<div className="lg:col-span-1">
						<LectureSidebar
							lectures={currentClassLectures}
							selectedLectureId={selectedLecture?.id}
							onLectureSelect={handleLectureSelect}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
