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
        setData(apiData);
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
      await saveSiteData({ data: dataToSave });
      setData(dataToSave); // Update local state on successful save
      return true;
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
