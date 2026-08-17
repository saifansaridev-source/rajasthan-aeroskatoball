"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Calendar, Bell, Trophy, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export interface SlideItem {
  id?: string;
  tag: string;
  tagIcon: any;
  title: string;
  subtitle: string;
  imageUrl: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export default function HeroSlider() {
  const { t } = useI18n();

  const slides: SlideItem[] = [
    {
      id: "slide-1",
      tag: "State Championship 2026",
      tagIcon: Trophy,
      title: "1st Rajasthan State Aeroskatoball Championship 2026",
      subtitle: "Official State Championship in Lohagarh Stadium, Bharatpur. Witness the speed, skill, and aerial mastery of Rajasthan's top athletes.",
      imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1600&auto=format&fit=crop",
      primaryCtaText: "Register Now",
      primaryCtaLink: "/register",
      secondaryCtaText: "View Events",
      secondaryCtaLink: "/events",
    },
    {
      id: "slide-2",
      tag: "Official Membership 2026-27",
      tagIcon: ShieldCheck,
      title: "Affiliation & Membership Registrations Now Live",
      subtitle: "Mandatory annual digital registration for Players, Coaches, District Associations, Clubs, Referees, and Officials with QR-verified ID cards.",
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1600&auto=format&fit=crop",
      primaryCtaText: "Register Now",
      primaryCtaLink: "/register",
      secondaryCtaText: "View Results",
      secondaryCtaLink: "/results",
    },
    {
      id: "slide-3",
      tag: "Official Announcement",
      tagIcon: Bell,
      title: "State Selection Trials for National Championships",
      subtitle: "Selection policy and trial schedule released for Boys & Girls (Sub-Junior, Junior & Senior). Download circulars and official rulebooks.",
      imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600&auto=format&fit=crop",
      primaryCtaText: "Latest News",
      primaryCtaLink: "/news",
      secondaryCtaText: "Download Circular",
      secondaryCtaLink: "/downloads",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentIndex];
  const TagIcon = slide.tagIcon;

  return (
    <div className="relative w-full h-[460px] md:h-[540px] bg-[#031232] overflow-hidden shadow-2xl">
      {/* Background Image Backdrop with Blur Gradient Overlay */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
        >
          <img
            src={s.imageUrl}
            alt={s.title}
            className="w-full h-full object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031232] via-[#031232]/85 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent to-[#031232]/60" />
        </div>
      ))}

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto h-full px-6 flex flex-col justify-center text-white space-y-5 z-10">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#F57C00] shadow-md w-fit animate-pulse">
          <TagIcon className="w-4 h-4 text-[#F57C00]" />
          <span className="text-white">{slide.tag}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black max-w-3xl leading-[1.15] tracking-tight text-white drop-shadow-md">
          {slide.title}
        </h1>

        {/* Hero Subtitle */}
        <p className="text-xs md:text-sm text-slate-200 max-w-2xl leading-relaxed">
          {slide.subtitle}
        </p>

        {/* CTAs: 3 Key Action Buttons */}
        <div className="pt-2 flex flex-wrap gap-3.5">
          <Link
            href="/register"
            className="bg-gradient-to-r from-[#F57C00] to-[#d96700] hover:from-[#e56715] hover:to-[#ad4e00] text-white font-extrabold text-xs md:text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-[#F57C00]/30 transition transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t("register")}</span>
          </Link>

          <Link
            href="/events"
            className="bg-[#0A3D91] hover:bg-[#083279] text-white font-bold text-xs md:text-sm px-5 py-3 rounded-xl border border-white/20 shadow-md transition flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#F57C00]" />
            <span>{t("viewEvents")}</span>
          </Link>

          <Link
            href="/news"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs md:text-sm px-5 py-3 rounded-xl backdrop-blur-md border border-white/20 transition flex items-center gap-2"
          >
            <Bell className="w-4 h-4 text-blue-300" />
            <span>{t("latestNews")}</span>
          </Link>
        </div>

      </div>

      {/* Slide Navigation Controls */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-black/40 hover:bg-[#0A3D91] text-white rounded-full transition backdrop-blur-md border border-white/10 z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-black/40 hover:bg-[#0A3D91] text-white rounded-full transition backdrop-blur-md border border-white/10 z-20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-10 bg-[#F57C00]" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
