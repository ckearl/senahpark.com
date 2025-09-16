// Custom hook for managing lecture data
import { useState, useEffect } from "react";
import { Lecture, ClassGroup, LectureResponse } from "../types/lecture";

export const useLectures = () => {
	const [lectures, setLectures] = useState<ClassGroup[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchLectures = async () => {
		try {
			setLoading(true);
			const response = await fetch("/api/lectures");
			if (!response.ok) throw new Error("Failed to fetch lectures");

			const data = await response.json();
			setLectures(data);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchLectures();
	}, []);

	return {
		lectures,
		loading,
		error,
		refetch: fetchLectures,
	};
};

export const useLecture = (lectureId: string | null) => {
	const [lecture, setLecture] = useState<LectureResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchLecture = async (id: string) => {
		try {
			setLoading(true);
			const response = await fetch(`/api/lectures/${id}`);
			if (!response.ok) throw new Error("Failed to fetch lecture");

			const data = await response.json();
			setLecture(data);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (lectureId) {
			fetchLecture(lectureId);
		} else {
			setLecture(null);
		}
	}, [lectureId]);

	return {
		lecture,
		loading,
		error,
		refetch: lectureId ? () => fetchLecture(lectureId) : () => {},
	};
};
