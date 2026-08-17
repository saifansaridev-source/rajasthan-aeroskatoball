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
  ShieldCheck,
  Building2,
  Settings,
  ShieldAlert
} from "lucide-react";

const navItems = [
  { label: "Dashboard Overview", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Coach Registrations", href: "/admin/coaches", icon: ShieldCheck, exact: false },
  { label: "District Units", href: "/admin/districts", icon: Building2, exact: false },
  { label: "Championships & Events", href: "/admin/events", icon: Calendar, exact: false },
  { label: "Circulars & Downloads", href: "/admin/downloads", icon: Download, exact: false },
  { label: "Gallery Manager", href: "/admin/gallery", icon: ImageIcon, exact: false },
  { label: "News & CMS", href: "/admin/articles", icon: Newspaper, exact: false },
  { label: "Executive Leaders", href: "/admin/leaders", icon: Users, exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-64 bg-[#031232] text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-blue-950">
      {/* Brand Header */}
      <div className="p-4 border-b border-blue-950 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 shrink-0 flex items-center justify-center shadow">
          <img
            src="/logo.png"
            alt="RAA Admin"
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <div>
          <span className="text-xs font-black text-white block leading-tight">
            RAA Federation Admin
          </span>
          <span className="text-[10px] text-[#F57C00] font-bold">
            State Management Portal
          </span>
        </div>
      </div>

      {/* User Info Card */}
      <div className="px-4 py-3 bg-white/5 border-b border-blue-950 flex items-center justify-between">
        <div className="truncate">
          <p className="text-xs font-bold text-white truncate">{session?.user?.name || "State Super Admin"}</p>
          <p className="text-[10px] text-slate-400 truncate">{session?.user?.email || "admin@rajasthanaeroskatoball.org"}</p>
        </div>
        <span className="text-[9px] font-black bg-[#F57C00]/20 text-[#F57C00] border border-[#F57C00]/30 px-1.5 py-0.5 rounded uppercase">
          {(session?.user as any)?.role || "SUPER_ADMIN"}
        </span>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2 mt-1">
          Federation Management
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition group ${
                isActive
                  ? "bg-[#0A3D91] text-white shadow-md shadow-blue-900/50 border border-blue-600"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#F57C00]" : "text-slate-400"}`} />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="w-3 h-3 text-[#F57C00]" />}
            </Link>
          );
        })}

        {/* Public Site Link */}
        <div className="pt-4 pb-1">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">
            Public Website
          </p>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/5 hover:text-[#F57C00] transition"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            <span className="flex-1">Live Portal View</span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold">
              Online
            </span>
          </Link>
        </div>
      </nav>

      {/* Footer Sign Out */}
      <div className="p-3 border-t border-blue-950">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-white/10 p-2.5 rounded-xl text-xs font-bold transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Admin</span>
        </button>
      </div>
    </aside>
  );
}
