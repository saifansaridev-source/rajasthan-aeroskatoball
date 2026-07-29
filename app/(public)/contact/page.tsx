"use client";

import { useState } from "react";
import { MapPin, Mail, Phone, PhoneCall, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 py-8 max-w-7xl mx-auto px-4">
      <div className="bg-navy-950 text-white p-8 md:p-10 rounded-2xl shadow-xl">
        <span className="text-saffron-400 text-xs font-bold uppercase tracking-wider block mb-1">
          State Secretariat
        </span>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
          Contact Rajasthan Aeroskatoball Association
        </h1>
        <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
          Get in touch with office secretariats for district affiliations, athlete inquiries, or tournament sanctioning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Office Details */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-navy-900 border-b border-slate-100 pb-2">
              Registered Office (Headquarters)
            </h3>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-saffron-500 shrink-0 mt-0.5" />
                <span>
                  Flat 102, Sports Enclave, Circular Road,<br />
                  Bharatpur, Rajasthan - 321001, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-saffron-500 shrink-0" />
                <a href="mailto:info@rajasthanaeroskatoball.org" className="hover:underline text-saffron-600 font-semibold">
                  info@rajasthanaeroskatoball.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-saffron-500 shrink-0" />
                <span>+91 94140 12345 / +91 98290 44444</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl space-y-3">
            <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-600" /> WhatsApp Support
            </h4>
            <p className="text-xs text-emerald-800">
              For immediate athlete queries or trial venue directions, contact our state coordinator on WhatsApp.
            </p>
            <a
              href="https://wa.me/919414012345"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition"
            >
              Open WhatsApp Chat →
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md border border-slate-200 space-y-4">
          <h3 className="text-xl font-black text-navy-900">Send an Official Message</h3>

          {success && (
            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              Thank you! Your message has been logged in our secretariat inbox.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-bold block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-bold block mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 Mobile"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. State Championship Query"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold block mb-1">Message Body *</label>
              <textarea
                rows={4}
                required
                placeholder="Write your inquiry here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-saffron-500 hover:bg-saffron-600 disabled:opacity-50 text-white font-bold text-xs py-3 px-6 rounded-lg shadow transition flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
