import connectDB from "@/lib/db";
import { HeroSlide, NewsPost, Circular, Event, GalleryItem, Sponsor } from "@/models";
import HeroSlider from "@/components/public/HeroSlider";
import CircularTicker from "@/components/public/CircularTicker";
import EventCard from "@/components/public/EventCard";
import SponsorStrip from "@/components/public/SponsorStrip";
import Link from "next/link";
import { ArrowRight, Trophy, Users, Award, ShieldCheck } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const revalidate = 60; // ISR 60s

export default async function HomePage() {
  await connectDB();

  const [slides, news, circulars, events, gallery, sponsors] = await Promise.all([
    HeroSlide.find({ active: true }).sort({ order: 1 }).lean(),
    NewsPost.find({ published: true }).sort({ createdAt: -1 }).limit(3).lean(),
    Circular.find().sort({ publishDate: -1 }).limit(10).lean(),
    Event.find().sort({ startDate: 1 }).limit(3).lean(),
    GalleryItem.find({ featured: true }).limit(6).lean(),
    Sponsor.find().sort({ order: 1 }).lean(),
  ]);

  const serialize = (items: any[]) => JSON.parse(JSON.stringify(items));

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <HeroSlider slides={serialize(slides)} />

      {/* Circulars Marquee / Announcement Ticker */}
      <CircularTicker circulars={serialize(circulars)} />

      {/* Quick Access Badges / Features */}
      <div className="max-w-7xl mx-mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-saffron-500 transition">
            <div className="p-3 bg-saffron-50 rounded-xl text-saffron-600">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-navy-950">25+</p>
              <p className="text-xs font-semibold text-slate-500">Districts Active</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-saffron-500 transition">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-navy-950">1,500+</p>
              <p className="text-xs font-semibold text-slate-500">Registered Athletes</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-saffron-500 transition">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-navy-950">40+</p>
              <p className="text-xs font-semibold text-slate-500">Affiliated Academies</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-saffron-500 transition">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-navy-950">100%</p>
              <p className="text-xs font-semibold text-slate-500">Verified Affiliation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Upcoming Events & State News */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Events (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">State Championships</span>
              <h2 className="text-2xl font-black text-navy-950">Upcoming Events & Trials</h2>
            </div>
            <Link href="/events" className="text-xs font-bold text-saffron-600 hover:text-saffron-700 flex items-center gap-1">
              View All Events <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event: any) => (
              <EventCard key={event._id} event={serialize([event])[0]} />
            ))}
          </div>
        </div>

        {/* Right Column: News & Announcements (1 col) */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">Latest Updates</span>
            <h2 className="text-2xl font-black text-navy-950">State News</h2>
          </div>

          <div className="space-y-4">
            {news.map((item: any) => (
              <div key={item._id} className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition">
                <span className="text-[10px] font-bold text-saffron-600 uppercase tracking-wider">
                  {formatDate(item.createdAt)}
                </span>
                <h3 className="font-bold text-navy-950 text-sm mt-1 hover:text-saffron-600 transition">
                  <Link href={`/about#news`}>{item.title}</Link>
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sponsors Strip */}
      <SponsorStrip sponsors={serialize(sponsors)} />
    </div>
  );
}
