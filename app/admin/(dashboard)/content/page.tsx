import connectDB from "@/lib/db";
import { HeroSlide, NewsPost, Sponsor } from "@/models";
import { Image as ImageIcon, FileText, Award } from "lucide-react";

export const revalidate = 0;

export default async function AdminContentManager() {
  await connectDB();
  const [slides, posts, sponsors] = await Promise.all([
    HeroSlide.find().sort({ order: 1 }).lean(),
    NewsPost.find().sort({ createdAt: -1 }).lean(),
    Sponsor.find().sort({ order: 1 }).lean(),
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-black text-navy-950">Homepage Content Manager</h1>
        <p className="text-xs text-slate-500">
          Manage Hero Slider banners, Federation news posts, and partner sponsor logos.
        </p>
      </div>

      {/* Hero Slides */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="font-bold text-navy-900 flex items-center gap-2 text-sm border-b border-slate-100 pb-2">
          <ImageIcon className="w-4 h-4 text-saffron-500" /> Hero Banners ({slides.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {slides.map((slide: any) => (
            <div key={slide._id.toString()} className="border border-slate-200 rounded-lg overflow-hidden group">
              <div className="h-28 overflow-hidden bg-slate-100">
                <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-navy-950 text-xs">{slide.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Posts */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="font-bold text-navy-900 flex items-center gap-2 text-sm border-b border-slate-100 pb-2">
          <FileText className="w-4 h-4 text-saffron-500" /> Federation News Posts ({posts.length})
        </h2>
        <div className="divide-y divide-slate-100">
          {posts.map((post: any) => (
            <div key={post._id.toString()} className="py-3 flex justify-between items-center text-xs">
              <div>
                <h4 className="font-bold text-navy-950">{post.title}</h4>
                <p className="text-[11px] text-slate-500">{post.summary}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${post.published ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"}`}>
                {post.published ? "PUBLISHED" : "DRAFT"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
