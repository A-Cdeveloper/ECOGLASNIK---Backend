/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_utils/db/db";
import { z } from "zod";
import { problemSchema } from "@/app/_utils/zod/problemSchemas";

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

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the incoming data
    const body = await req.json();
    const data = problemSchema.parse(body);

    // Check if problem already exist
    const existingProblem = await prisma.problem.findUnique({
      where: {
        id: data.id,
      },
    });

    if (existingProblem) {
      return NextResponse.json(
        { error: "Problem već postoji u bazi." },
        { status: 500 }
      );
    }

    // Create a new problem record in the database
    const newProblem = await prisma.problem.create({
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        position: {
          lat: parseFloat(data.position.lat),
          lng: parseFloat(data.position.lng),
        },
        createdAt: new Date(), // Set the current date/time
        updatedAt: null, // Explicitly set to null
        status: "active",
        cat_id: data.cat_id, // Match your database column name
        uid: data.uid, // Match your database column name
        image: data.image,
      },
    });

    // Respond with the created problem
    return NextResponse.json(newProblem, { status: 201 });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Error creating problem" },
      { status: 500 }
    );
  }
}
