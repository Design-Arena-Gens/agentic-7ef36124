import type { JSX } from "react";
import { Bot, Play, ShieldCheck } from "lucide-react";
import type { AutomationPlaybook } from "@/app/data/mock-data";

type Props = {
  playbooks: AutomationPlaybook[];
};

const iconByPlaybook: Record<string, JSX.Element> = {
  "autofix-bitlocker": <ShieldCheck className="size-4" />,
  "vpn-reset": <Play className="size-4" />,
  "account-offboarding": <Bot className="size-4" />,
};

export function AutomationPlaybooks({ playbooks }: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/70 p-6 backdrop-blur">
      <header className="flex items-center justify-between pb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Automation Runbooks
          </h2>
          <p className="text-sm text-slate-500">
            Low-touch workflows orchestrating onboarding, remediation, and
            compliance tasks.
          </p>
        </div>
        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
          Launch Automation
        </button>
      </header>

      <div className="space-y-3">
        {playbooks.map((playbook) => (
          <article
            key={playbook.id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm transition hover:border-slate-200 hover:shadow-md md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                {iconByPlaybook[playbook.id] ?? <Play className="size-4" />}
              </span>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {playbook.name}
                </h3>
                <p className="text-sm text-slate-500">
                  Targets: {playbook.targets}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
              <span>
                Success rate{" "}
                <span className="font-semibold text-emerald-600">
                  {Math.round(playbook.successRate * 100)}%
                </span>
              </span>
              <span>Last ran {playbook.lastRan}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Owner: {playbook.owner}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
