import connectDB from "@/lib/db";
import { GalleryItem } from "@/models";
import GalleryClientPage from "@/components/public/GalleryClientPage";

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  let items: any[] = [];

  try {
    const conn = await connectDB();
    if (conn) {
      items = await GalleryItem.find().sort({ createdAt: -1 }).lean();
    }
  } catch (err) {
    console.error("GalleryPage DB error:", err);
  }

  const serialize = (items: any[]) => JSON.parse(JSON.stringify(items));
  const photos = serialize(items);

  return <GalleryClientPage initialPhotos={photos} />;
}
