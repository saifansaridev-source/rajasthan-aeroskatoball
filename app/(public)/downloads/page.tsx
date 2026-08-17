"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Download, 
  FileText, 
  BookOpen, 
  Calendar, 
  Award, 
  Search, 
  Filter, 
  CheckCircle,
  FileCheck2,
  ExternalLink
} from "lucide-react";
import { initialDownloads, IDownloadItem } from "@/lib/data-store";

export default function DownloadsPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "ALL", label: "All Documents", icon: FileText },
    { id: "RULE_BOOK", label: "Rule Books", icon: BookOpen },
    { id: "CIRCULAR", label: "Circulars", icon: FileCheck2 },
    { id: "FORM", label: "Official Forms", icon: FileText },
    { id: "SELECTION_POLICY", label: "Selection Policy", icon: Award },
    { id: "CALENDAR", label: "Sports Calendar", icon: Calendar },
  ];

  const filteredDownloads = initialDownloads.filter((item) => {
    const matchesCat = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDownload = (item: IDownloadItem) => {
    // Generates a mock downloaded circular blob
    const content = `RAJASTHAN AEROSKATOBALL ASSOCIATION\nOfficial Document: ${item.title}\nCategory: ${item.category}\nDate: ${item.publishDate}\n\nThis is an official document published by RAA Bharatpur (Rajasthan).`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.title.replace(/\s+/g, "_")}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <Link href="/" className="hover:text-[#0A3D91]">Home</Link>
            <span>/</span>
            <span className="text-[#0A3D91] font-bold">Downloads</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0A3D91] tracking-tight">
            Official <span className="text-[#F57C00]">Downloads</span> & Circulars
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Access official technical rule books, state selection policies, championship circulars, and medical forms.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-3xl shadow-md border border-slate-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    isActive
                      ? "bg-[#0A3D91] text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#F57C00]" : "text-slate-400"}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search circulars, rulebooks..."
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

        </div>

        {/* Download Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredDownloads.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-blue-50 text-[#0A3D91] font-black text-[10px] uppercase px-2.5 py-1 rounded-md">
                    {item.category.replace("_", " ")}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {item.publishDate}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A3D91] to-[#083279] text-white flex items-center justify-center shrink-0 shadow">
                    <FileText className="w-5 h-5 text-[#F57C00]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#0A3D91] transition">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Metadata & Action */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500 text-[11px]">
                  Format: <strong>{item.fileType}</strong> &bull; Size: <strong>{item.fileSize}</strong>
                </span>

                <button
                  onClick={() => handleDownload(item)}
                  className="inline-flex items-center gap-1.5 bg-[#0A3D91] hover:bg-[#083279] text-white px-4 py-2 rounded-xl text-xs font-bold shadow transition"
                >
                  <Download className="w-3.5 h-3.5 text-[#F57C00]" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
