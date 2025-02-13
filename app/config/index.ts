import { bannedWords } from "../config/bannedWords";
import { urls } from "./urls";
// Convert words to regex patterns with variations
export const bannedRegex = new RegExp(
  bannedWords
    .map((word) => word.split("").join("+") + "+") // Handle repeated letters (e.g., "govnoo", "kuraaac")
    .join("|"), // Join into a single regex
  "gi" // Global and case-insensitive
);

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

const getDatabaseUrl = () => {
  const hostname = process.env.VERCEL_URL || "localhost";

  if (hostname.includes("localhost")) {
    return process.env.DATABASE_URL_LOCALHOST; // Local Database
  }

  // Find a matching URL from the predefined list
  const matchedUrl = urls.find((url) => hostname.includes(url));

  if (matchedUrl) {
    const envVarName = `DATABASE_URL_${matchedUrl.toUpperCase()}`;
    return process.env[envVarName]; // Fetch the correct DB URL
  }

  return process.env.DATABASE_URL_DEMO; // Default fallback
};

export const MAX_UPLOAD_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_PAGE_SIZE = 10;
export const BASE_URL = getFrontendBaseUrl();
export const DATABASE_URL = getDatabaseUrl();
