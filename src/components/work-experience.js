import { BriefcaseBusiness, CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";

import { WORK_EXPERIENCE } from "@/data/experience-data";

export default function WorkExperience() {
  return (
    <section id="experience" className="w-full bg-slate-50 py-20">
      <div className="mx-auto max-w-9/10">
        <div className="mb-10 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 p-8 text-white shadow-lg">
          <h2 className="mb-2 text-4xl font-bold">Work Experience</h2>
          <p className="text-sky-100">
            A timeline of roles, leadership scope, and delivery impact across engineering and product platforms.
          </p>
        </div>

        <div className="relative pl-6 md:pl-28">
          <div className="absolute left-2.5 top-0 h-full w-px bg-gradient-to-b from-sky-400 via-indigo-400 to-transparent md:left-20" />

          <div className="space-y-8">
            {WORK_EXPERIENCE.map((item) => (
              <Link
                key={`${item.company}-${item.period}`}
                href={`/experience/${item.slug}`}
                className="group block"
              >
                <article className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md">
                  <div className="absolute -left-[1.15rem] top-8 h-5 w-5 md:-left-[2.45rem]">
                    <span className="absolute inset-0 rounded-full bg-sky-300/70 transition-transform duration-300 group-hover:scale-125" />
                    <span className="absolute inset-1 rounded-full border-2 border-white bg-sky-600 shadow" />
                  </div>
                  <p className="absolute -left-[6rem] -top-3 hidden items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-semibold text-sky-700 shadow-sm md:inline-flex">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {item.period}
                  </p>

                  <div className="mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{item.role}</h3>
                    </div>
                  </div>

                  <div className="mb-4 grid gap-2 text-sm text-slate-600">
                    <p className="grid grid-cols-[16px_1fr] items-start gap-2">
                      <BriefcaseBusiness className="mt-0.5 h-4 w-4 text-sky-600" />
                      <span>{item.company}</span>
                    </p>
                    <p className="grid grid-cols-[16px_1fr] items-start gap-2 md:hidden">
                      <CalendarDays className="h-4 w-4 text-sky-600" />
                      <span>{item.period}</span>
                    </p>
                    <p className="grid grid-cols-[16px_1fr] items-start gap-2">
                      <MapPin className="h-4 w-4 text-sky-600" />
                      <span>{item.location}</span>
                    </p>
                  </div>

                  <ul className="space-y-2 text-slate-700">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 text-sm font-semibold text-sky-700 transition-colors group-hover:text-sky-800">
                    Read full experience details &rarr;
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
