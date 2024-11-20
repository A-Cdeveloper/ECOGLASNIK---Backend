/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const status = searchParams.get("status") || undefined;
  const cat_id = searchParams.get("cat_id") || undefined;
  const sort = searchParams.get("sort") || "createdAt"; // Default sort field
  const order = searchParams.get("order") || "desc"; // Default order

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conditions: any = {};
    if (status) conditions.status = status;
    if (cat_id) conditions.cat_id = +cat_id;

    const problems = await prisma.problem.findMany({
      where: conditions,
      orderBy: {
        [sort]: order.toLowerCase() === "asc" ? "asc" : "desc",
      },
    });
    return NextResponse.json(
      { results: problems.length, data: problems },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Greška prilikom preuzimanja problema" },
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
