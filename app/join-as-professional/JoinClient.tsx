"use client";
import ProApplyForm from "@/components/pros/ProApplyForm";
import ProsBenefits from "@/components/pros/ProsBenefits";
import ProsCategories from "@/components/pros/ProsCategories";
import ProsFAQ from "@/components/pros/ProsFAQ";
import ProsHero from "@/components/pros/ProsHero";

export const metadata = { title: "Join us as a professional" };

export default function Page() {
  return (
    <div className="space-y-10">
      <ProsHero />

      <section className="grid gap-6 md:grid-cols-3">
        <ProsCategories />
        <ProsBenefits />
        <ProsFAQ />
      </section>

      {/* Application form */}
      <section id="apply" className="space-y-3">
        <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">
          Apply to our approved partner network
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Share your trade, city and experience. We’ll verify and reach out for
          next steps.
        </p>
        <ProApplyForm />
      </section>
    </div>
  );
}
