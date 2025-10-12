"use client";

import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Lecture } from "../../../../types/lecture";

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

interface ClassGroup {
	class_number: string;
	lectures: Lecture[];
}

interface ClassListProps {
	lectures: ClassGroup[];
	expandedClasses: Set<string>;
	selectedLectureId: string | undefined;
	onToggleClassExpansion: (classNumber: string) => void;
	onLectureSelect: (lecture: Lecture) => void;
}

export default function ClassList({
	lectures,
	expandedClasses,
	selectedLectureId,
	onToggleClassExpansion,
	onLectureSelect,
}: ClassListProps) {
	return (
		<div className="bg-white rounded-lg shadow-lg p-6">
			<h3 className="text-lg font-semibold mb-4">All Classes</h3>
			<div className="space-y-2">
				{lectures.map((classGroup) => (
					<div key={classGroup.class_number}>
						<button
							onClick={() => onToggleClassExpansion(classGroup.class_number)}
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
										onClick={() => onLectureSelect(lecture)}
										className={`w-full text-left p-2 rounded text-sm hover:bg-gray-50 ${
											selectedLectureId === lecture.id
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
	);
}
