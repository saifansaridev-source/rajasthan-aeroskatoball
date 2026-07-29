import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { PhoneCall } from "lucide-react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased selection:bg-saffron-500 selection:text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Floating WhatsApp Quick Contact Button */}
      <a
        href="https://wa.me/919414012345?text=Hello%20Rajasthan%20Aeroskatoball%20Association%2C%20I%20have%20an%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl transition transform hover:scale-110 flex items-center justify-center border-2 border-white"
        title="WhatsApp Quick Contact"
      >
        <PhoneCall className="w-6 h-6" />
      </a>
    </div>
  );
}
