import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Bot,
  BriefcaseBusiness,
  CloudCog,
  Cog,
  Database,
  Languages,
  Monitor,
  Network,
  Palette,
  PlugZap,
  Server,
  Smartphone,
  Wrench,
} from "lucide-react";

import SkillsGrid from "@/components/skills-grid";
import { getSkillCategory } from "@/data/skills-data";

const icons = {
  Server,
  Monitor,
  Smartphone,
  Palette,
  Database,
  CloudCog,
  Bot,
  Network,
  Cog,
  Wrench,
  PlugZap,
  BriefcaseBusiness,
  Languages,
};

export default function SkillsCategoryPage({ slug }) {
  const category = getSkillCategory(slug);

  if (!category) {
    notFound();
  }

  const Icon = icons[category.icon] || Server;

  return (
    <section className="mx-auto my-16 max-w-9/10">
      <div className="mb-10 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 p-8 text-white shadow-lg">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Icon className="h-8 w-8" />
            <h1 className="text-3xl font-bold">{category.title}</h1>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-white/40 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            Back to Home
          </Link>
        </div>
        <p className="text-sky-100">{category.description}</p>
      </div>

      <div className="mb-6">
        <Link
          href="/skills"
          className="inline-flex rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
        >
          Back to Skills
        </Link>
      </div>

      <SkillsGrid skills={category.skills} />
    </section>
  );
}
