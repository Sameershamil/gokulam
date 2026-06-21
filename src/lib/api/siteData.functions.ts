import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { SiteData } from "@/lib/adminData";

export const getSiteData = createServerFn({ method: "GET" }).handler(async () => {
  const { readDB } = await import("@/lib/db.server");
  const data = await readDB();
  return data;
});

export const saveSiteData = createServerFn({ method: "POST" })
  .validator(z.any() as z.Schema<SiteData>)
  .handler(async ({ data }) => {
    const { writeDB } = await import("@/lib/db.server");
    await writeDB(data);
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
