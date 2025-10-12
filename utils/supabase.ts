// Supabase utility functions for lecture data
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
	Lecture,
	TranscriptSegment,
	TextInsights,
	LectureResponse,
	ClassGroup,
} from "../types/lecture";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
	console.error("Missing Supabase environment variables");
	console.error("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "set" : "missing");
	console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseKey ? "set" : "missing");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export class LectureService {
	private supabase: SupabaseClient;

	constructor() {
		this.supabase = supabase;
	}

	// Get all lectures grouped by class
	async getAllLectures(): Promise<ClassGroup[]> {
		const { data: lectures, error } = await this.supabase
			.from("lectures")
			.select("*")
			.order("date", { ascending: false });

		if (error) {
			console.error("Error fetching lectures:", error);
			return [];
		}

		// Group lectures by class_number
		// Group lectures by class_number
		const grouped = lectures.reduce((acc: ClassGroup[], lecture) => {
			const existingClass = acc.find(
				(c: ClassGroup) => c.class_number === lecture.class_number
			);
			if (existingClass) {
				existingClass.lectures.push(lecture);
			} else {
				acc.push({
					class_number: lecture.class_number,
					lectures: [lecture],
				});
			}
			return acc;
		}, [] as ClassGroup[]);

		return grouped;
	}

	// Get lectures for a specific class
	async getLecturesByClass(classNumber: string): Promise<Lecture[]> {
		const { data, error } = await this.supabase
			.from("lectures")
			.select("*")
			.eq("class_number", classNumber)
			.order("date", { ascending: false });

		if (error) {
			console.error("Error fetching lectures by class:", error);
			return [];
		}

		return data || [];
	}

	// Get a specific lecture with its segments and insights
	async getLecture(lectureId: string): Promise<LectureResponse | null> {
		// Get lecture details
		const { data: lecture, error: lectureError } = await this.supabase
			.from("lectures")
			.select("*")
			.eq("id", lectureId)
			.single();

		if (lectureError || !lecture) {
			console.error("Error fetching lecture:", lectureError);
			return null;
		}

		// Get transcript segments
		const { data: segments, error: segmentsError } = await this.supabase
			.from("transcript_segments")
			.select("*")
			.eq("lecture_id", lectureId)
			.order("segment_order", { ascending: true });

		if (segmentsError) {
			console.error("Error fetching segments:", segmentsError);
			return { lecture, segments: [], insights: null };
		}

		// Get text insights
		const { data: insights, error: insightsError } = await this.supabase
			.from("text_insights")
			.select("*")
			.eq("lecture_id", lectureId)
			.single();

		if (insightsError && insightsError.code !== "PGRST116") {
			console.error("Error fetching insights:", insightsError);
		}

		return {
			lecture,
			segments: segments || [],
			insights: insights || null,
		};
	}

	// Create a new lecture
	async createLecture(
		lecture: Omit<Lecture, "id" | "created_at" | "updated_at">
	): Promise<Lecture | null> {
		const { data, error } = await this.supabase
			.from("lectures")
			.insert([lecture])
			.select()
			.single();

		if (error) {
			console.error("Error creating lecture:", error);
			return null;
		}

		return data;
	}

	// Create transcript segments
	async createTranscriptSegments(
		segments: Omit<TranscriptSegment, "id" | "created_at">[]
	): Promise<boolean> {
		const { error } = await this.supabase
			.from("transcript_segments")
			.insert(segments);

		if (error) {
			console.error("Error creating transcript segments:", error);
			return false;
		}

		return true;
	}

	// Create text insights
	async createTextInsights(
		insights: Omit<TextInsights, "id" | "created_at" | "updated_at">
	): Promise<boolean> {
		const { error } = await this.supabase
			.from("text_insights")
			.insert([insights]);

		if (error) {
			console.error("Error creating text insights:", error);
			return false;
		}

		return true;
	}

	// Update lecture
	async updateLecture(
		lectureId: string,
		updates: Partial<Lecture>
	): Promise<boolean> {
		const { error } = await this.supabase
			.from("lectures")
			.update(updates)
			.eq("id", lectureId);

		if (error) {
			console.error("Error updating lecture:", error);
			return false;
		}

		return true;
	}

	// Delete lecture (cascades to segments and insights)
	async deleteLecture(lectureId: string): Promise<boolean> {
		const { error } = await this.supabase
			.from("lectures")
			.delete()
			.eq("id", lectureId);

		if (error) {
			console.error("Error deleting lecture:", error);
			return false;
		}

		return true;
	}
}

// Export singleton instance
export const lectureService = new LectureService();
