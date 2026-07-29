"use client";

import { useState } from "react";
import { Search, ShieldCheck, CheckCircle2, XCircle, User, Award, Calendar } from "lucide-react";

export default function VerifyPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/verify?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResult(data.found ? data : null);
    } catch (err) {
      console.error(err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-saffron-600">Verification Portal</span>
        <h1 className="text-3xl font-black text-navy-950">Verify Player / Certificate Identity</h1>
        <p className="text-xs text-slate-500">
          Enter official Registration Number (e.g. <span className="font-mono text-saffron-600 font-bold">RAJ-AERO-2026-001</span>) to check affiliation authenticity.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Enter Reg Number (e.g. RAJ-AERO-2026-001)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-saffron-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-saffron-500 hover:bg-saffron-600 disabled:opacity-50 text-white font-bold text-sm px-8 py-3 rounded-xl transition flex items-center justify-center gap-2"
        >
          {loading ? "Verifying..." : "Verify Certificate"}
        </button>
      </form>

      {/* Results Display */}
      {searched && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          {result ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5" /> VERIFIED OFFICIAL REGISTRATION
                </div>
                <span className="text-xs font-mono text-slate-400">RAJ-STATE-REG</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-3">
                  <div>
                    <label className="text-slate-400 font-medium block">Registration Number</label>
                    <p className="font-mono font-bold text-navy-950 text-base">{result.data.regNumber}</p>
                  </div>
                  <div>
                    <label className="text-slate-400 font-medium block">Applicant Name</label>
                    <p className="font-bold text-navy-950 text-sm">{result.data.name || result.data.applicantName}</p>
                  </div>
                  <div>
                    <label className="text-slate-400 font-medium block">District</label>
                    <p className="font-semibold text-slate-800">{result.data.district}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-slate-400 font-medium block">Category / Discipline</label>
                    <p className="font-semibold text-slate-800">{result.data.discipline || result.data.type}</p>
                  </div>
                  <div>
                    <label className="text-slate-400 font-medium block">Status</label>
                    <span className="inline-block bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] mt-1">
                      {result.data.status || "APPROVED"}
                    </span>
                  </div>
                  {result.data.achievements && (
                    <div>
                      <label className="text-slate-400 font-medium block">Key Achievements</label>
                      <p className="font-medium text-slate-700">{result.data.achievements}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-3">
              <XCircle className="w-12 h-12 text-red-500 mx-auto" />
              <h3 className="font-bold text-navy-950 text-base">No Matching Record Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No registration or certificate match was found for "<span className="font-mono font-bold">{query}</span>". Please verify the registration code and try again.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
