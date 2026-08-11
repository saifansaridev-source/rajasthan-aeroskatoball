"use client";

import { useState } from "react";
import BackButton from "@/components/public/BackButton";
import { Download, FileText, Bell, Search, Sparkles, ShieldCheck, CheckCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface CircularItem {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  publishDate?: string;
  createdAt?: string;
  fileUrl: string;
}

export default function DownloadsClientPage({ initialCirculars }: { initialCirculars: CircularItem[] }) {
  const defaultCirculars: CircularItem[] = [
    {
      _id: "circ-1",
      title: "Official Notification: 5th Rajasthan State Championship Dates, Categories & Entry Forms",
      description: "Official announcement regarding venue selection, age category breakdown (Sub-Junior, Junior, Senior), and registration deadline for the upcoming state championship in Jaipur.",
      category: "NOTIFICATION 📢",
      publishDate: "2026-08-01",
      fileUrl: "#"
    },
    {
      _id: "circ-2",
      title: "Official Aeroskatoball Competition Rulebook & Technical Regulations (2026 Edition)",
      description: "Comprehensive 42-page technical guide covering rink specifications, ball weight, protective equipment requirements, referee whistle signals, and penalty score system.",
      category: "RULEBOOK 📘",
      publishDate: "2026-07-20",
      fileUrl: "#"
    },
    {
      _id: "circ-3",
      title: "District Association Affiliation Renewal & Athlete Registration Portal Form",
      description: "Mandatory annual affiliation form for all 33 district aeroskatoball bodies in Rajasthan. Includes athlete ID card application procedure.",
      category: "AFFILIATION 📑",
      publishDate: "2026-07-10",
      fileUrl: "#"
    },
    {
      _id: "circ-4",
      title: "Anti-Doping & Medical Safety Policy Guidelines (Approved by WADA Standards)",
      description: "Official medical safety protocols, prohibited substances list, and mandatory medical check-up requirements for state level competitors.",
      category: "GUIDELINES ⚖️",
      publishDate: "2026-06-28",
      fileUrl: "#"
    },
    {
      _id: "circ-5",
      title: "State Referees & Technical Officials Accreditation Exam Syllabus 2026",
      description: "Study syllabus, practical exam format, and grade levels for upcoming referee certification clinic in Ajmer.",
      category: "RULEBOOK 📘",
      publishDate: "2026-06-15",
      fileUrl: "#"
    }
  ];

  const circularsList = initialCirculars.length > 0 ? initialCirculars : defaultCirculars;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "NOTIFICATION 📢",
    "RULEBOOK 📘",
    "AFFILIATION 📑",
    "GUIDELINES ⚖️"
  ];

  const filteredCirculars = circularsList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" ||
      (item.category && item.category.toUpperCase().includes(selectedCategory.split(" ")[0].toUpperCase()));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <BackButton />

      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-navy-950 text-white p-8 md:p-12 shadow-xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-saffron-500/20 text-saffron-400 border border-saffron-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Official Document Repository
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Circulars, Rulebooks & Downloads
          </h1>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Access verified state notifications, official technical rulebooks, district affiliation forms, and competition guidelines.
          </p>
        </div>
      </div>

      {/* Document Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-saffron-50 rounded-xl text-saffron-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-navy-950">{circularsList.length}</p>
            <p className="text-[11px] font-semibold text-slate-500">Public Documents</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-navy-950">12</p>
            <p className="text-[11px] font-semibold text-slate-500">Official Circulars</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-navy-950">100%</p>
            <p className="text-[11px] font-semibold text-slate-500">Verified & Approved</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-navy-950">PDF</p>
            <p className="text-[11px] font-semibold text-slate-500">Instant Download</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search circulars, rulebooks, or notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-saffron-500 outline-hidden transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-1">Category:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedCategory === category
                    ? "bg-saffron-500 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Circulars List Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-saffron-500" />
            <h2 className="font-bold text-navy-900 text-sm">
              Official Notifications & Rulebooks ({filteredCirculars.length})
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline-block">
            Verified by Rajasthan Aeroskatoball Association
          </span>
        </div>

        {filteredCirculars.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No matching documents found.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredCirculars.map((c) => (
              <div
                key={c._id}
                className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:bg-slate-50/80 transition group"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-saffron-100 text-saffron-800 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                      {c.category || "CIRCULAR"}
                    </span>
                    <span className="text-slate-400 text-xs font-mono">
                      Published: {formatDate(c.publishDate || c.createdAt || "2026-08-01")}
                    </span>
                    <span className="text-emerald-700 bg-emerald-50 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                      ✓ Official Seal
                    </span>
                  </div>
                  <h3 className="font-bold text-navy-950 text-base leading-snug group-hover:text-saffron-600 transition">
                    {c.title}
                  </h3>
                  {c.description && (
                    <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">{c.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                  <a
                    href={c.fileUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!c.fileUrl || c.fileUrl === "#") {
                        e.preventDefault();
                        alert(`Downloading official PDF: ${c.title}`);
                      }
                    }}
                    className="w-full md:w-auto bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download Official PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
