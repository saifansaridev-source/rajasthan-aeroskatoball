import { ShieldCheck, Award, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="bg-navy-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl border-t-4 border-saffron-500">
        <div className="max-w-3xl space-y-4">
          <span className="bg-saffron-500/20 text-saffron-400 font-bold text-xs px-3 py-1 rounded-full border border-saffron-500/30">
            CIN: U88900RJ2026NPL112235
          </span>
          <h1 className="text-3xl md:text-5xl font-black">
            Rajasthan Aeroskatoball Association
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Official governing state sports organization dedicated to the promotion, regulation, and grassroots development of Aeroskatoball across Rajasthan. Incorporated as a Section 8 Not-For-Profit entity under ROC Jaipur.
          </p>
        </div>
      </div>

      {/* Grid: Legal Profile & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-saffron-500" />
            <h2 className="text-xl font-bold text-navy-950">Legal & Corporate Profile</h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Registered on March 09, 2026 under Section 8 of the Companies Act, 2013, the association operates with complete financial transparency and non-profit dedication towards athlete welfare and high-performance training.
          </p>

          <dl className="grid grid-cols-1 gap-3 pt-4 border-t border-slate-100 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <dt className="text-slate-400">Corporate ID (CIN):</dt>
              <dd className="font-mono font-bold text-navy-950">U88900RJ2026NPL112235</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <dt className="text-slate-400">Registrar of Companies:</dt>
              <dd className="font-semibold text-navy-950">ROC Jaipur</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <dt className="text-slate-400">Registered Office:</dt>
              <dd className="font-semibold text-navy-950 text-right max-w-xs">Bharatpur, Rajasthan - 321001</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-saffron-500" />
            <h2 className="text-xl font-bold text-navy-950">Core Objectives</h2>
          </div>
          <ul className="space-y-3 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Conduct annual district, zonal, and state-level Aeroskatoball championships.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Host certified coaching clinics & referee accreditation seminars.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Provide state team pathways to School Games & National Championships.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Maintain public transparency, official announcements, and technical rulebooks.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
