import { useState } from "react";

const FIELD_CLASS =
  "w-full rounded-lg border border-slate-200 px-4 py-3 text-base text-brand-navy placeholder:text-slate-400 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";

export default function ShareExpertiseForm() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    expertise: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/share-expertise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setForm({ name: "", email: "", company: "", expertise: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-brand-navy">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className={`mt-2 ${FIELD_CLASS}`}
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-brand-navy">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className={`mt-2 ${FIELD_CLASS}`}
        />
      </div>

      <div>
        <label htmlFor="company" className="text-sm font-medium text-brand-navy">
          Company (optional)
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          className={`mt-2 ${FIELD_CLASS}`}
        />
      </div>

      <div>
        <label htmlFor="expertise" className="text-sm font-medium text-brand-navy">
          Area of expertise
        </label>
        <input
          id="expertise"
          name="expertise"
          type="text"
          placeholder="e.g. Breakbulk operations, customs compliance, ESG reporting"
          required
          value={form.expertise}
          onChange={handleChange}
          className={`mt-2 ${FIELD_CLASS}`}
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-brand-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          className={`mt-2 ${FIELD_CLASS}`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-navy/90 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Submit"}
      </button>

      {status === "success" ? (
        <p className="text-sm font-medium text-brand-navy">
          Thanks, we&apos;ll be in touch if it&apos;s a good fit.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="text-sm font-medium text-red-600">
          Something went wrong. Please try again or email us directly.
        </p>
      ) : null}
    </form>
  );
}
