import type { SiteData, ServiceItem } from "@/lib/adminData";
import { AdminCard, AdminField, AdminSection, AddButton, RemoveButton, IconPicker } from "./AdminUI";

interface Props {
  data: SiteData;
  onChange: (next: SiteData) => void;
}

const BLANK: ServiceItem = { icon: "Star", title: "New Service", description: "Service description." };

export function ServicesEditor({ data, onChange }: Props) {
  const items = data.services;

  const update = (i: number, patch: Partial<ServiceItem>) =>
    onChange({ ...data, services: items.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) });

  const add = () => onChange({ ...data, services: [...items, { ...BLANK }] });

  const remove = (i: number) =>
    onChange({ ...data, services: items.filter((_, idx) => idx !== i) });

  const move = (i: number, dir: -1 | 1) => {
    const arr = [...items];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    onChange({ ...data, services: arr });
  };

  return (
    <AdminSection title="Services" desc="The 6-card grid showing what services you offer.">
      <AdminCard action={<AddButton onClick={add} label="Add Service" />}>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-secondary border border-border space-y-3">
              <div className="flex items-center gap-2 justify-between">
                <span className="text-sm font-semibold text-foreground">Service {i + 1}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="p-1.5 rounded-lg hover:bg-border text-muted-foreground disabled:opacity-30 text-xs">↑</button>
                  <button onClick={() => move(i, 1)} disabled={i === items.length - 1} className="p-1.5 rounded-lg hover:bg-border text-muted-foreground disabled:opacity-30 text-xs">↓</button>
                  <RemoveButton onClick={() => remove(i)} disabled={items.length <= 1} />
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <AdminField label="Icon" compact>
                  <IconPicker value={item.icon} onChange={(v) => update(i, { icon: v })} />
                </AdminField>
                <AdminField label="Title" compact className="sm:col-span-2">
                  <input type="text" value={item.title} onChange={(e) => update(i, { title: e.target.value })} className="admin-input" />
                </AdminField>
              </div>
              <AdminField label="Description" compact>
                <textarea value={item.description} onChange={(e) => update(i, { description: e.target.value })} rows={2} className="admin-input" />
              </AdminField>
            </div>
          ))}
        </div>
      </AdminCard>
    </AdminSection>
  );
}
