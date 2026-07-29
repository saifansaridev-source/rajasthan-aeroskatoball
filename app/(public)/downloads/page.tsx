import connectDB from "@/lib/db";
import { Circular, Document } from "@/models";
import { Download, FileText, Bell, ShieldCheck } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const revalidate = 300;

export default async function DownloadsPage() {
  await connectDB();
  const [circulars, docs] = await Promise.all([
    Circular.find().sort({ publishDate: -1 }).lean(),
    Document.find().sort({ createdAt: -1 }).lean(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">CBSE-Inspired Repository</span>
        <h1 className="text-3xl font-black text-navy-950">Official Circulars & Downloads</h1>
        <p className="text-xs text-slate-500">
          Official notification orders, tournament guidelines, rulebooks, and printable application forms.
        </p>
      </div>

      {/* Official Circulars Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <Bell className="w-5 h-5 text-saffron-500" />
          <h2 className="text-xl font-bold text-navy-950">Official Circulars & Orders</h2>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-navy-950 text-white uppercase font-bold text-[11px]">
              <tr>
                <th className="p-4">Publish Date</th>
                <th className="p-4">Circular Subject / Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {circulars.map((c: any) => (
                <tr key={c._id.toString()} className="hover:bg-slate-50">
                  <td className="p-4 text-slate-500 font-mono">{formatDate(c.publishDate)}</td>
                  <td className="p-4 font-bold text-navy-950 max-w-md">{c.title}</td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">{c.category}</span>
                  </td>
                  <td className="p-4">
                    {c.isNew ? (
                      <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded animate-pulse">NEW</span>
                    ) : <span className="text-slate-400">—</span>}
                  </td>
                  <td className="p-4 text-right">
                    <a href={c.fileUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-saffron-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-saffron-600 transition">
                      <Download className="w-3.5 h-3.5" /> PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Forms & Rulebooks */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <FileText className="w-5 h-5 text-saffron-500" />
          <h2 className="text-xl font-bold text-navy-950">Application Forms & Rulebooks</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {docs.map((d: any) => (
            <div key={d._id.toString()} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-saffron-500 transition">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-saffron-600 bg-saffron-50 px-2 py-0.5 rounded">
                  {d.category}
                </span>
                <h3 className="font-bold text-navy-950 text-sm mt-2">{d.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{d.description || "Official printable PDF format."}</p>
              </div>
              <a href={d.fileUrl} target="_blank" rel="noopener noreferrer"
                className="w-full bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold py-2.5 rounded-xl text-center flex items-center justify-center gap-2 transition">
                <Download className="w-4 h-4 text-saffron-500" /> Download Document
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
