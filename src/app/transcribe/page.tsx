"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import LectureViewer from "@/app/transcribe/components/LectureViewerIntegrated";
import LectureLanding from "@/app/transcribe/components/LectureLanding";

export default function LecturePage() {
	const [selectedLectureId, setSelectedLectureId] = useState<string | null>(null);

	if (selectedLectureId) {
		return (
			<div>
				<button
					onClick={() => setSelectedLectureId(null)}
					className="fixed top-6 left-6 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-gray-50"
					title="Back to Library"
				>
					<ArrowLeft className="w-5 h-5 text-gray-700" />
				</button>
				<LectureViewer initialLectureId={selectedLectureId} />
			</div>
		);
	}

	return <LectureLanding onLectureSelect={setSelectedLectureId} />;
}
