/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCategoryById } from "@/app/_utils/api_utils/categories";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: any }) {
  const { id } = await params;

  try {
    const category = await getCategoryById(+id);

    if (!category) {
      return NextResponse.json(
        { error: "Kategorija nije pronađena" },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error && error.message;
    return NextResponse.json(
      { error: errorMessage || "Server error" },
      { status: 500 }
    );
  }
}
