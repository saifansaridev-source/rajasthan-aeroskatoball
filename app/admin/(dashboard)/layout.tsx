import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-800">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-xs">
          <div>
            <h2 className="text-lg font-bold text-navy-950">Management Dashboard</h2>
            <p className="text-xs text-slate-500">Rajasthan Aeroskatoball Association Administration</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> System Online
            </span>
          </div>
        </header>
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
