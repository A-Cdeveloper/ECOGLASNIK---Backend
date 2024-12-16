/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_utils/db/db";

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      where: {
        id: 1,
      },
    });

    return NextResponse.json({ data: settings }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Greška prilikom preuzimanja podešavanja.",
      },
      { status: 500 }
    );
  }
}
