"use client";

import { useState } from "react";
import { Users, Plus, Phone, Mail, Award, Edit, Trash2, Search, X, Save } from "lucide-react";

const initialLeaders = [
  {
    _id: "1",
    name: "Shri Rajendra Singh Rathore",
    designation: "President",
    district: "Jaipur",
    phone: "+91 94141 00001",
    email: "president@rajasthanaeroskatoball.org",
    since: "2022",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop",
  },
  {
    _id: "2",
    name: "Dr. Priya Sharma",
    designation: "Secretary General",
    district: "Jodhpur",
    phone: "+91 94141 00002",
    email: "secretary@rajasthanaeroskatoball.org",
    since: "2022",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop",
  },
  {
    _id: "3",
    name: "Shri Mukesh Verma",
    designation: "Treasurer",
    district: "Udaipur",
    phone: "+91 94141 00003",
    email: "treasurer@rajasthanaeroskatoball.org",
    since: "2023",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
  },
  {
    _id: "4",
    name: "Smt. Kavita Meena",
    designation: "Vice President (Women's Wing)",
    district: "Kota",
    phone: "+91 94141 00004",
    email: "vp.women@rajasthanaeroskatoball.org",
    since: "2022",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop",
  },
  {
    _id: "5",
    name: "Shri Arjun Bhati",
    designation: "Joint Secretary",
    district: "Ajmer",
    phone: "+91 94141 00005",
    email: "jsec@rajasthanaeroskatoball.org",
    since: "2023",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
  },
];

const EMPTY_FORM = {
  name: "",
  designation: "",
  district: "",
  phone: "",
  email: "",
  since: String(new Date().getFullYear()),
  photo: "",
};

export default function AdminLeadersPage() {
  const [leaders, setLeaders] = useState(initialLeaders);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  const filtered = leaders.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.designation.toLowerCase().includes(search.toLowerCase()) ||
      l.district.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditId(null);
    setForm({ ...EMPTY_FORM });
    setShowModal(true);
  };

  const openEdit = (l: typeof initialLeaders[0]) => {
    setEditId(l._id);
    setForm({
      name: l.name,
      designation: l.designation,
      district: l.district,
      phone: l.phone,
      email: l.email,
      since: l.since,
      photo: l.photo,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Remove this leader from the committee?")) {
      setLeaders((prev) => prev.filter((l) => l._id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setLeaders((prev) =>
        prev.map((l) => (l._id === editId ? { ...l, ...form } : l))
      );
    } else {
      setLeaders((prev) => [
        {
          _id: String(Date.now()),
          ...form,
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
          <h1 className="text-2xl font-black text-[#0A3D91]">Association Leaders</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage executive committee members and office bearers
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-[#F57C00] hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Add Leader
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Leaders", value: leaders.length, color: "bg-blue-50 text-blue-700" },
          { label: "Executive Committee", value: 12, color: "bg-orange-50 text-orange-700" },
          { label: "Districts Represented", value: 18, color: "bg-green-50 text-green-700" },
          { label: "Women Members", value: 4, color: "bg-purple-50 text-purple-700" },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-xl p-4 ${stat.color} border border-current/10`}>
            <p className="text-2xl font-black">{stat.value}</p>
            <p className="text-xs font-semibold mt-0.5 opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search leaders by name, designation or district..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0A3D91] focus:outline-none bg-white"
        />
      </div>

      {/* Leaders List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <Users className="w-5 h-5 text-[#F57C00]" />
          <span className="font-bold text-[#0A3D91]">Executive Committee Members</span>
          <span className="ml-auto text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
            {filtered.length} members
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm">No leaders found.</div>
          )}
          {filtered.map((leader) => (
            <div
              key={leader._id}
              className="flex items-center gap-4 p-4 hover:bg-slate-50 transition group"
            >
              {/* Avatar */}
              <img
                src={leader.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&background=0A3D91&color=fff`}
                alt={leader.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#F57C00]/30 shrink-0"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 text-sm truncate">{leader.name}</p>
                <p className="text-xs text-[#F57C00] font-semibold flex items-center gap-1 mt-0.5">
                  <Award className="w-3 h-3" />
                  {leader.designation}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {leader.phone}
                  </span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1 hidden sm:flex">
                    <Mail className="w-3 h-3" />
                    {leader.email}
                  </span>
                </div>
              </div>

              {/* District & Since */}
              <div className="hidden sm:flex flex-col items-end gap-1">
                <span className="text-xs bg-blue-50 text-[#0A3D91] border border-blue-200 px-2 py-0.5 rounded-full font-semibold">
                  {leader.district}
                </span>
                <span className="text-[10px] text-slate-400">Since {leader.since}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  title="Edit Leader"
                  onClick={() => openEdit(leader)}
                  className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  title="Delete Leader"
                  onClick={() => handleDelete(leader._id)}
                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-5 bg-[#0A3D91] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <h3 className="font-black text-sm">{editId ? "Edit Leader" : "Add New Leader"}</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-white hover:text-orange-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Shri Rajendra Singh Rathore"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#0A3D91] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    placeholder="e.g. President"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#0A3D91] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">District *</label>
                  <input
                    type="text"
                    required
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    placeholder="e.g. Jaipur"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#0A3D91] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#0A3D91] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Since (Year)</label>
                  <input
                    type="number"
                    min="2000"
                    max="2030"
                    value={form.since}
                    onChange={(e) => setForm({ ...form, since: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#0A3D91] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="leader@rajasthanaeroskatoball.org"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#0A3D91] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Photo URL</label>
                <input
                  type="url"
                  value={form.photo}
                  onChange={(e) => setForm({ ...form, photo: e.target.value })}
                  placeholder="https://example.com/photo.jpg (optional)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-[#0A3D91] focus:outline-none"
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
                  {editId ? "Save Changes" : "Add Leader"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
