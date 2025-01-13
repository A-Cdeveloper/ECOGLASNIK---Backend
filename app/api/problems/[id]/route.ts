/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_utils/db/db";
import { z } from "zod";
import { updateProblemSchema } from "@/app/_utils/zod/problemSchemas";
import { authMiddleware } from "../../../_utils/auth/authMiddleware";

import { getSuperAdmin } from "@/app/_utils/api_utils/users";
import {
  getProblemById,
  updateProblem,
} from "@/app/_utils/api_utils/problems-api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: NextRequest, { params }: { params: any }) {
  const { id } = await params;

  const include = {
    category: {
      select: {
        cat_name: true,
      },
    },
  };

  try {
    const problem = await getProblemById(id, include);

    if (!problem) {
      return NextResponse.json(
        { error: "Problem nije pronađen" },
        { status: 404 }
      );
    }

    return NextResponse.json(problem, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error && error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(request: NextRequest, { params }: { params: any }) {
  const authResponse = await authMiddleware(request);
  if (!authResponse.ok) {
    return authResponse; // If unauthorized, return the middleware response
  }
  const authData = await authResponse.json();
  const authenticatedUserId = +authData.userId;

  const { id } = await params;

  let problem;
  try {
    problem = await getProblemById(id);
    if (!problem) {
      return NextResponse.json(
        { error: "Problem nije pronađen" },
        { status: 404 }
      );
    }
    const superadmin = await getSuperAdmin(authenticatedUserId);
    if (authenticatedUserId !== +problem.uid && !superadmin) {
      return NextResponse.json(
        { error: "Nemate dozvolu za ažuriranje problema drugih korisnika." },
        { status: 403 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Greška na serveru" }, { status: 500 });
  }

  try {
    // Parse and validate the incoming data
    const body = await request.json();
    const updatedData = updateProblemSchema.parse(body);

    const updatedProblem = await updateProblem(id, {
      title: updatedData.title ?? problem.title,
      description: updatedData.description ?? problem.description,
      // cat_id: updatedData.cat_id ?? problem.cat_id, // Ensure field name matches schema
      status: updatedData.status ?? problem.status,
      image: updatedData.image ?? problem.image,
      pinata_id: updatedData.pinata_id ?? problem.pinata_id,
      updatedAt: new Date(), // Set updatedAt to the current timestamp
    });

    // Respond with the updated problem
    return NextResponse.json(updatedProblem, { status: 200 });
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

export async function DELETE(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: { params: any }
) {
  const authResponse = await authMiddleware(request);
  if (!authResponse.ok) {
    return authResponse; // If unauthorized, return the middleware response
  }

  const authData = await authResponse.json();
  const authenticatedUserId = +authData.userId;

  const { id } = await params;

  try {
    const problem = await getProblemById(id);
    if (!problem) {
      return NextResponse.json(
        { error: "Problem nije pronađen" },
        { status: 404 }
      );
    }
    const superadmin = await getSuperAdmin(authenticatedUserId);

    if (authenticatedUserId !== +problem.uid && !superadmin) {
      return NextResponse.json(
        { error: "Nemate dozvolu za bridanje problema drugih korisnika." },
        { status: 403 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Greška na serveru" }, { status: 500 });
  }

  try {
    const superadmin = await getSuperAdmin(authenticatedUserId);

    const archiveProblem = await updateProblem(id, {
      uid: superadmin?.uid,
      status: "archive",
      updatedAt: new Date(), // Set updatedAt to the current timestamp
    });

    return NextResponse.json(archiveProblem, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error && error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
