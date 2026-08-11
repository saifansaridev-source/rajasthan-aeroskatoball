import BackButton from "@/components/public/BackButton";
import { Users } from "lucide-react";

export const metadata = {
  title: "Association Leaders | Rajasthan Aeroskatoball Association",
  description:
    "Meet the key office bearers, executive committee members, and district coordinators of the Rajasthan Aeroskatoball Association.",
};

// ─── EDIT THIS DATA DIRECTLY WITH REAL NAMES / PHOTOS / DESIGNATIONS ──────────
const leaders = [
  {
    name: "Rajeshwar Singh Rathore",
    designation: "President",
    category: "Key Bearer",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    bio: "Former National Athlete & Advocate for Grassroots Sports Infrastructure in Rajasthan.",
  },
  {
    name: "Dr. Surendra Kumar Sharma",
    designation: "General Secretary",
    category: "Key Bearer",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    bio: "Sports Administrator and promoter of modern skating disciplines across western India.",
  },
  {
    name: "Anita Verma",
    designation: "Treasurer",
    category: "Key Bearer",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    bio: "Chartered Accountant overseeing financial transparency and athlete development grants.",
  },
  {
    name: "Vikas Choudhary",
    designation: "District Coordinator — Bharatpur",
    category: "District Coordinator",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    bio: "Coordinating Aeroskatoball outreach and academy partnerships across Bharatpur district.",
  },
  {
    name: "Mahendra Singh",
    designation: "District Coordinator — Jaipur",
    category: "District Coordinator",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    bio: "Leading athlete development initiatives in Jaipur and surrounding districts.",
  },
  {
    name: "Sujata Shekhawat",
    designation: "District Coordinator — Jodhpur",
    category: "District Coordinator",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    bio: "Women's sports champion and coordinator for Jodhpur's district aeroskatoball programs.",
  },
];
// ──────────────────────────────────────────────────────────────────────────────

const categories = Array.from(new Set(leaders.map((l) => l.category)));

export default function LeadersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Back Navigation */}
      <BackButton />

      {/* Page Header */}
      <div className="bg-navy-950 text-white rounded-3xl p-8 md:p-12 border-t-4 border-saffron-500 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-saffron-500/20 text-saffron-400 font-bold text-xs px-3 py-1 rounded-full border border-saffron-500/30">
            <Users className="w-3.5 h-3.5" /> Association Leadership
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            Our Leaders
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
            Meet the dedicated office bearers, executive committee members, and district
            coordinators steering the growth of Aeroskatoball across Rajasthan.
          </p>
        </div>
      </div>

      {/* Leaders grouped by category */}
      {categories.map((category) => (
        <section key={category} className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
            <span className="w-3 h-3 rounded-full bg-saffron-500 shrink-0" />
            <h2 className="text-xl font-black text-navy-950">{category}s</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders
              .filter((l) => l.category === category)
              .map((leader) => (
                <div
                  key={leader.name}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition group flex flex-col"
                >
                  {/* Photo */}
                  <div className="h-56 overflow-hidden bg-slate-200 relative">
                    <img
                      src={leader.photo}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <span className="text-[10px] font-bold text-saffron-400 uppercase tracking-wider">
                        {leader.category}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-black text-navy-950 text-base leading-snug">
                        {leader.name}
                      </h3>
                      <p className="text-xs font-bold text-saffron-600 mt-0.5">
                        {leader.designation}
                      </p>
                    </div>
                    {leader.bio && (
                      <p className="text-xs text-slate-500 leading-relaxed mt-2">
                        {leader.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
