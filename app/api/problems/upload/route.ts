import { MAX_UPLOAD_FILE_SIZE } from "@/app/_utils/contants";
import { getOptimizedImageURL, pinata } from "@/app/_utils/pinata/config";

import { NextResponse, type NextRequest } from "next/server";
import sharp from "sharp";

export async function optimizeImage(file: File): Promise<File> {
  const buffer = Buffer.from(await file.arrayBuffer());

  const optimizedImage = await sharp(buffer)
    .resize({ width: 1920 }) // Resize if needed
    .jpeg({ quality: 80 }) // Compress & convert to JPEG
    .toBuffer();

  return new File([optimizedImage], file.name, { type: file.type });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (file.size === 0) {
      return NextResponse.json(
        { error: "Fotografija nije uploadovana." },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD_FILE_SIZE) {
      return NextResponse.json(
        { error: "Dozvoljena veličina fotografije je 10MB" },
        { status: 400 }
      );
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return NextResponse.json(
        { error: "Fotografija mora biti u JPG ili PNG formatu" },
        { status: 400 }
      );
    }

    const optimizedFile = await optimizeImage(file);

    const uploadData = await pinata.upload.file(optimizedFile);

    const url = await getOptimizedImageURL(uploadData.cid);

    return NextResponse.json(
      { imageUrl: url, pinata_id: uploadData.id },
      { status: 200 }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
