"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Trophy, 
  UserCheck, 
  FileText, 
  ShieldCheck, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Award, 
  Download,
  Calendar,
  Building2,
  Lock,
  ChevronDown
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Office Bearers", href: "/office-bearers" },
    { label: "Tournaments", href: "/events" },
    { label: "Players & Rankings", href: "/players" },
    { label: "Gallery", href: "/gallery" },
    { label: "Circulars & Downloads", href: "/downloads" },
    { label: "Academies & Units", href: "/academies" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Tricolor Top Bar (Saffron, White, Green strip referencing Indian Sports Federation) */}
      <div className="bg-navy-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-slate-300 text-xs">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-saffron-500" />
              contact@rajasthanaeroskatoball.org
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-saffron-500" />
              +91 94140 12345 (H.O. Bharatpur)
            </span>
            <span className="hidden lg:inline-block bg-navy-800 text-saffron-400 font-semibold px-2 py-0.5 rounded border border-navy-700">
              CIN: U88900RJ2026NPL112235
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/verify" 
              className="flex items-center gap-1 text-saffron-400 hover:text-saffron-300 font-semibold transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Certificate Verification
            </Link>
            <span className="text-navy-700">|</span>
            <Link 
              href="/admin/login" 
              className="flex items-center gap-1 text-slate-300 hover:text-white font-medium transition"
            >
              <Lock className="w-3.5 h-3.5" />
              Portal Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="border-b border-slate-100 bg-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo Crest Emblem */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron-500 via-navy-700 to-navy-900 p-0.5 shadow-md group-hover:scale-105 transition">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-1">
                <Trophy className="w-7 h-7 text-saffron-600" />
              </div>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-black text-navy-900 tracking-tight block leading-tight">
                RAJASTHAN <span className="text-saffron-500">AEROSKATOBALL</span>
              </span>
              <span className="text-xs font-semibold text-slate-500 tracking-wider block">
                ASSOCIATION • (REGD. SECTION 8 NPL)
              </span>
            </div>
          </Link>

          {/* Quick CTA Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/downloads"
              className="flex items-center gap-2 border border-slate-200 text-slate-700 hover:bg-slate-50 px-3 py-2 rounded-lg text-sm font-semibold transition"
            >
              <Download className="w-4 h-4 text-navy-700" />
              Official Forms
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-md shadow-saffron-500/20 transition animate-pulse hover:animate-none"
            >
              <UserCheck className="w-4 h-4" />
              REGISTER NOW
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-navy-900 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Primary Navigation Bar & RSFI Discipline Mega Menu */}
      <nav className="bg-navy-900 text-white hidden lg:block border-t border-navy-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          <ul className="flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-3.5 py-3 text-sm font-semibold transition hover:text-saffron-400 ${
                      isActive ? "text-saffron-400 bg-navy-800 border-b-2 border-saffron-500" : "text-slate-200"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Quick Disciplines Badge Row */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 py-2">
            <span className="bg-saffron-500/20 text-saffron-400 border border-saffron-500/30 px-2 py-1 rounded flex items-center gap-1">
              <Award className="w-3 h-3" /> Speed Aeroskatoball
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded flex items-center gap-1">
              <Trophy className="w-3 h-3" /> Team Aeroskatoball
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-900 text-white border-t border-navy-800 p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold border-b border-navy-800 text-slate-200 hover:text-saffron-400"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-saffron-500 text-white font-bold py-2.5 rounded-lg shadow"
            >
              REGISTER NOW (Annual & Championship)
            </Link>
            <Link
              href="/verify"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center border border-slate-700 text-slate-200 py-2 rounded-lg text-sm"
            >
              Verify Certificate / Player ID
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
