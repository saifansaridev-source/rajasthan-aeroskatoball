import connectDB from "@/lib/db";
import { Academy, DistrictAssociation } from "@/models";
import { Building2, MapPin } from "lucide-react";

export const revalidate = 0;

export default async function AdminAcademiesManager() {
  await connectDB();
  const [academies, districts] = await Promise.all([
    Academy.find().sort({ createdAt: -1 }).lean(),
    DistrictAssociation.find().sort({ districtName: 1 }).lean(),
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-black text-navy-950">Academies & District Units Manager</h1>
        <p className="text-xs text-slate-500">
          Manage affiliated training academies, district association contacts, and head coach directory.
        </p>
      </div>

      {/* Academies Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-saffron-500" />
          <h2 className="font-bold text-navy-900 text-sm">Affiliated Academies ({academies.length})</h2>
        </div>
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-navy-900 text-white uppercase font-bold text-[11px]">
            <tr>
              <th className="p-3.5">Academy Name</th>
              <th className="p-3.5">District</th>
              <th className="p-3.5">Head Coach</th>
              <th className="p-3.5">Phone</th>
              <th className="p-3.5">Email</th>
              <th className="p-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {academies.map((ac: any) => (
              <tr key={ac._id.toString()} className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-navy-950">{ac.name}</td>
                <td className="p-3.5 font-semibold text-slate-700">{ac.district}</td>
                <td className="p-3.5">{ac.coachName}</td>
                <td className="p-3.5">{ac.phone}</td>
                <td className="p-3.5 text-saffron-600 font-medium">{ac.email || "—"}</td>
                <td className="p-3.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ac.isApproved ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"}`}>
                    {ac.isApproved ? "APPROVED" : "PENDING"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* District Associations Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-saffron-500" />
          <h2 className="font-bold text-navy-900 text-sm">District Associations ({districts.length})</h2>
        </div>
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-navy-900 text-white uppercase font-bold text-[11px]">
            <tr>
              <th className="p-3.5">District Association</th>
              <th className="p-3.5">Secretary Name</th>
              <th className="p-3.5">Designation</th>
              <th className="p-3.5">Phone</th>
              <th className="p-3.5">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {districts.map((d: any) => (
              <tr key={d._id.toString()} className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-navy-950">{d.districtName}</td>
                <td className="p-3.5 font-semibold text-slate-800">{d.contactPerson}</td>
                <td className="p-3.5">{d.designation}</td>
                <td className="p-3.5">{d.phone}</td>
                <td className="p-3.5 text-saffron-600 font-medium">{d.email || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
