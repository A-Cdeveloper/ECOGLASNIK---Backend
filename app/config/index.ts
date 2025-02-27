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
export const BASE_URL_DEMO = "https://www.demo.ecoglasnik.org";
export const BASE_URL_VLASOTINCE = "https://www.vlasotince.ecoglasnik.org";
export const BASE_URL_NIS = "https://www.nis.ecoglasnik.org";
