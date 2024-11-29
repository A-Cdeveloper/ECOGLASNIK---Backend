/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_utils/db/db";
import { authMiddleware } from "../../authMiddleware";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: NextRequest, { params }: { params: any }) {
  const authResponse = await authMiddleware(request);
  if (!authResponse.ok) {
    return authResponse; // If unauthorized, return the middleware response
  }

  const { uid } = await params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        uid: +uid,
      },
      select: {
        uid: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Korisnik nije pronađen." },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Greška prilikom preuzimanja korisnika" },
      { status: 500 }
    );
  }
}

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function PUT(request: NextRequest, { params }: { params: any }) {
//   const authResponse = await authMiddleware(request);
//   if (!authResponse.ok) {
//     return authResponse; // If unauthorized, return the middleware response
//   }

//   const { id } = await params;
//   const problem = await prisma.problem.findUnique({
//     where: {
//       id: id,
//     },
//   });
//   if (!problem) {
//     return NextResponse.json(
//       { error: "Problem nije pronađen" },
//       { status: 404 }
//     );
//   }

//   try {
//     // Parse and validate the incoming data
//     const body = await request.json();
//     const updatedData = updateProblemSchema.parse(body);

//     // Update the problem record in the database
//     const updatedProblem = await prisma.problem.update({
//       where: {
//         id: id,
//       },
//       data: {
//         title: updatedData.title ?? problem.title,
//         description: updatedData.description ?? problem.description,
//         cat_id: updatedData.cat_id ?? problem.cat_id, // Ensure field name matches schema
//         status: updatedData.status ?? problem.status,
//         image: updatedData.image ?? problem.image,
//         pinata_id: updatedData.pinata_id ?? problem.pinata_id,
//         updatedAt: new Date(), // Set updatedAt to the current timestamp
//       },
//     });

//     // Respond with the updated problem
//     return NextResponse.json(updatedProblem, { status: 200 });
//   } catch (error) {
//     // Handle Zod validation errors
//     if (error instanceof z.ZodError) {
//       return NextResponse.json({ error: error.errors }, { status: 400 });
//     }

//     return NextResponse.json(
//       { error: "Greška prilikom azuriranja problema" },
//       { status: 500 }
//     );
//   }
// }

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

  const { uid } = await params;

  if (authenticatedUserId !== +uid) {
    return NextResponse.json(
      { error: "Nemate dozvolu za brisanje ovog korisnika" },
      { status: 403 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      uid: +uid,
    },
  });
  if (!user) {
    return NextResponse.json(
      { error: "Korisnik nije pronađen" },
      { status: 404 }
    );
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        uid: +uid,
      },
    });
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Greška prilikom brisanja korisnika" },
      { status: 500 }
    );
  }
}
