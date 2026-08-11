import connectDB from "@/lib/db";
import { Event } from "@/models";
import EventCard from "@/components/public/EventCard";
import { Calendar } from "lucide-react";
import BackButton from "@/components/public/BackButton";

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  let events: any[] = [];

  try {
    const conn = await connectDB();
    if (conn) {
      events = await Event.find().sort({ startDate: 1 }).lean();
    }
  } catch (err) {
    console.error("EventsPage DB error:", err);
  }

  const serialize = (items: any[]) => JSON.parse(JSON.stringify(items));
  const serializedEvents = serialize(events);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <BackButton />
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">Championship Calendar</span>
        <h1 className="text-3xl font-black text-navy-950">State Events & Championships</h1>
        <p className="text-xs text-slate-500">
          Official selection trials, state championships, and accredited sports events across Rajasthan.
        </p>
      </div>

      {serializedEvents.length === 0 ? (
        <div className="p-12 text-center text-slate-400 text-xs bg-white rounded-2xl border border-slate-200">
          No scheduled events found at this time. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serializedEvents.map((event: any) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
