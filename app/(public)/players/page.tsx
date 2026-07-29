import connectDB from "@/lib/db";
import { Player } from "@/models";
import { Trophy, Award, Search, User } from "lucide-react";

export const revalidate = 600;

export default async function PlayersPage() {
  await connectDB();
  const players = await Player.find({ isPublic: true }).sort({ rank: 1 }).lean();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">State Directory</span>
        <h1 className="text-3xl font-black text-navy-950">Player Rankings & Hall of Fame</h1>
        <p className="text-xs text-slate-500">
          Official ranking board of registered athletes representing Rajasthan in Aeroskatoball championships.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-navy-950 text-white uppercase font-bold text-[11px]">
            <tr>
              <th className="p-4 text-center w-16">Rank</th>
              <th className="p-4">Reg Number</th>
              <th className="p-4">Athlete Name</th>
              <th className="p-4">District</th>
              <th className="p-4">Discipline</th>
              <th className="p-4">Key Achievements</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {players.map((player: any) => (
              <tr key={player._id.toString()} className="hover:bg-slate-50">
                <td className="p-4 text-center">
                  {player.rank ? (
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-white font-black text-xs ${
                      player.rank === 1 ? "bg-amber-500" : player.rank === 2 ? "bg-slate-400" : "bg-amber-700"
                    }`}>
                      #{player.rank}
                    </span>
                  ) : <span className="text-slate-400">—</span>}
                </td>
                <td className="p-4 font-mono font-bold text-saffron-600">{player.regNumber}</td>
                <td className="p-4 font-bold text-navy-950 flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-200 rounded-full overflow-hidden shrink-0">
                    {player.photoUrl ? (
                      <img src={player.photoUrl} alt={player.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  {player.name}
                </td>
                <td className="p-4 font-medium text-slate-700">{player.district}</td>
                <td className="p-4 text-slate-600">{player.discipline}</td>
                <td className="p-4 text-slate-600 font-medium">{player.achievements || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
