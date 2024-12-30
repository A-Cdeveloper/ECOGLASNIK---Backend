import { getAllCategories } from "@/app/_utils/api_utils/categories";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(
      { results: categories?.length, data: categories },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error && error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
