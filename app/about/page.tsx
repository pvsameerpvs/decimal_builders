import ContactCTA from "@/components/about/ContactCTA";
import Milestones from "@/components/about/Milestones";
import ValuesDnD from "@/components/about/ValuesDnD";

export const metadata = { title: "About Us" };

export default function Page() {
  return (
    <div className="space-y-10 md:space-y-12">
      <section className="space-y-3">
        <h2 className="section-title text-2xl font-extrabold tracking-tight md:text-3xl">
          Our Values
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Drag to re-order what matters most to you. We’ll remember your order.
        </p>
        <ValuesDnD />
      </section>

      <section className="space-y-3">
        <h2 className="section-title text-2xl font-extrabold tracking-tight md:text-3xl">
          Milestones
        </h2>
        <Milestones />
      </section>

      <ContactCTA />
    </div>
  );
}
