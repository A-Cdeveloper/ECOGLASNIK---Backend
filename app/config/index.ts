import { bannedWords } from "../config/bannedWords";
import { urls } from "./urls";

export const MAX_UPLOAD_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_PAGE_SIZE = 10;

const getFrontendBaseUrl = () => {
  const hostname = process.env.VERCEL_URL || "localhost";

  if (hostname.includes("localhost")) {
    return "http://localhost:5173"; // Local Frontend
  }

  urls.map((url) => {
    if (hostname.includes(url)) {
      return `https://${url}.ecoglasnik.org`;
    }
  });

  return "https://www.demo.ecoglasnik.org"; // Fallback
};

export const BASE_URL = getFrontendBaseUrl();

// Convert words to regex patterns with variations
export const bannedRegex = new RegExp(
  bannedWords
    .map((word) => word.split("").join("+") + "+") // Handle repeated letters (e.g., "govnoo", "kuraaac")
    .join("|"), // Join into a single regex
  "gi" // Global and case-insensitive
);
