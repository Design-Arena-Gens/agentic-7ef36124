import { ArrowDownRight, ArrowRight, ArrowUpRight, Minus } from "lucide-react";
import type { MetricCard } from "@/app/data/mock-data";

type Props = {
  items: MetricCard[];
};

const trendIcon = {
  up: <ArrowUpRight className="size-4 text-emerald-500" />,
  down: <ArrowDownRight className="size-4 text-rose-500" />,
  stable: <Minus className="size-4 text-slate-400" />,
};

const trendTextStyles = {
  up: "text-emerald-500",
  down: "text-rose-500",
  stable: "text-slate-500",
} as const;

export function KPIGrid({ items }: Props) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {items.map((metric) => {
        const Icon = metric.icon;
        return (
          <article
            key={metric.id}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/60 backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
          >
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 opacity-60 group-hover:opacity-100" />
            <div className="flex items-center justify-between px-5 pb-4 pt-5">
              <div className="flex items-center gap-3">
                <span
                  className={`flex size-9 items-center justify-center rounded-xl bg-slate-100 ${metric.iconColor}`}
                >
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    {metric.label}
                  </p>
                  <p className="text-2xl font-semibold text-slate-950">
                    {metric.value}
                  </p>
                </div>
              </div>
              <ArrowRight className="size-4 text-slate-300 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
            </div>
            <footer className="flex items-center gap-1 border-t border-slate-100 px-5 py-3 text-sm">
              {trendIcon[metric.trend]}
              <span className={trendTextStyles[metric.trend]}>
                {metric.change}
              </span>
            </footer>
          </article>
        );
      })}
    </section>
  );
}
