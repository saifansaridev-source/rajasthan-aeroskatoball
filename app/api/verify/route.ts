import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Registration, Player } from "@/models";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json({ found: false, error: "Query parameter missing" }, { status: 400 });
    }

    await connectDB();

    // Check Player model first
    const player = await Player.findOne({ regNumber: query.trim() }).lean();
    if (player) {
      return NextResponse.json({
        found: true,
        type: "PLAYER",
        data: JSON.parse(JSON.stringify(player)),
      });
    }

    // Check Registration model
    const registration = await Registration.findOne({ regNumber: query.trim() }).lean();
    if (registration) {
      return NextResponse.json({
        found: true,
        type: "REGISTRATION",
        data: JSON.parse(JSON.stringify(registration)),
      });
    }

    return NextResponse.json({ found: false });
  } catch (error: any) {
    return NextResponse.json({ found: false, error: error.message }, { status: 500 });
  }
}
