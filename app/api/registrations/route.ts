import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Registration, Payment } from "@/models";
import { generateRegNumber } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      type,
      applicantName,
      dob,
      email,
      phone,
      district,
      discipline,
      address,
      guardianName,
      academyName,
      eventId,
    } = body;

    if (!applicantName || !email || !phone || !district) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const regNumber = generateRegNumber(type || "PLAYER");

    const registration = await Registration.create({
      regNumber,
      type: type || "PLAYER",
      applicantName,
      dob,
      email,
      phone,
      district,
      discipline,
      address,
      guardianName,
      academyName,
      eventId,
      status: "PENDING",
    });

    return NextResponse.json({
      success: true,
      registrationId: registration._id.toString(),
      regNumber: registration.regNumber,
    });
  } catch (error: any) {
    console.error("Registration POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
