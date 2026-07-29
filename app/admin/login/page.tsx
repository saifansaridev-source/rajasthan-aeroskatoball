"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Trophy, Lock, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@rajasthanaeroskatoball.org");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMsg("Invalid email address or password.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-navy-900 border border-navy-800 rounded-2xl p-8 shadow-2xl space-y-6 text-slate-200">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-saffron-500 flex items-center justify-center text-white mx-auto shadow-lg">
            <Trophy className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white">State Admin Portal</h1>
          <p className="text-xs text-slate-400">
            Rajasthan Aeroskatoball Association Staff Governance
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-900/40 text-red-300 p-3 rounded-lg border border-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-300 block mb-1">Admin Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-navy-950 border border-navy-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-saffron-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-navy-950 border border-navy-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-saffron-500 focus:outline-none"
            />
          </div>

          <div className="bg-navy-950/60 p-3 rounded-lg border border-navy-800 text-[11px] text-slate-400">
            <p className="font-semibold text-saffron-400">Demo Admin Credentials:</p>
            <p>Email: <code className="text-white">admin@rajasthanaeroskatoball.org</code></p>
            <p>Password: <code className="text-white">admin123</code></p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-saffron-500 hover:bg-saffron-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
          >
            <Lock className="w-4 h-4" />
            {loading ? "Authenticating..." : "Sign In to Admin Portal"}
          </button>
        </form>
      </div>
    </div>
  );
}
