"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Trophy, 
  Users, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Play, 
  ExternalLink,
  ChevronRight,
  FileText,
  Clock,
  CheckCircle2,
  X
} from "lucide-react";
import HeroSlider from "@/components/public/HeroSlider";
import SponsorStrip from "@/components/public/SponsorStrip";
import { initialChampionships, initialNews, initialGallery, initialCommittee } from "@/lib/data-store";
import { useI18n } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useI18n();
  const [activeMediaModal, setActiveMediaModal] = useState<string | null>(null);

  // Live Statistics
  const stats = [
    { label: t("statPlayers"), count: "1,480+", icon: Users, color: "from-blue-600 to-blue-800" },
    { label: t("statCoaches"), count: "125+", icon: Award, color: "from-orange-500 to-amber-600" },
    { label: t("statDistricts"), count: "50 Units", icon: MapPin, color: "from-emerald-600 to-teal-700" },
    { label: t("statClubs"), count: "86+", icon: ShieldCheck, color: "from-purple-600 to-indigo-800" },
    { label: t("statChampionships"), count: "18 State Events", icon: Trophy, color: "from-rose-500 to-red-700" },
    { label: t("statMedals"), count: "340+ Medals", icon: Sparkles, color: "from-amber-500 to-yellow-600" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      
      {/* 5.1 HERO SLIDER */}
      <HeroSlider />

      {/* 5.3 LIVE STATISTICS (GLASS-CARD ANIMATED COUNTERS) */}
      <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-card hover:bg-white rounded-2xl p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-white/80 flex flex-col items-center text-center group"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-2 shadow-md group-hover:scale-110 transition`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xl md:text-2xl font-black text-[#0A3D91] tracking-tight">
                  {stat.count}
                </div>
                <div className="text-[11px] font-semibold text-slate-600 mt-0.5 leading-tight">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5.2 ABOUT SECTION & PRESIDENT'S MESSAGE */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: About RAA Overview */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
            
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0A3D91] px-3.5 py-1 rounded-full text-xs font-bold mb-4">
                <ShieldCheck className="w-4 h-4 text-[#F57C00]" />
                <span>Section 8 Not-For-Profit Sports Body</span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0A3D91] tracking-tight leading-tight">
                Pioneering the Sport of <span className="text-[#F57C00]">Aeroskatoball</span> in Rajasthan
              </h2>

              <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                The <strong>Rajasthan Aeroskatoball Association (RAA)</strong> is the apex governing body responsible for regulating, promoting, and advancing the high-octane sport of Aeroskatoball across all 50 districts of Rajasthan.
              </p>

              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Combining the agility of inline skating, precision ball control, and aerial shooting techniques, our association fosters grassroots talent, organizes sanctioned state championships, certifies coaches and technical officials, and equips athletes for national glory under the Aeroskatoball Federation of India (AFI).
              </p>

              {/* Key Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>State & National Selection Trials</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Certified Coaching Academies</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>QR-Verified Digital Player Cards</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Gender Inclusive Programs</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#0A3D91] hover:bg-[#083279] text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md transition"
              >
                <span>{t("readMore")}</span>
                <ArrowRight className="w-4 h-4 text-[#F57C00]" />
              </Link>
              <Link
                href="/downloads"
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-xl text-xs font-bold transition"
              >
                <FileText className="w-4 h-4 text-[#0A3D91]" />
                <span>Association Constitution (PDF)</span>
              </Link>
            </div>
          </div>

          {/* Right Column: President's Message Block */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0A3D91] to-[#041c49] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F57C00]/20 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[#F57C00] font-extrabold text-xs uppercase tracking-wider block">
                    Leadership Note
                  </span>
                  <h3 className="text-xl font-black text-white">{t("presidentsMessage")}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-white p-0.5 shadow-md flex items-center justify-center shrink-0">
                  <img
                    src="/logo.png"
                    alt="RAA Seal"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>

              {/* President Photo & Intro */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#F57C00] shadow-md shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80"
                    alt="President Dr. Arvind Singh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white leading-tight">Dr. Arvind Singh</h4>
                  <p className="text-xs text-orange-300 font-semibold">President, RAA</p>
                  <p className="text-[11px] text-blue-200">Affiliated to AFI &bull; Bharatpur (Raj.)</p>
                </div>
              </div>

              <blockquote className="text-xs text-slate-200 leading-relaxed italic relative pl-4 border-l-2 border-[#F57C00]">
                &ldquo;Our vision is to empower every young skater and athlete in Rajasthan with world-class facilities, ethical training, and transparent competitive platforms. Aeroskatoball combines agility with aerial strategy, and Rajasthan&apos;s youth are destined to lead this revolution on the national and global stage.&rdquo;
              </blockquote>
            </div>

            {/* Signature Block */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400">Digital Seal & Verification</div>
                <div className="text-xs font-mono font-bold text-[#F57C00]">RAA/EXEC/OFFICIAL-SEAL</div>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 text-[10px] font-bold text-white">
                OFFICIAL AUTHORIZED
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5.5 UPCOMING CHAMPIONSHIPS TABLE */}
      <section className="py-12 bg-slate-100/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold text-[#F57C00] uppercase tracking-wider">
                Sanctioned State Events
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#0A3D91] tracking-tight">
                {t("upcomingChampionships")}
              </h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A3D91] hover:text-[#F57C00] transition"
            >
              <span>View Full Calendar & Results</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Table Layout */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0A3D91] text-white text-xs font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-6">Championship</th>
                    <th className="py-3.5 px-6">Venue / District</th>
                    <th className="py-3.5 px-6">Event Dates</th>
                    <th className="py-3.5 px-6">Age Category</th>
                    <th className="py-3.5 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {initialChampionships.map((champ) => (
                    <tr key={champ.id} className="hover:bg-blue-50/50 transition">
                      <td className="py-4 px-6 font-bold text-slate-900">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-[#0A3D91] shrink-0 font-black">
                            <Trophy className="w-4 h-4 text-[#F57C00]" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 leading-snug">{champ.title}</div>
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mt-1 ${
                              champ.status === "UPCOMING" ? "bg-emerald-100 text-emerald-800" :
                              champ.status === "ONGOING" ? "bg-amber-100 text-amber-800" :
                              "bg-slate-100 text-slate-700"
                            }`}>
                              {champ.status}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-700">
                        <div className="flex items-center gap-1.5 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#F57C00] shrink-0" />
                          <span>{champ.venue}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{champ.startDate} to {champ.endDate}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-600">
                        {champ.ageGroup}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          href="/register"
                          className="inline-flex items-center gap-1 bg-[#F57C00] hover:bg-[#e56715] text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition"
                        >
                          <span>Register</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 5.4 LATEST NEWS & NOTIFICATIONS */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold text-[#F57C00] uppercase tracking-wider">
              Official Media & Announcements
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A3D91] tracking-tight">
              {t("latestNews")}
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A3D91] hover:text-[#F57C00] transition"
          >
            <span>View All News & Circulars</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialNews.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-slate-200">
                  <img
                    src={article.image || "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A3D91]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                    {article.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#F57C00]" />
                    <span>{article.publishDate}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#0A3D91] transition line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F57C00] group-hover:text-[#0A3D91] transition"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5.6 GALLERY PREVIEW (PHOTOS + VIDEOS LIGHTBOX) */}
      <section className="py-14 bg-gradient-to-b from-[#031232] to-[#0A3D91] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold text-[#F57C00] uppercase tracking-wider">
                Photo & Video Moments
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                {t("galleryPreview")}
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 transition"
            >
              <span>Explore Complete Gallery</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mixed Photos + Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {initialGallery.slice(0, 6).map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveMediaModal(item.url)}
                className="relative h-60 rounded-2xl overflow-hidden group cursor-pointer shadow-xl border border-white/10 bg-slate-900"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#F57C00] tracking-wider block">
                        {item.albumName}
                      </span>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                    </div>
                    {item.type === "VIDEO" && (
                      <div className="w-8 h-8 rounded-full bg-[#F57C00] flex items-center justify-center text-white shadow-lg shrink-0">
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.7 SPONSORS & AFFILIATIONS AUTO-SCROLLING STRIP */}
      <SponsorStrip />

      {/* LIGHTBOX MEDIA MODAL */}
      {activeMediaModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveMediaModal(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-[#F57C00] text-white p-2 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeMediaModal}
              alt="High resolution championship view"
              className="w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}

    </div>
  );
}
