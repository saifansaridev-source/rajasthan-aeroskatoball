import connectDB from "@/lib/db";
import { Event } from "@/models";
import { Calendar, MapPin, Trophy } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminEventsManager() {
  await connectDB();
  const events = await Event.find().sort({ startDate: 1 }).lean();

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-navy-950">Events & Tournaments Manager</h1>
          <p className="text-xs text-slate-500">
            Create state championships, manage registration status, and upload division results.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-navy-900 text-white uppercase font-bold text-[11px]">
            <tr>
              <th className="p-3.5">Event Title</th>
              <th className="p-3.5">Venue & District</th>
              <th className="p-3.5">Dates</th>
              <th className="p-3.5">Entry Fee</th>
              <th className="p-3.5">Registration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.map((e: any) => (
              <tr key={e._id.toString()} className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-navy-950">{e.title}</td>
                <td className="p-3.5">{e.venue}, {e.district}</td>
                <td className="p-3.5 text-slate-500">{formatDate(e.startDate)}</td>
                <td className="p-3.5 font-mono font-bold text-navy-950">₹{e.entryFee}</td>
                <td className="p-3.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${e.regOpen ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"}`}>
                    {e.regOpen ? "OPEN" : "CLOSED"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
