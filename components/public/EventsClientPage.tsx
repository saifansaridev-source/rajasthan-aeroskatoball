"use client";

import { useState } from "react";
import EventCard from "@/components/public/EventCard";
import BackButton from "@/components/public/BackButton";
import { Search, Calendar, MapPin, Trophy, Sparkles, Filter, Award } from "lucide-react";

export interface EventItem {
  _id: string;
  title: string;
  description: string;
  image?: string;
  startDate: string;
  endDate?: string;
  venue: string;
  district: string;
  discipline?: string;
  brochureUrl?: string | null;
}

export default function EventsClientPage({ initialEvents }: { initialEvents: EventItem[] }) {
  const defaultEvents: EventItem[] = [
    {
      _id: "evt-1",
      title: "5th Rajasthan State Aeroskatoball Championship 2026",
      description: "Official state championship for Junior & Senior divisions. Gold medalists represent Rajasthan in National Championships.",
      startDate: "2026-09-15",
      endDate: "2026-09-18",
      venue: "Sawai Mansingh Indoor Stadium",
      district: "Jaipur",
      discipline: "Championships 🏆",
      image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=800&auto=format&fit=crop",
      brochureUrl: "#"
    },
    {
      _id: "evt-2",
      title: "All-Rajasthan Sub-Junior Selection Trial & Speed Cup",
      description: "Official selection trial for Sub-Junior athletes under 14 years across all 33 districts of Rajasthan.",
      startDate: "2026-10-02",
      endDate: "2026-10-04",
      venue: "Maharana Pratap Sports Complex",
      district: "Udaipur",
      discipline: "Selection Trials 🎯",
      image: "https://images.unsplash.com/photo-1517649763962-0c623266010b?q=80&w=800&auto=format&fit=crop",
      brochureUrl: "#"
    },
    {
      _id: "evt-3",
      title: "Western Zone Inter-District Aeroskatoball Cup",
      description: "Inter-district league championship bringing together top district teams from Western Rajasthan.",
      startDate: "2026-11-10",
      endDate: "2026-11-12",
      venue: "Barkatullah Khan Stadium Complex",
      district: "Jodhpur",
      discipline: "Inter-District ⚡",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop",
      brochureUrl: "#"
    },
    {
      _id: "evt-4",
      title: "Rajasthan Youth Aeroskatoball Development League",
      description: "Grassroots development tournament focused on school and college athletes aged 12-18.",
      startDate: "2026-12-01",
      endDate: "2026-12-03",
      venue: "MBS Sports Complex",
      district: "Kota",
      discipline: "Championships 🏆",
      image: "https://images.unsplash.com/photo-1565992441121-4367c2967103?q=80&w=800&auto=format&fit=crop",
      brochureUrl: "#"
    },
    {
      _id: "evt-5",
      title: "State Level Referees & Coaches Accreditation Clinic",
      description: "Official certification camp for state referees, judges, and technical delegates.",
      startDate: "2026-12-15",
      endDate: "2026-12-17",
      venue: "Patel Stadium Complex",
      district: "Ajmer",
      discipline: "Coaching Camp 🏋️",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
      brochureUrl: "#"
    },
    {
      _id: "evt-6",
      title: "Desert Region Aeroskatoball Speed Trophy",
      description: "Annual desert region invitational cup featuring fast-paced speed and aerial skatoball drills.",
      startDate: "2027-01-08",
      endDate: "2027-01-10",
      venue: "Karni Singh Stadium Complex",
      district: "Bikaner",
      discipline: "Inter-District ⚡",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
      brochureUrl: "#"
    }
  ];

  const eventsList = initialEvents.length > 0 ? initialEvents : defaultEvents;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  const disciplines = ["All", "Championships 🏆", "Selection Trials 🎯", "Inter-District ⚡", "Coaching Camp 🏋️"];
  const districts = ["All", "Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner"];

  const filteredEvents = eventsList.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDiscipline =
      selectedDiscipline === "All" ||
      (event.discipline && event.discipline.includes(selectedDiscipline.split(" ")[0]));

    const matchesDistrict = selectedDistrict === "All" || event.district.toLowerCase() === selectedDistrict.toLowerCase();

    return matchesSearch && matchesDiscipline && matchesDistrict;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <BackButton />

      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-navy-950 text-white p-8 md:p-12 shadow-xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-saffron-500/20 text-saffron-400 border border-saffron-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> State Championship Calendar 2026-27
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Tournaments, Trials & Championships
          </h1>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Explore official state championships, district selection trials, and technical coaching camps organized by the Rajasthan Aeroskatoball Association.
          </p>
        </div>
      </div>

      {/* Stats Counter Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-saffron-50 rounded-xl text-saffron-600">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-navy-950">{eventsList.length}</p>
            <p className="text-[11px] font-semibold text-slate-500">Total Tournaments</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-navy-950">33</p>
            <p className="text-[11px] font-semibold text-slate-500">Districts Participating</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-navy-950">4</p>
            <p className="text-[11px] font-semibold text-slate-500">Selection Trials</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-navy-950">6+</p>
            <p className="text-[11px] font-semibold text-slate-500">Host Cities</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tournament, venue, or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-saffron-500 outline-hidden transition"
            />
          </div>

          {/* District Filter Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="text-xs font-bold text-slate-700 shrink-0">District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-hidden cursor-pointer"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d === "All" ? "All Rajasthan Districts" : d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Discipline Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
          <span className="text-xs font-bold text-slate-500 mr-2">Category:</span>
          {disciplines.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedDiscipline(category)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedDiscipline === category
                  ? "bg-saffron-500 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center text-slate-500 text-xs bg-white rounded-2xl border border-slate-200 space-y-2">
          <p className="text-sm font-bold text-navy-950">No matching tournaments found</p>
          <p className="text-xs text-slate-400">Try adjusting your search terms or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
