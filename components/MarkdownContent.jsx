import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getYouTubeVideoId } from "@/lib/youtube";

// A paragraph whose only content is a YouTube link (pasted on its own line,
// bracketed or bare — remark-gfm autolinks bare URLs into the same link
// node) embeds as a responsive player instead of rendering as a link.
function Paragraph({ node, children }) {
  const onlyChild = node.children.length === 1 ? node.children[0] : null;
  const videoId =
    onlyChild?.type === "element" && onlyChild.tagName === "a"
      ? getYouTubeVideoId(onlyChild.properties.href)
      : null;

  if (videoId) {
    return (
      <div className="relative my-8 aspect-video w-full overflow-hidden rounded-xl">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return <p>{children}</p>;
}

// Markdown requires a space after the #s ("## Heading", not "##Heading") to
// register as a heading at all — an easy thing to type wrong by hand, and it
// fails silently (renders as plain text with visible ## in it). Insert the
// missing space so "##Heading" and "###Heading" still work as intended.
function normalizeHeadingSyntax(content) {
  return content.replace(/^(#{2,6})(?=[^\s#])/gm, "$1 ");
}

export default function MarkdownContent({ content }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: Paragraph }}>
      {normalizeHeadingSyntax(content)}
    </ReactMarkdown>
  );
}
