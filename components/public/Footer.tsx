import Link from "next/link";
import { Trophy, MapPin, Mail, Phone, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-12 pb-6 border-t-4 border-saffron-500">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

        {/* Col 1: About & Incorporation */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-saffron-500 flex items-center justify-center text-white">
              <Trophy className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              RAJASTHAN <span className="text-saffron-500">AEROSKATOBALL</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The official governing body for Aeroskatoball in the state of Rajasthan. Incorporated as a non-profit company under Section 8 of the Companies Act, 2013.
          </p>
          <div className="bg-navy-900 border border-navy-800 p-3 rounded-lg text-xs space-y-1">
            <p className="text-slate-300 font-semibold">Corporate Information:</p>
            <p className="text-saffron-400">CIN: U88900RJ2026NPL112235</p>
            <p className="text-slate-400">ROC Jaipur | Reg. Date: 09 March 2026</p>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4 pb-2 border-b border-navy-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-saffron-500"></span> Quick Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-saffron-400 transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-saffron-400 transition">About the Association</Link></li>
            <li><Link href="/events" className="hover:text-saffron-400 transition">State Championships &amp; Events</Link></li>
            <li><Link href="/gallery" className="hover:text-saffron-400 transition">Media &amp; Photo Gallery</Link></li>
            <li><Link href="/articles" className="hover:text-saffron-400 transition">Articles &amp; Blog</Link></li>
            <li><Link href="/leaders" className="hover:text-saffron-400 transition">Association Leaders</Link></li>
            <li><Link href="/downloads" className="hover:text-saffron-400 transition">Circulars &amp; Downloads</Link></li>
            <li><Link href="/contact" className="hover:text-saffron-400 transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Col 3: Registered Office & Contact */}
        <div>
          <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4 pb-2 border-b border-navy-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-saffron-500"></span> Registered Office
          </h4>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-saffron-500 shrink-0 mt-0.5" />
              <span>
                Flat 102, Sports Enclave, Circular Road,<br />
                Bharatpur, Rajasthan - 321001, India
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-saffron-500 shrink-0" />
              <a href="mailto:info@rajasthanaeroskatoball.org" className="hover:underline">
                info@rajasthanaeroskatoball.org
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-saffron-500 shrink-0" />
              <span>+91 94140 12345 / +91 98290 44444</span>
            </li>
            <li className="pt-2">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-navy-900 border border-navy-800 px-3 py-1.5 rounded"
              >
                <Lock className="w-3.5 h-3.5 text-saffron-400" />
                Staff Administration Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Legal */}
        <div>
          <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4 pb-2 border-b border-navy-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-saffron-500"></span> Legal
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/privacy-policy" className="hover:text-saffron-400 transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-saffron-400 transition">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-navy-900 text-xs flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400">
        <p>© {new Date().getFullYear()} Rajasthan Aeroskatoball Association. All Rights Reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy-policy" className="hover:text-saffron-400 transition">Privacy Policy</Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-saffron-400 transition">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
