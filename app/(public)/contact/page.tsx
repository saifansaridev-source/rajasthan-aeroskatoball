import { MapPin, Mail, Phone, PhoneCall, Building } from "lucide-react";
import BackButton from "@/components/public/BackButton";

export default function ContactPage() {
  return (
    <div className="space-y-10 py-8 max-w-7xl mx-auto px-4">
      <BackButton />
      <div className="bg-navy-950 text-white p-8 md:p-10 rounded-2xl shadow-xl border-t-4 border-saffron-500">
        <span className="text-saffron-400 text-xs font-bold uppercase tracking-wider block mb-1">
          State Secretariat
        </span>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
          Contact Rajasthan Aeroskatoball Association
        </h1>
        <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
          Get in touch with state secretariats for official inquiries, state championships, or technical guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Office Details */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <Building className="w-6 h-6 text-saffron-500" />
            <h3 className="text-xl font-black text-navy-900">
              Registered Office (Headquarters)
            </h3>
          </div>
          <ul className="space-y-4 text-xs text-slate-700">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-saffron-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                Flat 102, Sports Enclave, Circular Road,<br />
                Bharatpur, Rajasthan - 321001, India
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-saffron-500 shrink-0" />
              <a href="mailto:info@rajasthanaeroskatoball.org" className="hover:underline text-saffron-600 font-bold text-sm">
                info@rajasthanaeroskatoball.org
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-saffron-500 shrink-0" />
              <span className="font-semibold text-sm">+91 94140 12345 / +91 98290 44444</span>
            </li>
          </ul>
        </div>

        {/* Support & Quick Contact */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <PhoneCall className="w-6 h-6 text-emerald-600" />
              <h3 className="text-xl font-black text-navy-900">Direct Support & WhatsApp</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              For event inquiries or official state circular details, feel free to contact our state secretariats via phone, email, or WhatsApp.
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl space-y-3">
            <h4 className="font-bold text-emerald-900 text-sm">Official WhatsApp Desk</h4>
            <p className="text-xs text-emerald-800">
              Connect directly with state coordinators for quick information regarding upcoming state events.
            </p>
            <a
              href="https://wa.me/919414012345"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs"
            >
              Chat on WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
