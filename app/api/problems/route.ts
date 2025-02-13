/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  addNewProblem,
  getAllProblems,
} from "@/app/_utils/api_utils/problems-api";
import { problemSchema } from "@/app/_utils/zod/problemSchemas";
import { ProblemStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authMiddleware } from "../../_utils/auth/authMiddleware";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const status = searchParams.get("status") || undefined;
  const cat_id = searchParams.get("cat_id") || undefined;
  const sort = searchParams.get("sort")?.split(",") || ["createdAt"]; // Default sort field
  const order = searchParams.get("order")?.split(",") || ["desc"]; // Default order

  const orderBy = sort.map((field: string, index: number) => ({
    [field]: order[index]?.toLowerCase() as "asc" | "desc",
  }));

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conditions: any = {
      NOT: {
        OR: [
          { status: ProblemStatus.ARCHIVE },
          { status: ProblemStatus.WAITING },
        ],
      },
    };
    if (status) conditions.status = status;
    if (cat_id) conditions.cat_id = +cat_id;

    const problems = await getAllProblems(conditions, orderBy);
    return NextResponse.json(
      { results: problems?.length, data: problems },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error && error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authResponse = await authMiddleware(request);
  if (!authResponse.ok) {
    return authResponse; // If unauthorized, return the middleware response
  }
  try {
    // Parse and validate the incoming data
    const body = await request.json();
    const reciveData = problemSchema.parse(body);

    // Create a new problem record in the database
    const newProblem = await addNewProblem({
      id: reciveData.id,
      title: reciveData.title,
      description: reciveData.description,
      position: {
        lat: parseFloat(reciveData.position.lat),
        lng: parseFloat(reciveData.position.lng),
      },
      officialEmail: reciveData.officialEmail,
      createdAt: new Date(), // Set the current date/time
      updatedAt: null, // Explicitly set to null
      status: ProblemStatus.WAITING,
      cat_id: reciveData.cat_id, // Match your database column name
      uid: reciveData.uid, // Match your database column name
      image: reciveData.image || "",
      pinata_id: reciveData.pinata_id || "",
    });

    // Respond with the created problem
    return NextResponse.json(newProblem, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }

    const errorMessage = error instanceof Error && error.message;

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
