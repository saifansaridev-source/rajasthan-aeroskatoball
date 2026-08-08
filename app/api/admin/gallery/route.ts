import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { GalleryItem } from "@/models";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    await connectDB();
    const items = await GalleryItem.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ items });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const title = (formData.get("title") as string) || "Gallery Photo";
    const description = (formData.get("description") as string) || "";
    const albumName = (formData.get("albumName") as string) || "Championship Highlights";

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "At least one image file is required." }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "gallery");
    await mkdir(uploadDir, { recursive: true });

    await connectDB();
    const createdItems = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const safeFileName = `${Date.now()}-${i}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePath = path.join(uploadDir, safeFileName);
      await writeFile(filePath, buffer);

      const url = `/uploads/gallery/${safeFileName}`;
      const itemTitle = files.length === 1 ? title : `${title} #${i + 1}`;

      const item = await GalleryItem.create({
        title: itemTitle,
        description,
        type: "PHOTO",
        url,
        albumName,
      });

      createdItems.push(item);
    }

    return NextResponse.json({ success: true, items: createdItems });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
