import { NextResponse } from "next/server";
import prisma from "@/app/_utils/db/db";
import { t } from "@/app/_utils/messages";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (token === "null") {
    return NextResponse.json(
      { message: t("auth.verify.token_not_exist") },
      { status: 400 }
    );
  }

  //   return NextResponse.json({ message: "bravo" }, { status: 200 });

  try {
    // Find user by verification token
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: t("auth.verify.token_wrong") },
        { status: 400 }
      );
    }

    // Verify the user
    await prisma.user.update({
      where: { uid: user.uid },
      data: {
        isVerified: true,
        verificationToken: null, // Clear token after verification
      },
    });

    return NextResponse.json(
      { message: t("auth.verify.success_verify") },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
