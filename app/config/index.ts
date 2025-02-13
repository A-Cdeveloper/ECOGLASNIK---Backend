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

export const getDatabaseUrl = () => {
  const hostname = process.env.VERCEL_URL || "localhost"; // Get Vercel URL or fallback to localhost

  if (hostname.includes("localhost")) {
    return process.env.DATABASE_URL_LOCALHOST; // Local environment URL
  }

  for (const url of urls) {
    if (hostname.includes(url)) {
      return process.env[`DATABASE_URL_${url.toUpperCase()}`]; // Dynamic environment variable based on domain
    }
  }

  return process.env.DATABASE_URL_DEFAULT; // Fallback URL for other cases
};

export const MAX_UPLOAD_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_PAGE_SIZE = 10;
export const BASE_URL = getFrontendBaseUrl();
