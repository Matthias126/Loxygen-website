import { useState } from "react";
import { COURSE_TYPES } from "@/lib/courseTypes";

const FIELD_CLASS =
  "w-full rounded-lg border border-slate-200 px-4 py-3 text-base text-brand-navy placeholder:text-slate-400 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function CourseForm({
  initialCourse,
  defaultType,
  onSubmit,
  submitLabel = "Save",
}) {
  const [form, setForm] = useState({
    title: initialCourse?.title ?? "",
    slug: initialCourse?.slug ?? "",
    description: initialCourse?.description ?? "",
    type: initialCourse?.type ?? defaultType ?? COURSE_TYPES[0],
    price: initialCourse?.price ?? "",
    price_note: initialCourse?.price_note ?? "",
    stripe_price_id: initialCourse?.stripe_price_id ?? "",
    is_active: initialCourse?.is_active ?? true,
    show_in_upcoming: initialCourse?.show_in_upcoming ?? false,
    available_at: initialCourse?.available_at ? initialCourse.available_at.slice(0, 10) : "",
    registration_deadline: initialCourse?.registration_deadline
      ? initialCourse.registration_deadline.slice(0, 10)
      : "",
    cover_image_url: initialCourse?.cover_image_url ?? "",
  });
  const [slugEdited, setSlugEdited] = useState(Boolean(initialCourse));
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleTitleChange = (event) => {
    const title = event.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: slugEdited ? prev.slug : slugify(title),
    }));
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "is_active" && !checked ? { show_in_upcoming: false } : {}),
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const dataBase64 = await fileToBase64(file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type, dataBase64 }),
      });
      if (!response.ok) throw new Error("Upload failed");
      const { url } = await response.json();
      setForm((prev) => ({ ...prev, cover_image_url: url }));
    } catch {
      setError("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      await onSubmit({
        ...form,
        price: form.price === "" ? null : Number(form.price),
        available_at: form.available_at ? new Date(form.available_at).toISOString() : null,
        registration_deadline: form.registration_deadline
          ? new Date(form.registration_deadline).toISOString()
          : null,
      });
    } catch (submitError) {
      setStatus("error");
      setError(submitError.message || "Something went wrong.");
      return;
    }
    setStatus("idle");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      <div>
        <label htmlFor="title" className="text-sm font-medium text-brand-navy">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={form.title}
          onChange={handleTitleChange}
          className={`mt-2 ${FIELD_CLASS}`}
        />
      </div>

      <div>
        <label htmlFor="slug" className="text-sm font-medium text-brand-navy">
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          required
          value={form.slug}
          onChange={(event) => {
            setSlugEdited(true);
            handleChange(event);
          }}
          className={`mt-2 ${FIELD_CLASS}`}
        />
      </div>

      <div>
        <label htmlFor="type" className="text-sm font-medium text-brand-navy">
          Type
        </label>
        <select
          id="type"
          name="type"
          value={form.type}
          onChange={handleChange}
          className={`mt-2 ${FIELD_CLASS}`}
        >
          {COURSE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium text-brand-navy">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          className={`mt-2 ${FIELD_CLASS}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="text-sm font-medium text-brand-navy">
            Price (EUR)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className={`mt-2 ${FIELD_CLASS}`}
          />
        </div>

        <div>
          <label htmlFor="price_note" className="text-sm font-medium text-brand-navy">
            Price note (optional)
          </label>
          <input
            id="price_note"
            name="price_note"
            type="text"
            placeholder="e.g. per person, excl. VAT"
            value={form.price_note}
            onChange={handleChange}
            className={`mt-2 ${FIELD_CLASS}`}
          />
        </div>

        <div>
          <label htmlFor="stripe_price_id" className="text-sm font-medium text-brand-navy">
            Stripe price ID
          </label>
          <input
            id="stripe_price_id"
            name="stripe_price_id"
            type="text"
            placeholder="price_..."
            value={form.stripe_price_id}
            onChange={handleChange}
            className={`mt-2 ${FIELD_CLASS}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cover-image" className="text-sm font-medium text-brand-navy">
          Cover image
        </label>
        <input
          id="cover-image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-2 block text-sm text-slate-600"
        />
        {uploading ? <p className="mt-2 text-sm text-slate-500">Uploading…</p> : null}
        {form.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element -- external Supabase Storage URL
          <img
            src={form.cover_image_url}
            alt=""
            className="mt-4 aspect-video w-full max-w-sm rounded-xl object-cover"
          />
        ) : null}
      </div>

      <div>
        <label htmlFor="available_at" className="text-sm font-medium text-brand-navy">
          Start date (optional, shown on the card, doesn&apos;t hide it)
        </label>
        <input
          id="available_at"
          name="available_at"
          type="date"
          value={form.available_at}
          onChange={handleChange}
          className={`mt-2 ${FIELD_CLASS}`}
        />
      </div>

      <div>
        <label htmlFor="registration_deadline" className="text-sm font-medium text-brand-navy">
          Registration deadline (optional, defaults to the start date if left empty)
        </label>
        <input
          id="registration_deadline"
          name="registration_deadline"
          type="date"
          value={form.registration_deadline}
          onChange={handleChange}
          className={`mt-2 ${FIELD_CLASS}`}
        />
        <p className="mt-2 text-xs text-slate-500">
          Powers the sign-up countdown next to the CTA. Use this when registration closes before
          the course itself starts.
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-brand-navy">
        <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
        Active (visible on the site)
      </label>

      <label className="flex items-center gap-2 text-sm font-medium text-brand-navy">
        <input
          type="checkbox"
          name="show_in_upcoming"
          checked={form.show_in_upcoming}
          onChange={handleChange}
          disabled={!form.is_active}
        />
        Feature in &ldquo;Upcoming courses&rdquo; on The Academy hub
      </label>
      {!form.is_active ? (
        <p className="-mt-4 text-xs text-slate-500">
          Only active courses can be featured as upcoming, since the link needs a real page to
          go to.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting" || uploading}
        className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-navy/90 disabled:opacity-60"
      >
        {status === "submitting" ? "Saving…" : submitLabel}
      </button>

      {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
    </form>
  );
}
