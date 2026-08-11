"use client";

import { useState } from "react";
import BackButton from "@/components/public/BackButton";
import { Image as ImageIcon, Sparkles, X, ZoomIn, Medal, Trophy, Target } from "lucide-react";

export interface GalleryPhoto {
  _id: string;
  title: string;
  description?: string;
  url: string;
  type?: string;
  albumName?: string;
}

export default function GalleryClientPage({ initialPhotos }: { initialPhotos: GalleryPhoto[] }) {
  const defaultOlympicAndStatePhotos: GalleryPhoto[] = [
    {
      _id: "gal-oly-1",
      title: "Olympic Roller Sports & Skate Arena Showcase",
      description: "High-speed precision and agility demonstrated at international Olympic-standard rinks.",
      url: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=1200&auto=format&fit=crop",
      albumName: "OLYMPIC SHOWCASE 🏅"
    },
    {
      _id: "gal-oly-2",
      title: "Paris Olympic Standard 3x3 Court Arena",
      description: "Modern indoor arena infrastructure inspiring Rajasthan's aeroskatoball facilities.",
      url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop",
      albumName: "OLYMPIC SHOWCASE 🏅"
    },
    {
      _id: "gal-oly-3",
      title: "Olympic Opening Ceremony & Parade of Nations",
      description: "Celebrating global sporting unity and athletic excellence on the world stage.",
      url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop",
      albumName: "OLYMPIC SHOWCASE 🏅"
    },
    {
      _id: "gal-state-1",
      title: "5th Rajasthan State Championship Final Goal",
      description: "Team Jaipur vs Team Jodhpur in the intense final match at SMS Stadium Jaipur.",
      url: "https://images.unsplash.com/photo-1517649763962-0c623266010b?q=80&w=1200&auto=format&fit=crop",
      albumName: "STATE CHAMPIONSHIPS 🏆"
    },
    {
      _id: "gal-state-2",
      title: "Inter-District Speed Drills & Passing Accuracy",
      description: "Udaipur regional championship speed and aerial passing round.",
      url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
      albumName: "STATE CHAMPIONSHIPS 🏆"
    },
    {
      _id: "gal-trials-1",
      title: "Sub-Junior Selection Trials at Kota Sports Complex",
      description: "Young athletes under 14 participating in rigorous technical fitness and skate control drills.",
      url: "https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=1200&auto=format&fit=crop",
      albumName: "SELECTION TRIALS 🎯"
    },
    {
      _id: "gal-ceremony-1",
      title: "State Gold Medal Presentation Ceremony",
      description: "Association President awarding gold medals to the victorious Jaipur Senior Men's Squad.",
      url: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=1200&auto=format&fit=crop",
      albumName: "MEDAL CEREMONIES 🥇"
    },
    {
      _id: "gal-ceremony-2",
      title: "Team Rajasthan Championship Trophy Celebration",
      description: " Rajasthan Aeroskatoball Contingent celebrating their triumph at National Trials.",
      url: "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?q=80&w=1200&auto=format&fit=crop",
      albumName: "MEDAL CEREMONIES 🥇"
    },
    {
      _id: "gal-oly-4",
      title: "Speed Skating & Aerial Acrobatics Showcase",
      description: "International skaters demonstrating high-flying aerial tricks and speed maneuvers.",
      url: "https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=1200&auto=format&fit=crop",
      albumName: "OLYMPIC SHOWCASE 🏅"
    }
  ];

  const photosList = initialPhotos.length > 0 ? initialPhotos : defaultOlympicAndStatePhotos;

  const [activeTab, setActiveTab] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const categories = [
    "All",
    "OLYMPIC SHOWCASE 🏅",
    "STATE CHAMPIONSHIPS 🏆",
    "SELECTION TRIALS 🎯",
    "MEDAL CEREMONIES 🥇"
  ];

  const filteredPhotos = photosList.filter((photo) => {
    if (activeTab === "All") return true;
    return photo.albumName?.toUpperCase().includes(activeTab.split(" ")[0].toUpperCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <BackButton />

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-navy-950 text-white p-8 md:p-12 shadow-xl">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=1600&auto=format&fit=crop"
            alt="Olympic Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-transparent" />
        </div>
        <div className="relative max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-saffron-500/20 text-saffron-400 border border-saffron-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Media Center & Photo Gallery
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Olympic Games & State Championship Media
          </h1>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            High-definition action moments, Olympic sports showcases, selection trial highlights, and medal ceremonies across Rajasthan.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-saffron-500" /> Filter Gallery:
        </span>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === category
                ? "bg-saffron-500 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPhotos.map((item) => (
          <div
            key={item._id}
            onClick={() => setSelectedPhoto(item)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition duration-300 group flex flex-col justify-between cursor-pointer"
          >
            <div className="h-60 overflow-hidden relative bg-slate-900">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <span className="bg-white/90 text-navy-950 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow">
                  <ZoomIn className="w-3.5 h-3.5 text-saffron-600" /> View Fullscreen
                </span>
              </div>
              <span className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-xs text-saffron-400 text-[10px] font-bold px-2.5 py-1 rounded-md border border-navy-700 shadow">
                {item.albumName || "HIGHLIGHTS"}
              </span>
            </div>

            <div className="p-4 space-y-1 bg-white">
              <h3 className="font-bold text-navy-950 text-sm leading-snug group-hover:text-saffron-600 transition">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-navy-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-navy-800">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2.5 bg-black/50 hover:bg-saffron-500 text-white rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-full max-h-[75vh] object-contain"
              />
            </div>

            <div className="p-6 space-y-2 bg-navy-950 border-t border-navy-800">
              <span className="text-[10px] font-bold text-saffron-400 uppercase tracking-wider bg-saffron-500/20 px-2.5 py-0.5 rounded">
                {selectedPhoto.albumName || "GALLERY PHOTO"}
              </span>
              <h2 className="text-xl font-black text-white">{selectedPhoto.title}</h2>
              {selectedPhoto.description && (
                <p className="text-xs text-slate-300">{selectedPhoto.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
