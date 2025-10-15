import { google } from "googleapis";

const FOLDER_IDS = {
	"MBA 500": "1JXWCLSSuDM157-52Bg5FUCNruJc3jDoK",
	"MBA 501": "1dj3OntizsYSdKWfwkz72xoIIc9AyUxfa",
	"MBA 505": "1yHpeMRy5es1QvwAcdpURUZvK_lNlNFBw",
	"MBA 520": "1FypVVHgR8zvqaU7MRY9zeDACkxWanLIM",
	"MBA 530": "1zalx00SySjRjxKDYUcz6GbDf1y0tq1PB",
	"MBA 548": "10Hw0ARu_TJvKBNVfRC8H9CbnD9G4v1Xn",
	"MBA 550": "1ZSseTGxvDYanuKqePtNuTld_v6qkdMfB",
	"MBA 593R": "1RMT5bOq5ErG51LA0aLcwp7zYHbda5ors",
};

export class GoogleDriveService {
	private drive: any;

	constructor() {
		// Better error logging for debugging
		const email = process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL;
		const privateKey =
			process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

		if (!email || !privateKey) {
			console.error("Missing Google credentials:", {
				hasEmail: !!email,
				hasPrivateKey: !!privateKey,
				emailValue: email ? "present" : "missing",
				privateKeyLength: privateKey?.length || 0,
			});
			throw new Error("Google service account credentials are not configured");
		}

		// Handle the private key - replace literal \n with actual newlines
		const formattedPrivateKey = privateKey.replace(/\\n/g, "\n");

		const auth = new google.auth.GoogleAuth({
			credentials: {
				client_email: email,
				private_key: formattedPrivateKey,
			},
			scopes: ["https://www.googleapis.com/auth/drive.readonly"],
		});

		this.drive = google.drive({ version: "v3", auth });
	}

	async findAudioFile(
		classNumber: string,
		date: string,
		title: string
	): Promise<string | null> {
		// Extract just the course code (e.g., "MBA 530" from "MBA 530 Operations Management")
		const courseCode = classNumber.split(" ").slice(0, 2).join(" ");

		const folderId = FOLDER_IDS[courseCode as keyof typeof FOLDER_IDS];
		if (!folderId) {
			console.error(
				`No folder ID found for class: ${classNumber} (tried: ${courseCode})`
			);
			return null;
		}

		try {
			// Format the date from YYYY-MM-DD to match file naming
			const formattedDate = date; // Already in YYYY-MM-DD format

			// Create possible filename patterns
			const titleForFile = this.sanitizeTitle(title);
			const searchPatterns = [
				`${formattedDate}_${titleForFile}`,
				`${formattedDate}_${classNumber} ${titleForFile}`,
				`${formattedDate}_${classNumber}_${titleForFile}`,
				titleForFile, // Just in case
			];

			const response = await this.drive.files.list({
				q: `'${folderId}' in parents and trashed=false and (mimeType='audio/mpeg' or mimeType='audio/wav')`,
				fields: "files(id, name)",
			});

			const files = response.data.files || [];

			// Try to find a matching file using our search patterns
			for (const pattern of searchPatterns) {
				const matchedFile = files.find((file: any) => {
					const fileName = file.name.toLowerCase();
					const searchPattern = pattern.toLowerCase();
					return (
						fileName.includes(searchPattern) ||
						fileName.startsWith(searchPattern) ||
						this.fuzzyMatch(fileName, searchPattern)
					);
				});

				if (matchedFile) {
					console.log(
						`Found audio file: ${matchedFile.name} (ID: ${matchedFile.id})`
					);
					return matchedFile.id;
				}
			}

			// If no exact match, try partial matches
			const partialMatch = files.find((file: any) => {
				const fileName = file.name.toLowerCase();
				return (
					fileName.includes(formattedDate) ||
					fileName.includes(titleForFile.toLowerCase())
				);
			});

			if (partialMatch) {
				console.log(
					`Found partial match: ${partialMatch.name} (ID: ${partialMatch.id})`
				);
			} else {
				console.error(
					`No audio file found for: ${classNumber} - ${title} (${date})`
				);
				console.error(
					`Available files in folder:`,
					files.map((f: any) => f.name)
				);
			}

			return partialMatch?.id || null;
		} catch (error) {
			console.error("Error searching for audio file:", error);
			return null;
		}
	}

	async getAudioStream(fileId: string) {
		try {
			const response = await this.drive.files.get(
				{
					fileId: fileId,
					alt: "media",
				},
				{ responseType: "stream" }
			);

			return response.data;
		} catch (error) {
			console.error("Error getting audio stream:", error);
			return null;
		}
	}

	private sanitizeTitle(title: string): string {
		return title
			.replace(/[^a-zA-Z0-9\s-_&]/g, "_") // Replace special chars with underscore
			.replace(/\s+/g, "_") // Replace spaces with underscore
			.replace(/_+/g, "_") // Replace multiple underscores with single
			.replace(/^_|_$/g, ""); // Remove leading/trailing underscores
	}

	private fuzzyMatch(fileName: string, pattern: string): boolean {
		// Simple fuzzy matching - check if most words from pattern are in filename
		const patternWords = pattern.split("_").filter((word) => word.length > 2);
		const matches = patternWords.filter((word) => fileName.includes(word));
		return matches.length >= Math.ceil(patternWords.length * 0.6); // 60% match threshold
	}
}

export const googleDriveService = new GoogleDriveService();
