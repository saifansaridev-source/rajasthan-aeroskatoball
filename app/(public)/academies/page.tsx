import connectDB from "@/lib/db";
import { Academy, DistrictAssociation } from "@/models";
import { Building2, MapPin, Phone, Mail, ShieldCheck } from "lucide-react";

export const revalidate = 600;

export default async function AcademiesPage() {
  await connectDB();
  const [academies, districts] = await Promise.all([
    Academy.find({ isApproved: true }).sort({ name: 1 }).lean(),
    DistrictAssociation.find().sort({ districtName: 1 }).lean(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">Affiliated Network</span>
        <h1 className="text-3xl font-black text-navy-950">Academies & District Association Directory</h1>
        <p className="text-xs text-slate-500">
          State-accredited Aeroskatoball training centers and authorized district unit secretaries.
        </p>
      </div>

      {/* Academies Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2 border-b border-slate-200 pb-2">
          <Building2 className="w-5 h-5 text-saffron-500" /> Recognized Training Academies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academies.map((ac: any) => (
            <div key={ac._id.toString()} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-6 space-y-4 hover:border-saffron-500 transition">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-saffron-100 text-saffron-800 px-2 py-0.5 rounded">
                  {ac.district}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" /> AFFILIATED
                </span>
              </div>
              <div>
                <h3 className="font-bold text-navy-950 text-base">{ac.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-saffron-500 shrink-0" /> {ac.address}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="font-semibold text-navy-900">Head Coach: {ac.coachName}</div>
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-saffron-500" /> {ac.phone}</div>
                {ac.email && <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-saffron-500" /> {ac.email}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* District Associations Table */}
      <div className="space-y-6 pt-6">
        <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2 border-b border-slate-200 pb-2">
          <MapPin className="w-5 h-5 text-saffron-500" /> District Associations Contacts
        </h2>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-navy-950 text-white uppercase font-bold text-[11px]">
              <tr>
                <th className="p-4">District Unit</th>
                <th className="p-4">Secretary Name</th>
                <th className="p-4">Designation</th>
                <th className="p-4">Contact Phone</th>
                <th className="p-4">Email Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {districts.map((d: any) => (
                <tr key={d._id.toString()} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-navy-950">{d.districtName}</td>
                  <td className="p-4 font-semibold text-slate-800">{d.contactPerson}</td>
                  <td className="p-4 text-slate-500">{d.designation}</td>
                  <td className="p-4 font-mono">{d.phone}</td>
                  <td className="p-4 text-saffron-600 font-medium">{d.email || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
