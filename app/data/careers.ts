// app/data/careers.ts
export type Job = {
  id: string;
  title: string;
  location: string;
  type: "Full-time" | "Contract" | "Internship";
  experience?: string;
  snippet: string;
};

// Start empty; add roles later.
export const JOBS: Job[] = [
  // Example for later:
  {
    id: "site-engineer-bangalore",
    title: "Site Engineer",
    location: "Bangalore",
    type: "Full-time",
    experience: "3+ years",
    snippet: "Own daily site execution, QA, and subcontractor coordination.",
  },
];
