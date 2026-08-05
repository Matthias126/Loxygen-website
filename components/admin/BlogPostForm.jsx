import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { BLOG_CATEGORIES } from "@/lib/blogCategories";

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

export default function BlogPostForm({ initialPost, onSubmit, submitLabel = "Save" }) {
  const [form, setForm] = useState({
    title: initialPost?.title ?? "",
    slug: initialPost?.slug ?? "",
    excerpt: initialPost?.excerpt ?? "",
    content: initialPost?.content ?? "",
    category: initialPost?.category ?? BLOG_CATEGORIES[0],
    cover_image_url: initialPost?.cover_image_url ?? "",
    is_published: initialPost?.is_published ?? false,
  });
  const [slugEdited, setSlugEdited] = useState(Boolean(initialPost));
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
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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
      await onSubmit(form);
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
        <label htmlFor="category" className="text-sm font-medium text-brand-navy">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          className={`mt-2 ${FIELD_CLASS}`}
        >
          {BLOG_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="excerpt" className="text-sm font-medium text-brand-navy">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          value={form.excerpt}
          onChange={handleChange}
          className={`mt-2 ${FIELD_CLASS}`}
        />
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <label htmlFor="content" className="text-sm font-medium text-brand-navy">
            Content (markdown)
          </label>
          <textarea
            id="content"
            name="content"
            rows={16}
            value={form.content}
            onChange={handleChange}
            className={`mt-2 font-mono text-sm ${FIELD_CLASS}`}
          />
        </div>

        <div>
          <p className="text-sm font-medium text-brand-navy">Preview</p>
          <div className="prose prose-slate mt-2 max-w-none rounded-lg border border-slate-200 p-4 prose-headings:font-display prose-headings:text-brand-navy">
            <ReactMarkdown>{form.content || "*Nothing to preview yet.*"}</ReactMarkdown>
          </div>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-brand-navy">
        <input
          type="checkbox"
          name="is_published"
          checked={form.is_published}
          onChange={handleChange}
        />
        Published (visible on /blog)
      </label>

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
