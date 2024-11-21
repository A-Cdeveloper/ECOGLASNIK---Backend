/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";
import { z } from "zod";

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

//////////////
const updateProblemSchema = z.object({
  title: z
    .string()
    .min(1, "Naslov je obavezan")
    .max(40, "Naslov mora biti maksimalno 30 karaktera")
    .optional(),
  description: z
    .string()
    .min(1, "Opis problema je obavezan.")
    .max(50, "Opis problema mora biti maksimalno 50 karaktera")
    .optional(),
  status: z.union([z.literal("done"), z.undefined()]),
  cat_id: z.number().int().optional(),
  image: z.string().optional(),
});

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
