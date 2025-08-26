// app/blogs/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export const metadata = { title: "Blogs & Articles" };

// Demo data — no date/readTime fields
const POSTS = [
  {
    slug: "villa-construction-cost-2025",
    title: "Villa Construction Cost in 2025: What Really Drives Your Budget",
    excerpt:
      "From foundation to finishes, see how area, materials, and timelines affect total cost—and how to lock your price with clarity.",
    cover: "/images/blogs/villa-budget.jpg",
    category: "Cost & Budgeting",
  },
  {
    slug: "permissions-and-approvals-guide",
    title: "Design, Permissions & Approvals: A Simple Owner’s Guide",
    excerpt:
      "Break down drawings, approvals and site readiness—what happens first, who signs off, and how long each step takes.",
    cover: "/images/blogs/permits.jpg",
    category: "How-To",
  },
  {
    slug: "material-brands-shortlist",
    title: "Material & Brand Shortlists by Package",
    excerpt:
      "Tiles, sanitary, electrical—see shortlists we typically propose for Essential, Enhanced, and Elite packages.",
    cover: "/images/blogs/brands.jpg",
    category: "Materials",
  },
  {
    slug: "qa-checklist",
    title: "Quality Checklist: 18 Site Checks Before Handover",
    excerpt:
      "Our QA process—waterproofing, MEP pressure tests, finishes, and documentation—explained in plain language.",
    cover: "/images/blogs/qa.jpg",
    category: "Quality & QA",
  },
  {
    slug: "vastu-vs-function",
    title: "Vastu vs. Function: Getting the Balance Right",
    excerpt:
      "How we balance light, ventilation, structure, and Vastu zones—practical tips for real plots.",
    cover: "/images/blogs/vastu.jpg",
    category: "Design",
  },
];

export default function Page() {
  const [featured, ...rest] = POSTS;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <header className="rounded-2xl bg-white/60 p-6 ring-1 ring-black/5 dark:bg-zinc-900/60 dark:ring-white/10 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="section-title text-2xl font-extrabold tracking-tight md:text-3xl">
              Blogs & Articles
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-zinc-600 dark:text-zinc-300">
              Practical guidance on costs, design, materials and construction
              quality—written for first-time home builders.
            </p>
          </div>
          <Link href="/contact" className="shrink-0">
            <Button size="sm" className="rounded-lg">
              Talk to an expert
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Layout: Featured + Grid + Sidebar */}
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Left: featured + grid */}
        <div className="space-y-6">
          {/* Featured (no read button) */}
          <Card className="overflow-hidden">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[240px]">
                <CoverImage
                  src={featured.cover}
                  alt={featured.title}
                  priority
                />
                <CategoryPill
                  label={featured.category}
                  className="absolute left-3 top-3"
                />
              </div>
              <div className="p-5 md:p-6">
                <h2 className="text-lg font-extrabold tracking-tight md:text-xl">
                  {featured.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {featured.excerpt}
                </p>
              </div>
            </div>
          </Card>

          {/* Grid (no read links) */}
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </div>
        </div>

        {/* Right: sidebar */}
        <aside className="space-y-6">
          {/* Category quick links */}
          <Card className="p-4 md:p-5">
            <CardHeader className="p-0">
              <div className="text-sm font-semibold">Browse by category</div>
            </CardHeader>
            <CardContent className="p-0 pt-3">
              <div className="flex flex-wrap gap-2">
                {[
                  "Cost & Budgeting",
                  "How-To",
                  "Materials",
                  "Quality & QA",
                  "Design",
                ].map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs"
                  >
                    <Tag className="h-3.5 w-3.5 text-brand" />
                    {c}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA card */}
          <Card className="p-4 md:p-5">
            <div className="text-sm font-semibold">Get a quick estimate</div>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
              Use our cost calculator for a ballpark budget in minutes.
            </p>
            <div className="mt-3">
              <Link href="/cost-calculator">
                <Button size="sm" className="rounded-lg">
                  Try calculator
                </Button>
              </Link>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

/* ---------- UI bits ---------- */

function ArticleCard({ post }: { post: (typeof POSTS)[number] }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[16/10]">
        <CoverImage src={post.cover} alt={post.title} />
        <CategoryPill label={post.category} className="absolute left-3 top-3" />
      </div>
      <div className="p-5">
        <h3 className="text-base font-extrabold tracking-tight">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-300">
          {post.excerpt}
        </p>
      </div>
    </Card>
  );
}

function CategoryPill({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold shadow-sm ring-1 ring-black/5 dark:bg-zinc-900/90",
        className,
      ].join(" ")}
    >
      {label}
    </span>
  );
}

function CoverImage({
  src,
  alt,
  priority = false,
}: {
  src?: string;
  alt: string;
  priority?: boolean;
}) {
  if (!src) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-zinc-100 to-brand/20 dark:from-zinc-900 dark:to-brand/20" />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(min-width: 1024px) 700px, (min-width: 768px) 50vw, 100vw"
      className="object-cover"
    />
  );
}
