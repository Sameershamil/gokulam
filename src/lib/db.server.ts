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
      const parsed = JSON.parse(data);
      // Merge with defaults to ensure all fields exist
      return deepMerge(DEFAULT_SITE_DATA, parsed) as SiteData;
    } catch (error) {
      console.error("Error reading fallback JSON DB, using defaults:", error);
      return DEFAULT_SITE_DATA;
    }
  } else {
    writeDBFallback(DEFAULT_SITE_DATA);
    return DEFAULT_SITE_DATA;
  }
}

// Deep merge utility for fallback data
function deepMerge(target: unknown, source: unknown): unknown {
  if (Array.isArray(source)) return source;
  if (isObject(target) && isObject(source)) {
    const result: Record<string, unknown> = { ...(target as Record<string, unknown>) };
    for (const key of Object.keys(source as Record<string, unknown>)) {
      const sv = (source as Record<string, unknown>)[key];
      const tv = (target as Record<string, unknown>)[key];
      result[key] = deepMerge(tv, sv);
    }
    return result;
  }
  return source !== undefined ? source : target;
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

// Write data to JSON file (fallback)
function writeDBFallback(data: SiteData): void {
  ensureDataDir();
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || "";

// Mongoose connection caching with type assertion
const globalForMongoose = global as unknown as {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

let cached = globalForMongoose.mongoose;

if (!cached) {
  cached = globalForMongoose.mongoose = { conn: null, promise: null };
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
      cached!.conn = null;
      return null as unknown as typeof mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Define Mongoose schema for SiteData (matches adminData.ts interface)
const SiteDataSchema: Schema = new Schema(
  {
    contact: {
      phone: { type: String, default: "+917559846476" },
      phoneDisplay: { type: String, default: "+91 75598 46476" },
      whatsapp: { type: String, default: "https://wa.me/917559846476" },
      instagram: { type: String, default: "https://instagram.com/gokulam__thulasidas" },
      location: { type: String, default: "Palakkad & Thrissur, Kerala" },
      email: { type: String, default: "info@gokulamholidays.com" },
    },
    hero: {
      badge: { type: String, default: "Trusted Tour Agency from Kerala" },
      headline1: { type: String, default: "Explore More," },
      headline2: { type: String, default: "Create Memories" },
      subtext: { type: String, default: "Corporate, Student, Family & Honeymoon Trips Across India — curated with care from Palakkad & Thrissur, Kerala." },
      stats: { type: [{ value: String, label: String }], default: [] },
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
          name: { type: String },
          tag: { type: String },
          imgKey: { type: String },
        },
      ],
      default: [],
    },
    packages: {
      type: [
        {
          name: { type: String },
          location: { type: String },
          days: { type: String },
          price: { type: Number },
          imgKey: { type: String },
          inclusions: { type: [String] },
          badge: { type: String },
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
    testimonials: {
      type: [
        {
          name: { type: String },
          city: { type: String },
          tripType: { type: String },
          quote: { type: String },
        },
      ],
      default: [],
    },
    meta: {
      siteTitle: { type: String, default: "Gokulam Holidays — Tour Packages Across India" },
      siteDescription: { type: String, default: "Premium tour packages from Palakkad & Thrissur, Kerala. Corporate, student, family & honeymoon trips across India and beyond." },
      aboutMission: { type: String, default: "Make travel effortless, affordable and unforgettable for every Indian family and group." },
      aboutVision: { type: String, default: "Be Kerala's most trusted tour partner — known for warmth, honesty and curated experiences." },
      aboutRating: { type: String, default: "4.9 / 5" },
      aboutRatingLabel: { type: String, default: "Rated by 1,200+ travellers across India." },
      footerTagline: { type: String, default: "Crafting memorable journeys from Palakkad & Thrissur, Kerala — across India and beyond." },
    },
    gallery: {
      type: [
        {
          imgKey: { type: String },
          rowSpan: { type: Number, default: 1 },
        },
      ],
      default: [],
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

// Clean MongoDB object to remove MongoDB-specific fields
function cleanMongoData(doc: any): SiteData {
  const obj = doc.toObject ? doc.toObject() : doc;
  const { _id, __v, createdAt, updatedAt, ...cleanData } = obj;
  return cleanData as SiteData;
}

// Read data with fallback
export async function readDB(): Promise<SiteData> {
  try {
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
          const cleaned = cleanMongoData(siteData);
          // Always merge with defaults to ensure all fields exist
          return deepMerge(DEFAULT_SITE_DATA, cleaned) as SiteData;
        }
      } catch (error) {
        console.error("Error reading from MongoDB, falling back to JSON:", error);
      }
    }
  } catch (error) {
    console.error("MongoDB not available, using JSON fallback:", error);
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
          returnDocument: 'after',
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
