import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { DEFAULT_SITE_DATA, type SiteData } from "@/lib/adminData";

// Deep merge utility
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

// Helper to ensure clean JSON serialization
function cleanForSerialization(data: any): SiteData {
  // Always start with DEFAULT_SITE_DATA and merge in changes
  const merged = deepMerge(DEFAULT_SITE_DATA, data) as SiteData;
  // Stringify and parse to remove any non-serializable properties
  return JSON.parse(JSON.stringify(merged));
}

export const getSiteData = createServerFn({ method: "GET" }).handler(async () => {
  const { readDB } = await import("@/lib/db.server");
  const data = await readDB();
  return cleanForSerialization(data);
});

export const saveSiteData = createServerFn({ method: "POST" })
  .validator(z.any() as z.Schema<SiteData>)
  .handler(async ({ data }) => {
    const { writeDB } = await import("@/lib/db.server");
    // Always merge with defaults before saving
    const mergedData = deepMerge(DEFAULT_SITE_DATA, data) as SiteData;
    await writeDB(mergedData);
    return { success: true };
  });

// Server-side admin login using environment variable!
export const adminLogin = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "gokulam2024";
    if (data.password === ADMIN_PASSWORD) {
      return { success: true };
    }
    return { success: false, error: "Invalid password" };
  });
