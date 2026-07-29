import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { ContactMessage } from "@/models";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    const contactMsg = await ContactMessage.create({
      name,
      email,
      phone,
      subject,
      message,
      read: false,
    });

    return NextResponse.json({ success: true, messageId: contactMsg._id.toString() });
  } catch (error: any) {
    console.error("Contact Form Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
