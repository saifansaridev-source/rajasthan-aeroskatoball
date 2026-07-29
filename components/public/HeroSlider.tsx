"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Trophy, ArrowRight, Sparkles } from "lucide-react";

export interface Slide {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  ctaText: string | null;
  ctaLink: string | null;
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  if (!slides || slides.length === 0) {
    return (
      <div className="bg-navy-900 text-white h-[420px] flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-12 h-12 text-saffron-500 mx-auto mb-2 animate-bounce" />
          <h2 className="text-2xl font-bold">Rajasthan Aeroskatoball Association</h2>
          <p className="text-slate-400 text-sm">Official State Sports Federation Portal</p>
        </div>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-[450px] md:h-[520px] overflow-hidden bg-navy-950">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-105"
        style={{ backgroundImage: `url(${currentSlide.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/80 to-transparent" />
        <div className="absolute inset-0 bg-navy-950/40" />
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto h-full px-6 flex items-center">
        <div className="max-w-2xl text-white space-y-4">
          <div className="inline-flex items-center gap-2 bg-saffron-500/20 border border-saffron-500/40 text-saffron-300 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Official State Championships & Affiliation
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-md">
            {currentSlide.title}
          </h1>

          {currentSlide.subtitle && (
            <p className="text-slate-200 text-sm md:text-base leading-relaxed drop-shadow">
              {currentSlide.subtitle}
            </p>
          )}

          <div className="pt-2 flex flex-wrap gap-3">
            {currentSlide.ctaText && currentSlide.ctaLink && (
              <Link
                href={currentSlide.ctaLink}
                className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition transform hover:-translate-y-0.5"
              >
                {currentSlide.ctaText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-5 py-3 rounded-lg backdrop-blur-sm transition"
            >
              Association Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Slider Nav Buttons */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-navy-900/60 hover:bg-navy-900 text-white p-2.5 rounded-full backdrop-blur-sm transition border border-white/10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-navy-900/60 hover:bg-navy-900 text-white p-2.5 rounded-full backdrop-blur-sm transition border border-white/10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentIndex ? "bg-saffron-500 w-8" : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
