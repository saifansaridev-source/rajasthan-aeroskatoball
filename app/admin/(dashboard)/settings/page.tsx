"use client";

import { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2 } from "lucide-react";

export default function AdminSiteSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => {
        setSettings(d.settings || {});
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500 text-sm">Loading site settings...</div>;

  const fields = [
    { label: "Association Name", name: "assocName", type: "text" },
    { label: "Corporate Identification Number (CIN)", name: "cin", type: "text" },
    { label: "Registered Office Address", name: "registeredOffice", type: "text" },
    { label: "Primary Contact Email", name: "email", type: "email" },
    { label: "Primary Phone Number", name: "phone", type: "text" },
    { label: "WhatsApp Number (only digits, no +, e.g. 919414012345)", name: "whatsapp", type: "text" },
    { label: "Hero Section Title (Homepage Banner)", name: "heroTitle", type: "text" },
    { label: "Hero Section Subtitle", name: "heroSubtitle", type: "text" },
    { label: "Facebook Page URL", name: "facebookUrl", type: "url" },
    { label: "Instagram Profile URL", name: "instagramUrl", type: "url" },
    { label: "YouTube Channel URL", name: "youtubeUrl", type: "url" },
    { label: "Twitter / X Profile URL", name: "twitterUrl", type: "url" },
    { label: "Google Maps Embed URL", name: "googleMapEmbed", type: "url" },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-navy-950 flex items-center gap-2">
            <Settings className="w-5 h-5 text-saffron-500" /> Global Site Settings
          </h1>
          <p className="text-xs text-slate-500">
            Update association contact details, social media links, and homepage text.
          </p>
        </div>
        {saved && (
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" /> Settings Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fields.map((field) => (
            <div key={field.name} className={field.name.includes("Title") || field.name.includes("Subtitle") || field.name.includes("Office") ? "md:col-span-2" : ""}>
              <label className="text-xs font-bold text-navy-900 block mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={settings?.[field.name] || ""}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
              />
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={saving}
            className="bg-saffron-500 hover:bg-saffron-600 disabled:opacity-50 text-white font-bold text-sm px-8 py-3 rounded-xl shadow transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving Settings..." : "Save All Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
