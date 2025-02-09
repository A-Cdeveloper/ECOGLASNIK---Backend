import { bannedWords } from "../config/bannedWords";

export const MAX_UPLOAD_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_PAGE_SIZE = 10;

const getFrontendBaseUrl = () => {
  const hostname =
    process.env.VERCEL_URL || process.env.HOSTNAME || "localhost";

  if (hostname.includes("localhost")) {
    return "http://localhost:5173"; // Local Frontend
  }
  if (hostname.includes("cleanme")) {
    return "https://www.cleanme.e-vlasotince.info"; // App 1 Frontend
  }

  return "https://www.cleanme.e-vlasotince.info"; // Fallback
};

export const BASE_URL = getFrontendBaseUrl();

// Convert words to regex patterns with variations
export const bannedRegex = new RegExp(
  bannedWords
    .map((word) => word.split("").join("+") + "+") // Handle repeated letters (e.g., "govnoo", "kuraaac")
    .join("|"), // Join into a single regex
  "gi" // Global and case-insensitive
);
