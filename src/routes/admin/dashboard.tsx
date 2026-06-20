import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { type SiteData } from "@/lib/adminData";
import { useSiteData } from "@/context/SiteDataContext";
import {
  Plane, LogOut, Home, Phone, Star, MapPin, Package, Users,
  Heart, Info, Image, LayoutDashboard, ChevronRight, Save,
  RotateCcw, CheckCircle, Menu, X,
} from "lucide-react";

// Auth helpers (same as login page)
const AUTH_KEY = "gokulam_admin_auth";
function isAdminLoggedIn() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "1";
}
function adminLogout() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUTH_KEY);
}

// Section editors
import { ContactEditor } from "@/components/admin/ContactEditor";
import { HeroEditor } from "@/components/admin/HeroEditor";
import { ServicesEditor } from "@/components/admin/ServicesEditor";
import { DestinationsEditor } from "@/components/admin/DestinationsEditor";
import { PackagesEditor } from "@/components/admin/PackagesEditor";
import { WhyUsEditor } from "@/components/admin/WhyUsEditor";
import { TestimonialsEditor } from "@/components/admin/TestimonialsEditor";
import { GalleryEditor } from "@/components/admin/GalleryEditor";
import { MetaEditor } from "@/components/admin/MetaEditor";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

type Section =
  | "overview"
  | "contact"
  | "hero"
  | "services"
  | "destinations"
  | "packages"
  | "whyus"
  | "testimonials"
  | "gallery"
  | "meta";

const NAV_ITEMS: { id: Section; label: string; icon: React.ElementType; desc: string }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, desc: "Dashboard overview" },
  { id: "contact", label: "Contact Info", icon: Phone, desc: "Phone, WhatsApp, social links" },
  { id: "hero", label: "Hero Section", icon: Home, desc: "Headline, subtext, stats" },
  { id: "services", label: "Services", icon: Star, desc: "Service cards" },
  { id: "destinations", label: "Destinations", icon: MapPin, desc: "Destination cards" },
  { id: "packages", label: "Packages", icon: Package, desc: "Tour packages & pricing" },
  { id: "whyus", label: "Why Choose Us", icon: Heart, desc: "Trust-signal cards" },
  { id: "gallery", label: "Gallery", icon: Image, desc: "Manage gallery images" },
  { id: "testimonials", label: "Testimonials", icon: Users, desc: "Customer reviews" },
  { id: "meta", label: "Site Info", icon: Info, desc: "SEO, about section, footer" },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const { data, updateData, resetData, saveToServer } = useSiteData();
  const [section, setSection] = useState<Section>("overview");
  const [draft, setDraft] = useState<SiteData>(data);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn()) navigate({ to: "/admin" });
  }, [navigate]);

  // Sync draft when context data changes (e.g. after reset)
  useEffect(() => {
    setDraft(data);
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    
    try {
      const success = await saveToServer(draft);
      if (success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        setSaveError("Failed to save changes. Please try again.");
      }
    } catch (error) {
      setSaveError("An error occurred while saving.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("Reset ALL content to defaults? This cannot be undone.")) {
      resetData();
      setSaved(false);
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate({ to: "/admin" });
  };

  const hasPendingChanges = JSON.stringify(draft) !== JSON.stringify(data);

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-primary text-white flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-white/15 grid place-items-center shrink-0">
            <Plane className="w-5 h-5 text-white -rotate-45" />
          </div>
          <div>
            <div className="font-extrabold text-sm">GOKULAM HOLIDAYS</div>
            <div className="text-[10px] tracking-wider text-white/60">Admin Panel</div>
          </div>
          <button
            className="ml-auto lg:hidden text-white/70 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                  active
                    ? "bg-white/15 text-white font-semibold"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-sm">{item.label}</span>
                {active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-white/10 p-4 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors text-sm"
          >
            <Image className="w-4 h-4" /> View Website
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-border px-4 sm:px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
          <button
            className="lg:hidden text-foreground/70 hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-foreground">
              {NAV_ITEMS.find((n) => n.id === section)?.label ?? "Dashboard"}
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {NAV_ITEMS.find((n) => n.id === section)?.desc}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hasPendingChanges && (
              <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full hidden sm:block">
                Unsaved changes
              </span>
            )}
            {saveError && (
              <span className="text-xs text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full hidden sm:block">
                {saveError}
              </span>
            )}
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-secondary transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={handleSave}
              disabled={!hasPendingChanges || saving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : saved ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" /> Saved!
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </>
              )}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {section === "overview" && <Overview data={draft} setSection={setSection} hasPendingChanges={hasPendingChanges} onSave={handleSave} />}
          {section === "contact" && <ContactEditor data={draft} onChange={setDraft} />}
          {section === "hero" && <HeroEditor data={draft} onChange={setDraft} />}
          {section === "services" && <ServicesEditor data={draft} onChange={setDraft} />}
          {section === "destinations" && <DestinationsEditor data={draft} onChange={setDraft} />}
          {section === "packages" && <PackagesEditor data={draft} onChange={setDraft} />}
          {section === "whyus" && <WhyUsEditor data={draft} onChange={setDraft} />}
          {section === "gallery" && <GalleryEditor data={draft} onChange={setDraft} />}
          {section === "testimonials" && <TestimonialsEditor data={draft} onChange={setDraft} />}
          {section === "meta" && <MetaEditor data={draft} onChange={setDraft} />}
        </main>
      </div>
    </div>
  );
}

function Overview({
  data,
  setSection,
  hasPendingChanges,
  onSave,
}: {
  data: SiteData;
  setSection: (s: Section) => void;
  hasPendingChanges: boolean;
  onSave: () => void;
}) {
  const cards = [
    { label: "Services", count: data.services.length, section: "services" as Section, color: "bg-blue-50 text-blue-700" },
    { label: "Destinations", count: data.destinations.length, section: "destinations" as Section, color: "bg-green-50 text-green-700" },
    { label: "Packages", count: data.packages.length, section: "packages" as Section, color: "bg-orange-50 text-orange-700" },
    { label: "Gallery", count: data.gallery.length, section: "gallery" as Section, color: "bg-cyan-50 text-cyan-700" },
    { label: "Testimonials", count: data.testimonials.length, section: "testimonials" as Section, color: "bg-purple-50 text-purple-700" },
    { label: "Hero Stats", count: data.hero.stats.length, section: "hero" as Section, color: "bg-pink-50 text-pink-700" },
    { label: "Why Us Cards", count: data.whyUs.length, section: "whyus" as Section, color: "bg-teal-50 text-teal-700" },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Welcome */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-1">Welcome back 👋</h2>
        <p className="text-muted-foreground text-sm">
          You can edit every part of the Gokulam Holidays website from this panel. Changes are saved to your browser and applied live to the site.
        </p>
        {hasPendingChanges && (
          <div className="mt-4 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <span className="text-amber-700 text-sm font-medium">You have unsaved changes.</span>
            <button
              onClick={onSave}
              className="ml-auto text-xs font-semibold bg-amber-600 text-white px-3 py-1.5 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Save Now
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <button
            key={c.label}
            onClick={() => setSection(c.section)}
            className="bg-white rounded-2xl border border-border p-5 text-left hover:shadow-card hover:-translate-y-0.5 transition-all"
          >
            <div className={`text-3xl font-extrabold ${c.color.split(" ")[1]}`}>{c.count}</div>
            <div className="text-sm font-medium text-foreground mt-1">{c.label}</div>
            <div className={`text-xs mt-2 px-2 py-0.5 rounded-full inline-block ${c.color}`}>Edit →</div>
          </button>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h3 className="font-bold text-foreground mb-4">Quick Edit</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {NAV_ITEMS.filter((n) => n.id !== "overview").map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:bg-secondary transition-colors text-left"
              >
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
