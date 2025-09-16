// API route for fetching lecture data

// /src/app/api/lectures/[id]/route.ts;

import { NextRequest, NextResponse } from "next/server";
import { lectureService } from "../../../../../utils/supabase";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> } // Add Promise wrapper
) {
	try {
		const { id: lectureId } = await params; // Await params

		if (!lectureId) {
			return NextResponse.json(
				{ error: "Lecture ID is required" },
				{ status: 400 }
			);
		}

		const lectureData = await lectureService.getLecture(lectureId);

		if (!lectureData) {
			return NextResponse.json({ error: "Lecture not found" }, { status: 404 });
		}

		return NextResponse.json(lectureData);
	} catch (error) {
		console.error("Error in lecture API route:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> } // Add Promise wrapper
) {
	try {
		const { id: lectureId } = await params; // Await params
		const updates = await request.json();

		const success = await lectureService.updateLecture(lectureId, updates);

		if (!success) {
			return NextResponse.json(
				{ error: "Failed to update lecture" },
				{ status: 500 }
			);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error updating lecture:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> } // Add Promise wrapper
) {
	try {
		const { id: lectureId } = await params; // Await params

		const success = await lectureService.deleteLecture(lectureId);

		if (!success) {
			return NextResponse.json(
				{ error: "Failed to delete lecture" },
				{ status: 500 }
			);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error deleting lecture:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}