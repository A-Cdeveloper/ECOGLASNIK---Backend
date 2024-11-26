/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_utils/db/db";
import { z } from "zod";
import { updateProblemSchema } from "@/app/_utils/zod/problemSchemas";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: NextRequest, { params }: { params: any }) {
  const { id } = await params;

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
      return NextResponse.json(
        { error: "Problem nije pronađen" },
        { status: 404 }
      );
    }

    return NextResponse.json(problem, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Greška prilikom preuzimanja problema" },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(request: NextRequest, { params }: { params: any }) {
  const { id } = await params;
  const problem = await prisma.problem.findUnique({
    where: {
      id: id,
    },
  });
  if (!problem) {
    return NextResponse.json(
      { error: "Problem nije pronađen" },
      { status: 404 }
    );
  }

  try {
    // Parse and validate the incoming data
    const body = await request.json();
    const updatedData = updateProblemSchema.parse(body);

    // Update the problem record in the database
    const updatedProblem = await prisma.problem.update({
      where: {
        id: id,
      },
      data: {
        title: updatedData.title ?? problem.title,
        description: updatedData.description ?? problem.description,
        cat_id: updatedData.cat_id ?? problem.cat_id, // Ensure field name matches schema
        status: updatedData.status ?? problem.status,
        image: updatedData.image ?? problem.image,
        pinata_id: updatedData.pinata_id ?? problem.pinata_id,
        updatedAt: new Date(), // Set updatedAt to the current timestamp
      },
    });

    // Respond with the updated problem
    return NextResponse.json(updatedProblem, { status: 200 });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Greška prilikom azuriranja problema" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: { params: any }
) {
  const { id } = await params;

  const problem = await prisma.problem.findUnique({
    where: {
      id: id,
    },
  });
  if (!problem) {
    return NextResponse.json(
      { error: "Problem nije pronađen" },
      { status: 404 }
    );
  }

  try {
    const deletedProblem = await prisma.problem.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedProblem, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Greška prilikom brisanja problema" },
      { status: 500 }
    );
  }
}
