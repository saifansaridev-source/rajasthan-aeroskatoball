import connectDB from "@/lib/db";
import { Event } from "@/models";
import EventsClientPage from "@/components/public/EventsClientPage";

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

  return <EventsClientPage initialEvents={serializedEvents} />;
}
