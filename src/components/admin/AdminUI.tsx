import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Star,
  Heart,
  Briefcase,
  Users,
  Compass,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  BadgeIndianRupee,
  Phone,
  MapPin,
  Plane,
  Camera,
  Coffee,
  Mountain,
  Waves,
  Sun,
  Globe,
  Building,
  Car,
  Train,
  Ship,
  Mail,
  Instagram,
  MessageCircle,
  BedDouble,
  Headphones,
  Calendar,
  Image as ImageIcon,
  Upload,
  Link,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

// Admin Section Wrapper
export function AdminSection({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {desc && <p className="text-sm text-muted-foreground mt-1">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

// Admin Card
export function AdminCard({
  title,
  action,
  children,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="font-semibold text-foreground">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

// Admin Field
export function AdminField({
  label,
  hint,
  icon,
  compact = false,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  icon?: ReactNode;
  compact?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label className="text-sm font-semibold text-foreground/80 block mb-1.5 flex items-center gap-2">
        {icon}
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

// Add Button
export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors"
    >
      <Plus className="w-4 h-4" />
      {label}
    </button>
  );
}

// Remove Button
export function RemoveButton({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

// Icon Picker
const ICONS: { name: string; Icon: LucideIcon }[] = [
  { name: "Star", Icon: Star },
  { name: "Heart", Icon: Heart },
  { name: "Briefcase", Icon: Briefcase },
  { name: "Users", Icon: Users },
  { name: "Compass", Icon: Compass },
  { name: "GraduationCap", Icon: GraduationCap },
  { name: "Sparkles", Icon: Sparkles },
  { name: "ShieldCheck", Icon: ShieldCheck },
  { name: "BadgeIndianRupee", Icon: BadgeIndianRupee },
  { name: "Phone", Icon: Phone },
  { name: "MapPin", Icon: MapPin },
  { name: "Plane", Icon: Plane },
  { name: "Camera", Icon: Camera },
  { name: "Coffee", Icon: Coffee },
  { name: "Mountain", Icon: Mountain },
  { name: "Waves", Icon: Waves },
  { name: "Sun", Icon: Sun },
  { name: "Globe", Icon: Globe },
  { name: "Building", Icon: Building },
  { name: "Car", Icon: Car },
  { name: "Train", Icon: Train },
  { name: "Ship", Icon: Ship },
  { name: "Mail", Icon: Mail },
  { name: "Instagram", Icon: Instagram },
  { name: "MessageCircle", Icon: MessageCircle },
  { name: "BedDouble", Icon: BedDouble },
  { name: "Headphones", Icon: Headphones },
  { name: "Calendar", Icon: Calendar },
];

export function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (name: string) => void;
}) {
  const SelectedIcon = ICONS.find((i) => i.name === value)?.Icon || Star;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          const idx = ICONS.findIndex((i) => i.name === value);
          const nextIdx = (idx + 1) % ICONS.length;
          onChange(ICONS[nextIdx].name);
        }}
        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-input bg-background text-sm hover:bg-secondary transition-colors"
      >
        <SelectedIcon className="w-4 h-4 text-accent" />
        <span className="text-muted-foreground">{value}</span>
      </button>
    </div>
  );
}

// Default images
const DEFAULT_IMAGES = [
  "hero-kerala",
  "dest-munnar",
  "dest-manali",
  "dest-goa",
  "dest-ooty",
  "dest-kodai",
  "dest-hampi",
  "dest-agra",
  "gallery-1",
  "gallery-2",
  "gallery-3",
  "gallery-4",
];

type ImageMode = "preset" | "url" | "upload";

export function ImagePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (name: string) => void;
}) {
  const [mode, setMode] = useState<ImageMode>(
    DEFAULT_IMAGES.includes(value) ? "preset" : value.startsWith("http") ? "url" : "upload"
  );
  const [urlInput, setUrlInput] = useState(value.startsWith("http") ? value : "");

  // Function to convert file to data URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        onChange(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const isPresetImage = DEFAULT_IMAGES.includes(value);
  const isUrlImage = value.startsWith("http");

  return (
    <div className="space-y-3">
      {/* Mode Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => { setMode("preset"); if (isPresetImage) onChange(value); }}
          className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${mode === "preset" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          <ImageIcon className="w-4 h-4 inline mr-1" /> Presets
        </button>
        <button
          onClick={() => { setMode("url"); setUrlInput(isUrlImage ? value : ""); }}
          className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${mode === "url" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          <Link className="w-4 h-4 inline mr-1" /> URL
        </button>
        <button
          onClick={() => setMode("upload")}
          className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${mode === "upload" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          <Upload className="w-4 h-4 inline mr-1" /> Upload
        </button>
      </div>

      {/* Mode Content */}
      {mode === "preset" && (
        <select
          value={isPresetImage ? value : DEFAULT_IMAGES[0]}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
        >
          {DEFAULT_IMAGES.map((img) => (
            <option key={img} value={img}>
              {img}
            </option>
          ))}
        </select>
      )}

      {mode === "url" && (
        <div className="space-y-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onBlur={() => urlInput && onChange(urlInput)}
            onKeyDown={(e) => e.key === "Enter" && urlInput && onChange(urlInput)}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
          />
          <button
            onClick={() => urlInput && onChange(urlInput)}
            disabled={!urlInput}
            className="w-full px-4 py-2 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors disabled:opacity-30"
          >
            Apply URL
          </button>
        </div>
      )}

      {mode === "upload" && (
        <div className="space-y-2">
          <label className="block">
            <span className="sr-only">Choose an image file</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/90"
            />
          </label>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="mt-3">
          <p className="text-xs text-muted-foreground mb-2">Preview:</p>
          <div className="rounded-xl overflow-hidden border border-border aspect-video">
            {isPresetImage ? (
              <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground text-sm">
                {value} (use main site preview)
              </div>
            ) : (
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => {}}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Alias for compatibility
export const ImageKeyPicker = ImagePicker;

// Re-export the CSS class used in components
export { };
