import connectDB from "@/lib/db";
import { Payment, Registration } from "@/models";
import { CreditCard, CheckCircle2, XCircle, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminPaymentsLedger() {
  await connectDB();
  const payments = await Payment.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-navy-950">Payments & Gateway Ledger</h1>
          <p className="text-xs text-slate-500">
            Real-time Razorpay transaction log, order statuses, and verified registration fee records.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-navy-900 text-white uppercase font-bold text-[11px]">
            <tr>
              <th className="p-3.5">Razorpay Order ID</th>
              <th className="p-3.5">Payment ID</th>
              <th className="p-3.5">Amount</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map((p: any) => (
              <tr key={p._id.toString()} className="hover:bg-slate-50">
                <td className="p-3.5 font-mono text-saffron-600 font-bold">{p.razorpayOrderId}</td>
                <td className="p-3.5 font-mono text-slate-600">{p.razorpayPaymentId || "—"}</td>
                <td className="p-3.5 font-mono font-bold text-navy-950">₹{p.amount} {p.currency}</td>
                <td className="p-3.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    p.status === "SUCCESS" ? "bg-emerald-100 text-emerald-800" :
                    p.status === "FAILED" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="p-3.5 text-slate-400 font-mono">{formatDate(p.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
