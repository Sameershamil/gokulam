import mongoose, { Schema } from "mongoose";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { SiteData } from "@/lib/adminData";
import { DEFAULT_SITE_DATA } from "@/lib/adminData";

// Get directory for database file (fallback JSON)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, "../../data");
const DB_PATH = path.join(DATA_DIR, "db.json");

// Ensure data directory exists
function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Read data from JSON file (fallback)
function readDBFallback(): SiteData {
  ensureDataDir();
  if (existsSync(DB_PATH)) {
    try {
      const data = readFileSync(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading fallback JSON DB, using defaults:", error);
      return DEFAULT_SITE_DATA;
    }
  } else {
    writeDBFallback(DEFAULT_SITE_DATA);
    return DEFAULT_SITE_DATA;
  }
}

// Write data to JSON file (fallback)
function writeDBFallback(data: SiteData): void {
  ensureDataDir();
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || "";

// Mongoose connection caching
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) {
    console.warn("MONGODB_URI not set, using JSON fallback");
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).catch((error) => {
      console.error("MongoDB connection failed, using JSON fallback:", error);
      return null;
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

// Create or get the SiteData model only if connected
function getSiteDataModel() {
  if (!mongoose.connection || mongoose.connection.readyState !== 1) {
    return null;
  }
  return mongoose.models.SiteData || mongoose.model<SiteData>("SiteData", SiteDataSchema);
}

// Read data with fallback
export async function readDB(): Promise<SiteData> {
  const conn = await dbConnect();

  if (conn) {
    try {
      const SiteDataModel = getSiteDataModel();
      if (SiteDataModel) {
        let siteData = await SiteDataModel.findOne();
        if (!siteData) {
          siteData = new SiteDataModel(DEFAULT_SITE_DATA);
          await siteData.save();
        }
        return siteData.toObject();
      }
    } catch (error) {
      console.error("Error reading from MongoDB, falling back to JSON:", error);
    }
  }

  return readDBFallback();
}

// Write data with fallback
export async function writeDB(data: SiteData): Promise<void> {
  const conn = await dbConnect();

  if (conn) {
    try {
      const SiteDataModel = getSiteDataModel();
      if (SiteDataModel) {
        await SiteDataModel.findOneAndUpdate({}, data, {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        });
        // Also write to JSON as backup
        writeDBFallback(data);
        return;
      }
    } catch (error) {
      console.error("Error writing to MongoDB, falling back to JSON:", error);
    }
  }

  writeDBFallback(data);
}
