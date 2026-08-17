"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Search } from "lucide-react";
import { initialRegistrations } from "@/lib/data-store";

export default function AdminCoachesPage() {
  const [coaches] = useState(
    initialRegistrations.filter((r) => r.type === "COACH")
  );
  const [search, setSearch] = useState("");

  const filtered = coaches.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#0A3D91]">Coach Management</h1>
          <p className="text-xs text-slate-500">Certified trainers, Level 1/2/3 accreditation, and master coaches.</p>
        </div>
        <div className="relative w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search coaches..."
            className="w-full text-xs bg-white border border-slate-200 rounded-xl p-2.5 pl-8 text-slate-900"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b">
              <th className="p-3">Coach Name</th>
              <th className="p-3">District</th>
              <th className="p-3">Accreditation Tier</th>
              <th className="p-3">Specialization</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 transition">
                <td className="p-3 font-bold text-slate-900">
                  <div>{c.name}</div>
                  <div className="text-[10px] font-mono text-[#0A3D91]">{c.regNo}</div>
                </td>
                <td className="p-3 text-slate-700">{c.district}</td>
                <td className="p-3 font-semibold text-[#F57C00]">{c.coachingLevel || "National Certified"}</td>
                <td className="p-3">{c.specialization || "Sprint Tactics"}</td>
                <td className="p-3">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {c.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <Link
                    href={`/verify?reg=${c.regNo}`}
                    target="_blank"
                    className="bg-[#0A3D91] text-white px-3 py-1 rounded-lg font-bold text-[11px]"
                  >
                    View Credential
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
