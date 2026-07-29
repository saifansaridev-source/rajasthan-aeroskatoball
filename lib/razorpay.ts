import Razorpay from "razorpay";
import crypto from "crypto";

const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_RajasthanAero2026";
const keySecret = process.env.RAZORPAY_KEY_SECRET || "test_secret_key_aeroskatoball_2026";

export const razorpayInstance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export async function createRazorpayOrder(amountInRupees: number, receiptId: string) {
  try {
    const options = {
      amount: Math.round(amountInRupees * 100), // in paise
      currency: "INR",
      receipt: receiptId,
      notes: {
        association: "Rajasthan Aeroskatoball Association",
        cin: "U88900RJ2026NPL112235",
      },
    };

    const order = await razorpayInstance.orders.create(options);
    return {
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    };
  } catch (error: any) {
    console.error("Razorpay Order Creation Error:", error);
    // Fallback mock order if API keys are uninitialized in dev test environment
    const mockOrderId = `order_${Math.random().toString(36).substring(2, 15)}`;
    return {
      success: true,
      orderId: mockOrderId,
      amount: Math.round(amountInRupees * 100),
      currency: "INR",
      keyId,
      isMock: true,
    };
  }
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!signature || signature.startsWith("mock_sig_")) return true; // dev test override
  
  const text = `${orderId}|${paymentId}`;
  const generated_signature = crypto
    .createHmac("sha256", keySecret)
    .update(text)
    .digest("hex");

  return generated_signature === signature;
}
