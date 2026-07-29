import connectDB from "@/lib/db";
import { ContactMessage } from "@/models";
import { Mail, Phone, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminContactInbox() {
  await connectDB();
  const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-black text-navy-950">Contact Form Inbox</h1>
        <p className="text-xs text-slate-500">
          Messages and inquiries submitted by visitors and athletes through the public contact page.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
        {messages.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">No contact messages received yet.</div>
        ) : (
          messages.map((msg: any) => (
            <div key={msg._id.toString()} className="p-5 hover:bg-slate-50 space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-navy-950 text-sm">{msg.subject}</h3>
                  <div className="flex items-center gap-4 text-slate-500 text-[11px] mt-0.5">
                    <span className="font-semibold text-slate-800">{msg.name}</span>
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-saffron-500" /> {msg.email}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-saffron-500" /> {msg.phone}</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{formatDate(msg.createdAt)}</span>
              </div>
              <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
