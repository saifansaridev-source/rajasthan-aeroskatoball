"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Calendar,
  Image as ImageIcon,
  Download,
  LogOut,
  Trophy,
  Users,
  Newspaper,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Circulars & Downloads", href: "/admin/downloads", icon: Download, exact: false },
  { label: "Gallery (Media)", href: "/admin/gallery", icon: ImageIcon, exact: false },
  { label: "Tournaments & Events", href: "/admin/events", icon: Calendar, exact: false },
  { label: "Association Leaders", href: "/admin/leaders", icon: Users, exact: false },
  { label: "Articles & News", href: "/admin/articles", icon: Newspaper, exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-64 bg-navy-950 text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-navy-900">
      {/* Brand Header */}
      <div className="p-4 border-b border-navy-900 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-saffron-500 flex items-center justify-center text-white font-bold shadow">
          <Trophy className="w-5 h-5" />
        </div>
        <div>
          <span className="text-sm font-bold text-white block leading-tight">
            RAA Admin Portal
          </span>
          <span className="text-[10px] text-saffron-400 font-medium">
            Rajasthan Aeroskatoball
          </span>
        </div>
      </div>

      {/* User Info Card */}
      {session?.user && (
        <div className="px-4 py-3 bg-navy-900/60 border-b border-navy-900 flex items-center justify-between">
          <div className="truncate">
            <p className="text-xs font-semibold text-white truncate">{session.user.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{session.user.email}</p>
          </div>
          <span className="text-[9px] font-bold bg-saffron-500/20 text-saffron-300 border border-saffron-500/30 px-1.5 py-0.5 rounded uppercase">
            {session.user.role || "ADMIN"}
          </span>
        </div>
      )}

      {/* Nav List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2 mt-1">
          Management
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition group ${
                isActive
                  ? "bg-saffron-500 text-white shadow-md shadow-saffron-500/20"
                  : "text-slate-300 hover:bg-navy-900 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="w-3 h-3 opacity-70" />}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="pt-3 pb-1">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">
            Public Website
          </p>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:bg-navy-900 hover:text-saffron-400 transition group"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            <span className="flex-1">View Live Website</span>
            <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded font-medium">
              Live
            </span>
          </Link>
        </div>
      </nav>

      {/* Footer Sign Out */}
      <div className="p-3 border-t border-navy-900">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center justify-center gap-2 bg-navy-900 hover:bg-red-900/40 text-slate-300 hover:text-red-300 border border-navy-800 p-2.5 rounded-lg text-xs font-semibold transition"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
