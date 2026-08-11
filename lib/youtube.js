const YOUTUBE_HOSTS = new Set(["youtube.com", "www.youtube.com", "youtu.be", "m.youtube.com"]);

export function getYouTubeVideoId(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  if (!YOUTUBE_HOSTS.has(parsed.hostname)) return null;

  if (parsed.hostname === "youtu.be") {
    const id = parsed.pathname.slice(1);
    return id || null;
  }

  if (parsed.pathname === "/watch") {
    return parsed.searchParams.get("v");
  }

  const embedMatch = parsed.pathname.match(/^\/(embed|shorts)\/([^/]+)/);
  if (embedMatch) return embedMatch[2];

  return null;
}
