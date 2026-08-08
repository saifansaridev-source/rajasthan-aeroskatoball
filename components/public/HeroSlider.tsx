"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export interface SlideItem {
  id?: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroSlider({ slides }: { slides?: SlideItem[] }) {
  const defaultSlides: SlideItem[] = [
    {
      title: "Rajasthan State Aeroskatoball Association",
      subtitle: "Official Governing Body for Aeroskatoball Championships & Development across Rajasthan.",
      imageUrl: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=1600&auto=format&fit=crop",
      ctaText: "Explore Tournaments",
      ctaLink: "/events",
    },
    {
      title: "Official Announcements & Circulars",
      subtitle: "Access official guidelines, rulebooks, and state technical regulations.",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623266010b?q=80&w=1600&auto=format&fit=crop",
      ctaText: "View Circulars",
      ctaLink: "/downloads",
    },
  ];

  const activeSlides = slides && slides.length > 0 ? slides : defaultSlides;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const slide = activeSlides[currentIndex];

  return (
    <div className="relative w-full h-[400px] md:h-[480px] bg-navy-950 overflow-hidden shadow-lg">
      {/* Slide Image Backdrop */}
      <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
        <img
          src={slide.imageUrl}
          alt={slide.title}
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-10000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto h-full px-6 flex flex-col justify-center text-white space-y-4">
        <div className="inline-block bg-saffron-500 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-md w-fit shadow">
          Rajasthan Aeroskatoball Association
        </div>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black max-w-3xl leading-tight tracking-tight text-white drop-shadow">
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {slide.subtitle}
          </p>
        )}
        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            href={slide.ctaLink && slide.ctaLink !== "/register" ? slide.ctaLink : "/events"}
            className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs md:text-sm px-6 py-3 rounded-lg shadow-lg hover:shadow-saffron-500/20 transition flex items-center gap-2"
          >
            {slide.ctaText || "Explore Events"} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/downloads"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs md:text-sm px-5 py-3 rounded-lg backdrop-blur-xs transition"
          >
            Official Downloads
          </Link>
        </div>
      </div>

      {/* Slide Controls */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full transition backdrop-blur-xs"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % activeSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full transition backdrop-blur-xs"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? "w-8 bg-saffron-500" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
