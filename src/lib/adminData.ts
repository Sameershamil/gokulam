/**
 * Admin data layer — all editable site content lives here.
 * Reads from localStorage (set by admin panel), falls back to defaults.
 */

export interface SiteContact {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  instagram: string;
  location: string;
  email: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  badge: string;
  headline1: string;
  headline2: string;
  subtext: string;
  stats: HeroStat[];
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface DestinationItem {
  name: string;
  tag: string;
  imgKey: string; // key like "dest-munnar", "dest-goa", "hero-kerala", etc.
}

export interface PackageItem {
  name: string;
  location: string;
  days: string;
  price: number;
  imgKey: string;
  inclusions: string[];
  badge: string;
}

export interface WhyUsItem {
  title: string;
  description: string;
  icon: string;
}

export interface TestimonialItem {
  name: string;
  city: string;
  tripType: string;
  quote: string;
}

export interface SiteMeta {
  siteTitle: string;
  siteDescription: string;
  aboutMission: string;
  aboutVision: string;
  aboutRating: string;
  aboutRatingLabel: string;
  footerTagline: string;
}

export interface GalleryItem {
  imgKey: string;
  rowSpan: number; // 1 or 2
}

export interface SiteData {
  contact: SiteContact;
  hero: HeroContent;
  services: ServiceItem[];
  destinations: DestinationItem[];
  packages: PackageItem[];
  whyUs: WhyUsItem[];
  testimonials: TestimonialItem[];
  meta: SiteMeta;
  gallery: GalleryItem[];
}

// ─── Defaults (original hardcoded values) ────────────────────────────────────

export const DEFAULT_SITE_DATA: SiteData = {
  contact: {
    phone: "+917559846476",
    phoneDisplay: "+91 75598 46476",
    whatsapp: "https://wa.me/917559846476",
    instagram: "https://instagram.com/gokulam__thulasidas",
    location: "Palakkad & Thrissur, Kerala",
    email: "info@gokulamholidays.com",
  },
  hero: {
    badge: "Trusted Tour Agency from Kerala",
    headline1: "Explore More,",
    headline2: "Create Memories",
    subtext:
      "Corporate, Student, Family & Honeymoon Trips Across India — curated with care from Palakkad & Thrissur, Kerala.",
    stats: [
      { value: "10K+", label: "Happy Travellers" },
      { value: "250+", label: "Tours Curated" },
      { value: "50+", label: "Destinations" },
      { value: "10+", label: "Years Experience" },
    ],
  },
  services: [
    { icon: "Briefcase", title: "Corporate Trips", description: "Team offsites, MICE & incentive travel handled end-to-end." },
    { icon: "GraduationCap", title: "Student & College Tours", description: "Safe, budget-friendly educational & adventure trips." },
    { icon: "Users", title: "Family Packages", description: "Comfortable holidays designed for every age group." },
    { icon: "Heart", title: "Honeymoon Packages", description: "Romantic getaways across India & international shores." },
    { icon: "Compass", title: "Customized Trips", description: "Your itinerary, your dates, your budget — your way." },
    { icon: "BedDouble", title: "Hotel Bookings", description: "Curated hotel stays with best-price guarantee." },
  ],
  destinations: [
    { name: "Kerala", tag: "God's Own Country", imgKey: "hero-kerala" },
    { name: "Munnar", tag: "Tea Hills", imgKey: "dest-munnar" },
    { name: "Manali", tag: "Snow Escape", imgKey: "dest-manali" },
    { name: "Goa", tag: "Beach Vibes", imgKey: "dest-goa" },
    { name: "Ooty", tag: "Queen of Hills", imgKey: "dest-ooty" },
    { name: "Kodaikanal", tag: "Lake Paradise", imgKey: "dest-kodai" },
    { name: "Hampi", tag: "Heritage", imgKey: "dest-hampi" },
    { name: "Agra", tag: "Wonder", imgKey: "dest-agra" },
  ],
  packages: [
    { name: "Magical Kerala", location: "Munnar • Alleppey • Kovalam", days: "6 Days / 5 Nights", price: 18999, imgKey: "hero-kerala", inclusions: ["Hotels", "Houseboat", "Breakfast", "Transport"], badge: "Best Seller" },
    { name: "Manali Snow Escape", location: "Manali • Solang • Rohtang", days: "5 Days / 4 Nights", price: 22999, imgKey: "dest-manali", inclusions: ["Hotels", "Cab", "Sightseeing", "Breakfast"], badge: "Best Seller" },
    { name: "Goa Beach Holiday", location: "North & South Goa", days: "4 Days / 3 Nights", price: 14999, imgKey: "dest-goa", inclusions: ["Beach Resort", "Cruise", "Airport Pickup"], badge: "Best Seller" },
    { name: "Hill Stations Combo", location: "Ooty • Kodaikanal", days: "5 Days / 4 Nights", price: 16499, imgKey: "dest-ooty", inclusions: ["Hotels", "Cab", "All Sightseeing"], badge: "Best Seller" },
    { name: "Heritage North", location: "Delhi • Agra • Jaipur", days: "6 Days / 5 Nights", price: 24999, imgKey: "dest-agra", inclusions: ["3★ Hotels", "Cab", "Guide", "Monuments"], badge: "Best Seller" },
    { name: "Honeymoon Special", location: "Munnar • Thekkady • Alleppey", days: "5 Days / 4 Nights", price: 26999, imgKey: "dest-kodai", inclusions: ["Luxury Resort", "Candle Dinner", "Houseboat"], badge: "Best Seller" },
  ],
  whyUs: [
    { icon: "BadgeIndianRupee", title: "Best Prices", description: "Direct partnerships → honest, transparent rates with no hidden costs." },
    { icon: "ShieldCheck", title: "Safe Travel", description: "Verified vendors, vetted vehicles and 360° trip safety." },
    { icon: "Compass", title: "Experienced Guides", description: "Local experts who turn sightseeing into stories." },
    { icon: "Headphones", title: "24/7 Support", description: "Real humans on call before, during and after every trip." },
    { icon: "Sparkles", title: "Customized Plans", description: "Every itinerary built to fit your group, pace and budget." },
    { icon: "Star", title: "10K+ Happy Travellers", description: "A decade of memories — and a 4.9★ average rating." },
  ],
  testimonials: [
    { name: "Anjali R.", city: "Kochi", tripType: "Honeymoon Package", quote: "From Munnar to Alleppey, every detail was perfect. The houseboat evening was magical!" },
    { name: "TechVerge HR", city: "Bengaluru", tripType: "Corporate Offsite", quote: "Handled 80 employees flawlessly. Bookings, transport, food — zero hiccups. Highly recommend." },
    { name: "Suresh Menon", city: "Thrissur", tripType: "Family Vacation", quote: "Took my parents to Ooty & Kodai. Comfortable cab, lovely hotels, super pricing." },
    { name: "Devika S.", city: "Palakkad", tripType: "College Trip", quote: "Safe, fun and within budget. Our class still talks about the Manali trip!" },
  ],
  meta: {
    siteTitle: "Gokulam Holidays — Tour Packages Across India",
    siteDescription: "Premium tour packages from Palakkad & Thrissur, Kerala. Corporate, student, family & honeymoon trips across India and beyond.",
    aboutMission: "Make travel effortless, affordable and unforgettable for every Indian family and group.",
    aboutVision: "Be Kerala's most trusted tour partner — known for warmth, honesty and curated experiences.",
    aboutRating: "4.9 / 5",
    aboutRatingLabel: "Rated by 1,200+ travellers across India.",
    footerTagline: "Crafting memorable journeys from Palakkad & Thrissur, Kerala — across India and beyond.",
  },
  gallery: [
    { imgKey: "gallery-1", rowSpan: 2 },
    { imgKey: "dest-munnar", rowSpan: 1 },
    { imgKey: "gallery-3", rowSpan: 1 },
    { imgKey: "gallery-2", rowSpan: 1 },
    { imgKey: "dest-goa", rowSpan: 2 },
    { imgKey: "gallery-4", rowSpan: 1 },
    { imgKey: "dest-hampi", rowSpan: 1 },
    { imgKey: "dest-kodai", rowSpan: 1 },
  ],
};

// ─── Storage helpers ──────────────────────────────────────────────────────────

const STORAGE_KEY = "gokulam_admin_data";

export function loadSiteData(): SiteData {
  if (typeof window === "undefined") return defaultData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw) as Partial<SiteData>;
    return deepMerge(defaultData, parsed) as SiteData;
  } catch {
    return defaultData;
  }
}

export function saveSiteData(data: SiteData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetSiteData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// ─── Admin auth helpers ───────────────────────────────────────────────────────

const AUTH_KEY = "gokulam_admin_auth";
const ADMIN_PASSWORD = "gokulam2024"; // Change this to your preferred password

export function adminLogin(password: string): boolean {
  if (typeof window === "undefined") return false;
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, "1");
    return true;
  }
  return false;
}

export function adminLogout(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUTH_KEY);
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}

// ─── Deep merge utility ───────────────────────────────────────────────────────

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
