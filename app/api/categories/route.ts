import { getAllCategories } from "@/app/_utils/api_utils/categories";
import { ProblemCategoriesType } from "@/app/_utils/db/prismaTypes";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { categories, totalCategories } = (await getAllCategories()) as {
      categories: ProblemCategoriesType[];
      totalCategories: number;
    };
    return NextResponse.json(
      { results: totalCategories, data: categories },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error && error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
