import mongoose, { Schema, Document as MongooseDoc, Model } from "mongoose";

// ==========================================
// 1. USER
// ==========================================
export interface IUser extends MongooseDoc {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "PLAYER" | "COACH" | "REFEREE" | "ACADEMY";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: "ADMIN" },
    avatar: { type: String },
  },
  { timestamps: true }
);

// ==========================================
// 2. SITE SETTINGS
// ==========================================
export interface ISiteSettings extends MongooseDoc {
  assocName: string;
  cin: string;
  registeredOffice: string;
  email: string;
  phone: string;
  whatsapp: string;
  heroTitle: string;
  heroSubtitle: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
  googleMapEmbed?: string;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    assocName: { type: String, default: "Rajasthan Aeroskatoball Association" },
    cin: { type: String, default: "U88900RJ2026NPL112235" },
    registeredOffice: { type: String, default: "Bharatpur, Rajasthan, India" },
    email: { type: String, default: "contact@rajasthanaeroskatoball.org" },
    phone: { type: String, default: "+91 98765 43210" },
    whatsapp: { type: String, default: "919876543210" },
    heroTitle: { type: String, default: "Promoting Aeroskatoball Across Rajasthan" },
    heroSubtitle: { type: String, default: "Official State Sports Body for Aeroskatoball Development & Championships" },
    facebookUrl: { type: String },
    instagramUrl: { type: String },
    youtubeUrl: { type: String },
    twitterUrl: { type: String },
    googleMapEmbed: { type: String },
  },
  { timestamps: true }
);

// ==========================================
// 3. OFFICE BEARER
// ==========================================
export interface IOfficeBearer extends MongooseDoc {
  name: string;
  designation: string;
  category: "Key Bearer" | "Executive Committee" | "District Coordinator";
  district?: string;
  photo?: string;
  bio?: string;
  phone?: string;
  email?: string;
  order: number;
  createdAt: Date;
}

const OfficeBearerSchema = new Schema<IOfficeBearer>(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    category: { type: String, required: true },
    district: { type: String },
    photo: { type: String },
    bio: { type: String },
    phone: { type: String },
    email: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ==========================================
// 4. HERO SLIDE
// ==========================================
export interface IHeroSlide extends MongooseDoc {
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
  order: number;
  active: boolean;
  createdAt: Date;
}

const HeroSlideSchema = new Schema<IHeroSlide>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    imageUrl: { type: String, required: true },
    ctaText: { type: String },
    ctaLink: { type: String },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ==========================================
// 5. NEWS POST
// ==========================================
export interface INewsPost extends MongooseDoc {
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string;
  published: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NewsPostSchema = new Schema<INewsPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    published: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ==========================================
// 6. CIRCULAR
// ==========================================
export interface ICircular extends MongooseDoc {
  title: string;
  fileUrl: string;
  category: "CIRCULAR" | "RULEBOOK" | "MEMBERSHIP" | "TOURNAMENT" | "CERTIFICATE";
  publishDate: Date;
  isNewCircular: boolean;
  createdAt: Date;
}

const CircularSchema = new Schema<ICircular>(
  {
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    category: { type: String, default: "CIRCULAR" },
    publishDate: { type: Date, default: Date.now },
    isNewCircular: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ==========================================
// 7. DOCUMENT
// ==========================================
export interface IDocument extends MongooseDoc {
  title: string;
  description?: string;
  fileUrl: string;
  category: "MEMBERSHIP" | "TOURNAMENT" | "RULEBOOK" | "CERTIFICATE" | "CIRCULAR";
  createdAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

// ==========================================
// 8. EVENT & EVENT RESULT
// ==========================================
export interface IEventResult {
  id?: string;
  category: string;
  winnerName: string;
  runnerUp: string;
  thirdPlace?: string;
  pdfUrl?: string;
  createdAt?: Date;
}

const EventResultSchema = new Schema<IEventResult>({
  category: { type: String, required: true },
  winnerName: { type: String, required: true },
  runnerUp: { type: String, required: true },
  thirdPlace: { type: String },
  pdfUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export interface IEvent extends MongooseDoc {
  title: string;
  slug: string;
  startDate: Date;
  endDate: Date;
  venue: string;
  district: string;
  discipline: string;
  entryFee: number;
  brochureUrl?: string;
  description: string;
  regOpen: boolean;
  results: IEventResult[];
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    venue: { type: String, required: true },
    district: { type: String, required: true },
    discipline: { type: String, default: "Speed Aeroskatoball" },
    entryFee: { type: Number, default: 500 },
    brochureUrl: { type: String },
    description: { type: String, required: true },
    regOpen: { type: Boolean, default: true },
    results: [EventResultSchema],
  },
  { timestamps: true }
);

export interface IEventResultDoc extends MongooseDoc, IEventResult {
  eventId: string;
}
const StandaloneEventResultSchema = new Schema<IEventResultDoc>({
  eventId: { type: String, required: true },
  category: { type: String, required: true },
  winnerName: { type: String, required: true },
  runnerUp: { type: String, required: true },
  thirdPlace: { type: String },
  pdfUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// ==========================================
// 9. REGISTRATION & PAYMENT
// ==========================================
export interface IRegistration extends MongooseDoc {
  regNumber: string;
  type: "PLAYER" | "COACH" | "REFEREE" | "ACADEMY" | "EVENT_ENTRY";
  applicantName: string;
  dob?: string;
  email: string;
  phone: string;
  district: string;
  discipline?: string;
  address?: string;
  guardianName?: string;
  photoUrl?: string;
  idProofUrl?: string;
  academyName?: string;
  eventId?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  remarks?: string;
  createdAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>(
  {
    regNumber: { type: String, required: true, unique: true, index: true },
    type: { type: String, required: true },
    applicantName: { type: String, required: true },
    dob: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    district: { type: String, required: true },
    discipline: { type: String },
    address: { type: String },
    guardianName: { type: String },
    photoUrl: { type: String },
    idProofUrl: { type: String },
    academyName: { type: String },
    eventId: { type: String },
    status: { type: String, default: "PENDING" },
    remarks: { type: String },
  },
  { timestamps: true }
);

export interface IPayment extends MongooseDoc {
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  registrationId: string;
  amount: number;
  currency: string;
  status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String },
    registrationId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, default: "PENDING" },
  },
  { timestamps: true }
);

// ==========================================
// 10. PLAYER, COACH, REFEREE
// ==========================================
export interface IPlayer extends MongooseDoc {
  regNumber: string;
  name: string;
  dob: string;
  district: string;
  discipline: string;
  photoUrl?: string;
  isPublic: boolean;
  rank?: number;
  achievements?: string;
  createdAt: Date;
}

const PlayerSchema = new Schema<IPlayer>(
  {
    regNumber: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    dob: { type: String, required: true },
    district: { type: String, required: true },
    discipline: { type: String, required: true },
    photoUrl: { type: String },
    isPublic: { type: Boolean, default: true },
    rank: { type: Number },
    achievements: { type: String },
  },
  { timestamps: true }
);

export interface ICoach extends MongooseDoc {
  regNumber: string;
  name: string;
  district: string;
  level: string;
  phone: string;
  email?: string;
  photoUrl?: string;
  isApproved: boolean;
  createdAt: Date;
}

const CoachSchema = new Schema<ICoach>(
  {
    regNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    district: { type: String, required: true },
    level: { type: String, default: "Level 1" },
    phone: { type: String, required: true },
    email: { type: String },
    photoUrl: { type: String },
    isApproved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export interface IReferee extends MongooseDoc {
  regNumber: string;
  name: string;
  district: string;
  grade: string;
  phone: string;
  email?: string;
  photoUrl?: string;
  isApproved: boolean;
  createdAt: Date;
}

const RefereeSchema = new Schema<IReferee>(
  {
    regNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    district: { type: String, required: true },
    grade: { type: String, default: "State Grade A" },
    phone: { type: String, required: true },
    email: { type: String },
    photoUrl: { type: String },
    isApproved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ==========================================
// 11. ACADEMY & DISTRICT ASSOCIATION
// ==========================================
export interface IAcademy extends MongooseDoc {
  name: string;
  district: string;
  address: string;
  coachName: string;
  phone: string;
  email?: string;
  photoUrl?: string;
  isApproved: boolean;
  createdAt: Date;
}

const AcademySchema = new Schema<IAcademy>(
  {
    name: { type: String, required: true },
    district: { type: String, required: true },
    address: { type: String, required: true },
    coachName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    photoUrl: { type: String },
    isApproved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export interface IDistrictAssociation extends MongooseDoc {
  districtName: string;
  contactPerson: string;
  designation: string;
  phone: string;
  email?: string;
  address?: string;
}

const DistrictAssociationSchema = new Schema<IDistrictAssociation>(
  {
    districtName: { type: String, required: true, unique: true },
    contactPerson: { type: String, required: true },
    designation: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

// ==========================================
// 12. GALLERY ALBUM, GALLERY ITEM, VIDEO
// ==========================================
export interface IGalleryAlbum extends MongooseDoc {
  title: string;
  slug: string;
  coverImage?: string;
  createdAt: Date;
}

const GalleryAlbumSchema = new Schema<IGalleryAlbum>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    coverImage: { type: String },
  },
  { timestamps: true }
);

export interface IGalleryItem extends MongooseDoc {
  title: string;
  type: "PHOTO" | "VIDEO";
  url: string;
  thumbnailUrl?: string;
  albumName: string;
  featured: boolean;
  createdAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    url: { type: String, required: true },
    thumbnailUrl: { type: String },
    albumName: { type: String, default: "Championship Highlights" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export interface IVideo extends MongooseDoc {
  title: string;
  youtubeUrl: string;
  thumbnailUrl?: string;
  description?: string;
  createdAt: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

// ==========================================
// 13. SPONSOR, CONTACT MESSAGE
// ==========================================
export interface ISponsor extends MongooseDoc {
  name: string;
  logoUrl: string;
  website?: string;
  order: number;
  createdAt: Date;
}

const SponsorSchema = new Schema<ISponsor>(
  {
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
    website: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export interface IContactMessage extends MongooseDoc {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Export Models
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export const SiteSettings: Model<ISiteSettings> = mongoose.models.SiteSettings || mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
export const OfficeBearer: Model<IOfficeBearer> = mongoose.models.OfficeBearer || mongoose.model<IOfficeBearer>("OfficeBearer", OfficeBearerSchema);
export const HeroSlide: Model<IHeroSlide> = mongoose.models.HeroSlide || mongoose.model<IHeroSlide>("HeroSlide", HeroSlideSchema);
export const NewsPost: Model<INewsPost> = mongoose.models.NewsPost || mongoose.model<INewsPost>("NewsPost", NewsPostSchema);
export const Circular: Model<ICircular> = mongoose.models.Circular || mongoose.model<ICircular>("Circular", CircularSchema);
export const Document: Model<IDocument> = mongoose.models.Document || mongoose.model<IDocument>("Document", DocumentSchema);
export const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
export const EventResult: Model<IEventResultDoc> = mongoose.models.EventResult || mongoose.model<IEventResultDoc>("EventResult", StandaloneEventResultSchema);
export const Registration: Model<IRegistration> = mongoose.models.Registration || mongoose.model<IRegistration>("Registration", RegistrationSchema);
export const Payment: Model<IPayment> = mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);
export const Player: Model<IPlayer> = mongoose.models.Player || mongoose.model<IPlayer>("Player", PlayerSchema);
export const Coach: Model<ICoach> = mongoose.models.Coach || mongoose.model<ICoach>("Coach", CoachSchema);
export const Referee: Model<IReferee> = mongoose.models.Referee || mongoose.model<IReferee>("Referee", RefereeSchema);
export const Academy: Model<IAcademy> = mongoose.models.Academy || mongoose.model<IAcademy>("Academy", AcademySchema);
export const DistrictAssociation: Model<IDistrictAssociation> = mongoose.models.DistrictAssociation || mongoose.model<IDistrictAssociation>("DistrictAssociation", DistrictAssociationSchema);
export const GalleryAlbum: Model<IGalleryAlbum> = mongoose.models.GalleryAlbum || mongoose.model<IGalleryAlbum>("GalleryAlbum", GalleryAlbumSchema);
export const GalleryItem: Model<IGalleryItem> = mongoose.models.GalleryItem || mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);
export const Video: Model<IVideo> = mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);
export const Sponsor: Model<ISponsor> = mongoose.models.Sponsor || mongoose.model<ISponsor>("Sponsor", SponsorSchema);
export const ContactMessage: Model<IContactMessage> = mongoose.models.ContactMessage || mongoose.model<IContactMessage>("ContactMessage", ContactMessageSchema);
