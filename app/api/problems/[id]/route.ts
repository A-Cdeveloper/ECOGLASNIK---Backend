/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const problem = await prisma.problem.findUnique({
      where: {
        id: id,
      },
      include: {
        category: {
          select: {
            cat_name: true,
          },
        },
        user: {
          select: {
            firstname: true,
            lastname: true,
            email: true,
          },
        },
      },
    });

    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    return NextResponse.json(problem, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch problem" },
      { status: 500 }
    );
  }
}
