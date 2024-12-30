/* eslint-disable @typescript-eslint/no-unused-vars */
import { getSettings } from "@/app/_utils/api_utils/settings";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const settings = await getSettings();

    return NextResponse.json({ data: settings }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error && error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
