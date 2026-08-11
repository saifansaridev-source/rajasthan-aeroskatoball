import BackButton from "@/components/public/BackButton";
import { Scale } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Rajasthan Aeroskatoball Association",
  description:
    "Terms and Conditions for using the Rajasthan Aeroskatoball Association website and services.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <BackButton />

      {/* Header */}
      <div className="bg-navy-950 text-white rounded-2xl p-8 border-t-4 border-saffron-500 shadow-lg">
        <div className="inline-flex items-center gap-2 bg-saffron-500/20 text-saffron-400 font-bold text-xs px-3 py-1 rounded-full border border-saffron-500/30 mb-4">
          <Scale className="w-3.5 h-3.5" /> Legal Document
        </div>
        <h1 className="text-3xl font-black">Terms &amp; Conditions</h1>
        <p className="text-slate-400 text-xs mt-2">
          Last Updated: August 2026 — Rajasthan Aeroskatoball Association (CIN: U88900RJ2026NPL112235)
        </p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8 text-sm text-slate-700 leading-relaxed">

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">1. Agreement to Terms</h2>
          <p>
            By accessing or using the website of Rajasthan Aeroskatoball Association
            (&quot;we&quot;, &quot;us&quot;, &quot;Association&quot;), you agree to be bound by these Terms &amp; Conditions.
            If you do not agree with any part of these terms, please do not use our website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">2. Use of the Website</h2>
          <p>You agree to use this website only for lawful purposes. You may not:</p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-slate-600">
            <li>Use the website in any way that violates applicable local, national, or international laws or regulations.</li>
            <li>Transmit any unsolicited or unauthorized advertising or promotional material.</li>
            <li>Reproduce, duplicate, copy, or resell any part of our website without prior written consent.</li>
            <li>Attempt to gain unauthorized access to any part of the website or its related systems.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">3. Intellectual Property</h2>
          <p>
            All content published on this website — including text, graphics, logos, images, audio
            clips, and software — is the exclusive property of Rajasthan Aeroskatoball Association
            or its content suppliers, and is protected by applicable intellectual property laws.
            Unauthorized reproduction is prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">4. Accuracy of Information</h2>
          <p>
            We endeavour to ensure that all information on this website is accurate and up to date.
            However, the Association makes no warranties or representations regarding the completeness,
            accuracy, reliability, or suitability of the information for any purpose. We reserve the
            right to modify content at any time without prior notice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">5. Third-Party Links</h2>
          <p>
            Our website may contain links to external websites for convenience and reference. These
            links do not constitute an endorsement of those websites. We have no control over their
            content and accept no responsibility for any loss or damage arising from your use of
            third-party sites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Rajasthan Aeroskatoball Association shall not be
            liable for any indirect, incidental, special, consequential, or punitive damages, including
            loss of profits or data, arising out of or in connection with your use of this website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">7. Governing Law</h2>
          <p>
            These Terms &amp; Conditions shall be governed by and construed in accordance with the
            laws of India, and any disputes shall be subject to the exclusive jurisdiction of courts
            located in Bharatpur, Rajasthan.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">8. Amendments</h2>
          <p>
            We reserve the right to amend these Terms &amp; Conditions at any time by posting the
            revised terms on this page. Your continued use of the website after any changes constitutes
            your acceptance of the new terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-black text-navy-950">9. Contact</h2>
          <p>
            For questions regarding these Terms &amp; Conditions, please contact us at:
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
