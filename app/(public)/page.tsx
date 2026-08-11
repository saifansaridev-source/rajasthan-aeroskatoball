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

  // Fallback rich content when DB records are empty
  const defaultEvents = [
    {
      _id: "evt-1",
      title: "5th Rajasthan State Aeroskatoball Championship 2026",
      description: "Official state-level championship for Junior & Senior categories. Winners qualify for National Trials.",
      startDate: "2026-09-15",
      endDate: "2026-09-18",
      venue: "Sawai Mansingh Indoor Stadium",
      district: "Jaipur",
      discipline: "State Championship 🏆",
      image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=800&auto=format&fit=crop",
      brochureUrl: "#"
    },
    {
      _id: "evt-2",
      title: "All-Rajasthan Sub-Junior Selection Trial & Speed Cup",
      description: "State selection trial for sub-junior athletes under 14 years. District entry forms required.",
      startDate: "2026-10-02",
      endDate: "2026-10-04",
      venue: "Maharana Pratap Sports Complex",
      district: "Udaipur",
      discipline: "Selection Trial 🎯",
      image: "https://images.unsplash.com/photo-1517649763962-0c623266010b?q=80&w=800&auto=format&fit=crop",
      brochureUrl: "#"
    },
    {
      _id: "evt-3",
      title: "Western Zone Inter-District Aeroskatoball Cup",
      description: "Inter-district tournament bringing top 16 district teams across Western Rajasthan.",
      startDate: "2026-11-10",
      endDate: "2026-11-12",
      venue: "Barkatullah Khan Stadium Complex",
      district: "Jodhpur",
      discipline: "Inter-District ⚡",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop",
      brochureUrl: "#"
    }
  ];

  const defaultCirculars = [
    {
      _id: "circ-1",
      title: "Official Notification: 5th Rajasthan State Championship Dates & Venue",
      description: "Guidelines, eligibility criteria, category details, and registration deadline for Jaipur State Championship.",
      category: "NOTIFICATION",
      publishDate: "2026-08-01",
      fileUrl: "#"
    },
    {
      _id: "circ-2",
      title: "Official Aeroskatoball Rulebook & Technical Regulations (2026 Edition)",
      description: "Updated international competition rules, court dimensions, gear standards, and scoring matrix.",
      category: "RULEBOOK",
      publishDate: "2026-07-20",
      fileUrl: "#"
    },
    {
      _id: "circ-3",
      title: "District Association Affiliation & Athlete ID Registration Form",
      description: "Mandatory affiliation renewal form for all 33 district aeroskatoball associations in Rajasthan.",
      category: "AFFILIATION",
      publishDate: "2026-07-10",
      fileUrl: "#"
    }
  ];

  const defaultGallery = [
    {
      _id: "gal-1",
      title: "Olympic Roller Sports & Skate Showcase",
      albumName: "OLYMPIC HIGHLIGHTS 🏅",
      url: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=800&auto=format&fit=crop"
    },
    {
      _id: "gal-2",
      title: "High-Speed Arena Action & Goal Moments",
      albumName: "STATE CHAMPIONSHIPS 🏆",
      url: "https://images.unsplash.com/photo-1517649763962-0c623266010b?q=80&w=800&auto=format&fit=crop"
    },
    {
      _id: "gal-3",
      title: "State Medal Ceremony & Award Presentation",
      albumName: "MEDAL CEREMONY 🥇",
      url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop"
    },
    {
      _id: "gal-4",
      title: "Sub-Junior Selection Trial Drills",
      albumName: "SELECTION TRIALS 🎯",
      url: "https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=800&auto=format&fit=crop"
    },
    {
      _id: "gal-5",
      title: "Olympic Standard Training Arena",
      albumName: "INFRASTRUCTURE 🏟️",
      url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop"
    },
    {
      _id: "gal-6",
      title: "Team Rajasthan Victory Celebration",
      albumName: "NATIONAL TRIUMPH 🎉",
      url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const serialize = (items: any[]) => JSON.parse(JSON.stringify(items));
  const serializedCirculars = circulars.length > 0 ? serialize(circulars) : defaultCirculars;
  const serializedEvents = events.length > 0 ? serialize(events) : defaultEvents;
  const serializedGallery = gallery.length > 0 ? serialize(gallery) : defaultGallery;

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
              <p className="text-xs font-semibold text-slate-500">Olympic Photos & Highlights</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Association Stats Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 rounded-2xl p-8 text-white shadow-xl border border-navy-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl lg:text-4xl font-black text-saffron-400">33</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Districts Covered</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl lg:text-4xl font-black text-saffron-400">15,000+</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Registered Athletes</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl lg:text-4xl font-black text-saffron-400">48+</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">State Championships</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl lg:text-4xl font-black text-saffron-400">120+</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Accredited Coaches</p>
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serializedEvents.map((event: any) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
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

          <div className="space-y-3">
            {serializedCirculars.map((item: any) => (
              <div key={item._id} className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-saffron-600 uppercase tracking-wider">
                    {item.category || "CIRCULAR"}
                  </span>
                  <span className="text-slate-400 font-mono">
                    {formatDate(item.publishDate || item.createdAt || "2026-08-01")}
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
                    href={item.fileUrl || "/downloads"}
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
        </div>
      </div>

      {/* Olympic & International Showcase Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 md:p-12 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1517649763962-0c623266010b?q=80&w=1600&auto=format&fit=crop"
            alt="Olympic Games & World Championships"
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay"
          />
          <div className="relative max-w-2xl space-y-4">
            <span className="bg-saffron-500 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-md">
              Olympic Vision 🏅
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
              Preparing Rajasthan Athletes for Olympic & World Championships
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              The Rajasthan Aeroskatoball Association is committed to world-class coaching, international-standard rinks, and high-performance selection trials to nurture future Olympians from Rajasthan.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/gallery"
                className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs md:text-sm px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
              >
                View Olympic Gallery <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/leaders"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs md:text-sm px-5 py-3 rounded-xl backdrop-blur-xs transition"
              >
                Meet Association Leaders
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        <div className="flex justify-between items-end border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">Action Moments</span>
            <h2 className="text-2xl font-black text-navy-950">Championship & Olympic Gallery Highlights</h2>
          </div>
          <Link href="/gallery" className="text-xs font-bold text-saffron-600 hover:text-saffron-700 flex items-center gap-1">
            View Full Gallery <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {serializedGallery.map((photo: any) => (
            <Link key={photo._id} href="/gallery" className="relative rounded-xl overflow-hidden border border-slate-200 group h-40 bg-slate-900 shadow-xs">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 md:opacity-0 group-hover:opacity-100 transition p-2.5 flex flex-col justify-end">
                <span className="text-[9px] font-bold text-saffron-400 uppercase">{photo.albumName || "HIGHLIGHTS"}</span>
                <p className="text-[11px] text-white font-bold truncate leading-tight">{photo.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
