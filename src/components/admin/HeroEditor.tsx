import type { SiteData, HeroStat } from "@/lib/adminData";
import { AdminCard, AdminField, AdminSection, AddButton, RemoveButton } from "./AdminUI";

interface Props {
  data: SiteData;
  onChange: (next: SiteData) => void;
}

export function HeroEditor({ data, onChange }: Props) {
  const h = data.hero;
  const setHero = (key: keyof typeof h, value: string) =>
    onChange({ ...data, hero: { ...h, [key]: value } });

  const setStat = (i: number, key: keyof HeroStat, value: string) => {
    const stats = h.stats.map((s, idx) => (idx === i ? { ...s, [key]: value } : s));
    onChange({ ...data, hero: { ...h, stats } });
  };

  const addStat = () =>
    onChange({ ...data, hero: { ...h, stats: [...h.stats, { value: "100+", label: "New Stat" }] } });

  const removeStat = (i: number) =>
    onChange({ ...data, hero: { ...h, stats: h.stats.filter((_, idx) => idx !== i) } });

  return (
    <AdminSection title="Hero Section" desc="The first thing visitors see — headline, subtext and trust statistics.">
      <AdminCard title="Text Content">
        <div className="space-y-4">
          <AdminField label="Badge Text" hint="Small pill above the headline">
            <input type="text" value={h.badge} onChange={(e) => setHero("badge", e.target.value)} className="admin-input" />
          </AdminField>
          <div className="grid sm:grid-cols-2 gap-4">
            <AdminField label="Headline Line 1">
              <input type="text" value={h.headline1} onChange={(e) => setHero("headline1", e.target.value)} className="admin-input" />
            </AdminField>
            <AdminField label="Headline Line 2 (highlighted)">
              <input type="text" value={h.headline2} onChange={(e) => setHero("headline2", e.target.value)} className="admin-input" />
            </AdminField>
          </div>
          <AdminField label="Subtext / Description">
            <textarea
              value={h.subtext}
              onChange={(e) => setHero("subtext", e.target.value)}
              rows={3}
              className="admin-input"
            />
          </AdminField>
        </div>
      </AdminCard>

      <AdminCard title="Stats Strip" action={<AddButton onClick={addStat} label="Add Stat" />}>
        <div className="space-y-3">
          {h.stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-secondary border border-border">
              <div className="flex-1 grid grid-cols-2 gap-3">
                <AdminField label="Value" compact>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => setStat(i, "value", e.target.value)}
                    className="admin-input"
                    placeholder="10K+"
                  />
                </AdminField>
                <AdminField label="Label" compact>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => setStat(i, "label", e.target.value)}
                    className="admin-input"
                    placeholder="Happy Travellers"
                  />
                </AdminField>
              </div>
              <RemoveButton onClick={() => removeStat(i)} disabled={h.stats.length <= 1} />
            </div>
          ))}
        </div>
      </AdminCard>
    </AdminSection>
  );
}
