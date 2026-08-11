import { Users, Plus, Phone, Mail, Award, Edit, Trash2, Search } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

const sampleLeaders = [
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

export default async function AdminLeadersPage() {
  const leaders = sampleLeaders;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-950">Association Leaders</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage executive committee members and office bearers
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-lg shadow-saffron-500/20">
          <Plus className="w-4 h-4" />
          Add Leader
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Leaders", value: leaders.length, color: "bg-blue-50 text-blue-700" },
          { label: "Executive Committee", value: 12, color: "bg-saffron-50 text-saffron-700" },
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
          placeholder="Search leaders by name, designation or district..."
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-saffron-500 focus:outline-none bg-white"
        />
      </div>

      {/* Leaders List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <Users className="w-5 h-5 text-saffron-500" />
          <span className="font-bold text-navy-950">Executive Committee Members</span>
          <span className="ml-auto text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
            {leaders.length} members
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {leaders.map((leader) => (
            <div
              key={leader._id}
              className="flex items-center gap-4 p-4 hover:bg-slate-50 transition group"
            >
              {/* Avatar */}
              <img
                src={leader.photo}
                alt={leader.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-saffron-200 shrink-0"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-navy-950 text-sm truncate">{leader.name}</p>
                <p className="text-xs text-saffron-600 font-semibold flex items-center gap-1 mt-0.5">
                  <Award className="w-3 h-3" />
                  {leader.designation}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {leader.phone}
                  </span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {leader.email}
                  </span>
                </div>
              </div>

              {/* District & Since */}
              <div className="hidden sm:flex flex-col items-end gap-1">
                <span className="text-xs bg-navy-50 text-navy-700 border border-navy-200 px-2 py-0.5 rounded-full font-semibold">
                  {leader.district}
                </span>
                <span className="text-[10px] text-slate-400">Since {leader.since}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  title="Edit Leader"
                  className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  title="Delete Leader"
                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-700 flex items-start gap-3">
        <Users className="w-4 h-4 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold mb-1">Leaders Management</p>
          <p>
            This section manages association executive committee members displayed on the public
            website. Connect your MongoDB database to manage live data. Currently showing sample
            preview data.
          </p>
        </div>
      </div>
    </div>
  );
}
