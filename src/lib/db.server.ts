import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { SiteData } from "@/lib/adminData";
import { DEFAULT_SITE_DATA } from "@/lib/adminData";

// Get directory for database file
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

// Read data from JSON file
export function readDB(): SiteData {
  ensureDataDir();

  if (existsSync(DB_PATH)) {
    try {
      const data = readFileSync(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading DB, using defaults:", error);
      return DEFAULT_SITE_DATA;
    }
  } else {
    // Initialize DB with defaults if it doesn't exist
    writeDB(DEFAULT_SITE_DATA);
    return DEFAULT_SITE_DATA;
  }
}

// Write data to JSON file
export function writeDB(data: SiteData): void {
  ensureDataDir();
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}
