import fs from "fs";
import path from "path";

// Function to get all files recursively
const getAllFiles = (dir: string): string[] => {
  const files: string[] = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  });
  return files;
};

// Root directory to verify
const rootDir = path.resolve("src"); // Change to the folder you want to check

// Allowed file extensions
const allowedExtensions = [".ts", ".tsx", ".js", ".jsx"];

let isValid = true;

getAllFiles(rootDir).forEach((file) => {
  const ext = path.extname(file);

  if (!allowedExtensions.includes(ext)) {
    console.error(`Invalid file extension: ${file}`);
    isValid = false;
  }

  const content = fs.readFileSync(file, "utf-8");

  // Example: Check for "TODO" comments
  if (content.includes("TODO")) {
    console.error(`File contains TODO comments: ${file}`);
    isValid = false;
  }
});

if (!isValid) {
  console.error("Verification failed. Fix the errors above.");
  process.exit(1);
} else {
  console.log("All files passed verification!");
}
