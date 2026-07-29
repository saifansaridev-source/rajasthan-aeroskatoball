import connectDB from "@/lib/db";
import { Registration, Event, Player, Payment } from "@/models";
import { Users, Calendar, Award, CreditCard, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminDashboardOverview() {
  await connectDB();

  const [totalRegs, pendingRegs, totalEvents, totalPlayers, payments] = await Promise.all([
    Registration.countDocuments(),
    Registration.countDocuments({ status: "PENDING" }),
    Event.countDocuments(),
    Player.countDocuments(),
    Payment.find({ status: "SUCCESS" }).lean(),
  ]);

  const totalRevenue = payments.reduce((acc: number, curr: any) => acc + (curr.amount || 0), 0);
  const recentRegs = await Registration.find().sort({ createdAt: -1 }).limit(5).lean();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-950">Dashboard Overview</h1>
          <p className="text-xs text-slate-500 mt-1">
            Rajasthan Aeroskatoball Association — Operations & Registration Hub
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/registrations"
            className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition"
          >
            Review Registrations ({pendingRegs})
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Registrations</span>
            <div className="p-2 bg-saffron-50 rounded-lg text-saffron-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-navy-950 mt-3">{totalRegs}</p>
          <span className="text-[11px] text-amber-600 font-bold mt-1 inline-block">
            {pendingRegs} Pending Approval
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">State Events</span>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-navy-950 mt-3">{totalEvents}</p>
          <span className="text-[11px] text-slate-400 font-medium mt-1 inline-block">Scheduled / Past</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Active Players</span>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-navy-950 mt-3">{totalPlayers}</p>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">Verified & Ranked</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Fees Collected</span>
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-navy-950 mt-3">₹{totalRevenue.toLocaleString("en-IN")}</p>
          <span className="text-[11px] text-purple-600 font-bold mt-1 inline-block">Razorpay Gateway</span>
        </div>
      </div>

      {/* Recent Registrations Queue */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-black text-navy-950 text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-saffron-500" /> Recent Registration Applications
          </h2>
          <Link href="/admin/registrations" className="text-xs font-bold text-saffron-600 hover:underline flex items-center gap-1">
            View All Applications <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 uppercase font-bold text-[11px] text-slate-500">
            <tr>
              <th className="p-3.5">Reg Number</th>
              <th className="p-3.5">Applicant Name</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">District</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentRegs.map((reg: any) => (
              <tr key={reg._id.toString()} className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-saffron-600">{reg.regNumber}</td>
                <td className="p-3.5 font-bold text-navy-950">{reg.applicantName}</td>
                <td className="p-3.5">
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                    {reg.type}
                  </span>
                </td>
                <td className="p-3.5">{reg.district}</td>
                <td className="p-3.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    reg.status === "APPROVED" ? "bg-emerald-100 text-emerald-800" :
                    reg.status === "REJECTED" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"
                  }`}>
                    {reg.status}
                  </span>
                </td>
                <td className="p-3.5 text-slate-400 font-mono">{formatDate(reg.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
