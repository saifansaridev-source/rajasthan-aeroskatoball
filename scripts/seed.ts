import bcrypt from "bcryptjs";
import connectDB from "../lib/db";
import { User, Circular, GalleryItem, Event } from "../models";

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

  // 2. Circulars
  await Circular.deleteMany({});
  await Circular.insertMany([
    {
      title: "Notice: Mandatory Anti-Doping Code & Fair Play Declaration",
      description: "Official declaration required for all participants in state championships.",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      category: "CIRCULAR",
      publishDate: new Date(),
    },
    {
      title: "Circular No. 01/2026: Technical Regulations & Equipment Specifications",
      description: "Updated technical guidelines for Speed and Team Aeroskatoball.",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      category: "RULEBOOK",
      publishDate: new Date(),
    },
  ]);

  // 3. Gallery Items
  await GalleryItem.deleteMany({});
  await GalleryItem.insertMany([
    {
      title: "Action Shot: State Selection Trials 2026",
      description: "Speed division action during state selection trials.",
      type: "PHOTO",
      url: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=800&auto=format&fit=crop",
      albumName: "State Selection 2026",
    },
    {
      title: "Award Ceremony: Junior Champions",
      description: "Winners celebrating during medal distribution.",
      type: "PHOTO",
      url: "https://images.unsplash.com/photo-1517649763962-0c623266010b?q=80&w=800&auto=format&fit=crop",
      albumName: "State Selection 2026",
    },
  ]);

  // 4. Events
  await Event.deleteMany({});
  await Event.create({
    title: "1st Rajasthan State Aeroskatoball Championship 2026",
    description: "The premier annual state championship. Winners in Sub-Junior, Junior, and Senior divisions earn selection to Team Rajasthan.",
    image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=800&auto=format&fit=crop",
    startDate: new Date("2026-10-14"),
    endDate: new Date("2026-10-16"),
    venue: "Bharatpur District Sports Stadium Arena",
    district: "Bharatpur",
    discipline: "Speed & Team Aeroskatoball",
    brochureUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  });

  console.log("✅ MongoDB Seeding completed successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
