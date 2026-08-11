// Markdown requires a space after the #s ("## Heading", not "##Heading") to
// register as a heading at all — an easy thing to type wrong by hand, and it
// fails silently (renders as plain text with visible ## in it). Shared here
// so MarkdownContent (rendering) and extractHeadings (the TOC) normalize the
// exact same way before either one looks at the content.
export function normalizeHeadingSyntax(content) {
  return content.replace(/^(#{2,6})(?=[^\s#])/gm, "$1 ");
}

export function slugifyHeading(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Pulls ## and ### lines out of the raw markdown for a table of contents.
// Deliberately simple (regex over source text, not a real parse) — good
// enough for the plain-text headings this blog actually uses, and it keeps
// the ids trivially in sync with MarkdownContent's own heading renderer,
// which slugifies the same way.
export function extractHeadings(content) {
  const normalized = normalizeHeadingSyntax(content);
  const seen = new Map();

  return normalized
    .split("\n")
    .map((line) => line.match(/^(#{2,3})\s+(.+)$/))
    .filter(Boolean)
    .map((match) => {
      const text = match[2].trim();
      const base = slugifyHeading(text);
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      return {
        level: match[1].length,
        text,
        id: count === 0 ? base : `${base}-${count + 1}`,
      };
    });
}
