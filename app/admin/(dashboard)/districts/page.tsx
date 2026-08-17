"use client";

import { useState } from "react";
import { Building2, MapPin, Users, Phone, CheckCircle } from "lucide-react";
import { initialRegistrations, rajasthanDistricts } from "@/lib/data-store";

export default function AdminDistrictsPage() {
  const districtUnits = initialRegistrations.filter((r) => r.type === "DISTRICT");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#0A3D91]">District Units & Associations</h1>
        <p className="text-xs text-slate-500">
          50 Districts of Rajasthan &bull; Affiliated governing units, executive committees, and contact points.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {districtUnits.map((d) => (
          <div key={d.id} className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0A3D91] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">{d.name}</h3>
                <span className="text-[10px] font-mono text-[#0A3D91]">{d.regNo}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div><strong>President:</strong> {d.presidentName || "Dr. Arvind Singh"} ({d.presidentContact || "9414012345"})</div>
              <div><strong>Secretary:</strong> {d.secretaryName || "Mahendra Verma"} ({d.secretaryContact || "8504092852"})</div>
              <div><strong>Treasurer:</strong> {d.treasurerName || "Rajesh Saini"} ({d.treasurerContact || "9829033221"})</div>
              <div><strong>PAN:</strong> {d.panNumber || "AABTR8912P"}</div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Affiliated Unit
              </span>
              <span className="text-slate-400">Valid 2026-27</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
