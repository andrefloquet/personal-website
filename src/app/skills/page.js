import HowCard from "@/components/how-card";
import Link from "next/link";
import { SKILL_CATEGORIES } from "@/data/skills-data";

export default function Skills() {
  return (
    <section className="mx-auto my-16 max-w-9/10">
      <div className="mb-10 flex items-start justify-between gap-6">
        <div className="mx-auto text-center sm:mx-0 sm:text-left">
          <h1 className="mb-3 text-4xl font-bold">Skills</h1>
          <p className="text-slate-600">
            Click a category to view the skills and related technologies.
          </p>
        </div>
        <Link
          href="/skills/all"
          className="hidden rounded-lg bg-sky-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-700 md:inline-flex"
        >
          See all skills
        </Link>
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-3 xl:grid-cols-4">
        {SKILL_CATEGORIES.map((category) => (
          <HowCard
            key={category.slug}
            type={category.icon}
            title={category.title}
            text={category.skills.slice(0, 3).join(", ")}
            path={`/skills/${category.slug}`}
          />
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-sm md:hidden">
        <Link
          href="/skills/all"
          className="inline-flex w-full justify-center rounded-lg bg-sky-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
        >
          See all skills
        </Link>
      </div>
    </section>
  );
}
