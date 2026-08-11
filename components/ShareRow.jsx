import { useState } from "react";

const ICON_CLASS = "h-4 w-4";

const LINKS = [
  {
    name: "LinkedIn",
    href: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLASS} aria-hidden="true">
        <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-3.96 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91V8.48Z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: (url, title) => `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLASS} aria-hidden="true">
        <path d="M18.9 2.6h3.3l-7.2 8.2 8.5 11.2h-6.6l-5.2-6.8-5.9 6.8H2.4l7.7-8.8L1.9 2.6h6.8l4.7 6.2 5.5-6.2Zm-1.2 17.4h1.8L7.3 4.5H5.4l12.3 15.5Z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: (url, title) => `https://api.whatsapp.com/send?text=${title}%20${url}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLASS} aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 0 1 7 12.4l-.2.4.9 3.2-3.3-.9-.4.2A8.2 8.2 0 1 1 12 3.8Zm-2.9 4.4c-.2 0-.5 0-.7.3-.2.2-.9.8-.9 2s.9 2.3 1 2.5c.1.1 1.8 2.9 4.5 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.4-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.4c.1-.2.2-.3.3-.5a.6.6 0 0 0 0-.5c-.1-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4Z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: (url, title) => `mailto:?subject=${title}&body=${url}`,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className={ICON_CLASS}
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
];

export default function ShareRow({ title, url }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — nothing sensible to fall back to.
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-sm font-semibold text-brand-navy">Share this article</span>
      <div className="flex items-center gap-2">
        {LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href(encodedUrl, encodedTitle)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-brand-navy transition-colors hover:border-brand-navy hover:bg-brand-navy hover:text-white"
          >
            {link.icon}
          </a>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy link"
          className="flex h-10 items-center justify-center gap-1.5 rounded-full border border-slate-200 px-4 text-sm font-medium text-brand-navy transition-colors hover:border-brand-navy hover:bg-brand-navy hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className={ICON_CLASS}
            aria-hidden="true"
          >
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
