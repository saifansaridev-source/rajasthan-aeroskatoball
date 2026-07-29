import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { SiteSettings } from "@/models";

export async function GET() {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne().lean();
    if (!settings) {
      const created = await SiteSettings.create({});
      settings = created.toObject();
    }
    return NextResponse.json({ settings: JSON.parse(JSON.stringify(settings)) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();

    const settings = await SiteSettings.findOneAndUpdate({}, body, { upsert: true, new: true }).lean();
    return NextResponse.json({ success: true, settings: JSON.parse(JSON.stringify(settings)) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
