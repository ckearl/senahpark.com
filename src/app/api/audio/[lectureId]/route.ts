import { NextRequest, NextResponse } from "next/server";
import { lectureService } from "../../../../../utils/supabase";
import { googleDriveService } from "../../../../../utils/googleDrive";

export async function GET(
	request: NextRequest,
  { params }: { params: Promise<{ lectureId: string }> } // Note: Promise wrapper) {
) {
	try {
		const { lectureId } = await params;

		// Step 1: Get lecture metadata from Supabase using UUID
		const lectureResponse = await lectureService.getLecture(lectureId);
		if (!lectureResponse) {
			return NextResponse.json({ error: "Lecture not found" }, { status: 404 });
		}

		const { lecture } = lectureResponse;
		console.log("Found lecture:", {
			id: lecture.id,
			class_number: lecture.class_number,
			date: lecture.date,
			title: lecture.title,
		});

		// Step 2: Use lecture metadata to find Google Drive file
		const audioFileId = await googleDriveService.findAudioFile(
			lecture.class_number, // e.g., "MBA 530"
			lecture.date, // e.g., "2025-09-15"
			lecture.title // e.g., "Fabrictek"
		);

		// Step 3: Stream the found file
		if (!audioFileId) {
			return NextResponse.json(
				{ error: "Audio file not found" },
				{ status: 404 }
			);
		}

		const audioStream = await googleDriveService.getAudioStream(audioFileId);

		if (!audioStream) {
			return NextResponse.json(
				{ error: "Failed to get audio stream" },
				{ status: 500 }
			);
		}

		// Set appropriate headers for audio streaming
		const headers = new Headers();
		headers.set("Content-Type", "audio/mpeg");
		headers.set("Accept-Ranges", "bytes");
		headers.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour

		// Convert stream to response
		const response = new NextResponse(audioStream as any, {
			status: 200,
			headers,
		});

		return response;
	} catch (error) {
		console.error("Error in audio API route:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
