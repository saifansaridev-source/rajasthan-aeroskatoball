"use client";

import Link from "next/link";
import { 
  Trophy, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  Download,
  Award
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-[#031232] text-white border-t-4 border-[#F57C00] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Association Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0A3D91] to-[#F57C00] p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#031232] rounded-[14px] flex items-center justify-center p-1">
                  <Trophy className="w-6 h-6 text-[#F57C00]" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block leading-tight">
                  RAJASTHAN <span className="text-[#F57C00]">AEROSKATOBALL</span>
                </span>
                <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider block">
                  ASSOCIATION
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Official State Governing Body for the sport of Aeroskatoball in Rajasthan. Affiliated to Aeroskatoball Federation of India (AFI). Incorporated under Section 8 of the Companies Act.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1 text-xs">
              <div className="text-[11px] text-slate-400 font-medium">Head Office:</div>
              <div className="flex items-start gap-2 text-slate-200">
                <MapPin className="w-4 h-4 text-[#F57C00] shrink-0 mt-0.5" />
                <span>Vijay Nagar Colony, Bharatpur (Raj.) - 321001</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-[#F57C00]" />
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/about" className="hover:text-[#F57C00] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F57C00]"></span>
                  About RAA & History
                </Link>
              </li>
              <li>
                <Link href="/committee" className="hover:text-[#F57C00] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F57C00]"></span>
                  Executive Committee
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#F57C00] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F57C00]"></span>
                  Online Registration (7 Categories)
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#F57C00] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F57C00]"></span>
                  Championships & Calendar
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-[#F57C00] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F57C00]"></span>
                  Results & Medal Tallies
                </Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-[#F57C00] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F57C00]"></span>
                  Verify Member Digital ID (QR)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Important Downloads & Circulars */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
              <Download className="w-4 h-4 text-[#F57C00]" />
              {t("importantLinks")}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/downloads" className="hover:text-[#F57C00] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A3D91] border border-blue-400"></span>
                  Official Rule Book (2026)
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-[#F57C00] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A3D91] border border-blue-400"></span>
                  State Championship Circulars
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-[#F57C00] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A3D91] border border-blue-400"></span>
                  Selection Policy & Norms
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-[#F57C00] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A3D91] border border-blue-400"></span>
                  Medical Declaration Forms
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#F57C00] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A3D91] border border-blue-400"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#F57C00] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A3D91] border border-blue-400"></span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Verification */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F57C00]" />
              Official Contact
            </h4>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F57C00]" />
                <div>
                  <span className="text-slate-400 block text-[10px]">State Helpline (Mon-Sat 9AM-6PM):</span>
                  <a href="tel:8504092852" className="text-white font-bold hover:text-[#F57C00] transition">
                    +91 8504092852
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F57C00]" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Official Support Email:</span>
                  <a href="mailto:contact@rajasthanaeroskatoball.org" className="text-white hover:text-[#F57C00] transition">
                    contact@rajasthanaeroskatoball.org
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/918504092852"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-3 rounded-xl transition text-xs shadow-md"
                >
                  <span>Chat on Official WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Accreditation */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p className="text-center md:text-left">
            {t("copyright")} &bull; Affiliated to <strong className="text-slate-200">Aeroskatoball Federation of India (AFI)</strong>
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-300">
            <Link href="/privacy-policy" className="hover:text-[#F57C00] transition">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-[#F57C00] transition">Terms & Conditions</Link>
            <span>&bull;</span>
            <Link href="/admin/login" className="hover:text-[#F57C00] transition">Admin Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
