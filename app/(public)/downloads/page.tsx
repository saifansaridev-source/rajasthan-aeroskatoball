import connectDB from "@/lib/db";
import { Circular } from "@/models";
import DownloadsClientPage from "@/components/public/DownloadsClientPage";

export const dynamic = 'force-dynamic';

export default async function DownloadsPage() {
  let circulars: any[] = [];

  try {
    const conn = await connectDB();
    if (conn) {
      circulars = await Circular.find().sort({ publishDate: -1 }).lean();
    }
  } catch (err) {
    console.error("DownloadsPage DB error:", err);
  }

  const serialize = (items: any[]) => JSON.parse(JSON.stringify(items));
  const serializedCirculars = serialize(circulars);

  return <DownloadsClientPage initialCirculars={serializedCirculars} />;
}
