"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Trophy, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Search, 
  Shield, 
  Lock, 
  Sparkles, 
  Volume2, 
  ChevronDown
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useI18n();

  // 10 Navigation Items required by specification
  const navLinks = [
    { key: "navHome", label: t("navHome"), href: "/" },
    { key: "navAbout", label: t("navAbout"), href: "/about" },
    { key: "navCommittee", label: t("navCommittee"), href: "/committee" },
    { key: "navRegistration", label: t("navRegistration"), href: "/register" },
    { key: "navChampionships", label: t("navChampionships"), href: "/events" },
    { key: "navResults", label: t("navResults"), href: "/results" },
    { key: "navGallery", label: t("navGallery"), href: "/gallery" },
    { key: "navDownloads", label: t("navDownloads"), href: "/downloads" },
    { key: "navNews", label: t("navNews"), href: "/news" },
    { key: "navContact", label: t("navContact"), href: "/contact" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    router.push(`/verify?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md transition-all">
        {/* 4.1 TOP BAR */}
        <div className="bg-[#0A3D91] text-white text-xs py-1.5 px-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
            
            {/* Urgent Announcement Marquee */}
            <div className="flex items-center gap-2 overflow-hidden w-full md:w-auto flex-1">
              <span className="bg-[#F57C00] text-white px-2 py-0.5 rounded font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shrink-0 animate-pulse">
                <Volume2 className="w-3 h-3" />
                Notice
              </span>
              <div className="overflow-hidden whitespace-nowrap text-blue-100 text-xs w-full">
                <div className="inline-block animate-marquee hover:[animation-play-state:paused]">
                  {t("urgentNotice")} &nbsp;&bull;&nbsp; Official State Championship 2026 Bharatpur registrations active! &nbsp;&bull;&nbsp; Download circular from downloads section.
                </div>
              </div>
            </div>

            {/* Helpline, Email & Social Links */}
            <div className="flex items-center gap-4 text-slate-200 text-xs shrink-0">
              <a 
                href="mailto:contact@rajasthanaeroskatoball.org" 
                className="hidden lg:flex items-center gap-1.5 hover:text-[#F57C00] transition"
              >
                <Mail className="w-3.5 h-3.5 text-[#F57C00]" />
                contact@rajasthanaeroskatoball.org
              </a>

              <a 
                href="tel:8504092852" 
                className="flex items-center gap-1.5 font-semibold text-white hover:text-[#F57C00] transition bg-white/10 px-2 py-0.5 rounded-full"
              >
                <Phone className="w-3.5 h-3.5 text-[#F57C00]" />
                <span>{t("helpline")}: <strong className="text-[#F57C00]">8504092852</strong></span>
              </a>

              {/* Social Media Icons */}
              <div className="flex items-center gap-2 pl-2 border-l border-white/20">
                <a 
                  href="https://wa.me/918504092852?text=Hello%20Rajasthan%20Aeroskatoball%20Association" 
                  target="_blank" 
                  rel="noreferrer"
                  title="WhatsApp Helpline"
                  className="hover:text-green-400 transition"
                >
                  <span className="text-xs bg-green-600 hover:bg-green-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">WA</span>
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="Facebook" 
                  className="hover:text-blue-300 transition text-[11px] font-bold"
                >
                  FB
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="Instagram" 
                  className="hover:text-pink-400 transition text-[11px] font-bold"
                >
                  IG
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="YouTube" 
                  className="hover:text-red-400 transition text-[11px] font-bold"
                >
                  YT
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* 4.2 MAIN HEADER */}
        <div className="border-b border-slate-100 bg-white py-3 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
            
            {/* Logo & Association Branding */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-md group-hover:scale-105 transition transform shrink-0 border border-slate-200 bg-white flex items-center justify-center p-0.5">
                <img
                  src="/logo.png"
                  alt="Rajasthan Aeroskatoball Association (RAA)"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="text-lg md:text-2xl font-black text-[#0A3D91] tracking-tight block leading-none">
                  RAJASTHAN <span className="text-[#F57C00]">AEROSKATOBALL</span>
                </span>
                <span className="text-xs font-semibold text-slate-500 tracking-wide block mt-0.5">
                  ASSOCIATION &bull; <span className="text-slate-700 font-bold">AFFILIATED TO AFI</span>
                </span>
              </div>
            </Link>

            {/* Center / Right Action Controls */}
            <div className="flex items-center gap-3">
              
              {/* Site-wide Search Bar Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-3.5 py-2 rounded-xl text-xs font-medium transition border border-slate-200/80"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span>{t("searchPlaceholder").slice(0, 24)}...</span>
                <kbd className="bg-white px-1.5 py-0.5 rounded text-[10px] text-slate-400 font-mono shadow-sm border">⌘K</kbd>
              </button>

              {/* Language Switcher Toggle */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                    language === "en" ? "bg-[#0A3D91] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("hi")}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                    language === "hi" ? "bg-[#F57C00] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  हिन्दी
                </button>
              </div>

              {/* Login Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                  className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-[#0A3D91] font-bold px-3.5 py-2 rounded-xl text-xs transition border border-slate-200"
                >
                  <Lock className="w-3.5 h-3.5 text-[#0A3D91]" />
                  <span>{t("login")}</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>

                {loginDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setLoginDropdownOpen(false)}
                  >
                    <Link
                      href="/admin/login"
                      onClick={() => setLoginDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#0A3D91] transition"
                    >
                      <Shield className="w-4 h-4 text-[#0A3D91]" />
                      <div>
                        <div className="font-bold">{t("adminPortal")}</div>
                        <div className="text-[10px] text-slate-400">Official RAA Management</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Register CTA Button */}
              <Link
                href="/register"
                className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-[#F57C00] to-[#e56715] hover:from-[#e56715] hover:to-[#ad4e00] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t("register")}</span>
              </Link>

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#0A3D91] hover:bg-slate-100 rounded-xl"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* 4.3 MAIN NAVIGATION MENU (10 ITEMS) - DESKTOP */}
        <nav className="bg-[#0A3D91] text-white hidden lg:block border-t border-blue-900/50 shadow-inner">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center justify-between space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href} className="flex-1 text-center">
                    <Link
                      href={link.href}
                      className={`block py-3 px-2 text-xs font-bold tracking-wide transition-all duration-150 relative ${
                        isActive
                          ? "text-[#F57C00] bg-white/10 shadow-inner"
                          : "text-blue-100 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#F57C00] rounded-t-md" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* MOBILE DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A3D91] text-white border-t border-blue-900 p-4 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
            {/* Search Input in Mobile */}
            <form onSubmit={handleSearchSubmit} className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full bg-white/10 text-white placeholder-blue-200 text-xs px-3.5 py-2.5 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#F57C00]"
                />
                <button type="submit" className="absolute right-2.5 top-2.5 text-blue-200">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="grid grid-cols-2 gap-1.5 pb-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 px-3 text-xs font-semibold rounded-lg transition ${
                      isActive ? "bg-[#F57C00] text-white font-bold" : "text-blue-100 hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#F57C00] text-white font-bold py-2.5 rounded-xl text-xs shadow"
              >
                {t("register")}
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded-xl text-xs"
              >
                {t("adminPortal")}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* SITE-WIDE SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95">
            <form onSubmit={handleSearchSubmit} className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-[#0A3D91]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type member ID, name, district, or event..."
                className="w-full text-sm font-medium text-slate-800 focus:outline-none placeholder-slate-400"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
            <div className="p-4 bg-slate-50 text-xs text-slate-500 flex justify-between items-center">
              <span>Try: &quot;RAA-PLY-2026-0042&quot;, &quot;Bharatpur&quot;, &quot;State Championship&quot;</span>
              <button
                type="submit"
                onClick={handleSearchSubmit}
                className="bg-[#0A3D91] text-white px-3 py-1.5 rounded-lg font-bold"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
