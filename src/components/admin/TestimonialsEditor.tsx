import type { SiteData, TestimonialItem } from "@/lib/adminData";
import { AdminCard, AdminField, AdminSection, AddButton, RemoveButton } from "./AdminUI";

interface Props {
  data: SiteData;
  onChange: (next: SiteData) => void;
}

const BLANK: TestimonialItem = {
  name: "Customer Name",
  city: "City",
  tripType: "Tour Type",
  quote: "Amazing experience with Gokulam Holidays!",
};

export function TestimonialsEditor({ data, onChange }: Props) {
  const items = data.testimonials;

  const update = (i: number, patch: Partial<TestimonialItem>) =>
    onChange({ ...data, testimonials: items.map((t, idx) => (idx === i ? { ...t, ...patch } : t)) });

  const add = () => onChange({ ...data, testimonials: [...items, { ...BLANK }] });

  const remove = (i: number) =>
    onChange({ ...data, testimonials: items.filter((_, idx) => idx !== i) });

  const move = (i: number, dir: -1 | 1) => {
    const arr = [...items];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    onChange({ ...data, testimonials: arr });
  };

  return (
    <AdminSection title="Testimonials" desc="Customer reviews shown in the rotating carousel.">
      <AdminCard action={<AddButton onClick={add} label="Add Testimonial" />}>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-secondary border border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Review {i + 1}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="p-1.5 rounded-lg hover:bg-border text-muted-foreground disabled:opacity-30 text-xs">↑</button>
                  <button onClick={() => move(i, 1)} disabled={i === items.length - 1} className="p-1.5 rounded-lg hover:bg-border text-muted-foreground disabled:opacity-30 text-xs">↓</button>
                  <RemoveButton onClick={() => remove(i)} disabled={items.length <= 1} />
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <AdminField label="Name" compact>
                  <input type="text" value={item.name} onChange={(e) => update(i, { name: e.target.value })} className="admin-input" />
                </AdminField>
                <AdminField label="City" compact>
                  <input type="text" value={item.city} onChange={(e) => update(i, { city: e.target.value })} className="admin-input" />
                </AdminField>
                <AdminField label="Trip Type" compact>
                  <input type="text" value={item.tripType} onChange={(e) => update(i, { tripType: e.target.value })} className="admin-input" placeholder="Honeymoon Package" />
                </AdminField>
              </div>
              <AdminField label="Quote" compact>
                <textarea value={item.quote} onChange={(e) => update(i, { quote: e.target.value })} rows={3} className="admin-input" placeholder="What did they say about the trip?" />
              </AdminField>
            </div>
          ))}
        </div>
      </AdminCard>
    </AdminSection>
  );
}
