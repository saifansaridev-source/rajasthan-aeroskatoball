"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyIdPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  useEffect(() => {
    if (params?.id) {
      router.replace(`/verify?reg=${encodeURIComponent(params.id)}`);
    }
  }, [params, router]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
      <div className="text-center space-y-2">
        <div className="w-8 h-8 border-4 border-[#0A3D91] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-bold text-slate-600">Verifying digital ID pass...</p>
      </div>
    </div>
  );
}
