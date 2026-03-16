import { Award, CalendarDays, Hash, ShieldCheck } from "lucide-react";

import { CERTIFICATIONS } from "@/data/certifications-data";

export default function Certifications() {
  return (
    <section id="certifications" className="w-full bg-sky-50/70 py-20">
      <div className="mx-auto max-w-9/10">
        <div className="mb-10 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 p-8 text-white shadow-lg">
          <h2 className="mb-2 text-4xl font-bold">Certifications</h2>
          <p className="text-sky-100">
            Industry credentials that validate practical expertise in software development and infrastructure.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-5">
            {CERTIFICATIONS.map((cert) => (
              <article
                key={`${cert.name}-${cert.credentialId}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:border-sky-300 hover:bg-white"
              >
                <h3 className="mb-2 text-lg font-bold text-slate-900">{cert.name}</h3>

                <div className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-3">
                  <p className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-sky-600" />
                    {cert.issuer}
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-sky-600" />
                    Issued {cert.issued}
                  </p>
                  <p className="flex items-center gap-2 sm:col-span-2 lg:col-span-1">
                    <Hash className="h-4 w-4 text-sky-600" />
                    {cert.credentialId}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-lg bg-sky-50 p-4 text-sm text-sky-800">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            Credentials are listed from official certification records.
          </div>
        </div>
      </div>
    </section>
  );
}
