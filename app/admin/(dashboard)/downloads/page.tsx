"use client";

import { useState, useEffect } from "react";
import { Download, Bell, Trash2, Upload, FileText, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminDownloadsManager() {
  const [circulars, setCirculars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("CIRCULAR");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchCirculars = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/circulars");
      const data = await res.json();
      if (data.circulars) {
        setCirculars(data.circulars);
      }
    } catch (err: any) {
      console.error("Failed to load circulars", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCirculars();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) {
      setError("Please provide a title and select a PDF file.");
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setSuccess(null);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("file", file);

      const res = await fetch("/api/admin/circulars", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload circular");
      }

      setSuccess("Circular uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
      fetchCirculars();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this circular? The file will be removed permanently.")) {
      return;
    }

    try {
      setDeletingId(id);
      const res = await fetch(`/api/admin/circulars/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete circular");
      }

      setCirculars((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete circular");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-black text-navy-950">Circulars & Downloads Manager</h1>
        <p className="text-xs text-slate-500 mt-1">
          Upload and manage official PDFs, announcements, rulebooks, and circulars shown publicly.
        </p>
      </div>

      {/* Upload New Circular Form */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="font-bold text-navy-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
          <Upload className="w-4 h-4 text-saffron-500" /> Upload New Circular / Document
        </h2>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Notice: Anti-Doping Code & Fair Play Declaration"
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              >
                <option value="CIRCULAR">CIRCULAR</option>
                <option value="RULEBOOK">RULEBOOK</option>
                <option value="MEMBERSHIP">MEMBERSHIP</option>
                <option value="TOURNAMENT">TOURNAMENT</option>
                <option value="CERTIFICATE">CERTIFICATE</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Description (Optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief details about this circular or document"
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Select PDF File <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-navy-900 file:text-white hover:file:bg-navy-800"
              required
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold px-5 py-2.5 rounded-lg transition flex items-center gap-2 shadow disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? "Uploading..." : "Upload Circular"}
          </button>
        </form>
      </div>

      {/* Circulars List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
          <Bell className="w-4 h-4 text-saffron-500" />
          <h2 className="font-bold text-navy-900 text-sm">Uploaded Circulars ({circulars.length})</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400 text-xs flex justify-center items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading circulars...
          </div>
        ) : circulars.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No circulars uploaded yet. Use the form above to upload your first PDF.
          </div>
        ) : (
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-navy-900 text-white uppercase font-bold text-[11px]">
              <tr>
                <th className="p-3.5">Title / Description</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Publish Date</th>
                <th className="p-3.5">File</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {circulars.map((c: any) => (
                <tr key={c._id} className="hover:bg-slate-50">
                  <td className="p-3.5">
                    <p className="font-bold text-navy-950">{c.title}</p>
                    {c.description && <p className="text-[11px] text-slate-500 mt-0.5">{c.description}</p>}
                  </td>
                  <td className="p-3.5">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                      {c.category || "CIRCULAR"}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-500">{formatDate(c.publishDate || c.createdAt)}</td>
                  <td className="p-3.5">
                    <a
                      href={c.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-saffron-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
                    </a>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleDelete(c._id)}
                      disabled={deletingId === c._id}
                      className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition disabled:opacity-50"
                      title="Delete Circular"
                    >
                      {deletingId === c._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
