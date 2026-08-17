"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Trophy, 
  Target, 
  Eye, 
  Compass, 
  Award, 
  History, 
  FileText, 
  ShieldCheck, 
  Download, 
  CheckCircle,
  Building2,
  Users
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<
    "overview" | "vision" | "objectives" | "recognition" | "history" | "constitution" | "affiliation"
  >("overview");

  const tabs = [
    { id: "overview", label: "About Association", icon: Building2 },
    { id: "vision", label: "Vision & Mission", icon: Target },
    { id: "objectives", label: "Key Objectives", icon: Compass },
    { id: "recognition", label: "Legal Status & Recognition", icon: Award },
    { id: "history", label: "Origins & History", icon: History },
    { id: "constitution", label: "Constitution & Bylaws", icon: FileText },
    { id: "affiliation", label: "AFI Affiliation", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <Link href="/" className="hover:text-[#0A3D91]">Home</Link>
            <span>/</span>
            <span className="text-[#0A3D91] font-bold">About Us</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0A3D91] tracking-tight">
            About <span className="text-[#F57C00]">Rajasthan Aeroskatoball</span> Association
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Official State Governing Body for Aeroskatoball &bull; Regd. Under Section 8 Companies Act
          </p>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
                  isActive
                    ? "bg-[#0A3D91] text-white shadow-md shadow-blue-900/20"
                    : "bg-white text-slate-700 hover:bg-blue-50 hover:text-[#0A3D91] border border-slate-200"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#F57C00]" : "text-slate-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-slate-100 min-h-[480px]">
          
          {/* 1. OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0A3D91]">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0A3D91]">Association Overview & Mandate</h2>
                  <p className="text-xs text-slate-500">Official Non-Profit Federation for Aeroskatoball in Rajasthan</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4 text-sm text-slate-700 leading-relaxed">
                  <p>
                    The <strong>Rajasthan Aeroskatoball Association (RAA)</strong> was established to foster, govern, promote, and develop the sport of Aeroskatoball across every district, town, and grassroots academy of Rajasthan.
                  </p>
                  <p>
                    Aeroskatoball is an exhilarating, multi-disciplinary team sport fusing high-velocity inline skating, spherical ball handling, rapid aerial maneuvers, and target quadrant scoring. RAA organizes official State Championships, Zonal Tournaments, and Coaching Camps with strict adherence to the international and national rules established by the <strong>Aeroskatoball Federation of India (AFI)</strong>.
                  </p>
                  <p>
                    Headquartered in <strong>Vijay Nagar Colony, Bharatpur (Rajasthan)</strong>, RAA operates 50 affiliated district units, ensuring equitable access, transparent talent scouting, and high-performance training for athletes across all socio-economic backgrounds.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
                    <img
                      src="/logo.png"
                      alt="RAA Official Emblem"
                      className="w-12 h-12 rounded-full object-contain bg-white p-0.5 shadow-sm border border-slate-200 shrink-0"
                    />
                    <div>
                      <h3 className="text-xs font-black uppercase text-[#0A3D91] tracking-wider">
                        Official State Emblem
                      </h3>
                      <span className="text-[10px] text-slate-500 font-bold block">Rajasthan Aeroskatoball</span>
                    </div>
                  </div>
                  <div className="text-xs space-y-2 text-slate-600">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="font-semibold text-slate-500">Corporate Identification:</span>
                      <span className="font-mono font-bold text-slate-900">U88900RJ2026NPL112235</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="font-semibold text-slate-500">ROC Jurisdiction:</span>
                      <span className="font-bold text-slate-900">ROC Jaipur</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="font-semibold text-slate-500">Organization Nature:</span>
                      <span className="font-bold text-emerald-700">Section 8 Non-Profit</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="font-semibold text-slate-500">National Affiliation:</span>
                      <span className="font-bold text-[#0A3D91]">AFI (Apex National Body)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-semibold text-slate-500">Headquarters:</span>
                      <span className="font-bold text-slate-900">Bharatpur, Rajasthan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. VISION & MISSION */}
          {activeTab === "vision" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Vision Box */}
                <div className="bg-gradient-to-br from-[#0A3D91] to-[#083279] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-[#F57C00]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    To establish Rajasthan as the undisputed powerhouse of Aeroskatoball in India, producing world-class athletes who excel in national and international arenas through state-of-the-art skating infrastructure, professional coaching, and continuous grassroots nurturing.
                  </p>
                </div>

                {/* Mission Box */}
                <div className="bg-gradient-to-br from-[#F57C00] to-[#d96700] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                  <p className="text-sm text-orange-100 leading-relaxed">
                    To democratize access to Aeroskatoball across all 50 districts of Rajasthan, upholding the highest standards of fair play, gender equality, digital member verification, and physical excellence while inspiring youth towards healthy, disciplined sporting careers.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* 3. OBJECTIVES */}
          {activeTab === "objectives" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-[#0A3D91]">Key Strategic Objectives</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Establish and affiliate active Aeroskatoball units in all 50 Rajasthan districts.",
                  "Organize annual State Championships for Sub-Junior, Junior, Youth, Senior, and Masters categories.",
                  "Maintain a secure, transparent digital registry for athletes with anti-fraud QR ID cards.",
                  "Provide Level 1, 2, and 3 certification courses for state coaches and technical referees.",
                  "Construct and upgrade specialized Aeroskatoball rink facilities and training centers.",
                  "Sponsor deserving rural and underprivileged athletes for national preparation camps.",
                  "Collaborate with school boards, universities, and private clubs to embed Aeroskatoball into curriculums."
                ].map((obj, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-7 h-7 rounded-xl bg-blue-100 text-[#0A3D91] font-bold flex items-center justify-center shrink-0 text-xs">
                      {i + 1}
                    </div>
                    <p className="text-xs font-semibold text-slate-700 leading-relaxed">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. RECOGNITION */}
          {activeTab === "recognition" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-[#0A3D91]">Legal Recognition & Approvals</h2>
              <p className="text-sm text-slate-600">
                The Rajasthan Aeroskatoball Association is formally recognized and registered under Indian law as the sole state governing body for Aeroskatoball in Rajasthan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <ShieldCheck className="w-10 h-10 text-[#0A3D91] mx-auto mb-2" />
                  <h3 className="font-bold text-xs text-slate-900">MCA Section 8 License</h3>
                  <p className="text-[11px] text-slate-500 mt-1">CIN: U88900RJ2026NPL112235</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <Award className="w-10 h-10 text-[#F57C00] mx-auto mb-2" />
                  <h3 className="font-bold text-xs text-slate-900">AFI National Affiliation</h3>
                  <p className="text-[11px] text-slate-500 mt-1">Exclusive State Unit Jurisdiction</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h3 className="font-bold text-xs text-slate-900">ROC Jaipur Certified</h3>
                  <p className="text-[11px] text-slate-500 mt-1">Registered March 09, 2026</p>
                </div>
              </div>
            </div>
          )}

          {/* 5. HISTORY */}
          {activeTab === "history" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-[#0A3D91]">History of Aeroskatoball in Rajasthan</h2>
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <p>
                  Aeroskatoball was conceived as the next generation of dynamic roller sports, uniting high-precision speed skating with the strategic aerial passes and target scoring mechanics of modern ball games.
                </p>
                <p>
                  In Rajasthan, pioneering sports administrators and skating trainers from Bharatpur, Jaipur, Udaipur, and Kota banded together in 2025 to create a unified state federation. The legal formalization culminated in March 2026 under the stewardship of President Dr. Arvind Singh and Secretary Mahendra Verma.
                </p>
                <p>
                  Today, RAA conducts sanctioned state championships, manages district development wings, and prepares Rajasthan&apos;s contingent for the Indian National Aeroskatoball Games.
                </p>
              </div>
            </div>
          )}

          {/* 6. CONSTITUTION */}
          {activeTab === "constitution" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#0A3D91]">Official Constitution & Bylaws</h2>
                  <p className="text-xs text-slate-500">Memorandum of Association & Governing Code of Conduct</p>
                </div>
                <Link
                  href="/downloads"
                  className="inline-flex items-center gap-2 bg-[#0A3D91] hover:bg-[#083279] text-white px-4 py-2 rounded-xl text-xs font-bold shadow transition"
                >
                  <Download className="w-4 h-4 text-[#F57C00]" />
                  <span>Download Full PDF (2.1 MB)</span>
                </Link>
              </div>

              {/* Embedded Document Box */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-[#0A3D91]" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Articles of Association & Constitution — RAA</h3>
                    <p className="text-xs text-slate-500">Approved by Ministry of Corporate Affairs, Government of India</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Key excerpts include regulations on membership eligibility, election cycles of the executive board, disciplinary anti-doping protocols, grievance redressal committees, and financial auditing mandates.
                </p>
              </div>
            </div>
          )}

          {/* 7. AFI AFFILIATION */}
          {activeTab === "affiliation" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-white shadow-md flex items-center justify-center p-3 shrink-0">
                  <Trophy className="w-14 h-14 text-[#0A3D91]" />
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <span className="bg-[#F57C00] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    National Federation Affiliate
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-[#0A3D91]">
                    Aeroskatoball Federation of India (AFI)
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    Rajasthan Aeroskatoball Association is officially affiliated to the Aeroskatoball Federation of India (AFI), the apex national governing body. All state competitions, official player rankings, and certified referee badges are sanctioned under AFI guidelines.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
