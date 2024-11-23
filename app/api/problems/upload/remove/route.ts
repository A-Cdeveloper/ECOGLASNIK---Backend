import { pinata } from "@/app/_utils/pinata/config";
import { NextRequest, NextResponse } from "next/server";

// Helper function to delete a file from Pinata
const deleteFileFromPinata = async (fid: string) => {
  try {
    // Use Pinata SDK to delete the file by its UUID
    const response = await pinata.files.delete([fid]);

    return response;
  } catch (error) {
    console.error("Error deleting file from Pinata:", error);
    throw new Error("Failed to delete file from Pinata.");
  }
};

// Next.js 15 API route handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fid } = body;

    // Validate the fileIds array
    if (!fid) {
      return NextResponse.json(
        { error: "Invalid or missing fid." },
        { status: 400 }
      );
    }

    // Call helper to delete files
    const result = await deleteFileFromPinata(fid);

    return NextResponse.json({
      message: "File deleted successfully",
      result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error in API route:", error.message);
    return NextResponse.json(
      { error: "Failed to delete file.", details: error.message },
      { status: 500 }
    );
  }
}
