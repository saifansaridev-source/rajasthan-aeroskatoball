import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Payment, Registration } from "@/models";
import { verifyRazorpaySignature } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    const isValid = verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    await connectDB();

    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId },
      { razorpayPaymentId, status: "SUCCESS" },
      { new: true }
    );

    if (payment) {
      await Registration.findByIdAndUpdate(payment.registrationId, { status: "APPROVED" });
    }

    return NextResponse.json({ success: true, paymentId: razorpayPaymentId });
  } catch (error: any) {
    console.error("Payment Verify Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
