import { ExternalLink, RefreshCcw } from "lucide-react";
import type { IntegrationStatus } from "@/app/data/mock-data";
import { clsx } from "clsx";

type Props = {
  items: IntegrationStatus[];
};

const badgeStyles: Record<IntegrationStatus["status"], string> = {
  Synced: "bg-emerald-100 text-emerald-700",
  Warning: "bg-amber-100 text-amber-700",
  "Action Required": "bg-rose-100 text-rose-700",
};

export function IntegrationsPanel({ items }: Props) {
  return (
    <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/70 p-6 backdrop-blur">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            ITSM & CMDB Integrations
          </h2>
          <p className="text-sm text-slate-500">
            Real-time synchronization across incident and asset systems.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
          <RefreshCcw className="size-4" />
          Sync now
        </button>
      </header>

      <div className="space-y-3">
        {items.map((integration) => (
          <article
            key={integration.id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm transition hover:border-slate-200 hover:shadow-md"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-base font-semibold text-slate-900">
                {integration.name}
              </h3>
              <span
                className={clsx(
                  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
                  badgeStyles[integration.status],
                )}
              >
                {integration.status}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                Last sync {integration.lastSync}
              </span>
              <a
                href="#"
                className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition hover:text-slate-800"
              >
                View activity <ExternalLink className="size-3.5" />
              </a>
            </div>
            <p className="text-sm text-slate-600">{integration.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
