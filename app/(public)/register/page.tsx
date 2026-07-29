"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  UserCheck, 
  Award, 
  Building2, 
  Trophy, 
  CreditCard, 
  CheckCircle2, 
  Download, 
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { DISTRICTS_OF_RAJASTHAN } from "@/lib/utils";
import { generateRegistrationReceiptPDF } from "@/lib/pdf-generator";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RegistrationHubPage() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "PLAYER";
  const eventIdParam = searchParams.get("eventId") || "";

  const [regType, setRegType] = useState<string>(initialType);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"FORM" | "PAYMENT" | "SUCCESS">("FORM");
  const [errorMsg, setErrorMsg] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    applicantName: "",
    dob: "",
    email: "",
    phone: "",
    district: "Bharatpur",
    discipline: "Speed Aeroskatoball",
    address: "",
    guardianName: "",
    academyName: "",
    eventId: eventIdParam,
  });

  // Success result payload
  const [successPayload, setSuccessPayload] = useState<any>(null);

  // Fee calculation (INR)
  const getFee = () => {
    switch (regType) {
      case "PLAYER": return 500;
      case "COACH": return 1500;
      case "REFEREE": return 1500;
      case "ACADEMY": return 3000;
      case "EVENT_ENTRY": return 500;
      default: return 500;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // 1. Submit Registration Record
      const regRes = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: regType,
        }),
      });

      const regData = await regRes.json();

      if (!regRes.ok || !regData.success) {
        throw new Error(regData.error || "Failed to create registration");
      }

      const registration = regData.registration;
      const feeAmount = getFee();

      // 2. Create Razorpay Order
      const orderRes = await fetch("/api/payments/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId: registration.id,
          amount: feeAmount,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Order creation failed");
      }

      // 3. Trigger Payment Checkout (Razorpay Test Popup or Fallback Test Verification)
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Rajasthan Aeroskatoball Association",
        description: `${regType} Annual Registration Fee (CIN: U88900RJ2026NPL112235)`,
        order_id: orderData.orderId,
        prefill: {
          name: formData.applicantName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#F58220", // Saffron Accent
        },
        handler: async function (response: any) {
          // Verify payment on backend
          await verifyPayment(
            orderData.orderId,
            response.razorpay_payment_id || "pay_test_123",
            response.razorpay_signature || "sig_test_123",
            registration,
            feeAmount
          );
        },
      };

      if (typeof window !== "undefined" && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Dev fallback if Razorpay script is blocked or offline
        await verifyPayment(
          orderData.orderId,
          `PAY_TEST_${Date.now()}`,
          "mock_sig_test",
          registration,
          feeAmount
        );
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (
    orderId: string,
    paymentId: string,
    signature: string,
    registration: any,
    amount: number
  ) => {
    try {
      const verifyRes = await fetch("/api/payments/razorpay/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
        }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.error || "Payment verification failed.");
      }

      setSuccessPayload({
        regNumber: registration.regNumber,
        applicantName: registration.applicantName,
        type: regType,
        email: registration.email,
        phone: registration.phone,
        district: registration.district,
        discipline: registration.discipline,
        amount,
        paymentId,
        date: new Date().toLocaleDateString("en-IN"),
        status: "SUCCESS (Pending Staff Approval)",
      });

      setStep("SUCCESS");
    } catch (err: any) {
      setErrorMsg(err.message || "Payment verification encountered an issue.");
    }
  };

  const handleDownloadReceipt = () => {
    if (!successPayload) return;
    const doc = generateRegistrationReceiptPDF(successPayload);
    doc.save(`RAA-Receipt-${successPayload.regNumber}.pdf`);
  };

  return (
    <div className="space-y-8 py-8 max-w-4xl mx-auto px-4">
      {/* Header Banner */}
      <div className="bg-navy-950 text-white p-8 rounded-2xl shadow-xl border-b-4 border-saffron-500">
        <span className="text-saffron-400 text-xs font-bold uppercase tracking-wider block mb-1">
          State Federation Online Portal
        </span>
        <h1 className="text-3xl font-black tracking-tight text-white">
          Official Membership & Tournament Registration
        </h1>
        <p className="text-slate-300 text-xs md:text-sm mt-1">
          Complete your online application and pay annual registration fees securely via Razorpay gateway.
        </p>
      </div>

      {step === "FORM" && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 space-y-6">
          {/* Registration Type Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-4 border-b border-slate-200">
            {[
              { id: "PLAYER", label: "Player Reg.", icon: UserCheck, fee: "₹500" },
              { id: "COACH", label: "Coach License", icon: Award, fee: "₹1,500" },
              { id: "REFEREE", label: "Referee Reg.", icon: ShieldCheck, fee: "₹1,500" },
              { id: "ACADEMY", label: "Academy Affiliation", icon: Building2, fee: "₹3,000" },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = regType === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setRegType(tab.id)}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                    active
                      ? "bg-navy-900 text-white border-navy-900 shadow-md"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${active ? "text-saffron-400" : "text-slate-500"}`} />
                  <div>
                    <span className="font-bold text-xs block">{tab.label}</span>
                    <span className={`text-[10px] font-semibold ${active ? "text-saffron-400" : "text-saffron-600"}`}>
                      Fee: {tab.fee}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {errorMsg && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmitForm} className="space-y-4 text-xs text-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-bold block mb-1">Full Applicant Name *</label>
                <input
                  type="text"
                  name="applicantName"
                  required
                  placeholder="e.g. Amanpreet Singh"
                  value={formData.applicantName}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Home District (Rajasthan) *</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none bg-white"
                >
                  {DISTRICTS_OF_RAJASTHAN.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Primary Discipline *</label>
                <select
                  name="discipline"
                  value={formData.discipline}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none bg-white"
                >
                  <option value="Speed Aeroskatoball">Speed Aeroskatoball</option>
                  <option value="Team Aeroskatoball">Team Aeroskatoball</option>
                  <option value="Freestyle / Technical">Freestyle / Technical</option>
                </select>
              </div>
            </div>

            {regType === "PLAYER" && (
              <div>
                <label className="font-bold block mb-1">Guardian / Parent Name (if under 18)</label>
                <input
                  type="text"
                  name="guardianName"
                  placeholder="Parent / Guardian Name"
                  value={formData.guardianName}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                />
              </div>
            )}

            {regType === "ACADEMY" && (
              <div>
                <label className="font-bold block mb-1">Academy / Institution Name *</label>
                <input
                  type="text"
                  name="academyName"
                  required
                  placeholder="e.g. Royal Skaters Academy"
                  value={formData.academyName}
                  onChange={handleInputChange}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="font-bold block mb-1">Full Postal Address *</label>
              <textarea
                name="address"
                rows={2}
                required
                placeholder="Residential or Arena address in Rajasthan"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
              />
            </div>

            {/* Fee Summary Box */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-500 block">Total Payable Fee:</span>
                <strong className="text-xl text-saffron-600 font-black">₹{getFee()}.00 INR</strong>
              </div>
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-semibold">
                <CreditCard className="w-4 h-4 text-navy-900" /> Razorpay Test Gateway Active
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-saffron-500 hover:bg-saffron-600 disabled:opacity-50 text-white font-black text-sm py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              {loading ? "Processing Application..." : `PAY ₹${getFee()} & SUBMIT REGISTRATION`}
            </button>
          </form>
        </div>
      )}

      {/* Success Modal Screen */}
      {step === "SUCCESS" && successPayload && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-navy-900">Registration & Payment Successful!</h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your application has been logged into the state database. Below is your official registration reference number.
            </p>
          </div>

          <div className="bg-navy-900 text-white p-4 rounded-xl max-w-md mx-auto space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Registration Reference Number:</span>
            <span className="text-xl font-mono font-bold text-saffron-400 block">{successPayload.regNumber}</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={handleDownloadReceipt}
              className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs py-3 px-6 rounded-xl shadow transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Official PDF Receipt
            </button>
            <button
              onClick={() => {
                setStep("FORM");
                setSuccessPayload(null);
              }}
              className="bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold text-xs py-3 px-6 rounded-xl transition"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
