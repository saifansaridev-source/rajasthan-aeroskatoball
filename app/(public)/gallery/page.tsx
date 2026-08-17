"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Camera, 
  Video, 
  FolderHeart, 
  Newspaper, 
  Play, 
  X, 
  Maximize2,
  Calendar,
  Sparkles
} from "lucide-react";
import { initialGallery, IGalleryMedia } from "@/lib/data-store";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<"ALL" | "PHOTOS" | "VIDEOS" | "ALBUMS" | "MEDIA">("ALL");
  const [activeAlbum, setActiveAlbum] = useState("ALL");
  const [modalMedia, setModalMedia] = useState<IGalleryMedia | null>(null);

  const albums = ["ALL", "State Championship 2025", "Workshops & Clinics", "Grassroots Development"];

  const filteredMedia = initialGallery.filter((item) => {
    const matchesTab = 
      activeTab === "ALL" ||
      (activeTab === "PHOTOS" && item.type === "PHOTO") ||
      (activeTab === "VIDEOS" && item.type === "VIDEO") ||
      (activeTab === "ALBUMS" && item.albumName !== "") ||
      (activeTab === "MEDIA" && item.albumName.includes("Press"));
    const matchesAlbum = activeAlbum === "ALL" || item.albumName === activeAlbum;
    return matchesTab && matchesAlbum;
  });

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <Link href="/" className="hover:text-[#0A3D91]">Home</Link>
            <span>/</span>
            <span className="text-[#0A3D91] font-bold">Gallery</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0A3D91] tracking-tight">
            Official Photo & Video <span className="text-[#F57C00]">Gallery</span>
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Championship highlights, podium celebrations, referee clinics, and media coverage across Rajasthan.
          </p>
        </div>

        {/* Tab & Album Filters */}
        <div className="bg-white p-4 rounded-3xl shadow-md border border-slate-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Main Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
            {[
              { id: "ALL", label: "All Media", icon: Camera },
              { id: "PHOTOS", label: "Photos", icon: Camera },
              { id: "VIDEOS", label: "Videos", icon: Video },
              { id: "ALBUMS", label: "Event Albums", icon: FolderHeart },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    isActive
                      ? "bg-[#0A3D91] text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#F57C00]" : ""}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Album Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-slate-400 shrink-0">Album:</span>
            {albums.map((alb) => (
              <button
                key={alb}
                onClick={() => setActiveAlbum(alb)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  activeAlbum === alb
                    ? "bg-[#F57C00] text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {alb}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid with Hover Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((media) => (
            <div
              key={media.id}
              onClick={() => setModalMedia(media)}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative"
            >
              <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
                <img
                  src={media.thumbnail}
                  alt={media.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 brightness-90 group-hover:brightness-100"
                />
                
                {/* Media Type Icon Badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white p-2 rounded-xl">
                  {media.type === "VIDEO" ? (
                    <Play className="w-4 h-4 text-[#F57C00] fill-white" />
                  ) : (
                    <Maximize2 className="w-4 h-4 text-white" />
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                  <span className="text-[10px] font-black uppercase text-[#F57C00] tracking-wider mb-1">
                    {media.albumName}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                    {media.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-slate-300 mt-2 font-medium">
                    <Calendar className="w-3 h-3 text-[#F57C00]" />
                    <span>{media.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LIGHTBOX / VIDEO MODAL */}
        {modalMedia && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <button
                onClick={() => setModalMedia(null)}
                className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-[#F57C00] text-white p-2 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative">
                {modalMedia.type === "VIDEO" ? (
                  <div className="aspect-video w-full flex items-center justify-center bg-slate-950 p-8 text-center">
                    <div>
                      <Play className="w-16 h-16 text-[#F57C00] mx-auto mb-3 animate-pulse" />
                      <h4 className="text-white font-bold text-base">{modalMedia.title}</h4>
                      <p className="text-slate-400 text-xs mt-1">Official Video Stream / Federation Highlight</p>
                      <a
                        href={modalMedia.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-4 bg-[#F57C00] text-white font-bold px-4 py-2 rounded-xl text-xs"
                      >
                        Watch on YouTube &rarr;
                      </a>
                    </div>
                  </div>
                ) : (
                  <img
                    src={modalMedia.url}
                    alt={modalMedia.title}
                    className="w-full max-h-[75vh] object-contain"
                  />
                )}
              </div>

              <div className="p-4 bg-slate-900 text-white flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-sm text-white">{modalMedia.title}</div>
                  <div className="text-[11px] text-[#F57C00]">{modalMedia.albumName} &bull; {modalMedia.date}</div>
                </div>
                <button
                  onClick={() => setModalMedia(null)}
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg font-semibold"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
