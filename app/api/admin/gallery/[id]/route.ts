import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { GalleryItem } from "@/models";
import { unlink, writeFile, mkdir } from "fs/promises";
import path from "path";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const item = await GalleryItem.findById(params.id);
    if (!item) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File | null;

    if (title) item.title = title;
    if (description !== null) item.description = description;

    if (file && file.size > 0) {
      // Unlink old file if local
      if (item.url && item.url.startsWith("/uploads/")) {
        const relativePath = item.url.replace(/^\//, "");
        const fullPath = path.join(process.cwd(), "public", relativePath);
        try {
          await unlink(fullPath);
        } catch (err) {
          console.warn("Could not delete old image:", err);
        }
      }

      // Save new file
      const uploadDir = path.join(process.cwd(), "public", "uploads", "gallery");
      await mkdir(uploadDir, { recursive: true });
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const safeFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePath = path.join(uploadDir, safeFileName);
      await writeFile(filePath, buffer);

      item.url = `/uploads/gallery/${safeFileName}`;
    }

    await item.save();
    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const item = await GalleryItem.findById(params.id);
    if (!item) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    if (item.url && item.url.startsWith("/uploads/")) {
      const relativePath = item.url.replace(/^\//, "");
      const fullPath = path.join(process.cwd(), "public", relativePath);
      try {
        await unlink(fullPath);
      } catch (err) {
        console.warn("Could not delete image file:", err);
      }
    }

    await GalleryItem.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
