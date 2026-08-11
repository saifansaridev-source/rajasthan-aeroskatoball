import connectDB from "@/lib/db";
import { Circular } from "@/models";
import { Download, FileText, Bell } from "lucide-react";
import { formatDate } from "@/lib/utils";
import BackButton from "@/components/public/BackButton";

export const dynamic = 'force-dynamic';

export default async function DownloadsPage() {
  let circulars: any[] = [];

  try {
    const conn = await connectDB();
    if (conn) {
      circulars = await Circular.find().sort({ publishDate: -1 }).lean();
    }
  } catch (err) {
    console.error("DownloadsPage DB error:", err);
  }

  const serialize = (items: any[]) => JSON.parse(JSON.stringify(items));
  const serializedCirculars = serialize(circulars);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <BackButton />
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">Official Repository</span>
        <h1 className="text-3xl font-black text-navy-950">Circulars & Public Downloads</h1>
        <p className="text-xs text-slate-500">
          Official announcements, technical rulebooks, membership forms, and state notices.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
          <Bell className="w-4 h-4 text-saffron-500" />
          <h2 className="font-bold text-navy-900 text-sm">Official Notifications ({serializedCirculars.length})</h2>
        </div>

        {serializedCirculars.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No official circulars have been published yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {serializedCirculars.map((c: any) => (
              <div key={c._id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50/80 transition">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-saffron-100 text-saffron-800 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase">
                      {c.category || "CIRCULAR"}
                    </span>
                    <span className="text-slate-400 text-xs font-mono">
                      Published: {formatDate(c.publishDate || c.createdAt)}
                    </span>
                  </div>
                  <h3 className="font-bold text-navy-950 text-sm leading-snug">{c.title}</h3>
                  {c.description && (
                    <p className="text-xs text-slate-500">{c.description}</p>
                  )}
                </div>

                <a
                  href={c.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2 shrink-0"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
