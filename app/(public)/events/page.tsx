"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  Clock, 
  Download, 
  ArrowRight, 
  ExternalLink,
  Users,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { initialChampionships, IChampionship } from "@/lib/data-store";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"UPCOMING" | "ONGOING" | "COMPLETED">("UPCOMING");
  const [selectedEvent, setSelectedEvent] = useState<IChampionship | null>(null);

  const filteredEvents = initialChampionships.filter((e) => e.status === activeTab);

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <Link href="/" className="hover:text-[#0A3D91]">Home</Link>
            <span>/</span>
            <span className="text-[#0A3D91] font-bold">Championships</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0A3D91] tracking-tight">
            Official State <span className="text-[#F57C00]">Championships</span> & Tournaments
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Sanctioned State Championships, Zonal Tournaments, and Selection Trials organized by RAA.
          </p>
        </div>

        {/* 3 Status Tabs: Upcoming, Ongoing, Completed */}
        <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-3">
          {(["UPCOMING", "ONGOING", "COMPLETED"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                activeTab === tab
                  ? "bg-[#0A3D91] text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab === "UPCOMING" ? "Upcoming Championships" :
               tab === "ONGOING" ? "Ongoing Tournaments" :
               "Completed Championships & Results"}
            </button>
          ))}
        </div>

        {/* Events Grid / Cards */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-md border border-slate-100 max-w-lg mx-auto">
            <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No {activeTab.toLowerCase()} championships currently</h3>
            <p className="text-xs text-slate-500 mt-1">Check back soon or explore our upcoming tournament schedule.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0A3D91]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                      {event.district} District
                    </div>
                    <div className="absolute top-3 right-3 bg-[#F57C00] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase shadow">
                      {event.status}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#0A3D91] transition">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#0A3D91]" />
                        <span><strong>Dates:</strong> {event.startDate} to {event.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#F57C00]" />
                        <span><strong>Venue:</strong> {event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-emerald-600" />
                        <span><strong>Age:</strong> {event.ageGroup}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 mt-2">
                  {event.status === "COMPLETED" ? (
                    <Link
                      href="/results"
                      className="w-full text-center bg-slate-100 hover:bg-blue-50 text-[#0A3D91] font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <Trophy className="w-4 h-4 text-[#F57C00]" />
                      <span>View Official Results & Medals</span>
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/downloads"
                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-[#0A3D91]"
                      >
                        <Download className="w-3.5 h-3.5 text-[#F57C00]" />
                        <span>Circular PDF</span>
                      </Link>
                      <Link
                        href="/register"
                        className="inline-flex items-center gap-1.5 bg-[#0A3D91] hover:bg-[#083279] text-white px-4 py-2 rounded-xl text-xs font-bold shadow transition"
                      >
                        <span>Register Now</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#F57C00]" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
