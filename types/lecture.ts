// Database types matching your SQL schema

export interface Lecture {
	id: string;
	title: string;
	professor: string;
	date: string;
	duration_seconds: number;
	class_number: string;
	language: string;
	created_at?: string;
	updated_at?: string;
}

export interface Speaker {
	id: string;
	lecture_id: string;
	speaker_name: string;
	speaker_order: number;
	created_at?: string;
}

export interface TranscriptSegment {
	id: string;
	lecture_id: string;
	start_time: number;
	end_time: number;
	text: string;
	speaker_name: string | null;
	segment_order: number;
	created_at?: string;
}

export interface LectureText {
	id: string;
	lecture_id: string;
	text: string;
	created_at?: string;
	updated_at?: string;
}

export interface TextInsights {
	id: string;
	lecture_id: string;
	summary: string;
	key_terms: string[];
	main_ideas: string[];
	review_questions: string[];
	created_at?: string;
	updated_at?: string;
}

export interface ClassGroup {
	class_number: string;
	lectures: Lecture[];
}

// API response types
export interface LectureWithSegments extends Lecture {
	segments: TranscriptSegment[];
	insights?: TextInsights;
}

export interface LectureResponse {
	lecture: Lecture;
	segments: TranscriptSegment[];
	insights: TextInsights | null;
}
