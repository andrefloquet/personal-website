import Link from "next/link";
import { BriefcaseBusiness, CalendarDays, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

import { getExperienceBySlug, WORK_EXPERIENCE } from "@/data/experience-data";

export function generateStaticParams() {
  return WORK_EXPERIENCE.map((item) => ({ slug: item.slug }));
}

export default async function ExperienceDetailsPage({ params }) {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  return (
    <section className="mx-auto my-16 max-w-9/10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/#experience"
          className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
        >
          Back to Experience Timeline
        </Link>
      </div>

      <div className="mb-10 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 p-8 text-white shadow-lg">
        <h1 className="mb-3 text-3xl font-bold">{experience.role}</h1>
        <p className="text-sky-100">{experience.summary}</p>
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 grid gap-3 text-slate-700 sm:grid-cols-2">
          <p className="flex items-center gap-2">
            <BriefcaseBusiness className="h-4 w-4 text-sky-600" />
            {experience.company}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-sky-600" />
            {experience.period}
          </p>
          <p className="flex items-center gap-2 sm:col-span-2">
            <MapPin className="h-4 w-4 text-sky-600" />
            {experience.location}
          </p>
        </div>

        <h2 className="mb-3 text-xl font-bold text-slate-900">Role Highlights</h2>
        <ul className="mb-8 space-y-3 text-slate-700">
          {experience.details.map((detail) => (
            <li key={detail} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-3 text-xl font-bold text-slate-900">Tech Stack</h2>
        <p className="text-slate-700">{experience.techStack}</p>
      </article>
    </section>
  );
}
