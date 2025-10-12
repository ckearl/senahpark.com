"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2, Radio, Search, X } from "lucide-react";
import { TranscriptSegment } from "../../../../types/lecture";

const formatTime = (seconds: number): string => {
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, "0")}`;
};

interface TranscriptPanelProps {
	segments: TranscriptSegment[];
	activeSegmentIndex: number;
	loading: boolean;
	isPlaying?: boolean;
	onSegmentClick: (segment: TranscriptSegment) => void;
}

export default function TranscriptPanel({
	segments,
	activeSegmentIndex,
	loading,
	isPlaying = false,
	onSegmentClick,
}: TranscriptPanelProps) {
	const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);
	const [autoScroll, setAutoScroll] = useState(true);
	const [searchExpanded, setSearchExpanded] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const searchInputRef = useRef<HTMLInputElement>(null);

	// Determine if we should show the pulse animation
	const shouldPulse = searchQuery.length > 0 && isPlaying && autoScroll;

	// Filter segments based on search query
	const filteredSegments = searchQuery.trim()
		? segments.filter((segment) =>
				segment.text.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: segments;

	// Find the active segment index in filtered segments
	const filteredActiveIndex = searchQuery.trim()
		? filteredSegments.findIndex(
				(segment) => segments.indexOf(segment) === activeSegmentIndex
		  )
		: activeSegmentIndex;

	// Auto-scroll to active segment
	useEffect(() => {
		if (autoScroll && filteredActiveIndex >= 0 && segmentRefs.current[filteredActiveIndex]) {
			segmentRefs.current[filteredActiveIndex]?.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [filteredActiveIndex, autoScroll]);

	// Focus search input when expanded
	useEffect(() => {
		if (searchExpanded && searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, [searchExpanded]);

	const handleSearchToggle = () => {
		if (searchExpanded) {
			setSearchQuery("");
		}
		setSearchExpanded(!searchExpanded);
	};

	const handleSearchClear = () => {
		setSearchQuery("");
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}
	};

	if (loading) {
		return (
			<div className="bg-white rounded-lg shadow-lg p-6">
				<div className="flex items-center space-x-2">
					<Loader2 className="w-4 h-4 animate-spin" />
					<span>Loading transcript...</span>
				</div>
			</div>
		);
	}

	if (segments.length === 0) {
		return (
			<div className="bg-white rounded-lg shadow-lg p-6">
				<h3 className="text-lg font-semibold mb-4">Transcript</h3>
				<p className="text-gray-500">No transcript available for this lecture.</p>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg shadow-lg p-6">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold">Transcript</h3>
				<div className="flex items-center space-x-2">
					<button
						onClick={handleSearchToggle}
						className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
						title="Search transcript"
					>
						<Search className="w-4 h-4" />
					</button>
					<button
						onClick={() => setAutoScroll(!autoScroll)}
						className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
							autoScroll
								? "bg-blue-100 text-blue-700 hover:bg-blue-200"
								: "bg-gray-100 text-gray-600 hover:bg-gray-200"
						} ${
							shouldPulse
								? "animate-pulse-glow"
								: ""
						}`}
						title={autoScroll ? "Auto-scroll enabled" : "Auto-scroll disabled"}
					>
						<Radio className="w-4 h-4" />
						<span>{autoScroll ? "Following" : "Paused"}</span>
					</button>
				</div>
			</div>

			{/* Search Bar */}
			{searchExpanded && (
				<div className="mb-4 flex items-center space-x-2 animate-slide-down">
					<div className="relative flex-1">
						<input
							ref={searchInputRef}
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search in transcript..."
							className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
						/>
						{searchQuery && (
							<button
								onClick={handleSearchClear}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
								title="Clear search"
							>
								<X className="w-4 h-4" />
							</button>
						)}
					</div>
					<div className="text-sm text-gray-500 whitespace-nowrap">
						{searchQuery.trim() && (
							<span>
								{filteredSegments.length} result{filteredSegments.length !== 1 ? "s" : ""}
							</span>
						)}
					</div>
				</div>
			)}

			<div className="space-y-4 max-h-96 overflow-y-auto">
				{filteredSegments.length > 0 ? (
					filteredSegments.map((segment, index) => {
						const originalIndex = segments.indexOf(segment);
						return (
							<div
								key={segment.id}
								ref={(el) => {
									segmentRefs.current[index] = el;
								}}
								className={`p-3 rounded-lg cursor-pointer transition-colors ${
									originalIndex === activeSegmentIndex
										? "bg-blue-100 border-l-4 border-blue-600"
										: "bg-gray-50 hover:bg-gray-100"
								}`}
								onClick={() => onSegmentClick(segment)}
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
						);
					})
				) : (
					<div className="text-center py-8 text-gray-500">
						No results found for &quot;{searchQuery}&quot;
					</div>
				)}
			</div>

			<style jsx>{`
				@keyframes pulse-glow {
					0%, 100% {
						box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
					}
					50% {
						box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
					}
				}

				@keyframes slide-down {
					from {
						opacity: 0;
						transform: translateY(-10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.animate-pulse-glow {
					animation: pulse-glow 2s ease-in-out infinite;
				}

				.animate-slide-down {
					animation: slide-down 0.2s ease-out;
				}
			`}</style>
		</div>
	);
}
