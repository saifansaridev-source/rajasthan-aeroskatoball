import mongoose, { Schema, Document as MongooseDoc, Model } from "mongoose";

// ==========================================
// 1. USER
// ==========================================
export interface IUser extends MongooseDoc {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR";
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
// 2. CIRCULAR & DOWNLOAD
// ==========================================
export interface ICircular extends MongooseDoc {
  title: string;
  description?: string;
  fileUrl: string;
  category?: string;
  publishDate: Date;
  createdAt: Date;
}

const CircularSchema = new Schema<ICircular>(
  {
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true },
    category: { type: String, default: "CIRCULAR" },
    publishDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ==========================================
// 3. GALLERY ITEM
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
// 4. EVENT / TOURNAMENT
// ==========================================
export interface IEvent extends MongooseDoc {
  title: string;
  description: string;
  image?: string;
  startDate: Date;
  endDate?: Date;
  venue: string;
  district: string;
  discipline?: string;
  brochureUrl?: string;
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    venue: { type: String, required: true },
    district: { type: String, required: true },
    discipline: { type: String, default: "Aeroskatoball Championship" },
    brochureUrl: { type: String },
  },
  { timestamps: true }
);

// Export Models
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export const Circular: Model<ICircular> = mongoose.models.Circular || mongoose.model<ICircular>("Circular", CircularSchema);
export const GalleryItem: Model<IGalleryItem> = mongoose.models.GalleryItem || mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);
export const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
