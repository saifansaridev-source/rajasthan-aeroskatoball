import connectDB from "@/lib/db";
import { GalleryItem } from "@/models";
import { Image as ImageIcon, Video, Star } from "lucide-react";

export const revalidate = 600;

export default async function GalleryPage() {
  await connectDB();
  const items = await GalleryItem.find().sort({ createdAt: -1 }).lean();

  const photos = items.filter((i: any) => i.type === "PHOTO");
  const videos = items.filter((i: any) => i.type === "VIDEO");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">Media Center</span>
        <h1 className="text-3xl font-black text-navy-950">Photo Gallery & Federation TV</h1>
        <p className="text-xs text-slate-500">
          Championship action photos, award ceremony highlights, and official match video broadcasts.
        </p>
      </div>

      {/* Photos Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2 border-b border-slate-200 pb-2">
          <ImageIcon className="w-5 h-5 text-saffron-500" /> Action Photo Albums
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((item: any) => (
            <div key={item._id.toString()} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition group">
              <div className="h-48 overflow-hidden relative">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold text-saffron-600 uppercase">{item.albumName}</span>
                <h3 className="font-bold text-navy-950 text-sm mt-1">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Videos Section */}
      <div className="space-y-6 pt-6">
        <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2 border-b border-slate-200 pb-2">
          <Video className="w-5 h-5 text-saffron-500" /> Federation TV (Videos)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((item: any) => (
            <div key={item._id.toString()} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-3 p-4">
              <div className="aspect-video rounded-xl overflow-hidden bg-slate-900">
                <iframe
                  src={item.url}
                  title={item.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-saffron-600 uppercase">{item.albumName}</span>
                <h3 className="font-bold text-navy-950 text-sm mt-1">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
