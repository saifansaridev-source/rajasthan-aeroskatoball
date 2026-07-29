import Link from "next/link";
import { Calendar, MapPin, Award, Download, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  startDate: Date | string;
  endDate: Date | string;
  venue: string;
  district: string;
  discipline: string;
  entryFee: number;
  brochureUrl?: string | null;
  regOpen: boolean;
}

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white p-4 relative border-b border-navy-700">
        <div className="flex justify-between items-start gap-2 mb-2">
          <span className="bg-saffron-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow">
            {event.discipline}
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              event.regOpen ? "bg-emerald-500 text-white" : "bg-slate-600 text-slate-200"
            }`}
          >
            {event.regOpen ? "REGISTRATION OPEN" : "CLOSED"}
          </span>
        </div>
        <h3 className="text-lg font-black text-white group-hover:text-saffron-400 transition leading-snug">
          {event.title}
        </h3>
      </div>

      {/* Body details */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5 text-xs text-slate-600">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <Calendar className="w-4 h-4 text-saffron-500 shrink-0" />
            <span>
              {formatDate(event.startDate)} — {formatDate(event.endDate)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-saffron-500 shrink-0" />
            <span>
              {event.venue}, <strong className="text-navy-900">{event.district}</strong>
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 font-semibold text-navy-900">
            <span>Entry Fee:</span>
            <span className="text-saffron-600 font-bold text-sm">
              ₹{event.entryFee} / Participant
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-3 flex items-center gap-2">
          {event.brochureUrl && (
            <a
              href={event.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
              title="Download Brochure"
            >
              <Download className="w-4 h-4" />
            </a>
          )}
          {event.regOpen ? (
            <Link
              href={`/register?eventId=${event.id}&type=EVENT_ENTRY`}
              className="flex-1 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-bold text-xs py-2.5 px-4 rounded-lg text-center shadow transition flex items-center justify-center gap-1.5"
            >
              REGISTER NOW <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href={`/events/${event.id}`}
              className="flex-1 bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs py-2.5 px-4 rounded-lg text-center transition"
            >
              View Results / Info
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
