// app/data/media.ts
export const SOCIAL = {
  instagram: "https://instagram.com/decimalbuilders",   // <- replace
  youtube: "https://youtube.com/@decimalbuilders",       // <- replace
};

export type NewsItem = {
  title: string;
  outlet: string;
  date: string;        // e.g. "May 2025"
  href: string;
  img?: string;        // local /images/... preferred
  tag?: string;        // e.g. "Feature", "Interview"
};

export type VideoItem = {
  title: string;
  youtubeId: string;   // e.g. "xYz123"
  date?: string;
};

export type InstaItem = {
  href: string;        // instagram post url
  img: string;         // square image thumbnail in /public/images/instagram/...
  alt?: string;
};

export const NEWS: NewsItem[] = [
  {
    title: "Decimal Builders expands turnkey offering",
    outlet: "Construction Today",
    date: "Aug 2025",
    href: "https://example.com/article-1",
    img: "/images/press/press-1.jpg",
    tag: "Feature",
  },
  {
    title: "Fast-track villas with transparent pricing",
    outlet: "Realty Weekly",
    date: "Jul 2025",
    href: "https://example.com/article-2",
    img: "/images/press/press-2.jpg",
    tag: "Interview",
  },
  {
    title: "Material price index helps customers plan",
    outlet: "Build Wire",
    date: "Jun 2025",
    href: "https://example.com/article-3",
    img: "/images/press/press-3.jpg",
    tag: "Insight",
  },
];

export const VIDEOS: VideoItem[] = [
  { title: "Site walkthrough – G+1 villa (Whitefield)", youtubeId: "dQw4w9WgXcQ", date: "Aug 2025" },
  { title: "How we budget a new build (BOQ basics)", youtubeId: "kXYiU_JCYtU", date: "Jul 2025" },
  { title: "Customer handover – 5 months timeline", youtubeId: "3JZ_D3ELwOQ", date: "Jun 2025" },
];

export const INSTAGRAM: InstaItem[] = [
  { href: "https://instagram.com/p/xxx", img: "/images/instagram/p1.jpg", alt: "Plinth stage" },
  { href: "https://instagram.com/p/yyy", img: "/images/instagram/p2.jpg", alt: "Slab day" },
  { href: "https://instagram.com/p/zzz", img: "/images/instagram/p3.jpg", alt: "Finishes" },
  { href: "https://instagram.com/p/aaa", img: "/images/instagram/p4.jpg", alt: "Handover" },
];
