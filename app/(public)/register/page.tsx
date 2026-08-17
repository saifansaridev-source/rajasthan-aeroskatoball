"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { 
  User, 
  Award, 
  MapPin, 
  ShieldCheck, 
  Flag, 
  Scale, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight, 
  Upload, 
  CreditCard, 
  FileText, 
  Download, 
  AlertCircle,
  Plus,
  Trash2,
  Lock,
  Sparkles,
  QrCode
} from "lucide-react";
import { rajasthanDistricts, initialRegistrations, IRegistrationData } from "@/lib/data-store";
import { jsPDF } from "jspdf";

export type RegCategory = 
  | "PLAYER" 
  | "COACH" 
  | "DISTRICT" 
  | "CLUB" 
  | "OFFICIAL" 
  | "REFEREE" 
  | "VOLUNTEER";

export default function RegisterPage() {
  const [selectedCategory, setSelectedCategory] = useState<RegCategory | null>(null);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Details, 2: Uploads, 3: Payment, 4: Success
  const [submittedReg, setSubmittedReg] = useState<IRegistrationData | null>(null);
  const [loading, setLoading] = useState(false);

  // Signature Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Common Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "2006-05-12",
    gender: "Male",
    bloodGroup: "B+",
    aadhaar: "458912349012",
    fatherName: "Shri Ramesh Sharma",
    motherName: "Smt. Shashi Sharma",
    address: "12/A, Station Road",
    district: "Bharatpur",
    state: "Rajasthan",
    pincode: "321001",
    emergencyContact: "9414012345",
    
    // Player
    club: "Bharatpur Aero Skaters Club",
    coach: "Coach Vikram Rathore",
    ageCategory: "Senior (18+)",
    playingCategory: "Aerial Freestyle & Speed Roll",
    experience: "3 Years",
    achievements: "District Gold Medalist 2025",

    // Coach
    coachingLevel: "National Level 2 Certified",
    qualification: "B.P.Ed / Certified Skating Trainer",
    specialization: "High Speed Transition & Tactical Plays",
    academy: "Bharatpur Sports Arena",

    // District
    associationName: "District Aeroskatoball Association Bharatpur",
    presidentName: "Dr. Arvind Singh",
    presidentContact: "9414012345",
    secretaryName: "Mahendra Verma",
    secretaryContact: "8504092852",
    treasurerName: "Rajesh Saini",
    treasurerContact: "9829033221",
    panNumber: "AABTR8912P",

    // Club
    clubName: "Lohagarh Aero Skaters Club",
    registrationNumber: "REG/CLB/2026/01",
    ownerName: "Devendra Singh",
    headCoachName: "Vikram Rathore",
    groundAddress: "Lohagarh Stadium Quad, Bharatpur",
    facilities: ["Synthetic Skating Rink", "Lighting System", "Medical First Aid"],

    // Official / Referee
    officialRole: "Senior Match Official / Referee",
    experienceYears: "5 Years",

    // Declaration
    acceptedTerms: true,
  });

  // Committee members repeater for District
  const [committeeMembers, setCommitteeMembers] = useState([
    { name: "Suresh Gupta", designation: "Vice President", phone: "9414022334" },
    { name: "Dinesh Koli", designation: "Joint Secretary", phone: "9829044556" },
  ]);

  const categories = [
    {
      id: "PLAYER",
      title: "Player Registration",
      desc: "Annual athlete membership, state ranking license & digital ID card.",
      icon: User,
      fee: 500,
      badge: "Most Popular",
      color: "from-blue-600 to-[#0A3D91]",
    },
    {
      id: "COACH",
      title: "Coach Registration",
      desc: "State coach certification, license accreditation & academy link.",
      icon: Award,
      fee: 1500,
      badge: "Certified",
      color: "from-[#F57C00] to-orange-700",
    },
    {
      id: "DISTRICT",
      title: "District Association",
      desc: "Official affiliation & governing body unit registration for districts.",
      icon: MapPin,
      fee: 5000,
      badge: "District Body",
      color: "from-emerald-600 to-teal-800",
    },
    {
      id: "CLUB",
      title: "Club Registration",
      desc: "Affiliate sports club, academy, rink, and associated athletes.",
      icon: ShieldCheck,
      fee: 2500,
      badge: "Club Affiliation",
      color: "from-purple-600 to-indigo-800",
    },
    {
      id: "OFFICIAL",
      title: "Technical Official",
      desc: "Scorer, timekeeper, and technical bench officer certification.",
      icon: Flag,
      fee: 1000,
      badge: "Technical",
      color: "from-amber-600 to-yellow-800",
    },
    {
      id: "REFEREE",
      title: "Referee / Judge",
      desc: "National & state level match referee license and badge.",
      icon: Scale,
      fee: 1200,
      badge: "Match Official",
      color: "from-rose-600 to-red-800",
    },
    {
      id: "VOLUNTEER",
      title: "Volunteer Registration",
      desc: "Join state event management and championship organizing teams.",
      icon: HeartHandshake,
      fee: 0,
      badge: "Free Membership",
      color: "from-cyan-600 to-blue-800",
    },
  ];

  const currentCategoryObj = categories.find((c) => c.id === selectedCategory);

  // Signature Canvas Drawing Helpers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = "#0A3D91";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Form Field Updater
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle Submission & Payment
  const handleFinalSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const regId = `RAA-${selectedCategory?.slice(0, 3)}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newRecord: IRegistrationData = {
        id: `reg-${Date.now()}`,
        regNo: regId,
        type: selectedCategory as any,
        status: "PENDING",
        name: formData.name || "Aman Sharma",
        email: formData.email || "applicant@raasport.in",
        phone: formData.phone || "9829012345",
        dob: formData.dob,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        aadhaar: formData.aadhaar,
        fatherName: formData.fatherName,
        motherName: formData.motherName,
        address: formData.address,
        district: formData.district,
        state: "Rajasthan",
        pincode: formData.pincode,
        emergencyContact: formData.emergencyContact,
        club: formData.club,
        coach: formData.coach,
        ageCategory: formData.ageCategory,
        playingCategory: formData.playingCategory,
        experience: formData.experience,
        achievements: formData.achievements,
        coachingLevel: formData.coachingLevel,
        qualification: formData.qualification,
        associationName: formData.associationName,
        presidentName: formData.presidentName,
        secretaryName: formData.secretaryName,
        treasurerName: formData.treasurerName,
        panNumber: formData.panNumber,
        clubName: formData.clubName,
        paymentStatus: (currentCategoryObj?.fee || 0) > 0 ? "PAID" : "PAID",
        paymentAmount: currentCategoryObj?.fee || 0,
        paymentTxnId: `TXN-RAA-${Math.floor(100000 + Math.random() * 900000)}`,
        paidAt: new Date().toISOString().split("T")[0],
        validUntil: "2027-03-31",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      };

      initialRegistrations.unshift(newRecord);
      setSubmittedReg(newRecord);
      setLoading(false);
      setStep(4);
    }, 1200);
  };

  // Download PDF Receipt using jsPDF
  const downloadReceiptPDF = () => {
    if (!submittedReg) return;
    const doc = new jsPDF();

    // Top Header Banner
    doc.setFillColor(10, 61, 145);
    doc.rect(0, 0, 210, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("RAJASTHAN AEROSKATOBALL ASSOCIATION", 105, 18, { align: "center" });

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Affiliated to Aeroskatoball Federation of India (AFI) | CIN: U88900RJ2026NPL112235", 105, 26, { align: "center" });
    doc.text("Vijay Nagar Colony, Bharatpur (Rajasthan) - 321001 | Helpline: 8504092852", 105, 32, { align: "center" });

    // Receipt Title Badge
    doc.setFillColor(245, 124, 0);
    doc.roundedRect(15, 48, 180, 10, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("OFFICIAL MEMBERSHIP REGISTRATION RECEIPT", 105, 55, { align: "center" });

    // Details Grid
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    let y = 70;
    const drawRow = (label: string, value: string) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 20, y);
      doc.setFont("helvetica", "normal");
      doc.text(value || "N/A", 80, y);
      y += 8;
    };

    drawRow("Registration Number:", submittedReg.regNo);
    drawRow("Category:", `${submittedReg.type} REGISTRATION`);
    drawRow("Applicant Name:", submittedReg.name);
    drawRow("Email / Mobile:", `${submittedReg.email} / ${submittedReg.phone}`);
    drawRow("District / State:", `${submittedReg.district}, Rajasthan`);
    drawRow("Application Date:", new Date().toLocaleDateString("en-IN"));
    drawRow("Membership Validity:", `Valid until ${submittedReg.validUntil}`);
    drawRow("Transaction ID:", submittedReg.paymentTxnId || "FREE_ZERO_FEE");
    drawRow("Fee Paid:", `INR ${submittedReg.paymentAmount}/- (Payment Confirmed)`);
    drawRow("Status in Queue:", "PENDING ADMIN VERIFICATION");

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(15, y + 5, 195, y + 5);

    // Terms note
    y += 15;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("NOTE: This is a computer generated provisional registration acknowledgment.", 20, y);
    doc.text("Upon physical document verification by State Scrutiny Committee, your active Digital QR Pass will be unlocked in Member Dashboard.", 20, y + 5);

    // Signature stamp
    y += 20;
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(10, 61, 145);
    doc.text("AUTHORIZED SIGNATORY", 150, y);
    doc.setFont("helvetica", "normal");
    doc.text("State General Secretary", 150, y + 5);
    doc.text("Rajasthan Aeroskatoball Association", 150, y + 10);

    doc.save(`${submittedReg.regNo}_RAA_Registration_Receipt.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="bg-[#0A3D91] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider inline-block mb-3">
            Official Portal
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-[#0A3D91] tracking-tight">
            Rajasthan State <span className="text-[#F57C00]">Registration</span> Portal
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Select your membership category to initiate annual federation registration with instant digital receipt and QR verification pass.
          </p>
        </div>

        {/* 8.1 CATEGORY SELECTOR LANDING (WHEN NO CATEGORY SELECTED) */}
        {!selectedCategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl group-hover:bg-[#F57C00] group-hover:text-white transition">
                      {cat.badge}
                    </span>
                  </div>

                  <div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-lg font-black text-[#0A3D91] group-hover:text-[#F57C00] transition">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Annual Fee</span>
                      <span className="text-sm font-black text-slate-900">
                        {cat.fee === 0 ? "Free Registration" : `₹ ${cat.fee}/-`}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedCategory(cat.id as RegCategory);
                        setStep(1);
                      }}
                      className="inline-flex items-center gap-1.5 bg-[#0A3D91] hover:bg-[#083279] text-white px-4 py-2 rounded-xl text-xs font-bold shadow transition"
                    >
                      <span>Register</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F57C00]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* REGISTRATION MULTI-STEP WIZARD (WHEN CATEGORY IS SELECTED) */}
        {selectedCategory && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden max-w-4xl mx-auto">
            
            {/* Step Header Banner */}
            <div className="bg-[#0A3D91] text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setStep(1);
                  }}
                  className="text-blue-200 hover:text-white text-xs font-bold mb-1 flex items-center gap-1"
                >
                  &larr; Switch Category
                </button>
                <h2 className="text-xl font-black text-white">
                  {currentCategoryObj?.title}
                </h2>
                <p className="text-xs text-blue-200">
                  Registration Fee: <strong>₹ {currentCategoryObj?.fee}/-</strong> (Annual State License)
                </p>
              </div>

              {/* Progress Stepper */}
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className={`px-3 py-1 rounded-lg ${step === 1 ? "bg-[#F57C00] text-white" : "bg-white/10 text-white"}`}>1. Details</span>
                <span className={`px-3 py-1 rounded-lg ${step === 2 ? "bg-[#F57C00] text-white" : "bg-white/10 text-white"}`}>2. Uploads</span>
                <span className={`px-3 py-1 rounded-lg ${step === 3 ? "bg-[#F57C00] text-white" : "bg-white/10 text-white"}`}>3. Payment</span>
              </div>
            </div>

            {/* FORM STEP 1: PERSONAL & ROLE SPECIFIC DETAILS */}
            {step === 1 && (
              <div className="p-6 md:p-8 space-y-6">
                <h3 className="text-sm font-black text-[#0A3D91] uppercase tracking-wider border-b border-slate-100 pb-2">
                  Personal & Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="e.g. Aman Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="e.g. aman@gmail.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Helpline *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="e.g. 9829012345"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange("dob", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Gender *</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Blood Group *</label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    >
                      <option>A+</option>
                      <option>B+</option>
                      <option>O+</option>
                      <option>AB+</option>
                      <option>A-</option>
                      <option>B-</option>
                      <option>O-</option>
                      <option>AB-</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Aadhaar Number (12 Digits) *</label>
                    <input
                      type="text"
                      value={formData.aadhaar}
                      onChange={(e) => handleInputChange("aadhaar", e.target.value)}
                      placeholder="12 digit Aadhaar"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Father&apos;s Name *</label>
                    <input
                      type="text"
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange("fatherName", e.target.value)}
                      placeholder="Father's Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mother&apos;s Name *</label>
                    <input
                      type="text"
                      value={formData.motherName}
                      onChange={(e) => handleInputChange("motherName", e.target.value)}
                      placeholder="Mother's Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>
                </div>

                {/* Address & District Details */}
                <h3 className="text-sm font-black text-[#0A3D91] uppercase tracking-wider border-b border-slate-100 pb-2 pt-2">
                  Address & District
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  <div className="md:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Residential Address *</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Street, House No, Locality"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">District (Rajasthan) *</label>
                    <select
                      value={formData.district}
                      onChange={(e) => handleInputChange("district", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    >
                      {rajasthanDistricts.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Pincode *</label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      placeholder="e.g. 321001"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>
                </div>

                {/* ROLE SPECIFIC FIELDS */}
                {selectedCategory === "PLAYER" && (
                  <div className="space-y-4 pt-2">
                    <h3 className="text-sm font-black text-[#0A3D91] uppercase tracking-wider border-b border-slate-100 pb-2">
                      Sports & Academy Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Affiliated Club</label>
                        <input
                          type="text"
                          value={formData.club}
                          onChange={(e) => handleInputChange("club", e.target.value)}
                          placeholder="e.g. Bharatpur Aero Skaters Club"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Assigned Coach</label>
                        <input
                          type="text"
                          value={formData.coach}
                          onChange={(e) => handleInputChange("coach", e.target.value)}
                          placeholder="e.g. Coach Vikram Rathore"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Age Category *</label>
                        <select
                          value={formData.ageCategory}
                          onChange={(e) => handleInputChange("ageCategory", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                        >
                          <option>Sub-Junior (U-14)</option>
                          <option>Junior (U-17)</option>
                          <option>Youth (U-19)</option>
                          <option>Senior (18+)</option>
                          <option>Masters (35+)</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">Playing Specialization</label>
                        <input
                          type="text"
                          value={formData.playingCategory}
                          onChange={(e) => handleInputChange("playingCategory", e.target.value)}
                          placeholder="e.g. Aerial Freestyle, Slalom Sprint, Goal Strike"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Past Experience</label>
                        <input
                          type="text"
                          value={formData.experience}
                          onChange={(e) => handleInputChange("experience", e.target.value)}
                          placeholder="e.g. 3 Years"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedCategory === "COACH" && (
                  <div className="space-y-4 pt-2">
                    <h3 className="text-sm font-black text-[#0A3D91] uppercase tracking-wider border-b border-slate-100 pb-2">
                      Coaching Credentials
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Coaching Level *</label>
                        <select
                          value={formData.coachingLevel}
                          onChange={(e) => handleInputChange("coachingLevel", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                        >
                          <option>Level 1 State Certified</option>
                          <option>Level 2 Advanced Certified</option>
                          <option>Level 3 Master National Trainer</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Academic Qualification</label>
                        <input
                          type="text"
                          value={formData.qualification}
                          onChange={(e) => handleInputChange("qualification", e.target.value)}
                          placeholder="e.g. B.P.Ed / Certified Skating Instructor"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedCategory === "DISTRICT" && (
                  <div className="space-y-4 pt-2">
                    <h3 className="text-sm font-black text-[#0A3D91] uppercase tracking-wider border-b border-slate-100 pb-2">
                      District Executive Office Bearers
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">District President Name</label>
                        <input
                          type="text"
                          value={formData.presidentName}
                          onChange={(e) => handleInputChange("presidentName", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">General Secretary Name</label>
                        <input
                          type="text"
                          value={formData.secretaryName}
                          onChange={(e) => handleInputChange("secretaryName", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Treasurer Name</label>
                        <input
                          type="text"
                          value={formData.treasurerName}
                          onChange={(e) => handleInputChange("treasurerName", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1 Actions */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 bg-[#0A3D91] hover:bg-[#083279] text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md transition"
                  >
                    <span>Proceed to Document Uploads</span>
                    <ArrowRight className="w-4 h-4 text-[#F57C00]" />
                  </button>
                </div>
              </div>
            )}

            {/* FORM STEP 2: DOCUMENT UPLOADS & DIGITAL SIGNATURE */}
            {step === 2 && (
              <div className="p-6 md:p-8 space-y-6">
                <h3 className="text-sm font-black text-[#0A3D91] uppercase tracking-wider border-b border-slate-100 pb-2">
                  Document Uploads & Digital Signature
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  {/* Upload 1 */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                    <Upload className="w-8 h-8 text-[#0A3D91] mb-2" />
                    <span className="font-bold text-slate-800">Applicant Passport Photo *</span>
                    <span className="text-[10px] text-slate-400 mt-1">JPEG/PNG max 2MB</span>
                    <label className="mt-3 bg-[#0A3D91] text-white px-3 py-1.5 rounded-lg font-bold text-[11px] cursor-pointer hover:bg-[#083279]">
                      Choose File
                      <input type="file" className="hidden" />
                    </label>
                  </div>

                  {/* Upload 2 */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                    <Upload className="w-8 h-8 text-[#F57C00] mb-2" />
                    <span className="font-bold text-slate-800">Aadhaar Card / ID Proof *</span>
                    <span className="text-[10px] text-slate-400 mt-1">PDF or Image</span>
                    <label className="mt-3 bg-[#F57C00] text-white px-3 py-1.5 rounded-lg font-bold text-[11px] cursor-pointer hover:bg-orange-600">
                      Choose File
                      <input type="file" className="hidden" />
                    </label>
                  </div>

                  {/* Upload 3 */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                    <FileText className="w-8 h-8 text-emerald-600 mb-2" />
                    <span className="font-bold text-slate-800">Birth Certificate / Age Proof *</span>
                    <span className="text-[10px] text-slate-400 mt-1">PDF or Image</span>
                    <label className="mt-3 bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-bold text-[11px] cursor-pointer hover:bg-emerald-700">
                      Choose File
                      <input type="file" className="hidden" />
                    </label>
                  </div>

                  {/* Upload 4 */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                    <FileText className="w-8 h-8 text-purple-600 mb-2" />
                    <span className="font-bold text-slate-800">Medical Fitness Certificate</span>
                    <span className="text-[10px] text-slate-400 mt-1">Doctor signed PDF</span>
                    <label className="mt-3 bg-purple-600 text-white px-3 py-1.5 rounded-lg font-bold text-[11px] cursor-pointer hover:bg-purple-700">
                      Choose File
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>

                {/* Digital Signature Drawing Canvas */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Digital Signature (Draw On Screen)</span>
                      <span className="text-[10px] text-slate-400">Use finger on mobile or mouse to sign</span>
                    </div>
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="text-xs text-rose-600 hover:text-rose-800 font-bold underline"
                    >
                      Clear Signature
                    </button>
                  </div>
                  <canvas
                    ref={canvasRef}
                    width={500}
                    height={120}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="w-full h-28 bg-white border border-slate-300 rounded-xl cursor-crosshair shadow-inner"
                  />
                </div>

                {/* Terms acceptance declaration */}
                <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="termsAccept"
                    checked={formData.acceptedTerms}
                    onChange={(e) => handleInputChange("acceptedTerms", e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#0A3D91] rounded"
                  />
                  <label htmlFor="termsAccept" className="text-xs text-slate-700 leading-relaxed cursor-pointer">
                    I solemnly declare that the information provided is accurate and authentic. I agree to abide by the official rules, regulations, anti-doping policies, and disciplinary codes of the <strong>Rajasthan Aeroskatoball Association (RAA)</strong> and <strong>Aeroskatoball Federation of India (AFI)</strong>.
                  </label>
                </div>

                {/* Step 2 Actions */}
                <div className="pt-4 flex justify-between items-center">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    &larr; Back to Details
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!formData.acceptedTerms}
                    className="inline-flex items-center gap-2 bg-[#0A3D91] hover:bg-[#083279] text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md transition disabled:opacity-50"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4 text-[#F57C00]" />
                  </button>
                </div>
              </div>
            )}

            {/* FORM STEP 3: PAYMENT INTEGRATION & SUMMARY */}
            {step === 3 && (
              <div className="p-6 md:p-8 space-y-6">
                <h3 className="text-sm font-black text-[#0A3D91] uppercase tracking-wider border-b border-slate-100 pb-2">
                  Membership Fee Checkout
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Summary Box */}
                  <div className="md:col-span-2 bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                    <h4 className="font-bold text-xs text-[#0A3D91] uppercase">Registration Summary</h4>
                    <div className="text-xs space-y-2 text-slate-700">
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Applicant:</span>
                        <span className="font-bold">{formData.name || "Aman Sharma"}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Category:</span>
                        <span className="font-bold">{currentCategoryObj?.title}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">District:</span>
                        <span className="font-bold">{formData.district} (Rajasthan)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">License Validity:</span>
                        <span className="font-bold text-emerald-700">1 Year (Till 31-03-2027)</span>
                      </div>
                      <div className="flex justify-between py-2 text-sm">
                        <span className="font-bold text-slate-900">Total Payable:</span>
                        <span className="font-black text-xl text-[#0A3D91]">
                          ₹ {currentCategoryObj?.fee || 0}/-
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Gateway Box */}
                  <div className="bg-gradient-to-br from-[#0A3D91] to-[#041c49] text-white p-5 rounded-2xl flex flex-col justify-between shadow-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Lock className="w-4 h-4 text-[#F57C00]" />
                        <span className="text-xs font-bold">256-Bit SSL Secure</span>
                      </div>
                      <p className="text-xs text-blue-200 leading-relaxed">
                        Official Payment Gateway (Razorpay &bull; UPI &bull; Net Banking &bull; Cards). Instant verification pass generated upon payment.
                      </p>
                    </div>

                    <button
                      onClick={handleFinalSubmit}
                      disabled={loading}
                      className="w-full bg-[#F57C00] hover:bg-orange-600 text-white font-extrabold py-3 rounded-xl text-xs shadow-lg transition flex items-center justify-center gap-2 mt-4"
                    >
                      {loading ? (
                        <span>Processing Gateway...</span>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>Pay ₹ {currentCategoryObj?.fee || 0} & Submit</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Step 3 Back Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    &larr; Back to Uploads
                  </button>
                </div>
              </div>
            )}

            {/* FORM STEP 4: SUCCESS CONFIRMATION & RECEIPT DOWNLOAD */}
            {step === 4 && submittedReg && (
              <div className="p-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="max-w-md mx-auto">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Registration Submitted Successfully
                  </span>
                  <h2 className="text-2xl font-black text-[#0A3D91] mt-2">
                    Welcome to Rajasthan Aeroskatoball!
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Your application has been received and registered under Registration Number:
                  </p>
                  <div className="font-mono text-lg font-black text-[#F57C00] bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-2">
                    {submittedReg.regNo}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    onClick={downloadReceiptPDF}
                    className="inline-flex items-center gap-2 bg-[#0A3D91] hover:bg-[#083279] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition"
                  >
                    <Download className="w-4 h-4 text-[#F57C00]" />
                    <span>Download Official PDF Receipt</span>
                  </button>

                  <Link
                    href={`/verify?reg=${submittedReg.regNo}`}
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 rounded-xl text-xs font-bold transition"
                  >
                    <QrCode className="w-4 h-4 text-[#0A3D91]" />
                    <span>Check Public QR Verification</span>
                  </Link>

                  <Link
                    href={`/verify?reg=${submittedReg?.regNo || ""}`}
                    className="inline-flex items-center gap-2 bg-[#F57C00] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow transition"
                  >
                    <span>View Public Verification ID &rarr;</span>
                  </Link>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
