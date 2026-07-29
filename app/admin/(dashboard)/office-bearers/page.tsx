import connectDB from "@/lib/db";
import { OfficeBearer } from "@/models";
import { Users, Mail, Phone } from "lucide-react";

export const revalidate = 0;

export default async function AdminOfficeBearersManager() {
  await connectDB();
  const bearers = await OfficeBearer.find().sort({ order: 1 }).lean();

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-navy-950">Office Bearers Manager</h1>
          <p className="text-xs text-slate-500">
            Manage President, General Secretary, Treasurer, Executive Committee and District Coordinators.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-navy-900 text-white uppercase font-bold text-[11px]">
            <tr>
              <th className="p-3.5">Name</th>
              <th className="p-3.5">Designation</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">District</th>
              <th className="p-3.5">Phone</th>
              <th className="p-3.5">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bearers.map((b: any) => (
              <tr key={b._id.toString()} className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-navy-950">{b.name}</td>
                <td className="p-3.5 font-semibold">{b.designation}</td>
                <td className="p-3.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    b.category === "Key Bearer" ? "bg-saffron-100 text-saffron-800" : "bg-slate-100 text-slate-700"
                  }`}>
                    {b.category}
                  </span>
                </td>
                <td className="p-3.5 text-slate-500">{b.district || "—"}</td>
                <td className="p-3.5">{b.phone || "—"}</td>
                <td className="p-3.5 text-saffron-600">{b.email || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
