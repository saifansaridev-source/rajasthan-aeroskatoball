import connectDB from "@/lib/db";
import { GalleryItem } from "@/models";
import { Image as ImageIcon, Video, Star } from "lucide-react";

export const revalidate = 0;

export default async function AdminGalleryManager() {
  await connectDB();
  const items = await GalleryItem.find().sort({ createdAt: -1 }).lean();
  const photos = items.filter((i: any) => i.type === "PHOTO");
  const videos = items.filter((i: any) => i.type === "VIDEO");

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-black text-navy-950">Gallery & Media Manager</h1>
        <p className="text-xs text-slate-500">
          Upload championship photos, add YouTube video links, and tag items as featured for the homepage carousel.
        </p>
      </div>

      {/* Photos Grid */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="font-bold text-navy-900 flex items-center gap-2 text-sm border-b border-slate-100 pb-2">
          <ImageIcon className="w-4 h-4 text-saffron-500" /> Photo Albums ({photos.length} items)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {photos.map((photo: any) => (
            <div key={photo._id.toString()} className="relative rounded-lg overflow-hidden border border-slate-200 group">
              <div className="h-24 overflow-hidden">
                <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              {photo.featured && (
                <div className="absolute top-1 right-1">
                  <Star className="w-4 h-4 text-saffron-500 fill-saffron-500" />
                </div>
              )}
              <div className="p-2">
                <p className="text-[10px] font-bold text-navy-900 truncate">{photo.title}</p>
                <p className="text-[9px] text-slate-400">{photo.albumName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Videos List */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="font-bold text-navy-900 flex items-center gap-2 text-sm border-b border-slate-100 pb-2">
          <Video className="w-4 h-4 text-saffron-500" /> Federation TV Videos ({videos.length} items)
        </h2>
        <div className="divide-y divide-slate-100">
          {videos.map((vid: any) => (
            <div key={vid._id.toString()} className="py-3 flex items-center gap-3 text-xs">
              <div className="w-20 h-12 bg-slate-200 rounded overflow-hidden shrink-0">
                {vid.thumbnailUrl ? (
                  <img src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-navy-900 flex items-center justify-center text-white text-[10px]">VIDEO</div>
                )}
              </div>
              <div>
                <h4 className="font-bold text-navy-950">{vid.title}</h4>
                <p className="text-[11px] text-slate-500 truncate max-w-xs">{vid.url}</p>
                <span className="text-[10px] text-saffron-600 font-semibold">{vid.albumName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
