import connectDB from "@/lib/db";
import { OfficeBearer } from "@/models";
import { Mail, Phone, MapPin, Award } from "lucide-react";

export const revalidate = 3600;

export default async function OfficeBearersPage() {
  await connectDB();
  const bearers = await OfficeBearer.find().sort({ order: 1 }).lean();

  const keyBearers = bearers.filter((b: any) => b.category === "Key Bearer");
  const districtCoordinators = bearers.filter((b: any) => b.category === "District Coordinator");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">Executive Leadership</span>
        <h1 className="text-3xl font-black text-navy-950">Office Bearers & State Council</h1>
        <p className="text-xs text-slate-500">
          Dedicated administrative team governing Aeroskatoball development and operations across Rajasthan.
        </p>
      </div>

      {/* Key Bearers Cards */}
      <div>
        <h2 className="text-lg font-black text-navy-950 mb-6 flex items-center gap-2 border-b border-slate-200 pb-2">
          <Award className="w-5 h-5 text-saffron-500" /> Executive Committee
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {keyBearers.map((b: any) => (
            <div key={b._id.toString()} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition group">
              <div className="h-64 bg-slate-100 relative overflow-hidden">
                {b.photo ? (
                  <img src={b.photo} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                ) : (
                  <div className="w-full h-full bg-navy-900 flex items-center justify-center text-white font-bold text-xl">
                    {b.name}
                  </div>
                )}
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-saffron-100 text-saffron-800 px-2 py-0.5 rounded">
                  {b.designation}
                </span>
                <h3 className="font-bold text-navy-950 text-base">{b.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{b.bio || "Member of the State Sports Executive Committee."}</p>

                <div className="pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                  {b.phone && <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-saffron-500" /> {b.phone}</div>}
                  {b.email && <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-saffron-500" /> {b.email}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* District Coordinators Table */}
      <div>
        <h2 className="text-lg font-black text-navy-950 mb-6 flex items-center gap-2 border-b border-slate-200 pb-2">
          <MapPin className="w-5 h-5 text-saffron-500" /> District Coordinators
        </h2>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-navy-950 text-white uppercase font-bold text-[11px]">
              <tr>
                <th className="p-4">District</th>
                <th className="p-4">Coordinator Name</th>
                <th className="p-4">Designation</th>
                <th className="p-4">Contact Phone</th>
                <th className="p-4">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {districtCoordinators.map((b: any) => (
                <tr key={b._id.toString()} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-navy-950">{b.district || "State Representative"}</td>
                  <td className="p-4 font-semibold text-slate-800">{b.name}</td>
                  <td className="p-4 text-slate-500">{b.designation}</td>
                  <td className="p-4 font-mono">{b.phone || "—"}</td>
                  <td className="p-4 text-saffron-600 font-medium">{b.email || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
