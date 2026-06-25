import { DEFAULT_SITE_DATA, type SiteData } from "@/lib/adminData";

const API_URL = process.env.PUBLIC_API_URL || "http://localhost:5000";

// Helper to get site data from Render backend
export async function getSiteData(): Promise<SiteData> {
  try {
    const response = await fetch(`${API_URL}/api/site-data`);
    const result = await response.json();
    if (result.success) {
      // Merge with defaults to ensure all fields are present
      return { ...DEFAULT_SITE_DATA, ...result.data };
    }
    return DEFAULT_SITE_DATA;
  } catch (err) {
    console.error("Error fetching site data:", err);
    return DEFAULT_SITE_DATA;
  }
}

// Helper to save site data to Render backend
export async function saveSiteData(data: SiteData): Promise<{ success: boolean }> {
  try {
    const response = await fetch(`${API_URL}/api/site-data`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (err) {
    console.error("Error saving site data:", err);
    return { success: false };
  }
}

// Admin login using ADMIN_PASSWORD from frontend context for now
// (We can add a login endpoint to Render backend later if needed)
export async function adminLogin(password: string): Promise<{ success: boolean; error?: string }> {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "gokulam2024";
  if (password === ADMIN_PASSWORD) {
    return { success: true };
  }
  return { success: false, error: "Invalid password" };
}
