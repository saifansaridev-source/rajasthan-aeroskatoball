import connectDB from "@/lib/db";
import { Circular, GalleryItem, Event } from "@/models";
import { Download, Image as ImageIcon, Calendar, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminDashboardOverview() {
  let totalCirculars = 0;
  let totalGallery = 0;
  let totalEvents = 0;
  let recentCirculars: any[] = [];
  let recentEvents: any[] = [];

  try {
    const conn = await connectDB();
    if (conn) {
      const [cCount, gCount, eCount, circularsData, eventsData] = await Promise.all([
        Circular.countDocuments(),
        GalleryItem.countDocuments(),
        Event.countDocuments(),
        Circular.find().sort({ createdAt: -1 }).limit(5).lean(),
        Event.find().sort({ startDate: -1 }).limit(5).lean(),
      ]);
      totalCirculars = cCount;
      totalGallery = gCount;
      totalEvents = eCount;
      recentCirculars = circularsData;
      recentEvents = eventsData;
    }
  } catch (err) {
    console.error("AdminDashboard DB error:", err);
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-950">Dashboard Overview</h1>
          <p className="text-xs text-slate-500 mt-1">
            Rajasthan Aeroskatoball Association — Administrative Control Center
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Link href="/admin/downloads" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-saffron-500 transition group">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Circulars & Downloads</span>
            <div className="p-2 bg-saffron-50 rounded-lg text-saffron-600 group-hover:scale-110 transition">
              <Download className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-navy-950 mt-3">{totalCirculars}</p>
          <span className="text-[11px] text-saffron-600 font-bold mt-1 inline-block">Manage Official Documents</span>
        </Link>

        <Link href="/admin/gallery" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-500 transition group">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Gallery (Media)</span>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:scale-110 transition">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-navy-950 mt-3">{totalGallery}</p>
          <span className="text-[11px] text-blue-600 font-bold mt-1 inline-block">Manage Championship Media</span>
        </Link>

        <Link href="/admin/events" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-500 transition group">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Tournaments & Events</span>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:scale-110 transition">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-navy-950 mt-3">{totalEvents}</p>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">Manage State Events</span>
        </Link>
      </div>

      {/* Quick Summary Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Circulars */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-black text-navy-950 text-sm flex items-center gap-2">
              <Download className="w-4 h-4 text-saffron-500" /> Recent Circulars
            </h2>
            <Link href="/admin/downloads" className="text-xs font-bold text-saffron-600 hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {recentCirculars.length === 0 ? (
              <div className="p-4 text-slate-400 text-center">No circulars added yet.</div>
            ) : (
              recentCirculars.map((c: any) => (
                <div key={c._id.toString()} className="p-3.5 flex justify-between items-center hover:bg-slate-50">
                  <div className="max-w-xs">
                    <p className="font-bold text-navy-950 truncate">{c.title}</p>
                    <p className="text-[10px] text-slate-400">{c.category || "CIRCULAR"}</p>
                  </div>
                  <a href={c.fileUrl} target="_blank" rel="noopener noreferrer" className="text-saffron-600 font-bold hover:underline shrink-0">
                    View PDF
                  </a>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Tournaments */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-black text-navy-950 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-saffron-500" /> State Tournaments
            </h2>
            <Link href="/admin/events" className="text-xs font-bold text-saffron-600 hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {recentEvents.length === 0 ? (
              <div className="p-4 text-slate-400 text-center">No tournaments created yet.</div>
            ) : (
              recentEvents.map((e: any) => (
                <div key={e._id.toString()} className="p-3.5 flex justify-between items-center hover:bg-slate-50">
                  <div className="max-w-xs">
                    <p className="font-bold text-navy-950 truncate">{e.title}</p>
                    <p className="text-[10px] text-slate-400">{e.venue}, {e.district}</p>
                  </div>
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {new Date(e.startDate).toLocaleDateString("en-IN")}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
