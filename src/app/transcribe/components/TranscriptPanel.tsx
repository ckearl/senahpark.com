"use client";

import React, { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
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
	onSegmentClick: (segment: TranscriptSegment) => void;
}

export default function TranscriptPanel({
	segments,
	activeSegmentIndex,
	loading,
	onSegmentClick,
}: TranscriptPanelProps) {
	const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);

	// Auto-scroll to active segment
	useEffect(() => {
		if (activeSegmentIndex >= 0 && segmentRefs.current[activeSegmentIndex]) {
			segmentRefs.current[activeSegmentIndex]?.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [activeSegmentIndex]);

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
				))}
			</div>
		</div>
	);
}
