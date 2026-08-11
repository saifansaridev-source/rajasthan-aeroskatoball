import connectDB from "@/lib/db";
import { GalleryItem } from "@/models";
import { Image as ImageIcon } from "lucide-react";
import BackButton from "@/components/public/BackButton";

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  await connectDB();
  const items = await GalleryItem.find().sort({ createdAt: -1 }).lean();

  const serialize = (items: any[]) => JSON.parse(JSON.stringify(items));
  const photos = serialize(items.filter((i: any) => i.type === "PHOTO" || !i.type));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <BackButton />
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">Media Center</span>
        <h1 className="text-3xl font-black text-navy-950">Championship Photo Gallery</h1>
        <p className="text-xs text-slate-500">
          State championship action photos, award ceremonies, and athlete highlights across Rajasthan.
        </p>
      </div>

      {/* Photos Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2 border-b border-slate-200 pb-2">
          <ImageIcon className="w-5 h-5 text-saffron-500" /> Photo Gallery ({photos.length})
        </h2>

        {photos.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs bg-white rounded-2xl border border-slate-200">
            No gallery images published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map((item: any) => (
              <div key={item._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition group flex flex-col justify-between">
                <div className="h-52 overflow-hidden relative bg-slate-900">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-bold text-saffron-600 uppercase tracking-wider">
                    {item.albumName || "HIGHLIGHTS"}
                  </span>
                  <h3 className="font-bold text-navy-950 text-sm leading-snug">{item.title}</h3>
                  {item.description && (
                    <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
