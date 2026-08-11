export default function TableOfContents({ headings }) {
  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-xl border border-slate-200 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        In this article
      </p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${heading.id}`}
              className="text-slate-600 hover:text-brand-navy hover:underline"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
