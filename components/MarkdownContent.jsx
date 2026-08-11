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

export default function MarkdownContent({ content }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: Paragraph }}>
      {content}
    </ReactMarkdown>
  );
}
