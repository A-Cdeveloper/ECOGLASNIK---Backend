/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";

export async function GET() {
  try {
    const problems = await prisma.problem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(problems, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch problems" },
      { status: 500 }
    );
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.json();
//     const newProblem = await prisma.problem.create({ data });
//     return NextResponse.json(newProblem, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to create problem" },
//       { status: 500 }
//     );
//   }
// }
