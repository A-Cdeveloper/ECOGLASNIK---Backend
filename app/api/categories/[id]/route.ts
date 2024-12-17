/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/app/_utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: any }) {
  const { id } = await params;

  try {
    const category = await prisma.problemCategory.findUnique({
      where: {
        cat_id: +id,
      },
      // include: {
      //   organisations: true, // Include the related organisations
      // },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Kategorija nije pronađena" },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Greška prilikom preuzimanja kategorije", error2: error },
      { status: 500 }
    );
  }
}
