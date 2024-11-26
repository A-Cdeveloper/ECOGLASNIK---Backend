import { pinata } from "@/app/_utils/pinata/config";
import { NextRequest, NextResponse } from "next/server";

// Helper function to delete a file from Pinata
const deleteFileFromPinata = async (pinata_id: string) => {
  try {
    // Use Pinata SDK to delete the file by its UUID
    const response = await pinata.files.delete([pinata_id]);
    console.log(response);

    // async function testPinataAuth() {
    //   try {
    //     const result = await pinata.testAuthentication();
    //     console.log("Authentication Success:", result);
    //   } catch (error) {
    //     console.error("Authentication Failed:", error?.message);
    //   }
    // }

    // testPinataAuth();

    if (response[0].status !== "OK") {
      const errorObj = JSON.parse(
        response[0].status.replace(/^HTTP error: /, "")
      ).error;

      throw new Error(errorObj.message);
    }

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Next.js 15 API route handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pinata_id } = body;

    // Validate the fileIds array
    if (!pinata_id) {
      return NextResponse.json(
        { error: "Invalid or missing cid." },
        { status: 400 }
      );
    }

    // Call helper to delete files
    const result = await deleteFileFromPinata(pinata_id);

    return NextResponse.json({
      message: "File deleted successfully",
      result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
