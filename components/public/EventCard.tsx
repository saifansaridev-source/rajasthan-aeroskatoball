import { Calendar, MapPin, Download } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface EventItem {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  image?: string;
  startDate: Date | string;
  endDate?: Date | string;
  venue: string;
  district: string;
  discipline?: string;
  brochureUrl?: string | null;
}

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group">
      {/* Event Header / Image */}
      {event.image ? (
        <div className="h-44 overflow-hidden relative border-b border-slate-200 bg-slate-900">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          {event.discipline && (
            <span className="absolute top-3 left-3 bg-saffron-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow">
              {event.discipline}
            </span>
          )}
        </div>
      ) : (
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white p-4 relative border-b border-navy-700">
          {event.discipline && (
            <span className="bg-saffron-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow mb-2 inline-block">
              {event.discipline}
            </span>
          )}
          <h3 className="text-base font-black text-white group-hover:text-saffron-400 transition leading-snug">
            {event.title}
          </h3>
        </div>
      )}

      {/* Body details */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2 text-xs text-slate-600">
          {event.image && (
            <h3 className="text-base font-black text-navy-950 group-hover:text-saffron-600 transition leading-snug">
              {event.title}
            </h3>
          )}

          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <Calendar className="w-4 h-4 text-saffron-500 shrink-0" />
            <span>
              {formatDate(event.startDate)}
              {event.endDate ? ` — ${formatDate(event.endDate)}` : ""}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-saffron-500 shrink-0" />
            <span>
              {event.venue}, <strong className="text-navy-900">{event.district}</strong>
            </span>
          </div>

          <p className="text-xs text-slate-500 line-clamp-3 pt-1 border-t border-slate-100">
            {event.description}
          </p>
        </div>

        {/* Brochure Download CTA */}
        {event.brochureUrl && (
          <div className="pt-3 border-t border-slate-100">
            <a
              href={event.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2 px-3 rounded-lg text-center transition flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-saffron-600" /> Download Event Notice / Brochure
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
