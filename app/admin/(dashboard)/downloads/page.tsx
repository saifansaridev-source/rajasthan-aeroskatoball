import connectDB from "@/lib/db";
import { Circular, Document } from "@/models";
import { Download, FileText, Bell } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminDownloadsManager() {
  await connectDB();
  const [circulars, docs] = await Promise.all([
    Circular.find().sort({ publishDate: -1 }).lean(),
    Document.find().sort({ createdAt: -1 }).lean(),
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-black text-navy-950">Circulars & Downloads Manager</h1>
        <p className="text-xs text-slate-500">
          Upload and manage official PDFs, announcements, rulebooks, membership forms, and circulars.
        </p>
      </div>

      {/* Circulars Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
          <Bell className="w-4 h-4 text-saffron-500" />
          <h2 className="font-bold text-navy-900 text-sm">Official Circulars ({circulars.length})</h2>
        </div>
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-navy-900 text-white uppercase font-bold text-[11px]">
            <tr>
              <th className="p-3.5">Circular Title</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Date</th>
              <th className="p-3.5">NEW Badge</th>
              <th className="p-3.5">File</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {circulars.map((c: any) => (
              <tr key={c._id.toString()} className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-navy-950 max-w-xs">{c.title}</td>
                <td className="p-3.5">
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">{c.category}</span>
                </td>
                <td className="p-3.5 text-slate-500">{formatDate(c.publishDate)}</td>
                <td className="p-3.5">
                  {c.isNew ? (
                    <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded animate-pulse">NEW</span>
                  ) : <span className="text-slate-400">—</span>}
                </td>
                <td className="p-3.5">
                  <a href={c.fileUrl} target="_blank" rel="noopener noreferrer"
                    className="text-saffron-600 font-bold hover:underline flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Documents Repository */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
          <FileText className="w-4 h-4 text-saffron-500" />
          <h2 className="font-bold text-navy-900 text-sm">Official Documents ({docs.length})</h2>
        </div>
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-navy-900 text-white uppercase font-bold text-[11px]">
            <tr>
              <th className="p-3.5">Title</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Description</th>
              <th className="p-3.5">File</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {docs.map((d: any) => (
              <tr key={d._id.toString()} className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-navy-950 max-w-xs">{d.title}</td>
                <td className="p-3.5">
                  <span className="bg-saffron-100 text-saffron-800 text-[10px] font-bold px-2 py-0.5 rounded">{d.category}</span>
                </td>
                <td className="p-3.5 text-slate-500 max-w-xs truncate">{d.description || "—"}</td>
                <td className="p-3.5">
                  <a href={d.fileUrl} target="_blank" rel="noopener noreferrer"
                    className="text-saffron-600 font-bold hover:underline flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
