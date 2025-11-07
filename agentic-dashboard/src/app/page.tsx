import {
  assistantPrompts,
  automationPlaybooks,
  endpointSnapshots,
  incidentTrends,
  integrationStatuses,
  metrics,
  supportTickets,
  vulnerabilitySlices,
} from "@/app/data/mock-data";
import { KPIGrid } from "@/app/components/KPIGrid";
import { IncidentTrends } from "@/app/components/IncidentTrends";
import { SupportQueue } from "@/app/components/SupportQueue";
import { AssistantPanel } from "@/app/components/AssistantPanel";
import { IntegrationsPanel } from "@/app/components/IntegrationsPanel";
import { VulnerabilityMatrix } from "@/app/components/VulnerabilityMatrix";
import { EndpointHealth } from "@/app/components/EndpointHealth";
import { AutomationPlaybooks } from "@/app/components/AutomationPlaybooks";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-100 to-white pb-16">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 lg:px-6">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.55)] backdrop-blur">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-violet-500/20 via-violet-500/10 to-transparent lg:block" />
          <div className="relative flex flex-col gap-6 lg:max-w-3xl">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              AI-Powered Vulnerability Management & Support
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Unified IT operations cockpit for L1/L2 support, vulnerability
              response, and endpoint governance.
            </h1>
            <p className="text-base text-slate-600">
              Orchestrate ServiceNow, Jira, and Freshservice updates, automate
              onboarding and offboarding, and monitor device health across
              Windows, macOS, and network infrastructure—all backed by an
              intelligent assistant that keeps you ahead of SLAs.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-medium">
                Real-time ticket sync
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-medium">
                Endpoint telemetry
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-medium">
                AI-guided runbooks
              </span>
            </div>
          </div>
        </section>

        <KPIGrid items={metrics} />

        <IncidentTrends trends={incidentTrends} />

        <div className="grid gap-6 xl:grid-cols-[1.8fr_1.2fr]">
          <SupportQueue tickets={supportTickets} />
          <AssistantPanel prompts={assistantPrompts} tickets={supportTickets} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <VulnerabilityMatrix items={vulnerabilitySlices} />
          <IntegrationsPanel items={integrationStatuses} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <EndpointHealth endpoints={endpointSnapshots} />
          <AutomationPlaybooks playbooks={automationPlaybooks} />
        </div>
      </main>
    </div>
  );
}
