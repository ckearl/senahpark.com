"use client";

import React from "react";
import { Lecture } from "../../../../types/lecture";

const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
};

interface LectureSidebarProps {
	lectures: Lecture[];
	selectedLectureId: string | undefined;
	onLectureSelect: (lecture: Lecture) => void;
}

export default function LectureSidebar({
	lectures,
	selectedLectureId,
	onLectureSelect,
}: LectureSidebarProps) {
	return (
		<div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
			<h3 className="text-lg font-semibold mb-4">All lectures</h3>
			<div className="space-y-2">
				{lectures.map((lecture) => (
					<button
						key={lecture.id}
						onClick={() => onLectureSelect(lecture)}
						className={`w-full text-left p-3 rounded-lg transition-colors ${
							selectedLectureId === lecture.id
								? "bg-blue-100 text-blue-900 border border-blue-200"
								: "hover:bg-gray-50 text-gray-700"
						}`}
					>
						<div className="font-medium text-sm mb-1">{lecture.title}</div>
						<div className="text-xs opacity-75">{formatDate(lecture.date)}</div>
					</button>
				))}
			</div>
		</div>
	);
}
