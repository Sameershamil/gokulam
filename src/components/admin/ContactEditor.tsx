import type { SiteData } from "@/lib/adminData";
import { AdminCard, AdminField, AdminSection } from "./AdminUI";
import { Phone, MessageCircle, Instagram, MapPin, Mail } from "lucide-react";

interface Props {
  data: SiteData;
  onChange: (next: SiteData) => void;
}

export function ContactEditor({ data, onChange }: Props) {
  const c = data.contact;
  const set = (key: keyof typeof c, value: string) =>
    onChange({ ...data, contact: { ...c, [key]: value } });

  return (
    <AdminSection title="Contact Information" desc="These details appear in the navbar, contact section, and footer.">
      <AdminCard>
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminField label="Phone Number (raw)" icon={<Phone className="w-4 h-4" />} hint="e.g. +917559846476">
            <input
              type="tel"
              value={c.phone}
              onChange={(e) => set("phone", e.target.value)}
              className="admin-input"
              placeholder="+917559846476"
            />
          </AdminField>
          <AdminField label="Phone Display" icon={<Phone className="w-4 h-4" />} hint="Formatted for display">
            <input
              type="text"
              value={c.phoneDisplay}
              onChange={(e) => set("phoneDisplay", e.target.value)}
              className="admin-input"
              placeholder="+91 75598 46476"
            />
          </AdminField>
          <AdminField label="WhatsApp Link" icon={<MessageCircle className="w-4 h-4" />} hint="Full wa.me URL">
            <input
              type="url"
              value={c.whatsapp}
              onChange={(e) => set("whatsapp", e.target.value)}
              className="admin-input"
              placeholder="https://wa.me/917559846476"
            />
          </AdminField>
          <AdminField label="Instagram URL" icon={<Instagram className="w-4 h-4" />} hint="Full instagram.com URL">
            <input
              type="url"
              value={c.instagram}
              onChange={(e) => set("instagram", e.target.value)}
              className="admin-input"
              placeholder="https://instagram.com/..."
            />
          </AdminField>
          <AdminField label="Location" icon={<MapPin className="w-4 h-4" />} hint="Shown in footer & contact section">
            <input
              type="text"
              value={c.location}
              onChange={(e) => set("location", e.target.value)}
              className="admin-input"
              placeholder="Palakkad & Thrissur, Kerala"
            />
          </AdminField>
          <AdminField label="Email Address" icon={<Mail className="w-4 h-4" />} hint="Contact email (optional)">
            <input
              type="email"
              value={c.email}
              onChange={(e) => set("email", e.target.value)}
              className="admin-input"
              placeholder="info@gokulamholidays.com"
            />
          </AdminField>
        </div>
      </AdminCard>
    </AdminSection>
  );
}
