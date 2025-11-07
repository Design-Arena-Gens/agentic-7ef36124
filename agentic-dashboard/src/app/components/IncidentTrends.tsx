import type { TrendMetric } from "@/app/data/mock-data";

type Props = {
  trends: TrendMetric[];
};

const unitSuffix: Record<TrendMetric["unit"], string> = {
  tickets: "tickets",
  minutes: "min",
  percent: "%",
};

function buildSparkline(points: number[]) {
  const width = 120;
  const height = 36;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(max - min, 1);

  return points
    .map((point, index) => {
      const x = (index / (points.length - 1 || 1)) * width;
      const y = height - ((point - min) / range) * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function IncidentTrends({ trends }: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/70 p-6 backdrop-blur">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Incident performance
          </h2>
          <p className="text-sm text-slate-500">
            Week-over-week progress across critical service desk KPIs.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          Rolling 7-day window
        </span>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {trends.map((trend) => {
          const delta = trend.current - trend.previous;
          const deltaText =
            trend.unit === "minutes"
              ? `${delta > 0 ? "+" : ""}${delta} min`
              : trend.unit === "percent"
                ? `${delta > 0 ? "+" : ""}${delta}%`
                : `${delta > 0 ? "+" : ""}${delta}`;

          const improved =
            (trend.unit === "minutes" && delta < 0) ||
            (trend.unit !== "minutes" && delta > 0);

          return (
            <article
              key={trend.id}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-slate-200 hover:shadow-md"
            >
              <header className="flex items-center justify-between pb-3">
                <h3 className="text-sm font-semibold text-slate-900">
                  {trend.label}
                </h3>
                <span
                  className={`text-xs font-semibold ${
                    improved ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {deltaText}
                </span>
              </header>
              <div className="flex items-end gap-2 pb-3">
                <p className="text-3xl font-semibold text-slate-900">
                  {trend.current}
                  <span className="text-base font-medium text-slate-400">
                    {unitSuffix[trend.unit]}
                  </span>
                </p>
                <p className="text-xs text-slate-400">
                  prev {trend.previous}
                  {trend.unit === "percent" ? "%" : ""}
                </p>
              </div>
              <svg
                viewBox="0 0 120 36"
                className="h-12 w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id={`spark-${trend.id}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d={buildSparkline(trend.points)}
                  fill="none"
                  stroke={`url(#spark-${trend.id})`}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
              </svg>
              <p className="pt-3 text-xs text-slate-500">
                {trend.commentary}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
