import type { SiteData, DestinationItem } from "@/lib/adminData";
import { AdminCard, AdminField, AdminSection, AddButton, RemoveButton, ImageKeyPicker } from "./AdminUI";

interface Props {
  data: SiteData;
  onChange: (next: SiteData) => void;
}

const BLANK: DestinationItem = { name: "New Destination", tag: "Explore", imgKey: "dest-goa" };

export function DestinationsEditor({ data, onChange }: Props) {
  const items = data.destinations;

  const update = (i: number, patch: Partial<DestinationItem>) =>
    onChange({ ...data, destinations: items.map((d, idx) => (idx === i ? { ...d, ...patch } : d)) });

  const add = () => onChange({ ...data, destinations: [...items, { ...BLANK }] });

  const remove = (i: number) =>
    onChange({ ...data, destinations: items.filter((_, idx) => idx !== i) });

  const move = (i: number, dir: -1 | 1) => {
    const arr = [...items];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    onChange({ ...data, destinations: arr });
  };

  return (
    <AdminSection title="Destinations" desc="The destination card grid — each card links to the contact section.">
      <AdminCard action={<AddButton onClick={add} label="Add Destination" />}>
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-secondary border border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Destination {i + 1}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="p-1.5 rounded-lg hover:bg-border text-muted-foreground disabled:opacity-30 text-xs">↑</button>
                  <button onClick={() => move(i, 1)} disabled={i === items.length - 1} className="p-1.5 rounded-lg hover:bg-border text-muted-foreground disabled:opacity-30 text-xs">↓</button>
                  <RemoveButton onClick={() => remove(i)} disabled={items.length <= 1} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <AdminField label="Name" compact>
                  <input type="text" value={item.name} onChange={(e) => update(i, { name: e.target.value })} className="admin-input" />
                </AdminField>
                <AdminField label="Tag Line" compact>
                  <input type="text" value={item.tag} onChange={(e) => update(i, { tag: e.target.value })} className="admin-input" placeholder="Beach Vibes" />
                </AdminField>
              </div>
              <AdminField label="Image" compact>
                <ImageKeyPicker value={item.imgKey} onChange={(v) => update(i, { imgKey: v })} />
              </AdminField>
            </div>
          ))}
        </div>
      </AdminCard>
    </AdminSection>
  );
}
