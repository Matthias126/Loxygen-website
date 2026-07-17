export default function PlaceholderImage({ label, className = "" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-brand-navy/20 bg-brand-light ${className}`}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-brand-navy/30" />
        <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" className="text-brand-navy/30" />
        <path d="M21 15l-5-5-9 9" stroke="currentColor" strokeWidth="1.5" className="text-brand-navy/30" />
      </svg>
      {label ? (
        <span className="px-4 text-center text-xs font-semibold uppercase tracking-wide text-brand-navy/40">
          {label}
        </span>
      ) : null}
    </div>
  );
}
