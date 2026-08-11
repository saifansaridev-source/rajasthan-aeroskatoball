import connectDB from "@/lib/db";
import { Circular, Event, GalleryItem } from "@/models";
import HeroSlider from "@/components/public/HeroSlider";
import CircularTicker from "@/components/public/CircularTicker";
import EventCard from "@/components/public/EventCard";
import Link from "next/link";
import { ArrowRight, Trophy, Download, Calendar, Image as ImageIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let circulars: any[] = [];
  let events: any[] = [];
  let gallery: any[] = [];

  try {
    const conn = await connectDB();
    if (conn) {
      const [cData, eData, gData] = await Promise.all([
        Circular.find().sort({ publishDate: -1 }).limit(8).lean(),
        Event.find().sort({ startDate: 1 }).limit(6).lean(),
        GalleryItem.find({ type: "PHOTO" }).sort({ createdAt: -1 }).limit(6).lean(),
      ]);
      circulars = cData;
      events = eData;
      gallery = gData;
    }
  } catch (err) {
    console.error("HomePage database fetch error:", err);
  }

  const serialize = (items: any[]) => JSON.parse(JSON.stringify(items));
  const serializedCirculars = serialize(circulars);
  const serializedEvents = serialize(events);
  const serializedGallery = serialize(gallery);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <HeroSlider />

      {/* Circulars Marquee / Announcement Ticker */}
      <CircularTicker circulars={serializedCirculars} />

      {/* Quick Access Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Link href="/downloads" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-saffron-500 transition group">
            <div className="p-3 bg-saffron-50 rounded-xl text-saffron-600 group-hover:scale-110 transition">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-black text-navy-950">Official Circulars</p>
              <p className="text-xs font-semibold text-slate-500">Download Notifications & Rulebooks</p>
            </div>
          </Link>

          <Link href="/events" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-saffron-500 transition group">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:scale-110 transition">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-black text-navy-950">State Championships</p>
              <p className="text-xs font-semibold text-slate-500">View Upcoming Tournaments & Trials</p>
            </div>
          </Link>

          <Link href="/gallery" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-saffron-500 transition group">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:scale-110 transition">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-black text-navy-950">Media & Gallery</p>
              <p className="text-xs font-semibold text-slate-500">Action Photos & Highlights</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Main Content Grid: Upcoming Events & Announcements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Events (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">State Championships</span>
              <h2 className="text-2xl font-black text-navy-950">Upcoming Tournaments & Events</h2>
            </div>
            <Link href="/events" className="text-xs font-bold text-saffron-600 hover:text-saffron-700 flex items-center gap-1">
              View All Events <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {serializedEvents.length === 0 ? (
            <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
              No state events scheduled at this moment. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serializedEvents.map((event: any) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Recent Announcements & Circulars (1 col) */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">Official Notices</span>
              <h2 className="text-2xl font-black text-navy-950">Recent Circulars</h2>
            </div>
            <Link href="/downloads" className="text-xs font-bold text-saffron-600 hover:underline">
              View All
            </Link>
          </div>

          {serializedCirculars.length === 0 ? (
            <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
              No circulars available.
            </div>
          ) : (
            <div className="space-y-3">
              {serializedCirculars.map((item: any) => (
                <div key={item._id} className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-saffron-600 uppercase tracking-wider">
                      {item.category || "CIRCULAR"}
                    </span>
                    <span className="text-slate-400 font-mono">
                      {formatDate(item.publishDate || item.createdAt)}
                    </span>
                  </div>
                  <h3 className="font-bold text-navy-950 text-xs hover:text-saffron-600 transition leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-[11px] text-slate-500 line-clamp-2">{item.description}</p>
                  )}
                  <div className="pt-1">
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-saffron-50 text-saffron-700 hover:bg-saffron-100 border border-saffron-200 px-3 py-1.5 rounded-lg text-[11px] font-bold transition"
                    >
                      <Download className="w-3.5 h-3.5" /> Download PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gallery Showcase */}
      {serializedGallery.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
          <div className="flex justify-between items-end border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">Action Moments</span>
              <h2 className="text-2xl font-black text-navy-950">Championship Media Highlights</h2>
            </div>
            <Link href="/gallery" className="text-xs font-bold text-saffron-600 hover:text-saffron-700 flex items-center gap-1">
              View Gallery <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {serializedGallery.map((photo: any) => (
              <Link key={photo._id} href="/gallery" className="relative rounded-xl overflow-hidden border border-slate-200 group h-36 bg-slate-900 shadow-xs">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-2 flex items-end">
                  <p className="text-[10px] text-white font-bold truncate">{photo.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
