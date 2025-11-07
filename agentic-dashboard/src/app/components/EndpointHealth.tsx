import type { EndpointSnapshot } from "@/app/data/mock-data";
import { clsx } from "clsx";

type Props = {
  endpoints: EndpointSnapshot[];
};

const platformAccent: Record<EndpointSnapshot["platform"], string> = {
  "Windows 10": "from-sky-500 to-indigo-500",
  "Windows 11": "from-indigo-500 to-violet-500",
  macOS: "from-rose-500 to-orange-500",
  iOS: "from-purple-500 to-pink-500",
  Android: "from-emerald-500 to-teal-500",
};

export function EndpointHealth({ endpoints }: Props) {
  return (
    <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/70 p-6 backdrop-blur">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Endpoint Health
          </h2>
          <p className="text-sm text-slate-500">
            Compliance snapshot across managed device fleets.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          Intune · Jamf · MDM
        </span>
      </header>

      <div className="space-y-4">
        {endpoints.map((endpoint) => {
          const healthyPct = Math.round(
            (endpoint.healthy / endpoint.total) * 100,
          );
          const pendingPct = Math.max(
            1,
            Math.round((endpoint.pendingPatches / endpoint.total) * 100),
          );
          const quarantinePct = Math.round(
            (endpoint.quarantine / endpoint.total) * 100,
          );

          return (
            <article
              key={endpoint.platform}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-slate-200 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {endpoint.platform}
                  </h3>
                  <p className="text-xs uppercase text-slate-400">
                    {endpoint.total} enrolled devices
                  </p>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <span className="font-semibold text-emerald-600">
                    {healthyPct}% healthy
                  </span>
                  <span className="text-amber-600">
                    {endpoint.pendingPatches} pending patches
                  </span>
                  <span className="text-rose-600">
                    {endpoint.quarantine} quarantine
                  </span>
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div
                  className={clsx(
                    "h-full rounded-full bg-gradient-to-r",
                    platformAccent[endpoint.platform],
                  )}
                  style={{ width: `${healthyPct}%` }}
                />
              </div>
              <div className="mt-2 flex items-center gap-6 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  Healthy
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="size-2 rounded-full bg-amber-500" />
                  Pending patches ({pendingPct}%)
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="size-2 rounded-full bg-rose-500" />
                  Quarantine ({quarantinePct}%)
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
