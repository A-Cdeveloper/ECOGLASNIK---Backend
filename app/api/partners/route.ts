import { getAllPartners } from "@/app/_utils/api_utils/partners";
import { Partners } from "@prisma/client";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { partners, totalPartners } = (await getAllPartners()) as {
      partners: Partners[];
      totalPartners: number;
    };
    return NextResponse.json(
      { results: totalPartners, data: partners },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error && error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
