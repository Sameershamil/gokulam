import type { SiteData, WhyUsItem } from "@/lib/adminData";
import { AdminCard, AdminField, AdminSection, AddButton, RemoveButton, IconPicker } from "./AdminUI";

interface Props {
  data: SiteData;
  onChange: (next: SiteData) => void;
}

const BLANK: WhyUsItem = { icon: "Star", title: "New Reason", description: "Why choose us description." };

export function WhyUsEditor({ data, onChange }: Props) {
  const items = data.whyUs;

  const update = (i: number, patch: Partial<WhyUsItem>) =>
    onChange({ ...data, whyUs: items.map((w, idx) => (idx === i ? { ...w, ...patch } : w)) });

  const add = () => onChange({ ...data, whyUs: [...items, { ...BLANK }] });

  const remove = (i: number) =>
    onChange({ ...data, whyUs: items.filter((_, idx) => idx !== i) });

  const move = (i: number, dir: -1 | 1) => {
    const arr = [...items];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    onChange({ ...data, whyUs: arr });
  };

  return (
    <AdminSection title="Why Choose Us" desc="Cards on the dark gradient section explaining your advantages.">
      <AdminCard action={<AddButton onClick={add} label="Add Card" />}>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-secondary border border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Card {i + 1}</span>
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
