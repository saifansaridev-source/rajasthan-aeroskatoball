"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX, 
  Search, 
  User, 
  MapPin, 
  Calendar, 
  Phone, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle,
  Award,
  Download,
  Building2
} from "lucide-react";
import { initialRegistrations, IRegistrationData } from "@/lib/data-store";
import { jsPDF } from "jspdf";

function VerifyContent() {
  const searchParams = useSearchParams();
  const regParam = searchParams.get("reg") || searchParams.get("search") || "";
  
  const [searchInput, setSearchInput] = useState(regParam);
  const [activeRecord, setActiveRecord] = useState<IRegistrationData | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (regParam) {
      handleSearch(regParam);
    }
  }, [regParam]);

  const handleSearch = (query: string) => {
    setSearched(true);
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setActiveRecord(null);
      return;
    }

    const found = initialRegistrations.find(
      (r) =>
        r.regNo.toLowerCase() === trimmed ||
        r.name.toLowerCase().includes(trimmed) ||
        r.email.toLowerCase().includes(trimmed) ||
        r.phone.includes(trimmed)
    );

    setActiveRecord(found || null);
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchInput);
  };

  // Download ID Card as PDF
  const downloadIDCardPDF = (rec: IRegistrationData) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [85.6, 120],
    });

    // Front Side
    doc.setFillColor(10, 61, 145);
    doc.rect(0, 0, 85.6, 26, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("RAJASTHAN AEROSKATOBALL", 42.8, 8, { align: "center" });
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.text("ASSOCIATION (AFFILIATED TO AFI)", 42.8, 12, { align: "center" });

    // Category banner
    doc.setFillColor(245, 124, 0);
    doc.rect(0, 18, 85.6, 6, "F");
    doc.setFontSize(6.5);
    doc.setFont("helvetica", "bold");
    doc.text(`OFFICIAL DIGITAL ID PASS - ${rec.type}`, 42.8, 22.5, { align: "center" });

    // Photo Box
    doc.setFillColor(240, 240, 240);
    doc.rect(8, 28, 24, 30, "F");
    doc.setFontSize(6);
    doc.setTextColor(100, 100, 100);
    doc.text("PHOTO", 20, 44, { align: "center" });

    // Details beside photo
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.text(rec.name, 36, 33);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.text(`Reg No: ${rec.regNo}`, 36, 38);
    doc.text(`District: ${rec.district}`, 36, 43);
    doc.text(`Valid Till: ${rec.validUntil}`, 36, 48);
    doc.text(`Status: ${rec.status}`, 36, 53);

    // QR Box
    doc.setDrawColor(10, 61, 145);
    doc.rect(28, 64, 28, 28);
    doc.setFontSize(5.5);
    doc.text("QR SECURE CODE", 42, 79, { align: "center" });

    // Footer
    doc.setFontSize(5);
    doc.setTextColor(120, 120, 120);
    doc.text("Scan QR to verify state credentials online at rajasthanaeroskatoball.org", 42.8, 100, { align: "center" });
    doc.setFont("helvetica", "bold");
    doc.setTextColor(10, 61, 145);
    doc.text("Authorized State Secretary", 42.8, 110, { align: "center" });

    doc.save(`${rec.regNo}_ID_Card.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Verification Hero Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A3D91] to-[#F57C00] text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
            <QrCode className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-[#0A3D91] tracking-tight">
            Official <span className="text-[#F57C00]">Digital ID</span> & Member Verification
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-lg mx-auto">
            Public verification portal for players, coaches, district officials, and referees of Rajasthan Aeroskatoball Association.
          </p>
        </div>

        {/* Search / Scan Input Box */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 mb-8">
          <form onSubmit={onSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Registration No (e.g. RAA-PLY-2026-0042) or Name..."
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#0A3D91] hover:bg-[#083279] text-white px-8 py-3.5 rounded-2xl text-xs font-bold shadow-md transition"
            >
              Verify Credentials
            </button>
          </form>

          <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-500">
            <span>Quick Samples:</span>
            <button
              onClick={() => {
                setSearchInput("RAA-PLY-2026-0042");
                handleSearch("RAA-PLY-2026-0042");
              }}
              className="font-mono text-[#0A3D91] font-bold hover:underline"
            >
              RAA-PLY-2026-0042
            </button>
            <span>&bull;</span>
            <button
              onClick={() => {
                setSearchInput("RAA-COA-2026-0012");
                handleSearch("RAA-COA-2026-0012");
              }}
              className="font-mono text-[#0A3D91] font-bold hover:underline"
            >
              RAA-COA-2026-0012
            </button>
            <span>&bull;</span>
            <button
              onClick={() => {
                setSearchInput("RAA-DST-2026-0001");
                handleSearch("RAA-DST-2026-0001");
              }}
              className="font-mono text-[#0A3D91] font-bold hover:underline"
            >
              RAA-DST-2026-0001
            </button>
          </div>
        </div>

        {/* VERIFICATION RESULTS DISPLAY */}
        {searched && !activeRecord && (
          <div className="bg-white rounded-3xl p-10 text-center shadow-lg border border-slate-100 space-y-3">
            <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No Verified Member Record Found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              The entered registration number or query could not be verified in the state database. Please check the spelling or contact RAA helpline at <strong>+91 8504092852</strong>.
            </p>
          </div>
        )}

        {activeRecord && (
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in duration-300">
            
            {/* Top Status Banner */}
            <div className={`p-5 text-white flex flex-wrap items-center justify-between gap-4 ${
              activeRecord.status === "APPROVED" ? "bg-emerald-700" :
              activeRecord.status === "SUSPENDED" ? "bg-rose-700" :
              activeRecord.status === "EXPIRED" ? "bg-amber-700" :
              "bg-[#0A3D91]"
            }`}>
              <div className="flex items-center gap-3">
                {activeRecord.status === "APPROVED" ? (
                  <ShieldCheck className="w-8 h-8 text-emerald-200" />
                ) : activeRecord.status === "SUSPENDED" ? (
                  <ShieldX className="w-8 h-8 text-rose-200" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-amber-200" />
                )}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider block opacity-90">
                    Official Verification Result
                  </span>
                  <h3 className="text-lg font-black leading-tight">
                    {activeRecord.status === "APPROVED" ? "VERIFIED & ACTIVE MEMBER" :
                     activeRecord.status === "SUSPENDED" ? "MEMBER TEMPORARILY SUSPENDED" :
                     activeRecord.status === "EXPIRED" ? "MEMBERSHIP EXPIRED (RENEWAL DUE)" :
                     "APPLICATION PENDING APPROVAL"}
                  </h3>
                </div>
              </div>

              <div className="bg-white/20 px-3 py-1 rounded-xl text-xs font-mono font-bold">
                {activeRecord.regNo}
              </div>
            </div>

            {/* Member Details Body */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Photo & Badge */}
                <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
                  <div className="w-36 h-44 rounded-2xl overflow-hidden shadow-lg border-2 border-[#0A3D91] bg-slate-100 relative">
                    <img
                      src={activeRecord.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"}
                      alt={activeRecord.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold py-1">
                      {activeRecord.type} PASS
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-tight">{activeRecord.name}</h3>
                    <span className="text-xs font-bold text-[#F57C00]">{activeRecord.type}</span>
                  </div>

                  <button
                    onClick={() => downloadIDCardPDF(activeRecord)}
                    className="inline-flex items-center gap-1.5 bg-[#0A3D91] hover:bg-[#083279] text-white px-4 py-2 rounded-xl text-xs font-bold shadow transition"
                  >
                    <Download className="w-3.5 h-3.5 text-[#F57C00]" />
                    <span>Download ID Card PDF</span>
                  </button>
                </div>

                {/* Information Grid */}
                <div className="md:col-span-8 space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0A3D91] border-b border-slate-100 pb-2">
                    Federation Credentials
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Registration Number</span>
                      <span className="font-mono font-bold text-slate-900">{activeRecord.regNo}</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">District Affiliation</span>
                      <span className="font-bold text-slate-900">{activeRecord.district}, Rajasthan</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Membership Validity</span>
                      <span className="font-bold text-emerald-700">Valid until {activeRecord.validUntil}</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Clearance</span>
                      <span className="font-bold text-slate-900">
                        {activeRecord.paymentStatus} ({activeRecord.paymentTxnId || "COMPLIANT"})
                      </span>
                    </div>
                  </div>

                  {/* Role Specific Additional Details */}
                  {activeRecord.type === "PLAYER" && (
                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-1 text-xs text-slate-700">
                      <div><strong>Affiliated Club:</strong> {activeRecord.club || "N/A"}</div>
                      <div><strong>Assigned Coach:</strong> {activeRecord.coach || "N/A"}</div>
                      <div><strong>Category / Level:</strong> {activeRecord.ageCategory} &bull; {activeRecord.playingCategory}</div>
                      <div><strong>Achievements:</strong> {activeRecord.achievements || "State Registered Competitor"}</div>
                    </div>
                  )}

                  {activeRecord.type === "COACH" && (
                    <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 space-y-1 text-xs text-slate-700">
                      <div><strong>Certification Level:</strong> {activeRecord.coachingLevel}</div>
                      <div><strong>Qualification:</strong> {activeRecord.qualification}</div>
                      <div><strong>Academy Base:</strong> {activeRecord.academy}</div>
                    </div>
                  )}

                  {activeRecord.type === "DISTRICT" && (
                    <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-1 text-xs text-slate-700">
                      <div><strong>District Unit:</strong> {activeRecord.associationName}</div>
                      <div><strong>President:</strong> {activeRecord.presidentName} ({activeRecord.presidentContact})</div>
                      <div><strong>Secretary:</strong> {activeRecord.secretaryName} ({activeRecord.secretaryContact})</div>
                    </div>
                  )}

                  {/* Suspension details banner if suspended */}
                  {activeRecord.status === "SUSPENDED" && activeRecord.suspension && (
                    <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-800 space-y-1">
                      <div className="font-bold uppercase text-[10px] text-rose-900">Disciplinary Suspension Notice</div>
                      <div><strong>Reason:</strong> {activeRecord.suspension.reason}</div>
                      <div><strong>Period:</strong> {activeRecord.suspension.from} to {activeRecord.suspension.till}</div>
                      <div><strong>Remarks:</strong> {activeRecord.suspension.remarks}</div>
                    </div>
                  )}

                </div>

              </div>
            </div>

            {/* Bottom Verification Seal */}
            <div className="bg-slate-50 p-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Cryptographically Authenticated State Record
              </span>
              <span>Rajasthan Aeroskatoball Association &bull; AFI Recognized</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-[#0A3D91] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-600">Loading verification portal...</p>
        </div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
