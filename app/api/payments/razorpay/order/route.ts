import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Payment, Registration } from "@/models";
import { createRazorpayOrder } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { registrationId, amount } = body;

    if (!registrationId || !amount) {
      return NextResponse.json({ error: "Registration ID and amount required" }, { status: 400 });
    }

    await connectDB();

    const reg = await Registration.findById(registrationId);
    if (!reg) {
      return NextResponse.json({ error: "Registration record not found" }, { status: 404 });
    }

    // Create order with Razorpay SDK
    const order = await createRazorpayOrder(amount, reg.regNumber);

    // Save Payment record in database
    await Payment.create({
      razorpayOrderId: order.orderId,
      registrationId: reg._id.toString(),
      amount,
      currency: "INR",
      status: "PENDING",
    });

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error("Razorpay Order API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
