import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { DEFAULT_SITE_DATA, type SiteData } from "@/lib/adminData";
import { getSiteData, saveSiteData } from "@/lib/api/siteData.functions";

// Deep merge utility to ensure we always have all defaults
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

interface SiteDataContextValue {
  data: SiteData;
  updateData: (next: SiteData) => void;
  saveToServer: (data: SiteData) => Promise<boolean>;
  resetData: () => void;
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  // Always start with defaultData, then load from API
  const [data, setData] = useState<SiteData>(DEFAULT_SITE_DATA);

  // Fetch data from API when component mounts
  useEffect(() => {
    async function loadData() {
      try {
        const apiData = await getSiteData();
        // Merge API data with defaults to ensure all fields exist
        const mergedData = deepMerge(DEFAULT_SITE_DATA, apiData) as SiteData;
        setData(mergedData);
      } catch (error) {
        console.error("Error fetching site data, using defaults:", error);
      }
    }
    loadData();
  }, []);

  // Update local state
  const updateData = useCallback((next: SiteData) => {
    setData(next);
  }, []);

  // Save data to backend
  const saveToServer = useCallback(async (dataToSave: SiteData): Promise<boolean> => {
    try {
      const result = await saveSiteData(dataToSave);
      if (result.success) {
        setData(dataToSave); // Update local state on successful save
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error saving to server:", error);
      return false;
    }
  }, []);

  // Reset to default
  const resetData = useCallback(() => {
    setData(DEFAULT_SITE_DATA);
  }, []);

  return (
    <SiteDataContext.Provider value={{ data, updateData, saveToServer, resetData }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData(): SiteDataContextValue {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx;
}
