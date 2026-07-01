import axios from "axios";
import { DEFAULT_SITE_DATA, type SiteData } from "@/lib/adminData";

// Create Axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper to get site data from Render backend
export async function getSiteData(): Promise<SiteData> {
  try {
    const response = await api.get("/api/site-data");
    if (response.data.success) {
      // Merge with defaults to ensure all fields are present
      return { ...DEFAULT_SITE_DATA, ...response.data.data };
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
    const response = await api.put("/api/site-data", data);
    return response.data;
  } catch (err) {
    console.error("Error saving site data:", err);
    return { success: false };
  }
}

// Admin login using ADMIN_PASSWORD from environment variable
export async function adminLogin(password: string): Promise<{ success: boolean; error?: string }> {
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "gokulam2024";
  if (password === ADMIN_PASSWORD) {
    return { success: true };
  }
  return { success: false, error: "Invalid password" };
}
