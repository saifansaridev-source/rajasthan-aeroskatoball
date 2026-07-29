import connectDB from "@/lib/db";
import { Event } from "@/models";
import EventCard from "@/components/public/EventCard";
import { Trophy, Calendar, Download } from "lucide-react";

export const revalidate = 300;

export default async function EventsPage() {
  await connectDB();
  const events = await Event.find().sort({ startDate: 1 }).lean();

  const serialize = (items: any[]) => JSON.parse(JSON.stringify(items));
  const serializedEvents = serialize(events);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">Championship Calendar</span>
        <h1 className="text-3xl font-black text-navy-950">State Events & Tournament Results</h1>
        <p className="text-xs text-slate-500">
          Official selection trials, annual championships, and accredited referee/coaching seminars.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serializedEvents.map((event: any) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
