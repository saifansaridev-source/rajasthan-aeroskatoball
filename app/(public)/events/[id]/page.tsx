import connectDB from "@/lib/db";
import { Event } from "@/models";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Trophy, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  await connectDB();
  const event = await Event.findById(params.id).lean();

  if (!event) {
    notFound();
  }

  const serializedEvent: any = JSON.parse(JSON.stringify(event));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link href="/events" className="text-xs font-bold text-slate-500 hover:text-saffron-600 flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Events Calendar
      </Link>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold uppercase tracking-wider bg-saffron-100 text-saffron-800 px-3 py-1 rounded">
            {serializedEvent.discipline}
          </span>
          <span className={`text-xs font-bold px-3 py-1 rounded ${serializedEvent.regOpen ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"}`}>
            {serializedEvent.regOpen ? "REGISTRATION OPEN" : "REGISTRATION CLOSED"}
          </span>
        </div>

        <h1 className="text-3xl font-black text-navy-950">{serializedEvent.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-saffron-500" />
            <span>Dates: {formatDate(serializedEvent.startDate)} – {formatDate(serializedEvent.endDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-saffron-500" />
            <span>Venue: {serializedEvent.venue}, {serializedEvent.district}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="font-bold text-navy-950 text-sm mb-2">Event Overview & Description</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{serializedEvent.description}</p>
        </div>

        {serializedEvent.results && serializedEvent.results.length > 0 && (
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <h3 className="font-bold text-navy-950 text-sm flex items-center gap-2">
              <Trophy className="w-4 h-4 text-saffron-500" /> Championship Winners & Results
            </h3>
            <div className="space-y-3">
              {serializedEvent.results.map((res: any, idx: number) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
                  <span className="font-bold text-saffron-600">{res.category}</span>
                  <div className="flex justify-between">
                    <span className="font-semibold text-navy-950">🥇 1st Place: {res.winnerName}</span>
                    <span className="text-slate-600">🥈 2nd Place: {res.runnerUp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
