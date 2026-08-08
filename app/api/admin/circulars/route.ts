import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Circular } from "@/models";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    await connectDB();
    const circulars = await Circular.find().sort({ publishDate: -1 }).lean();
    return NextResponse.json({ circulars });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = (formData.get("category") as string) || "CIRCULAR";
    const file = formData.get("file") as File | null;

    if (!title || !file) {
      return NextResponse.json({ error: "Title and PDF file are required." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", "circulars");
    await mkdir(uploadDir, { recursive: true });

    const safeFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(uploadDir, safeFileName);
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/circulars/${safeFileName}`;

    await connectDB();
    const circular = await Circular.create({
      title,
      description,
      category,
      fileUrl,
      publishDate: new Date(),
    });

    return NextResponse.json({ success: true, circular });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
