"use client";

import { useState } from "react";
import { Newspaper, Plus, Eye, Edit, Trash2, Search, Tag, Calendar, X, Save } from "lucide-react";

const initialArticles = [
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

const EMPTY_FORM = {
  title: "",
  category: "Championship",
  author: "State Admin",
  date: new Date().toISOString().split("T")[0],
  status: "Draft",
  excerpt: "",
};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState(initialArticles);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  const filtered = articles.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter ? a.category === catFilter : true;
    const matchStatus = statusFilter ? a.status === statusFilter : true;
    return matchSearch && matchCat && matchStatus;
  });

  const published = articles.filter((a) => a.status === "Published").length;
  const drafts = articles.filter((a) => a.status === "Draft").length;
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);

  const openAdd = () => {
    setEditId(null);
    setForm({ ...EMPTY_FORM });
    setShowModal(true);
  };

  const openEdit = (a: typeof initialArticles[0]) => {
    setEditId(a._id);
    setForm({
      title: a.title,
      category: a.category,
      author: a.author,
      date: a.date,
      status: a.status,
      excerpt: a.excerpt,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this article?")) {
      setArticles((prev) => prev.filter((a) => a._id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setArticles((prev) =>
        prev.map((a) => (a._id === editId ? { ...a, ...form } : a))
      );
    } else {
      setArticles((prev) => [
        {
          _id: String(Date.now()),
          ...form,
          views: 0,
        },
        ...prev,
      ]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0A3D91]">Articles &amp; News</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage news articles, announcements, and press releases
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-[#F57C00] hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-lg"
        >
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title, category..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0A3D91] focus:outline-none bg-white"
          />
        </div>
        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-[#0A3D91] focus:outline-none min-w-[140px]"
        >
          <option value="">All Categories</option>
          <option>Championship</option>
          <option>Selection</option>
          <option>Infrastructure</option>
          <option>Training</option>
          <option>Notice</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-[#0A3D91] focus:outline-none min-w-[130px]"
        >
          <option value="">All Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <Newspaper className="w-5 h-5 text-[#F57C00]" />
          <span className="font-bold text-[#0A3D91]">Latest Articles</span>
          <span className="ml-auto text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
            {filtered.length} articles
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm">No articles found.</div>
          )}
          {filtered.map((article) => {
            const catColor = categoryColors[article.category] || "bg-slate-50 text-slate-700 border-slate-200";
            return (
              <div key={article._id} className="p-5 hover:bg-slate-50 transition group">
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
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{article.title}</h3>
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

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      title="Edit Article"
                      onClick={() => openEdit(article)}
                      className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      title="Delete Article"
                      onClick={() => handleDelete(article._id)}
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

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-5 bg-[#0A3D91] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5" />
                <h3 className="font-black text-sm">{editId ? "Edit Article" : "New Article"}</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-white hover:text-orange-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter article title..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#0A3D91] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#0A3D91] focus:outline-none"
                  >
                    <option>Championship</option>
                    <option>Selection</option>
                    <option>Infrastructure</option>
                    <option>Training</option>
                    <option>Notice</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#0A3D91] focus:outline-none"
                  >
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Author</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#0A3D91] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#0A3D91] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Excerpt / Summary *</label>
                <textarea
                  required
                  rows={3}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Short description of the article..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 resize-none focus:ring-2 focus:ring-[#0A3D91] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0A3D91] hover:bg-[#083279] text-white px-5 py-2 rounded-xl font-bold shadow flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  {editId ? "Save Changes" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
