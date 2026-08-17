"use client";

import { useI18n } from "@/lib/i18n";
import { ShieldCheck, Award, Flag, Trophy } from "lucide-react";

export default function SponsorStrip() {
  const { t } = useI18n();

  const partners = [
    { name: "Aeroskatoball Federation of India (AFI)", category: "National Apex Body", icon: Trophy },
    { name: "Rajasthan State Sports Council (RSSC)", category: "State Recognition", icon: Award },
    { name: "Lohagarh Stadium Sports Complex", category: "Official Championship Venue", icon: Flag },
    { name: "Ministry of Corporate Affairs (Section 8)", category: "CIN: U88900RJ2026NPL112235", icon: ShieldCheck },
    { name: "Indian Rollers & Skating League", category: "Equipment Partner", icon: Trophy },
    { name: "Fit India Movement Supporting Unit", category: "Youth Athletics Program", icon: Award },
  ];

  return (
    <section className="bg-slate-900 py-6 border-y border-slate-800 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-3 text-center">
        <span className="text-[11px] font-bold tracking-widest text-[#F57C00] uppercase">
          {t("ourSponsors")}
        </span>
      </div>

      {/* Infinite Scrolling Horizontal Marquee */}
      <div className="flex w-full overflow-hidden">
        <div className="flex gap-8 py-2 animate-marquee whitespace-nowrap min-w-full">
          {partners.concat(partners).map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={index}
                className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-sm shrink-0 hover:bg-white/10 transition"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0A3D91] to-[#F57C00] flex items-center justify-center p-1.5 shadow">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white leading-tight">{partner.name}</div>
                  <div className="text-[10px] text-slate-400">{partner.category}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
