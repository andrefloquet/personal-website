import Image from "next/image";
import { Building2, ExternalLink } from "lucide-react";

import { CLIENTS } from "@/data/clients-data";

export default function Clients() {
  return (
    <section id="clients" className="w-full bg-slate-50 py-20">
      <div className="mx-auto max-w-9/10">
        <div className="mb-10 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 p-8 text-white shadow-lg">
          <h2 className="mb-2 text-4xl font-bold">Clients</h2>
          <p className="text-sky-100">
            Organizations I have partnered with to design, build, and deliver software products.
          </p>
        </div>

        {CLIENTS.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CLIENTS.map((client) => {
              const content = (
                <>
                  <div className="mb-4 flex h-16 items-center justify-center">
                    {client.logo ? (
                      <Image
                        src={client.logo}
                        alt={`${client.name} logo`}
                        width={160}
                        height={64}
                        className="max-h-16 w-auto object-contain"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                        <Building2 className="h-7 w-7" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{client.name}</h3>

                  {client.description ? (
                    <p className="mt-2 text-sm text-slate-600">{client.description}</p>
                  ) : null}

                  {client.website ? (
                    <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700">
                      Visit website
                      <ExternalLink className="h-3.5 w-3.5" />
                    </p>
                  ) : null}
                </>
              );

              const className =
                "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md";

              if (client.website) {
                return (
                  <a
                    key={client.name}
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group block ${className}`}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <article key={client.name} className={className}>
                  {content}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-sky-600">
              <Building2 className="h-7 w-7" />
            </div>
            <p className="text-slate-700">
              Client logos and partnerships will appear here soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
