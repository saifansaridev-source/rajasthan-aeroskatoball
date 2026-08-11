import BackButton from "@/components/public/BackButton";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Rajasthan Aeroskatoball Association",
  description:
    "Privacy Policy for Rajasthan Aeroskatoball Association — how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <BackButton />

      {/* Header */}
      <div className="bg-navy-950 text-white rounded-2xl p-8 border-t-4 border-saffron-500 shadow-lg">
        <div className="inline-flex items-center gap-2 bg-saffron-500/20 text-saffron-400 font-bold text-xs px-3 py-1 rounded-full border border-saffron-500/30 mb-4">
          <ShieldCheck className="w-3.5 h-3.5" /> Legal Document
        </div>
        <h1 className="text-3xl font-black">Privacy Policy</h1>
        <p className="text-slate-400 text-xs mt-2">
          Last Updated: August 2026 — Rajasthan Aeroskatoball Association (CIN: U88900RJ2026NPL112235)
        </p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8 text-sm text-slate-700 leading-relaxed">

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">1. Introduction</h2>
          <p>
            Rajasthan Aeroskatoball Association (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the
            privacy of athletes, coaches, referees, academies, and all visitors who use our
            website at <span className="font-semibold text-navy-950">www.rajasthanaeroskatoball.org</span>. This Privacy Policy
            describes how we collect, use, disclose, and safeguard your personal information in
            connection with our activities.
          </p>
          <p>
            By accessing or using our website, you acknowledge that you have read, understood, and
            agree to the practices described in this Policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">2. Information We Collect</h2>
          <p>We may collect the following categories of personal information:</p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-slate-600">
            <li>
              <span className="font-semibold text-navy-950">Identity & Contact Data:</span> Full name, email address,
              mobile number, date of birth, and postal address provided when you contact us or
              inquire about state events.
            </li>
            <li>
              <span className="font-semibold text-navy-950">Inquiry Data:</span> Information you submit via our
              Contact Us page, including your name, email, phone number, and message content.
            </li>
            <li>
              <span className="font-semibold text-navy-950">Usage Data:</span> Automatically collected information
              such as IP address, browser type, pages visited, and approximate geographic location
              when you browse our website.
            </li>
            <li>
              <span className="font-semibold text-navy-950">Cookies & Tracking:</span> We use essential session
              cookies to maintain your browsing session. We do not use advertising or third-party
              tracking cookies.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-slate-600">
            <li>Respond to inquiries and provide information about state events and tournaments.</li>
            <li>Send official communications, circulars, and announcements related to Aeroskatoball in Rajasthan.</li>
            <li>Administer and improve our website and online services.</li>
            <li>Comply with applicable legal obligations and government requirements.</li>
            <li>Maintain sports records, affiliations, and operational documentation.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">4. Data Sharing & Disclosure</h2>
          <p>
            We do <strong>not</strong> sell, rent, or trade your personal information to any third party.
            We may share data only in the following circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-slate-600">
            <li>With sports federation bodies (national or state level) for official athlete or event records.</li>
            <li>With government or regulatory authorities when required by applicable law or court order.</li>
            <li>With service providers (e.g. hosting, email delivery) under strict confidentiality agreements.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">5. Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfil the purposes
            outlined in this Policy, or as required by applicable law. Inquiry data is retained for
            a maximum of 2 years unless a longer retention period is required.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">6. Cookies</h2>
          <p>
            Our website uses essential cookies necessary for basic website functionality (e.g. admin
            session authentication). These cookies do not track you for advertising purposes. By using
            our website, you consent to the use of these strictly necessary cookies. You may disable
            cookies in your browser settings, though this may affect some website functions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">7. Your Rights</h2>
          <p>
            Subject to applicable law, you may have the right to access, correct, or request
            deletion of personal information we hold about you. To exercise these rights, please
            contact us using the details below.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">8. Security</h2>
          <p>
            We implement reasonable administrative, technical, and physical safeguards to protect your
            personal information from unauthorized access, disclosure, alteration, or destruction.
            However, no method of transmission over the internet is entirely secure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">9. Third-Party Links</h2>
          <p>
            Our website may contain links to external websites (e.g. Wikipedia, government portals).
            We are not responsible for the privacy practices or content of those external sites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">10. Changes to This Policy</h2>
          <p>
            We reserve the right to update this Privacy Policy at any time. Changes will be posted
            on this page with an updated &quot;Last Updated&quot; date. Continued use of the website after
            changes constitutes acceptance of the revised Policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">11. Contact Us</h2>
          <p>
            For any privacy-related concerns or data requests, please contact:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-1">
            <p className="font-bold text-navy-950">Rajasthan Aeroskatoball Association</p>
            <p>Flat 102, Sports Enclave, Circular Road, Bharatpur, Rajasthan - 321001, India</p>
            <p>Email: <a href="mailto:info@rajasthanaeroskatoball.org" className="text-saffron-600 hover:underline">info@rajasthanaeroskatoball.org</a></p>
            <p>Phone: +91 94140 12345</p>
          </div>
        </section>

      </div>
    </div>
  );
}
