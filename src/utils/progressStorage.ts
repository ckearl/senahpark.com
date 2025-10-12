// Utility functions for storing and retrieving lecture progress

const PROGRESS_COOKIE_PREFIX = "lecture_progress_";
const COOKIE_EXPIRY_DAYS = 365; // Store progress for 1 year

/**
 * Round time to nearest 10 second interval
 */
export function roundToNearestTen(seconds: number): number {
	return Math.floor(seconds / 10) * 10;
}

/**
 * Set a cookie with expiration
 */
function setCookie(name: string, value: string, days: number): void {
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	const expires = `expires=${date.toUTCString()}`;
	document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

/**
 * Get a cookie value by name
 */
function getCookie(name: string): string | null {
	const nameEQ = `${name}=`;
	const cookies = document.cookie.split(";");

	for (let cookie of cookies) {
		cookie = cookie.trim();
		if (cookie.indexOf(nameEQ) === 0) {
			return cookie.substring(nameEQ.length);
		}
	}

	return null;
}

/**
 * Save lecture progress to cookies
 */
export function saveLectureProgress(lectureId: string, currentTime: number): void {
	const roundedTime = roundToNearestTen(currentTime);
	const cookieName = `${PROGRESS_COOKIE_PREFIX}${lectureId}`;
	setCookie(cookieName, roundedTime.toString(), COOKIE_EXPIRY_DAYS);
}

/**
 * Get lecture progress from cookies
 */
export function getLectureProgress(lectureId: string): number | null {
	const cookieName = `${PROGRESS_COOKIE_PREFIX}${lectureId}`;
	const value = getCookie(cookieName);

	if (value === null) {
		return null;
	}

	const time = parseInt(value, 10);
	return isNaN(time) ? null : time;
}

/**
 * Clear lecture progress from cookies
 */
export function clearLectureProgress(lectureId: string): void {
	const cookieName = `${PROGRESS_COOKIE_PREFIX}${lectureId}`;
	document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
}

/**
 * Check if user has made significant progress (past 95% of duration)
 * to determine if we should reset progress
 */
export function shouldResetProgress(currentTime: number, duration: number): boolean {
	if (duration === 0) return false;
	const percentComplete = (currentTime / duration) * 100;
	return percentComplete >= 95;
}
