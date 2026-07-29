import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Registration, Player } from "@/models";

export async function GET(req: Request) {
  try {
    await connectDB();
    const registrations = await Registration.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ registrations: JSON.parse(JSON.stringify(registrations)) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, remarks } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    await connectDB();

    const reg = await Registration.findByIdAndUpdate(
      id,
      { status, remarks },
      { new: true }
    );

    if (!reg) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    // If approved and applicant is a player, auto-create Player record
    if (status === "APPROVED" && reg.type === "PLAYER") {
      await Player.findOneAndUpdate(
        { regNumber: reg.regNumber },
        {
          regNumber: reg.regNumber,
          name: reg.applicantName,
          dob: reg.dob || "2000-01-01",
          district: reg.district,
          discipline: reg.discipline || "Speed Aeroskatoball",
          photoUrl: reg.photoUrl,
          isPublic: true,
        },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ success: true, registration: JSON.parse(JSON.stringify(reg)) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
