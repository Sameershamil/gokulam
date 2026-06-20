import { useState } from "react";
import type { SiteData, PackageItem } from "@/lib/adminData";
import { AdminCard, AdminField, AdminSection, AddButton, RemoveButton, ImageKeyPicker } from "./AdminUI";
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";

interface Props {
  data: SiteData;
  onChange: (next: SiteData) => void;
}

const BLANK: PackageItem = {
  name: "New Package",
  location: "City A • City B",
  days: "4 Days / 3 Nights",
  price: 9999,
  imgKey: "dest-goa",
  inclusions: ["Hotels", "Transport"],
  badge: "Best Seller",
};

export function PackagesEditor({ data, onChange }: Props) {
  const items = data.packages;
  const [expanded, setExpanded] = useState<number | null>(0);

  const update = (i: number, patch: Partial<PackageItem>) =>
    onChange({ ...data, packages: items.map((p, idx) => (idx === i ? { ...p, ...patch } : p)) });

  const add = () => {
    const next = [...items, { ...BLANK, inclusions: [...BLANK.inclusions] }];
    onChange({ ...data, packages: next });
    setExpanded(next.length - 1);
  };

  const remove = (i: number) => {
    onChange({ ...data, packages: items.filter((_, idx) => idx !== i) });
    setExpanded(null);
  };

  const addInclusion = (i: number) =>
    update(i, { inclusions: [...items[i].inclusions, "Inclusion"] });

  const updateInclusion = (pi: number, ii: number, val: string) =>
    update(pi, { inclusions: items[pi].inclusions.map((inc, idx) => (idx === ii ? val : inc)) });

  const removeInclusion = (pi: number, ii: number) =>
    update(pi, { inclusions: items[pi].inclusions.filter((_, idx) => idx !== ii) });

  return (
    <AdminSection title="Tour Packages" desc="Each card shows on the Packages section with pricing and inclusions.">
      <AdminCard action={<AddButton onClick={add} label="Add Package" />}>
        <div className="space-y-3">
          {items.map((pkg, i) => (
            <div key={i} className="rounded-2xl border border-border bg-white overflow-hidden">
              {/* Header */}
              <div
                onClick={() => setExpanded(expanded === i ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpanded(expanded === i ? null : i);
                  }
                }}
                role="button"
                tabIndex={0}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-secondary transition-colors text-left cursor-pointer"
              >
                <div className="flex-1">
                  <div className="font-semibold text-sm">{pkg.name}</div>
                  <div className="text-xs text-muted-foreground">{pkg.location} · {pkg.days} · ₹{pkg.price.toLocaleString("en-IN")}</div>
                </div>
                <div className="flex items-center gap-2">
                  <RemoveButton onClick={(e) => { e.stopPropagation(); remove(i); }} disabled={items.length <= 1} />
                  {expanded === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>

              {/* Body */}
              {expanded === i && (
                <div className="px-5 pb-5 space-y-4 border-t border-border">
                  <div className="grid sm:grid-cols-2 gap-4 pt-4">
                    <AdminField label="Package Name" compact>
                      <input type="text" value={pkg.name} onChange={(e) => update(i, { name: e.target.value })} className="admin-input" />
                    </AdminField>
                    <AdminField label="Location / Route" compact>
                      <input type="text" value={pkg.location} onChange={(e) => update(i, { location: e.target.value })} className="admin-input" placeholder="Munnar • Alleppey" />
                    </AdminField>
                    <AdminField label="Duration" compact>
                      <input type="text" value={pkg.days} onChange={(e) => update(i, { days: e.target.value })} className="admin-input" placeholder="5 Days / 4 Nights" />
                    </AdminField>
                    <AdminField label="Price (₹ per person)" compact>
                      <input
                        type="number"
                        value={pkg.price}
                        onChange={(e) => update(i, { price: Number(e.target.value) })}
                        className="admin-input"
                        min={0}
                      />
                    </AdminField>
                    <AdminField label="Badge Text" compact hint="e.g. Best Seller, Popular">
                      <input type="text" value={pkg.badge} onChange={(e) => update(i, { badge: e.target.value })} className="admin-input" />
                    </AdminField>
                    <AdminField label="Image" compact>
                      <ImageKeyPicker value={pkg.imgKey} onChange={(v) => update(i, { imgKey: v })} />
                    </AdminField>
                  </div>

                  {/* Inclusions */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-foreground/80">Inclusions</label>
                      <button
                        onClick={() => addInclusion(i)}
                        className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {pkg.inclusions.map((inc, ii) => (
                        <div key={ii} className="flex items-center gap-1.5 bg-secondary border border-border rounded-full px-3 py-1">
                          <input
                            type="text"
                            value={inc}
                            onChange={(e) => updateInclusion(i, ii, e.target.value)}
                            className="text-xs bg-transparent border-none outline-none w-20 min-w-0"
                          />
                          <button
                            onClick={() => removeInclusion(i, ii)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </AdminCard>
    </AdminSection>
  );
}
