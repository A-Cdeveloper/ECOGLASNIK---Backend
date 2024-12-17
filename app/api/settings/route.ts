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
    return NextResponse.json(
      {
        error: `Izvinjavamo se.
        Došlo je do greške prilikom pokretanja aplikacije.`,
      },
      { status: 500 }
    );
  }
}
