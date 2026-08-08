"use client";

import { useState, useEffect, useRef } from "react";
import { Image as ImageIcon, Upload, Trash2, Edit3, Loader2, X, Check } from "lucide-react";

export default function AdminGalleryManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Form states
  const [title, setTitle] = useState("Championship Action");
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Edit Modal states
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      if (data.items) {
        setItems(data.items);
      }
    } catch (err: any) {
      console.error("Failed to load gallery items", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const validImages = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (validImages.length === 0) {
      setError("Please select valid image files.");
      return;
    }
    setSelectedFiles((prev) => [...prev, ...validImages]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setError("Please select or drop at least one image to upload.");
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setSuccess(null);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      selectedFiles.forEach((file) => formData.append("files", file));

      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload gallery images");
      }

      setSuccess(`Successfully uploaded ${selectedFiles.length} image(s)!`);
      setSelectedFiles([]);
      setDescription("");
      fetchGallery();
    } catch (err: any) {
      setError(err.message || "An error occurred during upload");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery image? The file and record will be permanently deleted.")) {
      return;
    }

    try {
      setDeletingId(id);
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete image");
      }

      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete image");
    } finally {
      setDeletingId(null);
    }
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setEditTitle(item.title || "");
    setEditDescription(item.description || "");
    setEditFile(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      setSavingEdit(true);
      const formData = new FormData();
      formData.append("title", editTitle);
      formData.append("description", editDescription);
      if (editFile) {
        formData.append("file", editFile);
      }

      const res = await fetch(`/api/admin/gallery/${editingItem._id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update item");
      }

      setEditingItem(null);
      fetchGallery();
    } catch (err: any) {
      alert(err.message || "Failed to save changes");
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-black text-navy-950">Gallery & Media Manager</h1>
        <p className="text-xs text-slate-500 mt-1">
          Upload championship images with drag-and-drop, edit image descriptions, and manage public media.
        </p>
      </div>

      {/* Drag and Drop Upload Box */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="font-bold text-navy-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
          <Upload className="w-4 h-4 text-saffron-500" /> Drag & Drop Image Uploader
        </h2>

        {error && <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">{error}</div>}
        {success && <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-200">{success}</div>}

        <form onSubmit={handleUpload} className="space-y-4 text-xs">
          {/* Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
              dragging
                ? "border-saffron-500 bg-saffron-50/50"
                : "border-slate-300 hover:border-saffron-400 bg-slate-50/50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
            <div className="p-3 bg-saffron-100 rounded-full text-saffron-600">
              <ImageIcon className="w-8 h-8" />
            </div>
            <p className="font-bold text-navy-950 text-sm">
              Click to select or drag and drop images here
            </p>
            <p className="text-slate-400 text-xs">Supports PNG, JPG, JPEG, WEBP (Single or Multiple images)</p>
          </div>

          {/* Selected Files Preview List */}
          {selectedFiles.length > 0 && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <p className="font-bold text-navy-950 text-xs">Selected Images ({selectedFiles.length}):</p>
              <div className="flex flex-wrap gap-2">
                {selectedFiles.map((file, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-medium shadow-xs"
                  >
                    <span className="truncate max-w-[150px]">{file.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
                      }}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Image Title / Caption</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 1st State Championship Final Match"
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Action moment during the speed division final"
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading || selectedFiles.length === 0}
            className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold px-5 py-2.5 rounded-lg transition flex items-center gap-2 shadow disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? "Uploading Images..." : `Upload ${selectedFiles.length} Image(s)`}
          </button>
        </form>
      </div>

      {/* Gallery Items Grid */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="font-bold text-navy-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
          <ImageIcon className="w-4 h-4 text-saffron-500" /> Gallery Images ({items.length})
        </h2>

        {loading ? (
          <div className="p-8 text-center text-slate-400 text-xs flex justify-center items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading gallery...
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No gallery images found. Upload images above to populate the public gallery.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item._id} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between group">
                <div className="h-44 overflow-hidden relative bg-slate-900">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-navy-950 text-xs truncate">{item.title}</h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                      {item.description || "No description provided"}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200/60">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 bg-white text-slate-700 hover:bg-slate-200 border border-slate-200 rounded-lg transition text-[11px] font-semibold flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-navy-900" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                      className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition text-[11px] font-semibold flex items-center gap-1 disabled:opacity-50"
                    >
                      {deletingId === item._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />} Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-black text-navy-950 text-base flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-saffron-500" /> Edit Gallery Image
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="h-36 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                <img src={editFile ? URL.createObjectURL(editFile) : editingItem.url} alt="Preview" className="w-full h-full object-cover" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Replace Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditFile(e.target.files?.[0] || null)}
                  className="w-full p-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Image description..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-4 py-2 bg-saffron-500 hover:bg-saffron-600 text-white rounded-lg font-bold flex items-center gap-1.5 disabled:opacity-50"
                >
                  {savingEdit ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
