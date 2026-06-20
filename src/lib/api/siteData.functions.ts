import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { SiteData } from "@/lib/adminData";

export const getSiteData = createServerFn({ method: "GET" }).handler(async () => {
  const { readDB } = await import("@/lib/db.server");
  const data = readDB();
  return data;
});

export const saveSiteData = createServerFn({ method: "POST" })
  .validator(z.any() as z.Schema<SiteData>)
  .handler(async ({ data }) => {
    const { writeDB } = await import("@/lib/db.server");
    writeDB(data);
    return { success: true };
  });
