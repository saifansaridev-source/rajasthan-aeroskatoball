"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  MessageSquare,
  ShieldCheck
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useI18n();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Inquiry Regarding State Championship Registration",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <Link href="/" className="hover:text-[#0A3D91]">Home</Link>
            <span>/</span>
            <span className="text-[#0A3D91] font-bold">Contact Us</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0A3D91] tracking-tight">
            Contact <span className="text-[#F57C00]">State Head Office</span>
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Connect with Rajasthan Aeroskatoball Association headquarters in Bharatpur or reach our district units.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0A3D91] shrink-0">
                  <MapPin className="w-6 h-6 text-[#F57C00]" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#0A3D91] tracking-wider block">
                    Headquarters & Secretariat
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    Rajasthan Aeroskatoball Association
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Vijay Nagar Colony, Bharatpur (Rajasthan) - 321001, India
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>State Helpline: <a href="tel:8504092852" className="font-bold text-[#0A3D91] hover:underline">+91 8504092852</a></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#F57C00] shrink-0" />
                  <span>Email: <a href="mailto:contact@rajasthanaeroskatoball.org" className="font-semibold text-slate-900 hover:underline">contact@rajasthanaeroskatoball.org</a></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Office Hours: Monday &ndash; Saturday (9:00 AM &ndash; 6:00 PM)</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Direct Action */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-3xl p-6 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-200">
                  Instant Support
                </span>
                <MessageSquare className="w-5 h-5 text-emerald-200" />
              </div>
              <h3 className="text-lg font-black">Official WhatsApp Helpline</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Connect directly with the General Secretary desk for urgent player registrations, district queries, and tournament verifications.
              </p>
              <a
                href="https://wa.me/918504092852?text=Hello%20Rajasthan%20Aeroskatoball%20Association"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-white text-emerald-800 hover:bg-emerald-50 font-bold py-2.5 px-4 rounded-xl text-xs shadow transition mt-2"
              >
                <span>Chat on WhatsApp (+91 8504092852)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Google Map Embed */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 h-64 relative">
              <iframe
                title="RAA Bharatpur Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113470.82025178556!2d77.44754752539062!3d27.215186000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3973a388f8d9b1a5%3A0x6b44558e658399fa!2sBharatpur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-slate-100">
            <h2 className="text-xl font-black text-[#0A3D91] border-b border-slate-100 pb-3">
              Send Official Inquiry
            </h2>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message Dispatched Successfully!</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Thank you for reaching out to the Rajasthan Aeroskatoball Association. Our secretariat will review your inquiry and respond within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                  }}
                  className="bg-[#0A3D91] text-white px-5 py-2 rounded-xl text-xs font-bold shadow"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mt-6 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aman Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. contact@domain.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone / Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9829012345"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Subject *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Inquiry Subject"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Detailed Message *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, championship queries, or affiliation assistance needed..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 bg-[#0A3D91] hover:bg-[#083279] text-white px-8 py-3.5 rounded-xl font-bold text-xs shadow-lg transition disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-[#F57C00]" />
                    <span>{loading ? "Sending Message..." : "Submit Inquiry to Secretariat"}</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
