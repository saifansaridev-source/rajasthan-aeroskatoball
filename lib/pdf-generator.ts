import jsPDF from "jspdf";

export interface RegistrationReceiptData {
  regNumber: string;
  applicantName: string;
  type: string;
  email: string;
  phone: string;
  district: string;
  discipline?: string;
  amount: number;
  paymentId?: string;
  date: string;
  status: string;
}

export function generateRegistrationReceiptPDF(data: RegistrationReceiptData) {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(30, 58, 138); // Deep Navy #1E3A8A
  doc.rect(0, 0, 210, 35, "F");

  doc.setFillColor(245, 130, 32); // Saffron Accent #F58220
  doc.rect(0, 35, 210, 4, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("RAJASTHAN AEROSKATOBALL ASSOCIATION", 105, 16, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Recognized Sports Association | CIN: U88900RJ2026NPL112235", 105, 24, { align: "center" });
  doc.text("Headquarters: Bharatpur, Rajasthan, India | www.rajasthanaeroskatoball.org", 105, 30, { align: "center" });

  // Receipt Title
  doc.setTextColor(30, 58, 138);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("OFFICIAL REGISTRATION ACKNOWLEDGEMENT & RECEIPT", 105, 50, { align: "center" });

  // Details Box
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.rect(15, 60, 180, 130);

  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);

  const startY = 72;
  const lineHeight = 10;

  const rows = [
    ["Registration No.:", data.regNumber],
    ["Applicant Name:", data.applicantName],
    ["Category / Type:", data.type.toUpperCase()],
    ["District:", data.district],
    ["Discipline:", data.discipline || "Aeroskatoball General"],
    ["Email:", data.email],
    ["Phone:", data.phone],
    ["Registration Date:", data.date],
    ["Payment Status:", data.status.toUpperCase()],
    ["Amount Paid:", `INR ${data.amount}.00`],
    ["Payment Transaction ID:", data.paymentId || "ONLINE_RAZORPAY_TEST"],
  ];

  rows.forEach(([label, value], index) => {
    const y = startY + index * lineHeight;
    doc.setFont("helvetica", "bold");
    doc.text(label, 25, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, 90, y);
  });

  // Footer notes & stamp
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text("This is a computer-generated official receipt. Subject to document verification by Rajasthan Aeroskatoball Association.", 105, 205, { align: "center" });

  // Digital Stamp Box
  doc.setDrawColor(245, 130, 32);
  doc.rect(140, 220, 50, 25);
  doc.setTextColor(30, 58, 138);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("DIGITALLY VERIFIED", 165, 230, { align: "center" });
  doc.text("RAA BHARATPUR", 165, 238, { align: "center" });

  return doc;
}
