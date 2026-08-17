"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Trophy, 
  Award, 
  Download, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Sparkles,
  FileText
} from "lucide-react";
import { initialResults, IResultItem } from "@/lib/data-store";
import { jsPDF } from "jspdf";

export default function ResultsPage() {
  const [selectedYear, setSelectedYear] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedDistrict, setSelectedDistrict] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const years = ["ALL", "2026", "2025", "2024"];
  const categories = ["ALL", "Senior Men", "Senior Women", "Junior Girls (U-17)", "Junior Boys (U-17)", "Sub-Junior"];
  const districts = ["ALL", "Bharatpur", "Jaipur", "Udaipur", "Kota", "Jodhpur"];

  const filteredResults = initialResults.filter((res) => {
    const matchesYear = selectedYear === "ALL" || res.year === selectedYear;
    const matchesCat = selectedCategory === "ALL" || res.category === selectedCategory;
    const matchesDist = selectedDistrict === "ALL" || res.district === selectedDistrict;
    const matchesSearch = 
      res.championshipName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.goldWinner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.silverWinner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.bestPlayer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesCat && matchesDist && matchesSearch;
  });

  const downloadResultPDF = (res: IResultItem) => {
    const doc = new jsPDF();
    doc.setFillColor(10, 61, 145);
    doc.rect(0, 0, 210, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("RAJASTHAN AEROSKATOBALL ASSOCIATION", 105, 18, { align: "center" });

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Official State Championship Bulletin & Medal Standings", 105, 26, { align: "center" });
    doc.text("Affiliated to Aeroskatoball Federation of India (AFI)", 105, 32, { align: "center" });

    // Header banner
    doc.setFillColor(245, 124, 0);
    doc.roundedRect(15, 48, 180, 10, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(res.championshipName.toUpperCase(), 105, 55, { align: "center" });

    // Details Grid
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(11);
    let y = 72;

    const printItem = (label: string, value: string, isMedal = false, medalColor?: [number, number, number]) => {
      doc.setFont("helvetica", "bold");
      if (isMedal && medalColor) {
        doc.setTextColor(medalColor[0], medalColor[1], medalColor[2]);
      } else {
        doc.setTextColor(10, 61, 145);
      }
      doc.text(label, 20, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(30, 41, 59);
      doc.text(value, 80, y);
      y += 10;
    };

    printItem("Category:", res.category);
    printItem("Host District:", `${res.district} (Rajasthan)`);
    printItem("Event Year / Date:", `${res.year} (${res.date})`);
    printItem("🥇 GOLD MEDAL (State Champions):", res.goldWinner, true, [202, 138, 4]);
    printItem("🥈 SILVER MEDAL (Runners-Up):", res.silverWinner, true, [100, 116, 139]);
    printItem("🥉 BRONZE MEDAL (3rd Place):", res.bronzeWinner, true, [180, 83, 9]);
    printItem("⭐ Most Valuable Player (MVP):", res.bestPlayer, true, [10, 61, 145]);

    y += 15;
    doc.setDrawColor(200, 200, 200);
    doc.line(15, y, 195, y);

    y += 15;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("Official Record Verified & Published by RAA Technical Committee.", 20, y);
    doc.text("Certified for state sports marks, scholarship quotas, and national selection trials.", 20, y + 5);

    y += 20;
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(10, 61, 145);
    doc.text("TECHNICAL DIRECTOR", 145, y);
    doc.setFont("helvetica", "normal");
    doc.text("Rajasthan Aeroskatoball Association", 145, y + 5);

    doc.save(`${res.championshipName}_${res.category}_Result.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <Link href="/" className="hover:text-[#0A3D91]">Home</Link>
            <span>/</span>
            <span className="text-[#0A3D91] font-bold">Results</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0A3D91] tracking-tight">
            Championship <span className="text-[#F57C00]">Results</span> & Medal Tallies
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Official validated scorecards, podium standings, and downloadable state result certificates.
          </p>
        </div>

        {/* Search & Multi-Filter Bar */}
        <div className="bg-white p-5 rounded-3xl shadow-lg border border-slate-100 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            
            {/* Search Box */}
            <div className="relative">
              <label className="block font-bold text-slate-700 mb-1">Search Championship / Player</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Bharatpur, Aman Sharma..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y === "ALL" ? "All Years" : y}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Playing Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c === "ALL" ? "All Categories" : c}</option>
                ))}
              </select>
            </div>

            {/* District Filter */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Host District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>{d === "ALL" ? "All Districts" : d}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Results List */}
        <div className="space-y-6">
          {filteredResults.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-100 hover:shadow-xl transition flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#0A3D91] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    {res.year}
                  </span>
                  <span className="bg-[#F57C00] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {res.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {res.district}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-black text-[#0A3D91]">
                  {res.championshipName}
                </h3>

                {/* Podium Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {/* Gold */}
                  <div className="bg-amber-50 border border-amber-200/80 p-3 rounded-2xl flex items-center gap-2.5">
                    <span className="text-xl">🥇</span>
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-800 block">Gold Medalist</span>
                      <span className="text-xs font-bold text-slate-900">{res.goldWinner}</span>
                    </div>
                  </div>

                  {/* Silver */}
                  <div className="bg-slate-100 border border-slate-200 p-3 rounded-2xl flex items-center gap-2.5">
                    <span className="text-xl">🥈</span>
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-700 block">Silver Medalist</span>
                      <span className="text-xs font-bold text-slate-900">{res.silverWinner}</span>
                    </div>
                  </div>

                  {/* Bronze */}
                  <div className="bg-orange-50 border border-orange-200/80 p-3 rounded-2xl flex items-center gap-2.5">
                    <span className="text-xl">🥉</span>
                    <div>
                      <span className="text-[10px] font-black uppercase text-orange-800 block">Bronze Medalist</span>
                      <span className="text-xs font-bold text-slate-900">{res.bronzeWinner}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 flex items-center gap-2 pt-1 font-medium">
                  <Sparkles className="w-4 h-4 text-[#F57C00]" />
                  <span>Tournament MVP: <strong>{res.bestPlayer}</strong></span>
                </div>
              </div>

              {/* Download Action */}
              <div className="lg:border-l lg:border-slate-100 lg:pl-6 shrink-0 w-full lg:w-auto">
                <button
                  onClick={() => downloadResultPDF(res)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0A3D91] hover:bg-[#083279] text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-md transition"
                >
                  <Download className="w-4 h-4 text-[#F57C00]" />
                  <span>Download PDF Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
