import BackButton from "@/components/public/BackButton";
import { BookOpen, ExternalLink, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

interface WikiSummary {
  title: string;
  extract: string;
  description?: string;
  thumbnail?: { source: string };
  content_urls: { desktop: { page: string } };
  timestamp?: string;
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetchWikiSummary(slug);
  return {
    title: article
      ? `${article.title} | Rajasthan Aeroskatoball Articles`
      : "Article Not Found",
    description: article?.extract?.slice(0, 155),
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetchWikiSummary(slug);

  if (!article) notFound();

  const publishDate = article.timestamp
    ? new Date(article.timestamp).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <BackButton />

      {/* Article Header Card */}
      <div className="bg-navy-950 text-white rounded-3xl overflow-hidden shadow-xl border-t-4 border-saffron-500">
        {/* Hero Image */}
        {article.thumbnail && (
          <div className="h-56 overflow-hidden relative">
            <img
              src={article.thumbnail.source}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />
          </div>
        )}
        <div className="p-8 space-y-3">
          <div className="inline-flex items-center gap-2 bg-saffron-500/20 text-saffron-400 font-bold text-xs px-3 py-1 rounded-full border border-saffron-500/30">
            <BookOpen className="w-3.5 h-3.5" /> Wikipedia Article
          </div>
          <h1 className="text-2xl md:text-4xl font-black leading-tight">
            {article.title}
          </h1>
          {article.description && (
            <p className="text-saffron-300 text-sm font-semibold">
              {article.description}
            </p>
          )}
          {publishDate && (
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <Calendar className="w-3.5 h-3.5" /> Last revised: {publishDate}
            </div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
        <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
          {/* Split extract into paragraphs */}
          {article.extract.split("\n").map((para, i) =>
            para.trim() ? (
              <p key={i} className="mb-4 text-sm leading-relaxed text-slate-700">
                {para}
              </p>
            ) : null
          )}
        </div>

        {/* Attribution + Read More CTA */}
        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-slate-400">
            Content sourced from{" "}
            <a
              href="https://www.wikipedia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-saffron-600 hover:underline font-semibold"
            >
              Wikipedia
            </a>{" "}
            under the CC BY-SA 4.0 license.
          </p>
          <a
            href={article.content_urls.desktop.page}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-navy-950 hover:bg-navy-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition"
          >
            Read Full Article on Wikipedia <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Back to Articles */}
      <div className="text-center pb-4">
        <BackButton label="Back to All Articles" />
      </div>
    </div>
  );
}
