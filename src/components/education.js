import { CalendarDays, GraduationCap, MapPin } from "lucide-react";

import { EDUCATION } from "@/data/education-data";

export default function Education() {
  return (
    <section id="education" className="mx-auto my-20 max-w-9/10">
      <div className="mb-10 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 p-8 text-white shadow-lg">
        <h2 className="mb-2 text-4xl font-bold">Education</h2>
        <p className="text-sky-100">
          Academic background that supports engineering depth, systems thinking, and delivery quality.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {EDUCATION.map((item) => (
          <article
            key={`${item.institution}-${item.period}`}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
          >
            <h3 className="mb-2 text-xl font-bold text-slate-900">{item.degree}</h3>

            <div className="mb-4 grid gap-2 text-sm text-slate-600">
              <p className="grid grid-cols-[16px_1fr] items-start gap-2">
                <GraduationCap className="mt-0.5 h-4 w-4 text-sky-600" />
                <span>{item.institution}</span>
              </p>
              <p className="grid grid-cols-[16px_1fr] items-start gap-2">
                <CalendarDays className="h-4 w-4 text-sky-600" />
                <span>{item.period}</span>
              </p>
              <p className="grid grid-cols-[16px_1fr] items-start gap-2">
                <MapPin className="h-4 w-4 text-sky-600" />
                <span>{item.location}</span>
              </p>
            </div>

            <p className="text-slate-700">{item.focus}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
