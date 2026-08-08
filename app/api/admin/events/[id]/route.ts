import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Event } from "@/models";
import { unlink, writeFile, mkdir } from "fs/promises";
import path from "path";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const event = await Event.findById(params.id);
    if (!event) {
      return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const venue = formData.get("venue") as string;
    const district = formData.get("district") as string;
    const discipline = formData.get("discipline") as string;
    const brochureUrl = formData.get("brochureUrl") as string;
    const imageFile = formData.get("image") as File | null;

    if (title) event.title = title;
    if (description) event.description = description;
    if (startDate) event.startDate = new Date(startDate);
    if (endDate) event.endDate = new Date(endDate);
    if (venue) event.venue = venue;
    if (district) event.district = district;
    if (discipline) event.discipline = discipline;
    if (brochureUrl !== null) event.brochureUrl = brochureUrl;

    if (imageFile && imageFile.size > 0) {
      if (event.image && event.image.startsWith("/uploads/")) {
        const relativePath = event.image.replace(/^\//, "");
        const fullPath = path.join(process.cwd(), "public", relativePath);
        try {
          await unlink(fullPath);
        } catch (err) {
          console.warn("Could not delete old event image:", err);
        }
      }

      const uploadDir = path.join(process.cwd(), "public", "uploads", "events");
      await mkdir(uploadDir, { recursive: true });
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const safeFileName = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePath = path.join(uploadDir, safeFileName);
      await writeFile(filePath, buffer);

      event.image = `/uploads/events/${safeFileName}`;
    }

    await event.save();
    return NextResponse.json({ success: true, event });
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
    const event = await Event.findById(params.id);
    if (!event) {
      return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
    }

    if (event.image && event.image.startsWith("/uploads/")) {
      const relativePath = event.image.replace(/^\//, "");
      const fullPath = path.join(process.cwd(), "public", relativePath);
      try {
        await unlink(fullPath);
      } catch (err) {
        console.warn("Could not delete event image:", err);
      }
    }

    await Event.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
