import { Newspaper, Plus, Eye, Edit, Trash2, Search, Tag, Calendar } from "lucide-react";

export const dynamic = 'force-dynamic';

const sampleArticles = [
  {
    _id: "1",
    title: "Rajasthan State Aeroskatoball Championship 2024 – Registration Open",
    category: "Championship",
    author: "State Admin",
    date: "2024-01-15",
    status: "Published",
    views: 1842,
    excerpt:
      "The Rajasthan State Aeroskatoball Association announces open registration for the annual state championship to be held in Jaipur.",
  },
  {
    _id: "2",
    title: "National Youth Games 2024 – Rajasthan Team Selection Trials",
    category: "Selection",
    author: "State Admin",
    date: "2024-01-10",
    status: "Published",
    views: 2341,
    excerpt:
      "Selection trials for the National Youth Games 2024 will be conducted across 5 districts. Eligible athletes must register before January 25.",
  },
  {
    _id: "3",
    title: "New Aeroskatoball Training Centers Inaugurated in 3 Districts",
    category: "Infrastructure",
    author: "State Admin",
    date: "2024-01-05",
    status: "Published",
    views: 987,
    excerpt:
      "The association inaugurated new training centers in Bikaner, Sikar, and Bharatpur to support grassroots development of the sport.",
  },
  {
    _id: "4",
    title: "Coach Certification Program – Batch 5 Enrollments Open",
    category: "Training",
    author: "State Admin",
    date: "2024-01-01",
    status: "Draft",
    views: 0,
    excerpt:
      "Applications are invited for the 5th batch of the national coach certification program. Deadline for applications is January 30.",
  },
  {
    _id: "5",
    title: "Annual General Meeting 2024 – Notice and Agenda",
    category: "Notice",
    author: "State Admin",
    date: "2023-12-28",
    status: "Published",
    views: 1124,
    excerpt:
      "The Annual General Meeting of the Rajasthan Aeroskatoball Association will be held on February 10, 2024 at SAI Centre, Jaipur.",
  },
];

const categoryColors: Record<string, string> = {
  Championship: "bg-orange-50 text-orange-700 border-orange-200",
  Selection: "bg-blue-50 text-blue-700 border-blue-200",
  Infrastructure: "bg-green-50 text-green-700 border-green-200",
  Training: "bg-purple-50 text-purple-700 border-purple-200",
  Notice: "bg-red-50 text-red-700 border-red-200",
};

export default async function AdminArticlesPage() {
  const articles = sampleArticles;
  const published = articles.filter((a) => a.status === "Published").length;
  const drafts = articles.filter((a) => a.status === "Draft").length;
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-950">Articles & News</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage news articles, announcements, and press releases
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-lg shadow-saffron-500/20">
          <Plus className="w-4 h-4" />
          New Article
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Articles", value: articles.length, color: "bg-blue-50 text-blue-700" },
          { label: "Published", value: published, color: "bg-green-50 text-green-700" },
          { label: "Drafts", value: drafts, color: "bg-yellow-50 text-yellow-700" },
          { label: "Total Views", value: totalViews.toLocaleString(), color: "bg-purple-50 text-purple-700" },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-xl p-4 ${stat.color} border border-current/10`}>
            <p className="text-2xl font-black">{stat.value}</p>
            <p className="text-xs font-semibold mt-0.5 opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles by title, category..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-saffron-500 focus:outline-none bg-white"
          />
        </div>
        <select className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-saffron-500 focus:outline-none min-w-[140px]">
          <option value="">All Categories</option>
          <option>Championship</option>
          <option>Selection</option>
          <option>Infrastructure</option>
          <option>Training</option>
          <option>Notice</option>
        </select>
        <select className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-saffron-500 focus:outline-none min-w-[130px]">
          <option value="">All Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <Newspaper className="w-5 h-5 text-saffron-500" />
          <span className="font-bold text-navy-950">Latest Articles</span>
          <span className="ml-auto text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
            {articles.length} articles
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {articles.map((article) => {
            const catColor = categoryColors[article.category] || "bg-slate-50 text-slate-700 border-slate-200";
            return (
              <div
                key={article._id}
                className="p-5 hover:bg-slate-50 transition group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${catColor}`}>
                        <Tag className="w-2.5 h-2.5 inline mr-1" />
                        {article.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          article.status === "Published"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }`}
                      >
                        {article.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-navy-950 text-sm leading-snug truncate">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{article.excerpt}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      {article.views > 0 && (
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views.toLocaleString()} views
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      title="Preview Article"
                      className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="Edit Article"
                      className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="Delete Article"
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-700 flex items-start gap-3">
        <Newspaper className="w-4 h-4 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold mb-1">Articles & News Management</p>
          <p>
            This section manages news articles and announcements displayed on the public website.
            Connect your MongoDB database to manage live content. Currently showing sample preview
            data.
          </p>
        </div>
      </div>
    </div>
  );
}
