import { MAX_UPLOAD_FILE_SIZE } from "@/app/_utils/contants";
import { getOptimizedImageURL, pinata } from "@/app/_utils/pinata/config";
import imageCompression from "browser-image-compression";
import { NextResponse, type NextRequest } from "next/server";

async function compressImage(file: File) {
  const options = { maxSizeMB: 5, maxWidthOrHeight: 2000 };
  return await imageCompression(file, options);
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
        { error: "Dozvoljena veličina fotografije je 15MB" },
        { status: 400 }
      );
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return NextResponse.json(
        { error: "Fotografija mora biti u JPG ili PNG formatu" },
        { status: 400 }
      );
    }
    const compressedFile = await compressImage(file);
    const uploadData = await pinata.upload.file(compressedFile);

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
