"use client";

import { useState, useEffect } from "react";
import { Calendar, Plus, Trash2, Edit3, Loader2, MapPin, Upload, X, Check } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminEventsManager() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Add Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venue, setVenue] = useState("");
  const [district, setDistrict] = useState("");
  const [discipline, setDiscipline] = useState("Speed & Team Aeroskatoball");
  const [brochureUrl, setBrochureUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Edit Modal state
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const [editVenue, setEditVenue] = useState("");
  const [editDistrict, setEditDistrict] = useState("");
  const [editDiscipline, setEditDiscipline] = useState("");
  const [editBrochureUrl, setEditBrochureUrl] = useState("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/events");
      const data = await res.json();
      if (data.events) {
        setEvents(data.events);
      }
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !startDate || !venue || !district) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate || startDate);
      formData.append("venue", venue);
      formData.append("district", district);
      formData.append("discipline", discipline);
      formData.append("brochureUrl", brochureUrl);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/admin/events", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create tournament");
      }

      setShowAddModal(false);
      // Reset form
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setVenue("");
      setDistrict("");
      setBrochureUrl("");
      setImageFile(null);
      fetchEvents();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tournament?")) return;

    try {
      setDeletingId(id);
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete tournament");
      }

      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete tournament");
    } finally {
      setDeletingId(null);
    }
  };

  const openEditModal = (eventItem: any) => {
    setEditingEvent(eventItem);
    setEditTitle(eventItem.title || "");
    setEditDescription(eventItem.description || "");
    setEditStartDate(eventItem.startDate ? new Date(eventItem.startDate).toISOString().substring(0, 10) : "");
    setEditEndDate(eventItem.endDate ? new Date(eventItem.endDate).toISOString().substring(0, 10) : "");
    setEditVenue(eventItem.venue || "");
    setEditDistrict(eventItem.district || "");
    setEditDiscipline(eventItem.discipline || "");
    setEditBrochureUrl(eventItem.brochureUrl || "");
    setEditImageFile(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    try {
      setSavingEdit(true);
      const formData = new FormData();
      formData.append("title", editTitle);
      formData.append("description", editDescription);
      formData.append("startDate", editStartDate);
      formData.append("endDate", editEndDate);
      formData.append("venue", editVenue);
      formData.append("district", editDistrict);
      formData.append("discipline", editDiscipline);
      formData.append("brochureUrl", editBrochureUrl);
      if (editImageFile) {
        formData.append("image", editImageFile);
      }

      const res = await fetch(`/api/admin/events/${editingEvent._id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save changes");
      }

      setEditingEvent(null);
      fetchEvents();
    } catch (err: any) {
      alert(err.message || "Failed to update event");
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-navy-950">Tournaments & Events Manager</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create state championships, upload event banners/images, and update tournament announcements.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Tournament
        </button>
      </div>

      {/* Tournaments Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-navy-900 text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-saffron-500" /> Scheduled State Events ({events.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400 text-xs flex justify-center items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading tournaments...
          </div>
        ) : events.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No tournaments found. Click "Add Tournament" above to create one.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {events.map((e: any) => (
              <div key={e._id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50">
                <div className="flex items-start gap-4">
                  {e.image ? (
                    <img src={e.image} alt={e.title} className="w-20 h-20 rounded-lg object-cover shrink-0 border border-slate-200" />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-navy-900 text-white flex flex-col items-center justify-center shrink-0 text-center p-1">
                      <Calendar className="w-6 h-6 text-saffron-500 mb-1" />
                      <span className="text-[9px] font-bold">EVENT</span>
                    </div>
                  )}
                  <div className="space-y-1">
                    <span className="bg-saffron-100 text-saffron-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {e.discipline || "Aeroskatoball"}
                    </span>
                    <h3 className="font-bold text-navy-950 text-sm">{e.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{e.description}</p>
                    <div className="flex flex-wrap items-center gap-3 text-slate-600 text-xs pt-1">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-saffron-500" /> {formatDate(e.startDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-saffron-500" /> {e.venue}, <strong>{e.district}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => openEditModal(e)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs flex items-center gap-1 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-navy-900" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(e._id)}
                    disabled={deletingId === e._id}
                    className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs transition disabled:opacity-50"
                    title="Delete Event"
                  >
                    {deletingId === e._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Tournament Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-black text-navy-950 text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-saffron-500" /> Add New Tournament / Event
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">{error}</div>}

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tournament Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 1st Rajasthan State Aeroskatoball Championship 2026"
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive event details, selection trial criteria, age groups, etc."
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Venue Stadium / Arena <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g. Bharatpur District Sports Complex"
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    District <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Bharatpur"
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Discipline / Category</label>
                <input
                  type="text"
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  placeholder="e.g. Speed & Team Aeroskatoball"
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Banner Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Brochure PDF URL (Optional)</label>
                <input
                  type="text"
                  value={brochureUrl}
                  onChange={(e) => setBrochureUrl(e.target.value)}
                  placeholder="https://... or /uploads/circulars/..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-saffron-500 hover:bg-saffron-600 text-white rounded-lg font-bold flex items-center gap-1.5 disabled:opacity-50 shadow"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Create Tournament
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Tournament Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-black text-navy-950 text-base flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-saffron-500" /> Edit Tournament / Event
              </h3>
              <button onClick={() => setEditingEvent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
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
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={editStartDate}
                    onChange={(e) => setEditStartDate(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={editEndDate}
                    onChange={(e) => setEditEndDate(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Venue</label>
                  <input
                    type="text"
                    value={editVenue}
                    onChange={(e) => setEditVenue(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">District</label>
                  <input
                    type="text"
                    value={editDistrict}
                    onChange={(e) => setEditDistrict(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Discipline</label>
                <input
                  type="text"
                  value={editDiscipline}
                  onChange={(e) => setEditDiscipline(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Replace Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditImageFile(e.target.files?.[0] || null)}
                  className="w-full p-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-5 py-2 bg-saffron-500 hover:bg-saffron-600 text-white rounded-lg font-bold flex items-center gap-1.5 disabled:opacity-50 shadow"
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
