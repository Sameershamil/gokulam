import type { SiteData, GalleryItem } from "@/lib/adminData";
import { AdminCard, AdminSection, AddButton, RemoveButton, ImageKeyPicker } from "./AdminUI";
import { ChevronUp, ChevronDown } from "lucide-react";

interface Props {
  data: SiteData;
  onChange: (next: SiteData) => void;
}

const BLANK_GALLERY_ITEM: GalleryItem = { imgKey: "hero-kerala", rowSpan: 1 };

export function GalleryEditor({ data, onChange }: Props) {
  const gallery = data.gallery;

  const updateItem = (index: number, patch: Partial<GalleryItem>) => {
    const newGallery = [...gallery];
    newGallery[index] = { ...newGallery[index], ...patch };
    onChange({ ...data, gallery: newGallery });
  };

  const addItem = () => {
    onChange({ ...data, gallery: [...gallery, { ...BLANK_GALLERY_ITEM }] });
  };

  const removeItem = (index: number) => {
    if (gallery.length <= 1) return;
    const newGallery = gallery.filter((_, i) => i !== index);
    onChange({ ...data, gallery: newGallery });
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= gallery.length) return;
    const newGallery = [...gallery];
    [newGallery[index], newGallery[newIndex]] = [newGallery[newIndex], newGallery[index]];
    onChange({ ...data, gallery: newGallery });
  };

  return (
    <AdminSection title="Gallery" desc="Manage images in the gallery section.">
      <AdminCard action={<AddButton onClick={addItem} label="Add Image" />}>
        <div className="space-y-3">
          {gallery.map((item, index) => (
            <div key={index} className="p-4 rounded-xl border border-border bg-secondary space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Image {index + 1}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveItem(index, -1)}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg hover:bg-white text-muted-foreground disabled:opacity-30 text-xs"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveItem(index, 1)}
                    disabled={index === gallery.length - 1}
                    className="p-1.5 rounded-lg hover:bg-white text-muted-foreground disabled:opacity-30 text-xs"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <RemoveButton onClick={() => removeItem(index)} disabled={gallery.length <= 1} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-foreground/80 block mb-1.5">
                    Image
                  </label>
                  <ImageKeyPicker value={item.imgKey} onChange={(v) => updateItem(index, { imgKey: v })} />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground/80 block mb-1.5">
                    Size
                  </label>
                  <select
                    value={item.rowSpan}
                    onChange={(e) => updateItem(index, { rowSpan: Number(e.target.value) })}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
                  >
                    <option value={1}>Normal (1 row)</option>
                    <option value={2}>Tall (2 rows)</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </AdminSection>
  );
}
