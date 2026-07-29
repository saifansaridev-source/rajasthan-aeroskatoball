"use client";

import { useState, useEffect } from "react";
import { Search, CheckCircle2, XCircle, Clock, Eye, ShieldCheck } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminRegistrationsQueue() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRegistrations = async () => {
    try {
      const res = await fetch("/api/admin/registrations");
      const data = await res.json();
      setRegistrations(data.registrations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        fetchRegistrations();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = registrations.filter((r) => {
    const matchesType = filterType === "ALL" || r.type === filterType;
    const matchesStatus = filterStatus === "ALL" || r.status === filterStatus;
    const matchesSearch =
      r.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.district.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-black text-navy-950">Registration Applications Queue</h1>
          <p className="text-xs text-slate-500">
            Review, approve, or reject annual athlete, coach, referee, and academy registration requests.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Search name, reg number, district..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
        >
          <option value="ALL">All Categories</option>
          <option value="PLAYER">Player</option>
          <option value="COACH">Coach</option>
          <option value="REFEREE">Referee</option>
          <option value="ACADEMY">Academy</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Queue Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 text-xs">Loading queue...</div>
        ) : (
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-navy-900 text-white uppercase font-bold text-[11px]">
              <tr>
                <th className="p-3.5">Reg Number</th>
                <th className="p-3.5">Applicant Name</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">District</th>
                <th className="p-3.5">Phone / Email</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r._id} className="hover:bg-slate-50">
                  <td className="p-3.5 font-mono font-bold text-saffron-600">{r.regNumber}</td>
                  <td className="p-3.5 font-bold text-navy-950">{r.applicantName}</td>
                  <td className="p-3.5">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                      {r.type}
                    </span>
                  </td>
                  <td className="p-3.5 font-medium">{r.district}</td>
                  <td className="p-3.5">
                    <div>{r.phone}</div>
                    <div className="text-[10px] text-slate-400">{r.email}</div>
                  </td>
                  <td className="p-3.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      r.status === "APPROVED" ? "bg-emerald-100 text-emerald-800" :
                      r.status === "REJECTED" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    {r.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(r._id, "APPROVED")}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1 rounded transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(r._id, "REJECTED")}
                          className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold px-2.5 py-1 rounded transition"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
