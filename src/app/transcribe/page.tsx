"use client";

import { useState } from "react";
import LectureViewer from "@/app/transcribe/components/LectureViewerIntegrated";
import LectureLanding from "@/app/transcribe/components/LectureLanding";

export default function LecturePage() {
	const [selectedLectureId, setSelectedLectureId] = useState<string | null>(null);

	if (selectedLectureId) {
		return (
			<div>
				<button
					onClick={() => setSelectedLectureId(null)}
					className="fixed top-6 left-6 z-50 px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-sm font-medium text-gray-700 hover:text-gray-900"
				>
					← Back to Library
				</button>
				<LectureViewer initialLectureId={selectedLectureId} />
			</div>
		);
	}

	return <LectureLanding onLectureSelect={setSelectedLectureId} />;
}
