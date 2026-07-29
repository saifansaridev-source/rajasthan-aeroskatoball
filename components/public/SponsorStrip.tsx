import Image from "next/image";

export interface SponsorItem {
  id: string;
  name: string;
  logoUrl: string;
  website?: string | null;
}

export default function SponsorStrip({ sponsors }: { sponsors: SponsorItem[] }) {
  if (!sponsors || sponsors.length === 0) return null;

  return (
    <div className="bg-slate-50 border-y border-slate-200 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <h4 className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
          Partners & Affiliating Entities
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition">
          {sponsors.map((s) => (
            <a
              key={s.id}
              href={s.website || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-slate-200 shadow-sm rounded-lg px-4 py-2.5 hover:shadow-md transition transform hover:scale-105 flex items-center justify-center min-w-[140px]"
            >
              <span className="text-xs font-bold text-navy-900">{s.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
