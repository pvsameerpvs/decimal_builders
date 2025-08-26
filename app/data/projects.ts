// data/projects.ts

export type Project = {
  title: string;
  desc: string;
  img: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Comfort Meets Class",
    desc: "Elegant homes blending comfort and sophistication.",
    img: "/images/Cover.webp",
  },
  {
    title: "Modern Design. Homely Feel",
    desc: "Smart architecture that feels like home.",
    img: "/images/Cover.webp",
  },
  {
    title: "Elegant Outside. Warm Inside",
    desc: "Premium exteriors with cozy, welcoming interiors.",
    img: "/images/Cover.webp"
  },
];
