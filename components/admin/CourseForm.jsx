import { useEffect, useState } from "react";
import { COURSE_TYPES } from "@/lib/courseTypes";
import MarkdownContent from "@/components/MarkdownContent";

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
    rating: initialCourse?.rating ?? "",
    stripe_price_id: initialCourse?.stripe_price_id ?? "",
    is_active: initialCourse?.is_active ?? true,
    show_in_upcoming: initialCourse?.show_in_upcoming ?? false,
    available_at: initialCourse?.available_at ? initialCourse.available_at.slice(0, 10) : "",
    registration_deadline: initialCourse?.registration_deadline
      ? initialCourse.registration_deadline.slice(0, 10)
      : "",
    cover_image_url: initialCourse?.cover_image_url ?? "",
    jollydeck_url: initialCourse?.jollydeck_url ?? "",
    topic_id: initialCourse?.topic_id ?? "",
    tiers:
      initialCourse?.tiers?.map((tier) => ({
        label: tier.label ?? "",
        price: tier.price ?? "",
        price_note: tier.price_note ?? "",
        stripe_price_id: tier.stripe_price_id ?? "",
        seat_count: tier.seat_count ?? "",
      })) ?? [],
  });
  const [slugEdited, setSlugEdited] = useState(Boolean(initialCourse));
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [topics, setTopics] = useState([]);
  const [newTopicName, setNewTopicName] = useState("");
  const [addingTopic, setAddingTopic] = useState(false);

  useEffect(() => {
    fetch("/api/admin/topics")
      .then((res) => res.json())
      .then(({ topics: data }) => setTopics(data ?? []))
      .catch(() => {});
  }, []);

  const handleAddTopic = async () => {
    if (!newTopicName.trim()) return;
    setAddingTopic(true);
    try {
      const response = await fetch("/api/admin/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTopicName.trim() }),
      });
      if (!response.ok) throw new Error("Failed to add topic");
      const { topic } = await response.json();
      setTopics((prev) => [...prev, topic].sort((a, b) => a.name.localeCompare(b.name)));
      setForm((prev) => ({ ...prev, topic_id: topic.id }));
      setNewTopicName("");
    } catch {
      setError("Failed to add topic. Please try again.");
    } finally {
      setAddingTopic(false);
    }
  };

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

  const handleTierChange = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      tiers: prev.tiers.map((tier, i) => (i === index ? { ...tier, [field]: value } : tier)),
    }));
  };

  const addTier = () => {
    setForm((prev) => ({
      ...prev,
      tiers: [
        ...prev.tiers,
        { label: "", price: "", price_note: "", stripe_price_id: "", seat_count: "" },
      ],
    }));
  };

  const removeTier = (index) => {
    setForm((prev) => ({ ...prev, tiers: prev.tiers.filter((_, i) => i !== index) }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setError("Image is too large — please use a file under 4MB.");
      event.target.value = "";
      return;
    }

    setUploading(true);
    setError("");
    try {
      const dataBase64 = await fileToBase64(file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type, dataBase64 }),
      });
      if (!response.ok) {
        const { error: message } = await response.json().catch(() => ({}));
        throw new Error(message || "Upload failed");
      }
      const { url } = await response.json();
      setForm((prev) => ({ ...prev, cover_image_url: url }));
    } catch (uploadError) {
      setError(
        uploadError.message === "Failed to fetch"
          ? "Image upload failed — the file may be too large, or you lost connection. Please try again."
          : `Image upload failed: ${uploadError.message}`
      );
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
        rating: form.rating === "" ? null : Number(form.rating),
        available_at: form.available_at ? new Date(form.available_at).toISOString() : null,
        registration_deadline: form.registration_deadline
          ? new Date(form.registration_deadline).toISOString()
          : null,
        tiers: form.tiers
          .filter((tier) => tier.label.trim() !== "" && tier.price !== "")
          .map((tier) => ({
            ...tier,
            price: Number(tier.price),
            seat_count: tier.seat_count === "" ? null : Number(tier.seat_count),
          })),
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <label htmlFor="description" className="text-sm font-medium text-brand-navy">
            Description (markdown)
          </label>
          <textarea
            id="description"
            name="description"
            rows={14}
            value={form.description}
            onChange={handleChange}
            className={`mt-2 font-mono text-sm ${FIELD_CLASS}`}
          />
          <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-500">
            <li>
              Leave a blank line between paragraphs to start a new one.
            </li>
            <li>
              Use <code className="font-mono">## </code>for a subheading (bold, larger text), e.g.{" "}
              <code className="font-mono">## Who this is for?</code>
            </li>
            <li>
              For bold text within a line, wrap it in double asterisks:{" "}
              <code className="font-mono">**like this**</code>.
            </li>
            <li>
              Start a line with <code className="font-mono">- </code>for a bullet point.
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-brand-navy">Preview</p>
          <div className="prose prose-slate mt-2 max-w-none rounded-lg border border-slate-200 p-4 prose-headings:font-display prose-headings:text-brand-navy prose-h2:text-[40px] prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3">
            <MarkdownContent content={form.description || "*Nothing to preview yet.*"} />
          </div>
        </div>
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

        <div>
          <label htmlFor="rating" className="text-sm font-medium text-brand-navy">
            Star rating (optional)
          </label>
          <input
            id="rating"
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            placeholder="e.g. 4.8"
            value={form.rating}
            onChange={handleChange}
            className={`mt-2 ${FIELD_CLASS}`}
          />
          <p className="mt-2 text-xs text-slate-500">
            If set, shown instead of the price on the course page. Leave blank to show price.
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-brand-navy">Price tiers (optional)</label>
          <button
            type="button"
            onClick={addTier}
            className="text-sm font-semibold text-brand-navy hover:underline"
          >
            + Add price option
          </button>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          If you add options here, they replace the single price above on the site — e.g.
          &ldquo;Early bird&rdquo; vs &ldquo;Standard&rdquo;, or different room types.
        </p>

        {form.tiers.length > 0 ? (
          <div className="mt-4 space-y-4">
            {form.tiers.map((tier, index) => (
              // eslint-disable-next-line react/no-array-index-key -- rows have no stable id until saved
              <div key={index} className="rounded-lg border border-slate-200 p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-slate-500">Label</label>
                    <input
                      type="text"
                      placeholder="e.g. Early bird"
                      value={tier.label}
                      onChange={(event) => handleTierChange(index, "label", event.target.value)}
                      className={`mt-1 ${FIELD_CLASS}`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500">Price (EUR)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={tier.price}
                      onChange={(event) => handleTierChange(index, "price", event.target.value)}
                      className={`mt-1 ${FIELD_CLASS}`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500">
                      Price note (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. per person"
                      value={tier.price_note}
                      onChange={(event) =>
                        handleTierChange(index, "price_note", event.target.value)
                      }
                      className={`mt-1 ${FIELD_CLASS}`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500">Stripe price ID</label>
                    <input
                      type="text"
                      placeholder="price_..."
                      value={tier.stripe_price_id}
                      onChange={(event) =>
                        handleTierChange(index, "stripe_price_id", event.target.value)
                      }
                      className={`mt-1 ${FIELD_CLASS}`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500">
                      Seat count (optional)
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      placeholder="e.g. 5"
                      value={tier.seat_count}
                      onChange={(event) =>
                        handleTierChange(index, "seat_count", event.target.value)
                      }
                      className={`mt-1 ${FIELD_CLASS}`}
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      Only for micro-learnings team plans — how many seats this tier grants.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeTier(index)}
                  className="mt-3 text-sm font-semibold text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div>
        <label htmlFor="jollydeck_url" className="text-sm font-medium text-brand-navy">
          JollyDeck embed URL (optional)
        </label>
        <input
          id="jollydeck_url"
          name="jollydeck_url"
          type="text"
          placeholder="https://learn.jollydeck.com/app/standalone/..."
          value={form.jollydeck_url}
          onChange={handleChange}
          className={`mt-2 ${FIELD_CLASS}`}
        />
        <p className="mt-2 text-xs text-slate-500">
          Only ever shown to a signed-in customer who has purchased this course — never appears
          on the public course page, listing, or in the page source for anyone else.
        </p>
      </div>

      <div>
        <label htmlFor="topic_id" className="text-sm font-medium text-brand-navy">
          Topic (optional)
        </label>
        <select
          id="topic_id"
          name="topic_id"
          value={form.topic_id}
          onChange={handleChange}
          className={`mt-2 ${FIELD_CLASS}`}
        >
          <option value="">No topic</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-slate-500">
          Groups this course under a topic heading in the micro-learnings library (e.g.
          &ldquo;Shipping Terms&rdquo;, &ldquo;Tech&rdquo;).
        </p>
        <div className="mt-3 flex items-center gap-2">
          <input
            type="text"
            placeholder="Add a new topic…"
            value={newTopicName}
            onChange={(event) => setNewTopicName(event.target.value)}
            className={FIELD_CLASS}
          />
          <button
            type="button"
            onClick={handleAddTopic}
            disabled={addingTopic || !newTopicName.trim()}
            className="flex-none rounded-lg border border-brand-navy px-4 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-navy/5 disabled:opacity-50"
          >
            {addingTopic ? "Adding…" : "Add"}
          </button>
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
