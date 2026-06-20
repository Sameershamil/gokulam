import { type SiteData } from "@/lib/adminData";

export function MetaEditor({
  data,
  onChange,
}: {
  data: SiteData;
  onChange: (data: SiteData) => void;
}) {
  const updateMeta = (key: keyof SiteData["meta"], value: string) => {
    onChange({
      ...data,
      meta: { ...data.meta, [key]: value },
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-white rounded-2xl border border-border p-6">
        <h3 className="font-bold text-lg mb-4">Site Information & SEO</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-foreground/80 block mb-1.5">
              Site Title
            </label>
            <input
              type="text"
              value={data.meta.siteTitle}
              onChange={(e) => updateMeta("siteTitle", e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground/80 block mb-1.5">
              Site Description
            </label>
            <textarea
              rows={3}
              value={data.meta.siteDescription}
              onChange={(e) => updateMeta("siteDescription", e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6">
        <h3 className="font-bold text-lg mb-4">About Section</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-foreground/80 block mb-1.5">
              Our Mission
            </label>
            <textarea
              rows={2}
              value={data.meta.aboutMission}
              onChange={(e) => updateMeta("aboutMission", e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground/80 block mb-1.5">
              Our Vision
            </label>
            <textarea
              rows={2}
              value={data.meta.aboutVision}
              onChange={(e) => updateMeta("aboutVision", e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-foreground/80 block mb-1.5">
                Rating Text
              </label>
              <input
                type="text"
                value={data.meta.aboutRating}
                onChange={(e) => updateMeta("aboutRating", e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground/80 block mb-1.5">
                Rating Label
              </label>
              <input
                type="text"
                value={data.meta.aboutRatingLabel}
                onChange={(e) => updateMeta("aboutRatingLabel", e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6">
        <h3 className="font-bold text-lg mb-4">Footer</h3>
        <div>
          <label className="text-sm font-semibold text-foreground/80 block mb-1.5">
            Footer Tagline
          </label>
          <textarea
            rows={2}
            value={data.meta.footerTagline}
            onChange={(e) => updateMeta("footerTagline", e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
          />
        </div>
      </div>
    </div>
  );
}
