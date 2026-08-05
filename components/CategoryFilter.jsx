import Link from "next/link";
import { BLOG_CATEGORIES } from "@/lib/blogCategories";

export default function CategoryFilter({ posts, activeCategory }) {
  const counts = BLOG_CATEGORIES.reduce((acc, category) => {
    acc[category] = posts.filter((post) => post.category === category).length;
    return acc;
  }, {});

  const tabs = [
    { label: "All", href: "/blog", count: posts.length, isActive: !activeCategory },
    ...BLOG_CATEGORIES.filter((category) => counts[category] > 0).map((category) => ({
      label: category,
      href: `/blog?blogcategory=${encodeURIComponent(category)}`,
      count: counts[category],
      isActive: activeCategory === category,
    })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {tabs.map((tab) => (
        <Link
          key={tab.label}
          href={tab.href}
          className={`text-sm font-medium ${
            tab.isActive
              ? "text-brand-navy underline underline-offset-4"
              : "text-slate-500 hover:text-brand-navy"
          }`}
        >
          {tab.label} <span className="text-slate-400">({tab.count})</span>
        </Link>
      ))}
    </div>
  );
}
