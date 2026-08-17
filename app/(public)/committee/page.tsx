"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Filter,
  Search
} from "lucide-react";
import { initialCommittee } from "@/lib/data-store";

export default function CommitteePage() {
  const [filterDesignation, setFilterDesignation] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const designations = ["ALL", "President", "General Secretary", "Treasurer", "Senior Vice President", "Technical Director & Chief Coach", "Joint Secretary"];

  const filteredMembers = initialCommittee.filter((member) => {
    const matchesDesig = filterDesignation === "ALL" || member.designation.includes(filterDesignation);
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDesig && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <Link href="/" className="hover:text-[#0A3D91]">Home</Link>
            <span>/</span>
            <span className="text-[#0A3D91] font-bold">Executive Committee</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0A3D91] tracking-tight">
            Executive <span className="text-[#F57C00]">Committee</span> & Office Bearers
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Governing board of Rajasthan Aeroskatoball Association elected in compliance with Section 8 regulations.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, district, role..."
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          {/* Designation Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              Role:
            </span>
            {designations.map((d) => (
              <button
                key={d}
                onClick={() => setFilterDesignation(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  filterDesignation === d
                    ? "bg-[#0A3D91] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {d === "ALL" ? "All Board" : d}
              </button>
            ))}
          </div>

        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
            >
              {/* Photo & Card Header */}
              <div>
                <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  
                  {/* Designation Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-[#F57C00] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-md">
                      {member.designation}
                    </span>
                    <h3 className="text-xl font-black text-white mt-1 leading-tight">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Info List */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-slate-700">
                    <MapPin className="w-4 h-4 text-[#0A3D91] shrink-0" />
                    <span>District: <strong>{member.district} (Rajasthan)</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-700">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <a href={`tel:${member.mobile}`} className="hover:text-[#0A3D91] font-semibold transition">
                      {member.mobile}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-700">
                    <Mail className="w-4 h-4 text-[#F57C00] shrink-0" />
                    <a href={`mailto:${member.email}`} className="hover:text-[#0A3D91] transition truncate">
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-emerald-600">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Authorized Officer
                </span>
                <span className="font-mono text-[10px]">RAA-BEARER-#{member.order}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
