"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  UserCheck, 
  Clock, 
  ShieldAlert, 
  CreditCard, 
  Search, 
  Check, 
  X, 
  Ban, 
  Eye
} from "lucide-react";
import { initialRegistrations, IRegistrationData } from "@/lib/data-store";

export default function AdminDashboardPage() {
  const [registrations, setRegistrations] = useState<IRegistrationData[]>(initialRegistrations);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Detailed Modals
  const [viewMember, setViewMember] = useState<IRegistrationData | null>(null);
  const [suspendMember, setSuspendMember] = useState<IRegistrationData | null>(null);

  // 16.4 Suspend Form State
  const [suspendForm, setSuspendForm] = useState({
    reason: "Disciplinary Violation & Unsportsmanlike Conduct",
    from: "2026-03-01",
    till: "2026-06-01",
    duration: "3 Months",
    remarks: "Suspended following state inquiry review.",
    evidenceUrl: "",
    autoReactivate: true,
    permanent: false,
  });

  // KPI Calculations
  const totalCount = registrations.length;
  const approvedCount = registrations.filter((r) => r.status === "APPROVED").length;
  const pendingCount = registrations.filter((r) => r.status === "PENDING").length;
  const suspendedCount = registrations.filter((r) => r.status === "SUSPENDED").length;
  const totalRevenue = registrations.reduce((acc, curr) => acc + (curr.paymentAmount || 0), 0);

  // Filtered List
  const filteredList = registrations.filter((r) => {
    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;
    const matchesType = typeFilter === "ALL" || r.type === typeFilter;
    const matchesSearch = 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  // Action Handlers
  const handleApprove = (id: string) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "APPROVED", validUntil: "2027-03-31" } : r))
    );
  };

  const handleReject = (id: string) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "REJECTED" } : r))
    );
  };

  const handleApplySuspend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suspendMember) return;

    setRegistrations((prev) =>
      prev.map((r) =>
        r.id === suspendMember.id
          ? {
              ...r,
              status: "SUSPENDED",
              suspension: { ...suspendForm },
            }
          : r
      )
    );
    setSuspendMember(null);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase text-[#F57C00] tracking-wider block">
            State Administration Portal
          </span>
          <h1 className="text-2xl font-black text-[#0A3D91]">
            Federation Overview & Registration Queue
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor state athletes, approve certifications, and manage district affiliations.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">Total Applications</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{totalCount}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0A3D91] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">Active Passes</span>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{approvedCount}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">Pending Review</span>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{pendingCount}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">Suspended</span>
            <h3 className="text-2xl font-black text-rose-600 mt-1">{suspendedCount}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">Revenue Collected</span>
            <h3 className="text-2xl font-black text-[#0A3D91] mt-1">₹ {totalRevenue}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F57C00] flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Registrations Management Table with Status & Role Filters */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden space-y-4 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-black text-[#0A3D91]">
              Membership Approval & Disciplinary Management Queue
            </h3>
            <p className="text-xs text-slate-500">
              Review documents, verify payments, approve active ID cards, or apply sanction suspensions.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Name, Reg No, District..."
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* 16.2 Status & Role Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-slate-400 font-bold uppercase text-[10px] mr-1">Status:</span>
            {["ALL", "PENDING", "APPROVED", "REJECTED", "SUSPENDED", "EXPIRED", "RENEWAL_DUE"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  statusFilter === st
                    ? "bg-[#0A3D91] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Role Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-slate-400 font-bold uppercase text-[10px] mr-1">Role:</span>
            {["ALL", "COACH", "DISTRICT", "CLUB"].map((tp) => (
              <button
                key={tp}
                onClick={() => setTypeFilter(tp)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  typeFilter === tp
                    ? "bg-[#F57C00] text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {tp}
              </button>
            ))}
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-y border-slate-200">
                <th className="py-3 px-4">Member Info</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                        <img
                          src={rec.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                          alt={rec.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{rec.name}</div>
                        <div className="text-[10px] font-mono text-[#0A3D91] font-bold">{rec.regNo}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="bg-blue-50 text-[#0A3D91] font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                      {rec.type}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {rec.district}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-slate-900 font-bold">₹ {rec.paymentAmount}/-</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">{rec.paymentStatus}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                      rec.status === "APPROVED" ? "bg-emerald-100 text-emerald-800" :
                      rec.status === "SUSPENDED" ? "bg-rose-100 text-rose-800" :
                      rec.status === "REJECTED" ? "bg-slate-200 text-slate-700" :
                      "bg-amber-100 text-amber-800"
                    }`}>
                      {rec.status}
                    </span>
                  </td>

                  {/* 16.3 Approval System Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setViewMember(rec)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                        title="View Full Application & ID Card"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {rec.status !== "APPROVED" && (
                        <button
                          onClick={() => handleApprove(rec.id)}
                          className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
                          title="Approve & Activate Digital ID Pass"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {rec.status !== "SUSPENDED" && (
                        <button
                          onClick={() => setSuspendMember(rec)}
                          className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition"
                          title="Suspend Member"
                        >
                          <Ban className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {rec.status === "PENDING" && (
                        <button
                          onClick={() => handleReject(rec.id)}
                          className="p-1.5 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition"
                          title="Reject Application"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 16.4 SUSPEND WORKFLOW MODAL */}
      {suspendMember && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="p-5 bg-rose-700 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="font-black text-sm">Disciplinary Suspension Workflow</h3>
              </div>
              <button
                onClick={() => setSuspendMember(null)}
                className="text-white hover:text-rose-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplySuspend} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 text-rose-900">
                Member: <strong>{suspendMember.name}</strong> ({suspendMember.regNo}) &bull; {suspendMember.district}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Suspension Reason *</label>
                <input
                  type="text"
                  required
                  value={suspendForm.reason}
                  onChange={(e) => setSuspendForm({ ...suspendForm, reason: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Suspend From *</label>
                  <input
                    type="date"
                    required
                    value={suspendForm.from}
                    onChange={(e) => setSuspendForm({ ...suspendForm, from: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Suspend Till *</label>
                  <input
                    type="date"
                    required
                    value={suspendForm.till}
                    onChange={(e) => setSuspendForm({ ...suspendForm, till: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sanction Duration</label>
                <input
                  type="text"
                  value={suspendForm.duration}
                  onChange={(e) => setSuspendForm({ ...suspendForm, duration: e.target.value })}
                  placeholder="e.g. 3 Months / 1 Year"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Internal Disciplinary Remarks</label>
                <textarea
                  rows={2}
                  value={suspendForm.remarks}
                  onChange={(e) => setSuspendForm({ ...suspendForm, remarks: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={suspendForm.autoReactivate}
                    onChange={(e) => setSuspendForm({ ...suspendForm, autoReactivate: e.target.checked })}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                  <span>Auto Reactivate after duration ends</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-rose-700">
                  <input
                    type="checkbox"
                    checked={suspendForm.permanent}
                    onChange={(e) => setSuspendForm({ ...suspendForm, permanent: e.target.checked })}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                  <span>Permanent Suspend (Overrides dates)</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSuspendMember(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-xl font-bold shadow"
                >
                  Execute Sanction Suspension
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MEMBER MODAL */}
      {viewMember && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="p-5 bg-[#0A3D91] text-white flex justify-between items-center">
              <div>
                <h3 className="font-black text-sm">{viewMember.name}</h3>
                <span className="text-[10px] text-[#F57C00] font-mono">{viewMember.regNo}</span>
              </div>
              <button
                onClick={() => setViewMember(null)}
                className="text-white hover:text-orange-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-16 h-20 rounded-xl overflow-hidden border bg-slate-100 shrink-0">
                  <img src={viewMember.photoUrl} alt={viewMember.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <div><strong>Category:</strong> {viewMember.type}</div>
                  <div><strong>Email:</strong> {viewMember.email}</div>
                  <div><strong>Phone:</strong> {viewMember.phone}</div>
                  <div><strong>District:</strong> {viewMember.district}</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <div><strong>Current Status:</strong> <span className="font-bold text-[#0A3D91]">{viewMember.status}</span></div>
                <div><strong>Fee Paid:</strong> ₹ {viewMember.paymentAmount}/- (Txn: {viewMember.paymentTxnId})</div>
                <div><strong>Valid Until:</strong> {viewMember.validUntil}</div>
              </div>
            </div>

            <div className="p-4 bg-slate-100 flex justify-between">
              <Link
                href={`/verify?reg=${viewMember.regNo}`}
                target="_blank"
                className="bg-[#0A3D91] text-white px-3 py-1.5 rounded-lg font-bold text-xs"
              >
                Verify Live QR Pass &rarr;
              </Link>
              <button
                onClick={() => setViewMember(null)}
                className="bg-slate-200 text-slate-800 px-4 py-1.5 rounded-lg font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
