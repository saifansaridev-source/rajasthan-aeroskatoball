import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Event } from "@/models";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ startDate: 1 }).lean();
    return NextResponse.json({ events });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const venue = formData.get("venue") as string;
    const district = formData.get("district") as string;
    const discipline = (formData.get("discipline") as string) || "Aeroskatoball Championship";
    const brochureUrl = (formData.get("brochureUrl") as string) || "";
    const imageFile = formData.get("image") as File | null;

    if (!title || !description || !startDate || !venue || !district) {
      return NextResponse.json({ error: "Missing required event details (title, description, start date, venue, district)." }, { status: 400 });
    }

    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "uploads", "events");
      await mkdir(uploadDir, { recursive: true });

      const safeFileName = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePath = path.join(uploadDir, safeFileName);
      await writeFile(filePath, buffer);

      imageUrl = `/uploads/events/${safeFileName}`;
    }

    await connectDB();
    const event = await Event.create({
      title,
      description,
      image: imageUrl,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : new Date(startDate),
      venue,
      district,
      discipline,
      brochureUrl,
    });

    return NextResponse.json({ success: true, event });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
