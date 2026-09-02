import Link from "next/link";
import { useRouter } from "next/router";

const LINKS = [
  ["/admin", "Dashboard"],
  ["/admin/blog", "Blog"],
  ["/admin/courses", "Courses"],
  ["/admin/micro-learnings", "Micro-learnings"],
  ["/admin/pages", "Pages"],
  ["/admin/licenses", "Licenses"],
];

export default function AdminNav() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-slate-200 pb-6">
      {LINKS.map(([href, label]) => {
        const isActive =
          router.pathname === href || (href !== "/admin" && router.pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={`text-sm font-medium ${
              isActive
                ? "text-brand-navy underline underline-offset-4"
                : "text-slate-500 hover:text-brand-navy"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
