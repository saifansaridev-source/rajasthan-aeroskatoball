import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Circular } from "@/models";
import { unlink } from "fs/promises";
import path from "path";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const circular = await Circular.findById(params.id);
    if (!circular) {
      return NextResponse.json({ error: "Circular not found" }, { status: 404 });
    }

    // Delete local file if it exists in /uploads/
    if (circular.fileUrl && circular.fileUrl.startsWith("/uploads/")) {
      const relativePath = circular.fileUrl.replace(/^\//, "");
      const fullPath = path.join(process.cwd(), "public", relativePath);
      try {
        await unlink(fullPath);
      } catch (err) {
        console.warn("Could not delete file from filesystem:", err);
      }
    }

    await Circular.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
