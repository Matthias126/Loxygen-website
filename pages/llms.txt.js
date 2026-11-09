import { getBlogPosts } from "@/lib/blog";
import { getCourses } from "@/lib/courses";
import { buildLlmsTxt } from "@/lib/llmsTxt";

export async function getServerSideProps({ res }) {
  const [courses, posts] = await Promise.all([getCourses(), getBlogPosts()]);

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.write(buildLlmsTxt(courses, posts));
  res.end();

  return { props: {} };
}

export default function LlmsTxt() {
  return null;
}
