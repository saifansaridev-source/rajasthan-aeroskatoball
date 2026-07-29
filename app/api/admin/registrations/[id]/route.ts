import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Registration } from "@/models";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const registration = await Registration.findById(params.id).lean();
    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }
    return NextResponse.json({ registration: JSON.parse(JSON.stringify(registration)) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
