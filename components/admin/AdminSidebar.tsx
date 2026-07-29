"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Calendar, 
  Award, 
  Image as ImageIcon, 
  Download, 
  Building2, 
  CreditCard, 
  Inbox, 
  Settings, 
  LogOut, 
  Trophy,
  UserCheck
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Registrations Queue", href: "/admin/registrations", icon: UserCheck },
    { label: "Content (News & Slides)", href: "/admin/content", icon: FileText },
    { label: "Office Bearers", href: "/admin/office-bearers", icon: Users },
    { label: "Tournaments & Events", href: "/admin/events", icon: Calendar },
    { label: "Players & Rankings", href: "/admin/players", icon: Award },
    { label: "Gallery (Media)", href: "/admin/gallery", icon: ImageIcon },
    { label: "Circulars & Downloads", href: "/admin/downloads", icon: Download },
    { label: "Academies & Units", href: "/admin/academies", icon: Building2 },
    { label: "Payments Ledger", href: "/admin/payments", icon: CreditCard },
    { label: "Contact Messages", href: "/admin/inbox", icon: Inbox },
    { label: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

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
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                isActive
                  ? "bg-saffron-500 text-white shadow-md shadow-saffron-500/20"
                  : "text-slate-300 hover:bg-navy-900 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
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
