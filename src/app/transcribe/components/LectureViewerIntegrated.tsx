"use client";

import React, { useState, useEffect, useRef } from "react";
import { Loader2, Keyboard } from "lucide-react";
import { useLectures, useLecture } from "../../../../hooks/useLectures";
import { Lecture, TranscriptSegment } from "../../../../types/lecture";
import AudioPlayer from "./AudioPlayer";
import TranscriptPanel from "./TranscriptPanel";
import InsightsPanel from "./InsightsPanel";
import LectureSidebar from "./LectureSidebar";
import ClassList from "./ClassList";
import KeyboardShortcutsModal from "./KeyboardShortcutsModal";
import {
	saveLectureProgress,
	getLectureProgress,
	shouldResetProgress,
} from "../../../utils/progressStorage";

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
	const [playbackSpeed, setPlaybackSpeed] = useState(1);
	const [showShortcutsModal, setShowShortcutsModal] = useState(false);
	const [searchToggleCounter, setSearchToggleCounter] = useState(0);
	const [mobileTab, setMobileTab] = useState<"transcript" | "insights" | "lectures">("transcript");
	const hasLoadedProgress = useRef<Set<string>>(new Set());

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

	// Set audio URL when lecture changes and load saved progress
	useEffect(() => {
		if (selectedLecture) {
			const url = `/api/audio/${selectedLecture.id}`;
			setAudioUrl(url);

			// Only load saved progress if we haven't already loaded it for this lecture
			if (!hasLoadedProgress.current.has(selectedLecture.id)) {
				const savedProgress = getLectureProgress(selectedLecture.id);
				if (savedProgress !== null && savedProgress > 0) {
					setCurrentTime(savedProgress);
				} else {
					setCurrentTime(0);
				}
				hasLoadedProgress.current.add(selectedLecture.id);
			}
		}
	}, [selectedLecture]);

	// Save progress to cookies whenever currentTime changes (with debouncing)
	useEffect(() => {
		if (selectedLecture && currentTime > 0 && duration > 0) {
			// Use a timeout to debounce saves (only save after user stops seeking)
			const saveTimeout = setTimeout(() => {
				// Check if lecture is complete (95% or more)
				if (shouldResetProgress(currentTime, duration)) {
					// Reset progress if lecture is essentially complete
					saveLectureProgress(selectedLecture.id, 0);
				} else {
					// Save progress rounded to nearest 10 seconds
					saveLectureProgress(selectedLecture.id, currentTime);
				}
			}, 500); // Wait 500ms after last change before saving

			return () => clearTimeout(saveTimeout);
		}
	}, [currentTime, selectedLecture, duration]);

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

			// Show shortcuts modal on ? key
			if (e.key === "?") {
				e.preventDefault();
				setShowShortcutsModal(true);
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
				case "arrowup":
					e.preventDefault();
					skipSeconds(30);
					break;
				case "arrowdown":
					e.preventDefault();
					skipSeconds(-30);
					break;
				case "j":
					e.preventDefault();
					skipSeconds(-10);
					break;
				case "k":
					e.preventDefault();
					togglePlayPause();
					break;
				case "l":
					e.preventDefault();
					skipSeconds(10);
					break;
				case "m":
					e.preventDefault();
					setVolume((prev) => (prev > 0 ? 0 : 1));
					break;
				case "f":
					e.preventDefault();
					// Trigger search toggle by updating state
					setSearchToggleCounter((prev) => prev + 1);
					break;
				case ",":
					e.preventDefault();
					if (isPlaying) {
						togglePlayPause();
					}
					skipSeconds(-1 / 30); // Go back one frame (assuming 30fps)
					break;
				case ".":
					e.preventDefault();
					if (isPlaying) {
						togglePlayPause();
					}
					skipSeconds(1 / 30); // Go forward one frame
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
		<div className="min-h-screen bg-gray-50 md:p-6 pb-24 md:pb-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-4 md:mb-6 flex items-start justify-between px-4 md:px-0 pt-4 md:pt-0">
					<div className="flex-1 min-w-0 pr-3">
						<h1 className="text-lg md:text-3xl font-bold text-gray-900 mb-1 md:mb-2 truncate">
							{selectedLecture.class_number} <span className="hidden sm:inline">Operations Management</span> | {formatDate(selectedLecture.date)}
						</h1>
						<h2 className="text-sm md:text-xl text-gray-600 truncate">{selectedLecture.title}</h2>
					</div>
					<button
						onClick={() => setShowShortcutsModal(true)}
						className="p-2 md:p-2.5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-blue-300 flex-shrink-0"
						title="Keyboard shortcuts (Press ?)"
					>
						<Keyboard className="w-4 h-4 md:w-5 md:h-5" />
					</button>
				</div>

				{/* Desktop Layout */}
				<div className="hidden md:grid grid-cols-1 lg:grid-cols-4 gap-6">
					{/* Main Content */}
					<div className="lg:col-span-3 space-y-6">
						<AudioPlayer
							audioUrl={audioUrl}
							currentTime={currentTime}
							duration={duration}
							isPlaying={isPlaying}
							volume={volume}
							playbackSpeed={playbackSpeed}
							showSkipPopover={showSkipPopover}
							onTimeUpdate={setCurrentTime}
							onDurationChange={setDuration}
							onPlayStateChange={setIsPlaying}
							onSeek={handleSeek}
							onSkip={skipSeconds}
							onVolumeChange={handleVolumeChange}
							onPlaybackSpeedChange={setPlaybackSpeed}
							onTogglePlayPause={togglePlayPause}
						/>

						<TranscriptPanel
							segments={segments}
							activeSegmentIndex={activeSegmentIndex}
							loading={lectureLoading}
							isPlaying={isPlaying}
							onSegmentClick={handleSegmentClick}
							searchToggleTrigger={searchToggleCounter}
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

				{/* Mobile Layout */}
				<div className="md:hidden">
					{/* Mobile Tabs */}
					<div className="flex border-b border-gray-200 sticky top-0 bg-gray-50 z-10 px-4">
						<button
							onClick={() => setMobileTab("transcript")}
							className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
								mobileTab === "transcript"
									? "border-blue-600 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700"
							}`}
						>
							Transcript
						</button>
						<button
							onClick={() => setMobileTab("insights")}
							className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
								mobileTab === "insights"
									? "border-blue-600 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700"
							}`}
						>
							Insights
						</button>
						<button
							onClick={() => setMobileTab("lectures")}
							className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
								mobileTab === "lectures"
									? "border-blue-600 text-blue-600"
									: "border-transparent text-gray-500 hover:text-gray-700"
							}`}
						>
							Lectures
						</button>
					</div>

					{/* Mobile Tab Content */}
					<div className="px-4 pt-4">
						{mobileTab === "transcript" && (
							<TranscriptPanel
								segments={segments}
								activeSegmentIndex={activeSegmentIndex}
								loading={lectureLoading}
								isPlaying={isPlaying}
								onSegmentClick={handleSegmentClick}
								searchToggleTrigger={searchToggleCounter}
							/>
						)}
						{mobileTab === "insights" && (
							<InsightsPanel insights={insights} />
						)}
						{mobileTab === "lectures" && (
							<div className="space-y-4">
								<LectureSidebar
									lectures={currentClassLectures}
									selectedLectureId={selectedLecture?.id}
									onLectureSelect={handleLectureSelect}
								/>
								<ClassList
									lectures={lectures}
									expandedClasses={expandedClasses}
									selectedLectureId={selectedLecture?.id}
									onToggleClassExpansion={toggleClassExpansion}
									onLectureSelect={handleLectureSelect}
								/>
							</div>
						)}
					</div>
				</div>

				{/* Sticky Mobile Audio Player */}
				<div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
					<AudioPlayer
						audioUrl={audioUrl}
						currentTime={currentTime}
						duration={duration}
						isPlaying={isPlaying}
						volume={volume}
						playbackSpeed={playbackSpeed}
						showSkipPopover={showSkipPopover}
						onTimeUpdate={setCurrentTime}
						onDurationChange={setDuration}
						onPlayStateChange={setIsPlaying}
						onSeek={handleSeek}
						onSkip={skipSeconds}
						onVolumeChange={handleVolumeChange}
						onPlaybackSpeedChange={setPlaybackSpeed}
						onTogglePlayPause={togglePlayPause}
					/>
				</div>
			</div>

			{/* Keyboard Shortcuts Modal */}
			<KeyboardShortcutsModal
				isOpen={showShortcutsModal}
				onClose={() => setShowShortcutsModal(false)}
			/>
		</div>
	);
}
