import mongoose, { Schema, Document as MongooseDoc, Model } from "mongoose";

// ==========================================
// 1. USER (RBAC)
// ==========================================
export interface IUser extends MongooseDoc {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "SUPER_ADMIN" | "ADMIN" | "DISTRICT_ADMIN" | "MEMBER";
  district?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String },
    role: { type: String, default: "MEMBER" },
    district: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

// ==========================================
// 2. REGISTRATION (Player, Coach, District, Club, Official, Referee, Volunteer)
// ==========================================
export interface IRegistration extends MongooseDoc {
  regNo: string;
  type: "PLAYER" | "COACH" | "DISTRICT" | "CLUB" | "OFFICIAL" | "REFEREE" | "VOLUNTEER";
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED" | "EXPIRED" | "RENEWAL_DUE";
  name: string;
  email: string;
  phone: string;
  dob?: string;
  gender?: string;
  bloodGroup?: string;
  aadhaar?: string;
  fatherName?: string;
  motherName?: string;
  address?: string;
  district: string;
  state: string;
  pincode?: string;
  emergencyContact?: string;
  photoUrl?: string;
  signatureUrl?: string;
  
  // Specific details
  sportsDetails?: any;
  coachDetails?: any;
  districtDetails?: any;
  clubDetails?: any;

  // Payments
  paymentStatus: "PAID" | "PENDING" | "FAILED";
  paymentAmount: number;
  paymentTxnId?: string;
  paidAt?: Date;

  // Suspension
  suspension?: {
    reason: string;
    from: string;
    till: string;
    duration: string;
    remarks: string;
    evidenceUrl?: string;
    autoReactivate: boolean;
    permanent: boolean;
  };

  validUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>(
  {
    regNo: { type: String, required: true, unique: true, index: true },
    type: { type: String, required: true, index: true },
    status: { type: String, default: "PENDING", index: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: String },
    gender: { type: String },
    bloodGroup: { type: String },
    aadhaar: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    address: { type: String },
    district: { type: String, required: true, index: true },
    state: { type: String, default: "Rajasthan" },
    pincode: { type: String },
    emergencyContact: { type: String },
    photoUrl: { type: String },
    signatureUrl: { type: String },
    sportsDetails: { type: Schema.Types.Mixed },
    coachDetails: { type: Schema.Types.Mixed },
    districtDetails: { type: Schema.Types.Mixed },
    clubDetails: { type: Schema.Types.Mixed },
    paymentStatus: { type: String, default: "PAID" },
    paymentAmount: { type: Number, default: 500 },
    paymentTxnId: { type: String },
    paidAt: { type: Date },
    suspension: { type: Schema.Types.Mixed },
    validUntil: { type: Date },
  },
  { timestamps: true }
);

// ==========================================
// 3. CHAMPIONSHIP / EVENT
// ==========================================
export interface IEvent extends MongooseDoc {
  title: string;
  description: string;
  image?: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED";
  startDate: Date;
  endDate?: Date;
  venue: string;
  district: string;
  discipline?: string;
  ageGroup?: string;
  entryFee?: number;
  brochureUrl?: string;
  mapEmbedUrl?: string;
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    status: { type: String, default: "UPCOMING" },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    venue: { type: String, required: true },
    district: { type: String, required: true },
    discipline: { type: String, default: "Aeroskatoball Championship" },
    ageGroup: { type: String, default: "All Categories" },
    entryFee: { type: Number, default: 500 },
    brochureUrl: { type: String },
    mapEmbedUrl: { type: String },
  },
  { timestamps: true }
);

// ==========================================
// 4. CIRCULARS & DOWNLOADS
// ==========================================
export interface ICircular extends MongooseDoc {
  title: string;
  description?: string;
  fileUrl: string;
  category: "RULE_BOOK" | "CIRCULAR" | "FORM" | "SELECTION_POLICY" | "CALENDAR" | "CERTIFICATE";
  fileSize?: string;
  fileType?: string;
  publishDate: Date;
  createdAt: Date;
}

const CircularSchema = new Schema<ICircular>(
  {
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true },
    category: { type: String, default: "CIRCULAR" },
    fileSize: { type: String, default: "1.2 MB" },
    fileType: { type: String, default: "PDF" },
    publishDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ==========================================
// 5. GALLERY ITEM
// ==========================================
export interface IGalleryItem extends MongooseDoc {
  title: string;
  description?: string;
  type: "PHOTO" | "VIDEO";
  url: string;
  albumName?: string;
  createdAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, default: "PHOTO" },
    url: { type: String, required: true },
    albumName: { type: String, default: "Championship Highlights" },
  },
  { timestamps: true }
);

// ==========================================
// 6. AUDIT LOG
// ==========================================
export interface IAuditLogModel extends MongooseDoc {
  action: string;
  performedBy: string;
  target: string;
  details: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLogModel>(
  {
    action: { type: String, required: true },
    performedBy: { type: String, required: true },
    target: { type: String, required: true },
    details: { type: String, required: true },
  },
  { timestamps: true }
);

// Export Models with cached guards
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export const Registration: Model<IRegistration> = mongoose.models.Registration || mongoose.model<IRegistration>("Registration", RegistrationSchema);
export const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
export const Circular: Model<ICircular> = mongoose.models.Circular || mongoose.model<ICircular>("Circular", CircularSchema);
export const GalleryItem: Model<IGalleryItem> = mongoose.models.GalleryItem || mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);
export const AuditLog: Model<IAuditLogModel> = mongoose.models.AuditLog || mongoose.model<IAuditLogModel>("AuditLog", AuditLogSchema);
