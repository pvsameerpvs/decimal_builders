// app/data/reviews.ts
export type TextReview = {
  name: string;
  rating: number;        // 1..5; can be 4.5 etc.
  comment: string;
  date: string;          // "Aug 2025"
  city?: string;
  project?: string;
  avatar?: string;       // /images/avatars/....
};

export type VideoReview = { title: string; youtubeId: string; date?: string };
export type ShortReview = { title?: string; youtubeId: string; date?: string };

export const TEXT_REVIEWS: TextReview[] = [
  {
    name: "Rashid",
    rating: 5,
    comment: "Delivered before handover date. Great finish!",
    date: "Aug 2025",
    city: "Bangalore",
    project: "G+1 Villa",
  },
  {
    name: "Sarah",
    rating: 5,
    comment: "Transparent updates and no surprises in billing.",
    date: "Jul 2025",
    city: "Dubai",
    project: "Renovation",
  },
  {
    name: "Akhil",
    rating: 4.5,
    comment: "Weekly photos + stage-wise payments built trust.",
    date: "Jun 2025",
    city: "Kerala",
    project: "Duplex",
  },
  {
    name: "Priya",
    rating: 4.8,
    comment: "BOQ clarity helped us choose upgrades confidently.",
    date: "Jun 2025",
    city: "Bangalore",
  },
];

export const VIDEO_REVIEWS: VideoReview[] = [
  { title: "Client Handover – 5 months timeline", youtubeId: "dQw4w9WgXcQ", date: "Aug 2025" },
  { title: "Why stage-wise escrow calmed our nerves", youtubeId: "kXYiU_JCYtU", date: "Jul 2025" },
  { title: "From plan to keys – our villa journey", youtubeId: "3JZ_D3ELwOQ", date: "Jun 2025" },
];

export const SHORTS: ShortReview[] = [
  { title: "Slab day!", youtubeId: "rYEDA3JcQqw" },
  { title: "Finishes walkthrough", youtubeId: "Zi_XLOBDo_Y" },
  { title: "Before/After", youtubeId: "YVkUvmDQ3HY" },
];

// Helpers you can reuse
export function averageRating(list: TextReview[]) {
  if (!list.length) return 0;
  return Math.round((list.reduce((s, r) => s + r.rating, 0) / list.length) * 10) / 10;
}
export function distribution(list: TextReview[]) {
  const buckets = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<1|2|3|4|5, number>;
  list.forEach(r => {
    const k = Math.max(1, Math.min(5, Math.round(r.rating))) as 1|2|3|4|5;
    buckets[k] += 1;
  });
  return buckets;
}


// https://www.youtube.com/watch?v=**dQw4w9WgXcQ** → ID = dQw4w9WgXcQ

// https://youtu.be/**kXYiU_JCYtU** → ID = kXYiU_JCYtU

// https://www.youtube.com/shorts/**YVkUvmDQ3HY** → ID = YVkUvmDQ3HY