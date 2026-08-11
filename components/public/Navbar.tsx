"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Trophy, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Download,
  Lock
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Tournaments & Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Articles", href: "/articles" },
    { label: "Leaders", href: "/leaders" },
    { label: "Circulars & Downloads", href: "/downloads" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Contact & Portal Link Bar */}
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
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/admin/login" 
              className="flex items-center gap-1 text-saffron-400 hover:text-saffron-300 font-semibold transition"
            >
              <Lock className="w-3.5 h-3.5" />
              Admin Portal Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="border-b border-slate-100 bg-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
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

          {/* Quick Download Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/downloads"
              className="flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow transition"
            >
              <Download className="w-4 h-4" />
              Official Circulars
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

      {/* Primary Navigation Bar */}
      <nav className="bg-navy-900 text-white hidden lg:block border-t border-navy-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          <ul className="flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 text-sm font-semibold transition hover:text-saffron-400 ${
                      isActive ? "text-saffron-400 bg-navy-800 border-b-2 border-saffron-500" : "text-slate-200"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
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
          <div className="pt-2">
            <Link
              href="/downloads"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-saffron-500 text-white font-bold py-2.5 rounded-lg block shadow"
            >
              View Official Circulars
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
