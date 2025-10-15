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
	private auth: any;

	constructor() {
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

		const formattedPrivateKey = privateKey.replace(/\\n/g, "\n");

		this.auth = new google.auth.GoogleAuth({
			credentials: {
				client_email: email,
				private_key: formattedPrivateKey,
			},
			scopes: ["https://www.googleapis.com/auth/drive.readonly"],
		});

		this.drive = google.drive({ version: "v3", auth: this.auth });
	}

	async findAudioFile(
		classNumber: string,
		date: string,
		title: string
	): Promise<string | null> {
		const courseCode = classNumber.split(" ").slice(0, 2).join(" ");

		const folderId = FOLDER_IDS[courseCode as keyof typeof FOLDER_IDS];
		if (!folderId) {
			console.error(
				`No folder ID found for class: ${classNumber} (tried: ${courseCode})`
			);
			return null;
		}

		try {
			const formattedDate = date;
			const titleForFile = this.sanitizeTitle(title);
			const searchPatterns = [
				`${formattedDate}_${titleForFile}`,
				`${formattedDate}_${classNumber} ${titleForFile}`,
				`${formattedDate}_${classNumber}_${titleForFile}`,
				titleForFile,
			];

			const response = await this.drive.files.list({
				q: `'${folderId}' in parents and trashed=false and (mimeType='audio/mpeg' or mimeType='audio/wav')`,
				fields: "files(id, name)",
			});

			const files = response.data.files || [];

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

	async getSignedUrl(fileId: string): Promise<string | null> {
		try {
			// Get an authenticated client
			const authClient = await this.auth.getClient();

			// Generate a signed URL valid for 1 hour
			const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;

			// Get access token
			const accessToken = await authClient.getAccessToken();

			if (!accessToken.token) {
				console.error("Failed to get access token");
				return null;
			}

			// For service accounts, we'll return a URL with the access token
			// This is simpler than signed URLs and works well for server-side apps
			return `${url}&access_token=${accessToken.token}`;
		} catch (error) {
			console.error("Error generating signed URL:", error);
			return null;
		}
	}

	// Keep this for backward compatibility if needed
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
			.replace(/[^a-zA-Z0-9\s-_&]/g, "_")
			.replace(/\s+/g, "_")
			.replace(/_+/g, "_")
			.replace(/^_|_$/g, "");
	}

	private fuzzyMatch(fileName: string, pattern: string): boolean {
		const patternWords = pattern.split("_").filter((word) => word.length > 2);
		const matches = patternWords.filter((word) => fileName.includes(word));
		return matches.length >= Math.ceil(patternWords.length * 0.6);
	}
}

export const googleDriveService = new GoogleDriveService();
