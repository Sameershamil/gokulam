import mongoose, { Schema } from "mongoose";
import type { SiteData } from "@/lib/adminData";
import { DEFAULT_SITE_DATA } from "@/lib/adminData";

// MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Mongoose connection caching
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Define Mongoose schema for SiteData
const SiteDataSchema: Schema = new Schema(
  {
    hero: {
      title: { type: String, default: "Explore Kerala" },
      subtitle: { type: String, default: "God's Own Country" },
      description: {
        type: String,
        default:
          "Experience the magic of Kerala with its lush green landscapes, serene backwaters, and rich cultural heritage.",
      },
      image: { type: String, default: "/assets/hero-kerala.jpg" },
      ctaText: { type: String, default: "Plan Your Trip" },
      ctaLink: { type: String, default: "#packages" },
    },
    services: {
      type: [
        {
          title: { type: String },
          description: { type: String },
          icon: { type: String },
        },
      ],
      default: [],
    },
    destinations: {
      type: [
        {
          title: { type: String },
          description: { type: String },
          image: { type: String },
          location: { type: String },
          price: { type: String },
        },
      ],
      default: [],
    },
    packages: {
      type: [
        {
          title: { type: String },
          description: { type: String },
          price: { type: String },
          duration: { type: String },
          features: { type: [String] },
        },
      ],
      default: [],
    },
    gallery: {
      type: [
        {
          id: { type: String },
          url: { type: String },
          alt: { type: String },
          isTall: { type: Boolean, default: false },
        },
      ],
      default: [],
    },
    testimonials: {
      type: [
        {
          name: { type: String },
          role: { type: String },
          image: { type: String },
          content: { type: String },
          rating: { type: Number },
        },
      ],
      default: [],
    },
    whyUs: {
      type: [
        {
          title: { type: String },
          description: { type: String },
          icon: { type: String },
        },
      ],
      default: [],
    },
    contact: {
      address: { type: String, default: "" },
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
    },
    meta: {
      title: { type: String, default: "Gokulam Journeys" },
      description: { type: String, default: "" },
      keywords: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

// Create or get the SiteData model
const SiteDataModel =
  mongoose.models.SiteData || mongoose.model<SiteData>("SiteData", SiteDataSchema);

// Read data from MongoDB
export async function readDB(): Promise<SiteData> {
  await dbConnect();

  try {
    // Try to find the existing site data
    let siteData = await SiteDataModel.findOne();

    if (!siteData) {
      // If no data exists, create it with defaults
      siteData = new SiteDataModel(DEFAULT_SITE_DATA);
      await siteData.save();
    }

    // Convert Mongoose document to plain object
    return siteData.toObject();
  } catch (error) {
    console.error("Error reading from MongoDB, using defaults:", error);
    return DEFAULT_SITE_DATA;
  }
}

// Write data to MongoDB
export async function writeDB(data: SiteData): Promise<void> {
  await dbConnect();

  try {
    // Update the existing data or create new if it doesn't exist
    await SiteDataModel.findOneAndUpdate({}, data, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  } catch (error) {
    console.error("Error writing to MongoDB:", error);
    throw error;
  }
}
