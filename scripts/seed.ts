import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "../lib/db";
import {
  User,
  SiteSettings,
  HeroSlide,
  OfficeBearer,
  NewsPost,
  Circular,
  Document,
  Event,
  EventResult,
  Player,
  Coach,
  Referee,
  Academy,
  DistrictAssociation,
  GalleryItem,
  Sponsor,
} from "../models";

async function main() {
  console.log("Seeding Rajasthan Aeroskatoball Association MongoDB Database...");

  await connectDB();

  // 1. Super Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await User.findOneAndUpdate(
    { email: "admin@rajasthanaeroskatoball.org" },
    {
      email: "admin@rajasthanaeroskatoball.org",
      name: "State Admin",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
    { upsert: true, new: true }
  );

  // 2. Site Settings
  const existingSettings = await SiteSettings.findOne();
  if (!existingSettings) {
    await SiteSettings.create({
      assocName: "Rajasthan Aeroskatoball Association",
      cin: "U88900RJ2026NPL112235",
      registeredOffice: "Flat 102, Sports Enclave, Circular Road, Bharatpur, Rajasthan - 321001",
      email: "info@rajasthanaeroskatoball.org",
      phone: "+91 94140 12345",
      whatsapp: "919414012345",
      heroTitle: "Official Aeroskatoball Body of Rajasthan",
      heroSubtitle: "Affiliated Sports Association dedicated to nurturing world-class skaters, coaches, and referees.",
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com",
      youtubeUrl: "https://youtube.com",
      twitterUrl: "https://x.com",
      googleMapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.214!2d77.49!3d27.21",
    });
  }

  // 3. Hero Slides
  await HeroSlide.deleteMany({});
  await HeroSlide.insertMany([
    {
      title: "1st Rajasthan State Aeroskatoball Championship 2026",
      subtitle: "Bharatpur Sports Complex | October 14 - 16, 2026. Register now to participate.",
      imageUrl: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=1600&auto=format&fit=crop",
      ctaText: "Register for Championship",
      ctaLink: "/register",
      order: 1,
      active: true,
    },
    {
      title: "Statewide Player & Academy Annual Registration Open",
      subtitle: "Get official affiliation, player ranking eligibility, and national pathway access.",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623266010b?q=80&w=1600&auto=format&fit=crop",
      ctaText: "Annual Player Registration",
      ctaLink: "/register",
      order: 2,
      active: true,
    },
    {
      title: "Certified Referee & Coaching Clinic 2026",
      subtitle: "Level-1 Technical Certification Seminar led by National Master Instructors in Jaipur.",
      imageUrl: "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?q=80&w=1600&auto=format&fit=crop",
      ctaText: "Apply as Coach / Referee",
      ctaLink: "/register",
      order: 3,
      active: true,
    },
  ]);

  // 4. Office Bearers
  await OfficeBearer.deleteMany({});
  await OfficeBearer.insertMany([
    {
      name: "Rajeshwar Singh Rathore",
      designation: "President",
      category: "Key Bearer",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      bio: "Former National Athlete & Advocate for Grassroots Sports Infrastructure in Rajasthan.",
      phone: "+91 94140 11111",
      email: "president@rajasthanaeroskatoball.org",
      order: 1,
    },
    {
      name: "Dr. Surendra Kumar Sharma",
      designation: "General Secretary",
      category: "Key Bearer",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      bio: "Sports Administrator and promoter of modern skating disciplines across western India.",
      phone: "+91 94140 22222",
      email: "secretary@rajasthanaeroskatoball.org",
      order: 2,
    },
    {
      name: "Anita Verma",
      designation: "Treasurer",
      category: "Key Bearer",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
      bio: "Chartered Accountant overseeing financial transparency and athlete development grants.",
      phone: "+91 94140 33333",
      email: "treasurer@rajasthanaeroskatoball.org",
      order: 3,
    },
    {
      name: "Vikas Choudhary",
      designation: "District Coordinator - Bharatpur",
      category: "District Coordinator",
      district: "Bharatpur",
      phone: "+91 98290 44444",
      email: "bharatpur@rajasthanaeroskatoball.org",
      order: 4,
    },
    {
      name: "Mahendra Singh",
      designation: "District Coordinator - Jaipur",
      category: "District Coordinator",
      district: "Jaipur",
      phone: "+91 98290 55555",
      email: "jaipur@rajasthanaeroskatoball.org",
      order: 5,
    },
    {
      name: "Sujata Shekhawat",
      designation: "District Coordinator - Jodhpur",
      category: "District Coordinator",
      district: "Jodhpur",
      phone: "+91 98290 66666",
      email: "jodhpur@rajasthanaeroskatoball.org",
      order: 6,
    },
  ]);

  // 5. News Posts
  await NewsPost.deleteMany({});
  await NewsPost.insertMany([
    {
      title: "Rajasthan Aeroskatoball Association Officially Incorporated Under Section 8",
      slug: "association-official-incorporation-2026",
      summary: "With CIN U88900RJ2026NPL112235 registered at ROC Jaipur, the association pledges a modern, transparent framework for athletes.",
      content: "<p>The <strong>Rajasthan Aeroskatoball Association</strong> is proud to announce its official incorporation under Section 8 of the Companies Act, 2013 (CIN: U88900RJ2026NPL112235), effective March 09, 2026.</p>",
      coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
      published: true,
      featured: true,
    },
    {
      title: "Dates Announced for 1st State Selection Trials in Bharatpur",
      slug: "state-selection-trials-bharatpur-2026",
      summary: "Selection trials for Junior & Senior divisions will take place on October 14th at the Bharatpur Outdoor Skating Arena.",
      content: "<p>All affiliated district units and registered players are hereby notified that the official 1st State Selection Trials will be conducted at the Bharatpur Outdoor Skating Arena on October 14-16, 2026.</p>",
      coverImage: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=800&auto=format&fit=crop",
      published: true,
      featured: false,
    },
    {
      title: "Online Certificate & Player Identity Card System Launched",
      slug: "online-certificate-verification-launched",
      summary: "Athletes and institutions can now verify affiliation certificates and player IDs instantly via the state portal.",
      content: "<p>In line with modern digital sports administration, Rajasthan Aeroskatoball Association introduces digital player IDs with instant QR/Registration verification.</p>",
      coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
      published: true,
      featured: false,
    },
  ]);

  // 6. Circulars
  await Circular.deleteMany({});
  await Circular.insertMany([
    {
      title: "Circular No. 01/2026: Mandatory Annual Player & Academy Registration Guidelines",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      category: "CIRCULAR",
      isNew: true,
    },
    {
      title: "Circular No. 02/2026: Technical Regulations & Equipment Specifications for Aeroskatoball 2026-27",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      category: "RULEBOOK",
      isNew: true,
    },
    {
      title: "Notice: Anti-Doping Code & Fair Play Compliance Mandatory Declaration",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      category: "CIRCULAR",
      isNew: false,
    },
  ]);

  // 7. Documents
  await Document.deleteMany({});
  await Document.insertMany([
    {
      title: "Official State Player Membership Application Form (Offline Copy)",
      description: "Printable PDF form for district units submitting batch physical applications.",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      category: "MEMBERSHIP",
    },
    {
      title: "Official Aeroskatoball Rule Book (2026 Edition)",
      description: "Comprehensive guidelines on court dimensions, scoring system, safety gear, and referee signaling.",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      category: "RULEBOOK",
    },
    {
      title: "State Championship Entry Form & Medical Fitness Certificate Template",
      description: "Mandatory medical checkup format required prior to tournament weigh-in.",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      category: "TOURNAMENT",
    },
  ]);

  // 8. Events
  await Event.deleteMany({});
  await Event.create({
    title: "1st Rajasthan State Aeroskatoball Championship 2026",
    slug: "1st-rajasthan-state-aeroskatoball-championship-2026",
    startDate: new Date("2026-10-14"),
    endDate: new Date("2026-10-16"),
    venue: "Bharatpur District Sports Stadium Arena",
    district: "Bharatpur",
    discipline: "Speed & Team Aeroskatoball",
    entryFee: 500,
    brochureUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description: "The premier annual state championship. Winners in Sub-Junior, Junior, and Senior divisions earn direct selection to Team Rajasthan for the National Games.",
    regOpen: true,
    results: [
      {
        category: "Senior Men Division 1",
        winnerName: "Amanpreet Singh (Bharatpur)",
        runnerUp: "Karan Sharma (Jaipur)",
        thirdPlace: "Yashwardhan Rathore (Jodhpur)",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
  });

  // 9. Players
  await Player.deleteMany({});
  await Player.insertMany([
    {
      regNumber: "RAJ-AERO-2026-001",
      name: "Amanpreet Singh",
      dob: "2004-05-12",
      district: "Bharatpur",
      discipline: "Speed Aeroskatoball",
      photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop",
      rank: 1,
      achievements: "Gold Medalist - 1st Rajasthan State Selection Trials 2026",
    },
    {
      regNumber: "RAJ-AERO-2026-002",
      name: "Karan Sharma",
      dob: "2005-08-20",
      district: "Jaipur",
      discipline: "Speed Aeroskatoball",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
      rank: 2,
      achievements: "Silver Medalist - Jaipur District Championship 2026",
    },
    {
      regNumber: "RAJ-AERO-2026-003",
      name: "Priya Kanwar",
      dob: "2006-02-14",
      district: "Jodhpur",
      discipline: "Team Aeroskatoball (Women)",
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
      rank: 1,
      achievements: "Captain - Team Jodhpur, Best Attacker Award 2026",
    },
  ]);

  // 10. Academies & District Associations
  await Academy.deleteMany({});
  await Academy.insertMany([
    {
      name: "Royal Skaters Aeroskatoball Academy",
      district: "Bharatpur",
      address: "Near Lohagarh Stadium Gate 2, Bharatpur",
      coachName: "Vikas Choudhary (Level 2 Certified)",
      phone: "+91 98290 44444",
      email: "royalskaters@gmail.com",
      photoUrl: "https://images.unsplash.com/photo-1517649763962-0c623266010b?q=80&w=500&auto=format&fit=crop",
      isApproved: true,
    },
    {
      name: "Jaipur Aeroskatoball Sports Hub",
      district: "Jaipur",
      address: "Mansarovar Sports Complex, Jaipur",
      coachName: "Mahendra Singh (Level 3 National Coach)",
      phone: "+91 98290 55555",
      email: "jaipurhub@skate.org",
      photoUrl: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=500&auto=format&fit=crop",
      isApproved: true,
    },
  ]);

  await DistrictAssociation.deleteMany({});
  await DistrictAssociation.insertMany([
    {
      districtName: "Bharatpur District Aeroskatoball Association",
      contactPerson: "Vikas Choudhary",
      designation: "Secretary",
      phone: "+91 98290 44444",
      email: "bharatpur@rajasthanaeroskatoball.org",
      address: "Circular Road, Bharatpur",
    },
    {
      districtName: "Jaipur District Aeroskatoball Association",
      contactPerson: "Mahendra Singh",
      designation: "Secretary",
      phone: "+91 98290 55555",
      email: "jaipur@rajasthanaeroskatoball.org",
      address: "MI Road, Jaipur",
    },
    {
      districtName: "Jodhpur District Aeroskatoball Association",
      contactPerson: "Sujata Shekhawat",
      designation: "Secretary",
      phone: "+91 98290 66666",
      email: "jodhpur@rajasthanaeroskatoball.org",
      address: "Ratanada, Jodhpur",
    },
  ]);

  // 11. Gallery Items
  await GalleryItem.deleteMany({});
  await GalleryItem.insertMany([
    {
      title: "Action Shot: State Selection Trials 2026",
      type: "PHOTO",
      url: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=800&auto=format&fit=crop",
      albumName: "State Selection 2026",
      featured: true,
    },
    {
      title: "Medal Ceremony: Junior Division Champions",
      type: "PHOTO",
      url: "https://images.unsplash.com/photo-1517649763962-0c623266010b?q=80&w=800&auto=format&fit=crop",
      albumName: "State Selection 2026",
      featured: true,
    },
    {
      title: "Federation TV: Aeroskatoball Rules & Gameplay Demo",
      type: "VIDEO",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnailUrl: "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?q=80&w=800&auto=format&fit=crop",
      albumName: "Tutorials & TV",
      featured: true,
    },
  ]);

  // 12. Sponsors
  await Sponsor.deleteMany({});
  await Sponsor.insertMany([
    {
      name: "Rajasthan State Sports Council (Support Partner)",
      logoUrl: "https://via.placeholder.com/200x80?text=RSSC+Partner",
      website: "https://rssc.in",
      order: 1,
    },
    {
      name: "AeroSkate India Gear Co.",
      logoUrl: "https://via.placeholder.com/200x80?text=AeroSkate+Gear",
      website: "https://aeroskate.in",
      order: 2,
    },
    {
      name: "Bharatpur Health & Fitness Partner",
      logoUrl: "https://via.placeholder.com/200x80?text=Bharatpur+Fitness",
      website: "https://bharatpurfitness.com",
      order: 3,
    },
  ]);

  console.log("✅ MongoDB Seeding completed successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
