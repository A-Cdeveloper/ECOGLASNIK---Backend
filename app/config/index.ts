import { bannedWords } from "../config/bannedWords";

export const MAX_UPLOAD_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_PAGE_SIZE = 10;
// Convert words to regex patterns with variations
export const bannedRegex = new RegExp(
  bannedWords
    .map((word) => word.split("").join("+") + "+") // Handle repeated letters (e.g., "govnoo", "kuraaac")
    .join("|"), // Join into a single regex
  "gi" // Global and case-insensitive
);

export const FRONTEND_URLS = [
  "https://www.demo.ecoglasnik.org",
  "https://www.vlasotince.ecoglasnik.org",
  "https://www.nis.ecoglasnik.org",
];

export const BASE_FRONTEND_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:5173/";
