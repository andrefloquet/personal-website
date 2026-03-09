import Link from "next/link";

import SkillsGrid from "@/components/skills-grid";
import { SKILL_CATEGORIES } from "@/data/skills-data";

export default function AllSkillsPage() {
  const allSkills = [...new Set(SKILL_CATEGORIES.flatMap((category) => category.skills))];

  return (
    <section className="mx-auto my-16 max-w-9/10">
      <div className="mb-8 flex items-start justify-between gap-4 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 p-8 text-white shadow-lg">
        <div>
          <h1 className="mb-2 text-3xl font-bold">All Skills</h1>
          <p className="text-sky-100">
            Complete overview of technologies, platforms, and capabilities.
          </p>
        </div>
        <Link
          href="/skills"
          className="rounded-lg border border-white/40 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
        >
          Back to Categories
        </Link>
      </div>

      <SkillsGrid skills={allSkills} />
    </section>
  );
}
