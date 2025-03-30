import { MAX_UPLOAD_FILE_SIZE } from "@/app/config";
import {
  getOptimizedImageURL,
  optimizeImage,
  pinata,
} from "@/app/_utils/pinata/config";
import { t } from "@/app/_utils/messages";
import { NextResponse, type NextRequest } from "next/server";
import { authMiddleware } from "../../../_utils/auth/authMiddleware";

export async function POST(request: NextRequest) {
  const authResponse = await authMiddleware(request);
  if (!authResponse.ok) {
    return authResponse; // If unauthorized, return the middleware response
  }

  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (file.size === 0) {
      return NextResponse.json(
        { error: t("problems.image.not_upload") },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD_FILE_SIZE) {
      return NextResponse.json(
        { error: t("problems.image.upload_maximage_size") },
        { status: 400 }
      );
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return NextResponse.json(
        { error: t("problems.image.upload_image_type") },
        { status: 400 }
      );
    }

    const optimizedFile = await optimizeImage(file);

    const uploadData = await pinata.upload
      .file(optimizedFile)
      .group(`${process.env.PINATA_GROUPID}`);

    const url = await getOptimizedImageURL(uploadData.cid);

    return NextResponse.json(
      { imageUrl: url, pinata_id: uploadData.id },
      { status: 200 }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: t("server_error") }, { status: 500 });
  }
}
