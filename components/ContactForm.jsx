import { useState } from "react";

const COPY = {
  en: {
    toggleLabel: "NL",
    name: "Name",
    email: "Email",
    company: "Company (optional)",
    message: "Message",
    submit: "Send message",
    submitting: "Sending…",
    success: "Thanks — we'll get back to you shortly.",
    error: "Something went wrong. Please try again or email us directly.",
  },
  nl: {
    toggleLabel: "EN",
    name: "Naam",
    email: "E-mail",
    company: "Bedrijf (optioneel)",
    message: "Bericht",
    submit: "Verstuur bericht",
    submitting: "Versturen…",
    success: "Bedankt — we nemen binnenkort contact met u op.",
    error: "Er is iets misgegaan. Probeer het opnieuw of mail ons rechtstreeks.",
  },
};

const FIELD_CLASS =
  "w-full rounded-lg border border-slate-200 px-4 py-3 text-base text-brand-navy placeholder:text-slate-400 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";

export default function ContactForm() {
  const [lang, setLang] = useState("en");
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const t = COPY[lang];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setLang(lang === "en" ? "nl" : "en")}
          className="text-sm font-semibold text-brand-navy hover:underline"
        >
          {t.toggleLabel}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-brand-navy">
            {t.name}
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
            {t.email}
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
            {t.company}
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
          <label htmlFor="message" className="text-sm font-medium text-brand-navy">
            {t.message}
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
          {status === "submitting" ? t.submitting : t.submit}
        </button>

        {status === "success" ? (
          <p className="text-sm font-medium text-brand-navy">{t.success}</p>
        ) : null}

        {status === "error" ? (
          <p className="text-sm font-medium text-red-600">{t.error}</p>
        ) : null}
      </form>
    </div>
  );
}
