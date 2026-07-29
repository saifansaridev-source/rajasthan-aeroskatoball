import connectDB from "@/lib/db";
import { Player } from "@/models";
import { Award, Trophy } from "lucide-react";

export const revalidate = 0;

export default async function AdminPlayersManager() {
  await connectDB();
  const players = await Player.find().sort({ rank: 1 }).lean();

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-black text-navy-950">Players & Rankings Manager</h1>
        <p className="text-xs text-slate-500">
          Manage state athlete profiles, update rankings, and curate Hall of Fame entries.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-navy-900 text-white uppercase font-bold text-[11px]">
            <tr>
              <th className="p-3.5 text-center w-16">Rank</th>
              <th className="p-3.5">Reg Number</th>
              <th className="p-3.5">Name</th>
              <th className="p-3.5">District</th>
              <th className="p-3.5">Discipline</th>
              <th className="p-3.5">Public Visibility</th>
              <th className="p-3.5">Achievements</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {players.map((p: any) => (
              <tr key={p._id.toString()} className="hover:bg-slate-50">
                <td className="p-3.5 text-center">
                  {p.rank ? (
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs ${
                      p.rank === 1 ? "bg-amber-500" : p.rank === 2 ? "bg-slate-400" : "bg-amber-700"
                    }`}>
                      #{p.rank}
                    </span>
                  ) : <span className="text-slate-400">—</span>}
                </td>
                <td className="p-3.5 font-mono text-saffron-600 font-bold">{p.regNumber}</td>
                <td className="p-3.5 font-bold text-navy-950">{p.name}</td>
                <td className="p-3.5">{p.district}</td>
                <td className="p-3.5">{p.discipline}</td>
                <td className="p-3.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${p.isPublic ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"}`}>
                    {p.isPublic ? "PUBLIC" : "PRIVATE"}
                  </span>
                </td>
                <td className="p-3.5 text-slate-600 max-w-xs truncate">{p.achievements || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
