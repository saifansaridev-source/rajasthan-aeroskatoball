import Link from "next/link";
import BackButton from "@/components/public/BackButton";
import { BookOpen, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Articles & Blog | Rajasthan Aeroskatoball Association",
  description:
    "Educational articles, sport science insights, and news about Aeroskatoball curated from Wikipedia and other sources.",
};

// ─── Wikipedia search terms relevant to Aeroskatoball & sport ─────────────────
const WIKI_TOPICS = [
  { slug: "Aeroskatoball", title: "Aeroskatoball" },
  { slug: "Skateboarding", title: "Skateboarding" },
  { slug: "Roller_derby", title: "Roller Derby" },
  { slug: "Sports_science", title: "Sports Science" },
  { slug: "Grassroots_sport", title: "Grassroots Sport" },
  { slug: "School_Games_Federation_of_India", title: "School Games Federation of India" },
];

interface WikiSummary {
  title: string;
  extract: string;
  thumbnail?: { source: string };
  content_urls: { desktop: { page: string } };
}

async function fetchWikiSummary(slug: string): Promise<WikiSummary | null> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(slug)}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ArticlesPage() {
  const articles = await Promise.all(
    WIKI_TOPICS.map(async (topic) => {
      const summary = await fetchWikiSummary(topic.slug);
      return summary
        ? { ...summary, localSlug: topic.slug, customTitle: topic.title }
        : null;
    })
  );

  const valid = articles.filter(Boolean) as (WikiSummary & {
    localSlug: string;
    customTitle: string;
  })[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <BackButton />

      {/* Page Header */}
      <div className="bg-navy-950 text-white rounded-3xl p-8 md:p-12 border-t-4 border-saffron-500 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-saffron-500/20 text-saffron-400 font-bold text-xs px-3 py-1 rounded-full border border-saffron-500/30">
            <BookOpen className="w-3.5 h-3.5" /> Articles &amp; Knowledge Base
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            Learn About Aeroskatoball
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
            Curated educational articles about Aeroskatoball, skating disciplines, sports science,
            and the broader grassroots sport ecosystem in India.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {valid.map((article) => (
          <Link
            key={article.localSlug}
            href={`/articles/${article.localSlug}`}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition group flex flex-col"
          >
            {/* Thumbnail */}
            <div className="h-44 overflow-hidden bg-slate-200 relative">
              {article.thumbnail ? (
                <img
                  src={article.thumbnail.source}
                  alt={article.customTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-900 to-navy-700">
                  <BookOpen className="w-12 h-12 text-saffron-500 opacity-60" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
              <span className="absolute top-3 left-3 bg-saffron-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                Wikipedia
              </span>
            </div>

            {/* Info */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-black text-navy-950 text-base leading-snug group-hover:text-saffron-600 transition">
                  {article.customTitle}
                </h2>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {article.extract}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-saffron-600 mt-1 group-hover:gap-2 transition-all">
                Read More <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}

        {valid.length === 0 && (
          <div className="col-span-3 p-12 text-center text-slate-400 text-xs bg-white rounded-2xl border border-slate-200">
            Articles could not be loaded at this time. Please check your internet connection.
          </div>
        )}
      </div>

      {/* Attribution */}
      <p className="text-center text-xs text-slate-400 pt-4">
        Article summaries sourced from{" "}
        <a
          href="https://www.wikipedia.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-saffron-600 hover:underline"
        >
          Wikipedia
        </a>{" "}
        under the{" "}
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          CC BY-SA 4.0
        </a>{" "}
        license.
      </p>
    </div>
  );
}
