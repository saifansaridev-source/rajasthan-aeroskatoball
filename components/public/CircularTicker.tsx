import Link from "next/link";
import { Bell, Download, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface CircularItem {
  id?: string;
  _id?: string;
  title: string;
  fileUrl: string;
  publishDate?: Date | string;
  createdAt?: Date | string;
  category?: string;
}

export default function CircularTicker({ circulars }: { circulars?: CircularItem[] }) {
  if (!circulars || circulars.length === 0) {
    return (
      <div className="bg-navy-900 border-y border-navy-800 text-white py-2.5 px-4 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="bg-saffron-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
              <Bell className="w-3 h-3" /> OFFICIAL ANNOUNCEMENTS
            </span>
          </div>
          <p className="text-slate-300 text-xs">Official state circulars and event notifications will appear here.</p>
          <Link href="/downloads" className="text-saffron-400 hover:underline shrink-0 text-xs font-bold">
            View All
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-navy-900 border-y border-navy-800 text-white py-2.5 px-4 text-xs font-semibold">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-saffron-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
            <Bell className="w-3 h-3 animate-bounce" /> LATEST CIRCULARS
          </span>
        </div>

        {/* Marquee or Scrolling Ticker */}
        <div className="overflow-hidden relative flex-1 mx-4">
          <div className="flex items-center space-x-8 animate-marquee whitespace-nowrap">
            {circulars.map((c, idx) => (
              <a
                key={c._id || c.id || idx}
                href={c.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-200 hover:text-saffron-400 transition"
              >
                <FileText className="w-3.5 h-3.5 text-saffron-500" />
                <span>{c.title}</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  ({formatDate(c.publishDate || c.createdAt)})
                </span>
                <span className="bg-saffron-500/20 text-saffron-300 text-[9px] px-1.5 py-0.5 rounded border border-saffron-500/30 flex items-center gap-1">
                  <Download className="w-3 h-3" /> PDF
                </span>
              </a>
            ))}
          </div>
        </div>

        <Link
          href="/downloads"
          className="text-saffron-400 hover:text-saffron-300 font-bold shrink-0 hover:underline text-xs flex items-center gap-1"
        >
          View All Downloads
        </Link>
      </div>
    </div>
  );
}
