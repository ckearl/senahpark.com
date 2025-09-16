// API route for fetching all lectures
import { NextRequest, NextResponse } from "next/server";
import { lectureService } from "../../../../utils/supabase";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const classNumber = searchParams.get("class");

		let lectures;
		if (classNumber) {
			lectures = await lectureService.getLecturesByClass(classNumber);
		} else {
			lectures = await lectureService.getAllLectures();
		}

		return NextResponse.json(lectures);
	} catch (error) {
		console.error("Error fetching lectures:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const lectureData = await request.json();

		const newLecture = await lectureService.createLecture(lectureData);

		if (!newLecture) {
			return NextResponse.json(
				{ error: "Failed to create lecture" },
				{ status: 500 }
			);
		}

		return NextResponse.json(newLecture, { status: 201 });
	} catch (error) {
		console.error("Error creating lecture:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
