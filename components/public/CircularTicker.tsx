import Link from "next/link";
import { BellRing, FileText, Download, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface CircularItem {
  id: string;
  title: string;
  fileUrl: string;
  publishDate: Date | string;
  isNew: boolean;
}

export default function CircularTicker({ circulars }: { circulars: CircularItem[] }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-navy-900 text-white px-5 py-3.5 flex justify-between items-center border-b border-navy-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-saffron-500 flex items-center justify-center text-white shadow">
            <BellRing className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <h3 className="font-bold text-sm md:text-base tracking-tight">Recent Announcements & Circulars</h3>
            <p className="text-[11px] text-slate-300">Official Association Orders, Trials & Rulebooks</p>
          </div>
        </div>
        <Link
          href="/downloads"
          className="text-xs font-bold text-saffron-400 hover:text-saffron-300 flex items-center gap-1 bg-navy-800 px-3 py-1.5 rounded border border-navy-700 transition"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Announcements List */}
      <div className="divide-y divide-slate-100 max-h-[320px] overflow-y-auto">
        {circulars && circulars.length > 0 ? (
          circulars.map((item) => (
            <div
              key={item.id}
              className="p-4 hover:bg-slate-50 transition flex flex-col md:flex-row justify-between md:items-center gap-3 group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.isNew && (
                    <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-wide animate-pulse">
                      NEW
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-medium">
                    {formatDate(item.publishDate)}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-navy-950 group-hover:text-saffron-600 transition leading-snug">
                  {item.title}
                </h4>
              </div>

              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 bg-slate-100 hover:bg-saffron-50 text-navy-900 hover:text-saffron-600 border border-slate-200 px-3 py-1.5 rounded text-xs font-semibold transition"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </a>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-slate-500 text-sm">
            No active circulars at this moment.
          </div>
        )}
      </div>
    </div>
  );
}
