"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Bell, 
  FileCheck2, 
  Award, 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  ArrowRight, 
  Download,
  Share2,
  X,
  FileText
} from "lucide-react";
import { initialNews, INewsArticle } from "@/lib/data-store";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<INewsArticle | null>(null);

  const categories = [
    { id: "ALL", label: "All Updates" },
    { id: "NEWS", label: "Latest News" },
    { id: "NOTIFICATION", label: "Notifications" },
    { id: "CIRCULAR", label: "Circulars" },
    { id: "SELECTION_LIST", label: "Selection Lists" },
  ];

  const filteredNews = initialNews.filter((item) => {
    const matchesCat = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <Link href="/" className="hover:text-[#0A3D91]">Home</Link>
            <span>/</span>
            <span className="text-[#0A3D91] font-bold">News & Circulars</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0A3D91] tracking-tight">
            News, Notifications & <span className="text-[#F57C00]">Circulars</span>
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Stay informed with official press releases, championship orders, selection trial results, and federation notices.
          </p>
        </div>

        {/* Category Filters & Search */}
        <div className="bg-white p-4 rounded-3xl shadow-md border border-slate-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? "bg-[#0A3D91] text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news, selection lists..."
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={article.image || "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A3D91]/90 backdrop-blur-xs text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                    {article.category.replace("_", " ")}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#F57C00]" />
                    <span>{article.publishDate}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#0A3D91] transition line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                <button
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A3D91] hover:text-[#F57C00] transition"
                >
                  <span>Read Full Notice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  href="/downloads"
                  className="text-slate-400 hover:text-slate-600 text-xs"
                  title="Related Downloads"
                >
                  <Download className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FULL ARTICLE MODAL */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
              <div className="p-6 bg-[#0A3D91] text-white flex justify-between items-start">
                <div>
                  <span className="bg-[#F57C00] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md">
                    {activeArticle.category.replace("_", " ")}
                  </span>
                  <h3 className="text-lg font-black text-white mt-2 leading-tight">
                    {activeArticle.title}
                  </h3>
                  <div className="flex items-center gap-2 text-blue-200 text-xs mt-1">
                    <Clock className="w-3.5 h-3.5 text-[#F57C00]" />
                    <span>Published: {activeArticle.publishDate}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="text-white hover:text-orange-300 p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed">
                <p>{activeArticle.content}</p>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <FileText className="w-5 h-5 text-[#0A3D91]" />
                    <span>Official Circular Attachment</span>
                  </div>
                  <Link
                    href="/downloads"
                    className="bg-[#0A3D91] hover:bg-[#083279] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5 text-[#F57C00]" />
                    <span>Download PDF</span>
                  </Link>
                </div>
              </div>

              <div className="p-4 bg-slate-100 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
