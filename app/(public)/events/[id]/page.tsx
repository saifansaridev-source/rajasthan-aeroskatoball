import connectDB from "@/lib/db";
import { Event } from "@/models";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  await connectDB();
  let event: any = null;

  try {
    event = await Event.findById(params.id).lean();
  } catch (err) {
    notFound();
  }

  if (!event) {
    notFound();
  }

  const serializedEvent: any = JSON.parse(JSON.stringify(event));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link href="/events" className="text-xs font-bold text-slate-500 hover:text-saffron-600 flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Events Calendar
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6">
        {serializedEvent.image && (
          <div className="h-64 md:h-80 w-full overflow-hidden bg-slate-900 border-b border-slate-200">
            <img src={serializedEvent.image} alt={serializedEvent.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-8 space-y-6">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider bg-saffron-100 text-saffron-800 px-3 py-1 rounded">
              {serializedEvent.discipline || "Aeroskatoball Championship"}
            </span>
          </div>

          <h1 className="text-3xl font-black text-navy-950">{serializedEvent.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-saffron-500" />
              <span>Dates: {formatDate(serializedEvent.startDate)}{serializedEvent.endDate ? ` – ${formatDate(serializedEvent.endDate)}` : ""}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-saffron-500" />
              <span>Venue: {serializedEvent.venue}, <strong>{serializedEvent.district}</strong></span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="font-bold text-navy-950 text-sm mb-2">Event Overview & Description</h3>
            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{serializedEvent.description}</p>
          </div>

          {serializedEvent.brochureUrl && (
            <div className="pt-4 border-t border-slate-100">
              <a
                href={serializedEvent.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition"
              >
                <Download className="w-4 h-4" /> Download Official Notice / Brochure PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
