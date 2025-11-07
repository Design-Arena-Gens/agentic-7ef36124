"use client";

import { useMemo, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import type { AssistantPrompt, SupportTicket } from "@/app/data/mock-data";
import { clsx } from "clsx";

type Props = {
  prompts: AssistantPrompt[];
  tickets: SupportTicket[];
};

type Persona = "Service Desk" | "Security Analyst" | "Onboarding";

const personaDescriptions: Record<Persona, string> = {
  "Service Desk":
    "Balances responsiveness with SLA compliance. Focuses on clear updates and asset telemetry.",
  "Security Analyst":
    "Prioritises vulnerability containment and impact assessments with actionable remediation.",
  Onboarding:
    "Automates provisioning, entitlement checks, and shadow IT containment for joiners/leavers.",
};

const cannedResponses: Record<
  Persona,
  Record<AssistantPrompt["action"], string>
> = {
  "Service Desk": {
    triage:
      "1. Validate network reachability and gather endpoint telemetry (Intune health, CrowdStrike status).\n2. Confirm recent changes (VPN client version, certificate rotation).\n3. Provide temporary workaround by re-establishing trusted network profile.\n4. Update the ticket timeline and confirm SLA impact remains within 30-minute target.",
    troubleshoot:
      "Running automated diagnostics: `vpn_diag --scope=user --collect-logs`. If packet loss exceeds 3%, queue VPN reset playbook and notify Network Ops. Capture Teams call notes for audit.",
    "draft-response":
      "Hi Derrick,\n\nWe've triggered the BitLocker auto-recovery playbook and validated your TPM status. Your device is re-encrypting and will prompt once more—please approve to restore full access. I'll follow up in 5 minutes with a confirmation.\n\nThanks,\nL1 Service Desk",
    escalate:
      "Escalating to Tier 3 with attached NetMotion telemetry, correlation ID `vpn-48231-2024-02-11`. Impact: Finance users unable to process payments every 20 minutes. Requested on-call engineer to engage within 15 minutes.",
  },
  "Security Analyst": {
    triage:
      "Correlate vulnerability with MITRE technique. Deploy rapid containment policy via Intune for affected Windows 11 endpoints. Validate patch KB503412 against staging ring.",
    troubleshoot:
      "Initiating credential exposure scan and reviewing IDS alerts for lateral movement. If correlated, trigger isolation workflow via Defender ATP.",
    "draft-response":
      "Security Broadcast: Analysts are mitigating CVE-2024-8821 on Windows VPN clients. Temporary policy enforces MFA re-registration. No evidence of exploitation. Next update in 25 minutes.",
    escalate:
      "Notifying Cyber Defense lead. Request accelerated patch sign-off. Provide packet captures and VulnDB references in the escalation bundle.",
  },
  Onboarding: {
    triage:
      "Validate HR feed for start date, confirm Okta license availability, ensure ServiceNow catalog item fulfilled.",
    troubleshoot:
      "Re-run onboarding flow with dry-run mode. Check failing step logs in Azure Automation and Jamf scoping.",
    "draft-response":
      "Onboarding Update: Accounts enabled across Azure AD, Duo, and Slack. MacBook provisioning queued in Jamf; device pickup scheduled for tomorrow 09:00.",
    escalate:
      "Trigger manager approval workflow and notify Identity Ops to provision elevated finance roles manually.",
  },
};

export function AssistantPanel({ prompts, tickets }: Props) {
  const [selectedPrompt, setSelectedPrompt] = useState(prompts[0]);
  const [selectedPersona, setSelectedPersona] =
    useState<Persona>("Service Desk");
  const [selectedTicketId, setSelectedTicketId] = useState(tickets[0]?.id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState("");

  const currentTicket = useMemo(
    () => tickets.find((ticket) => ticket.id === selectedTicketId),
    [tickets, selectedTicketId],
  );

  const handleGenerate = () => {
    if (!selectedPrompt) return;
    setIsGenerating(true);
    setTimeout(() => {
      const suggestion =
        cannedResponses[selectedPersona][selectedPrompt.action];
      const context = currentTicket
        ? `Ticket ${currentTicket.id} · ${currentTicket.summary}\n\n`
        : "";
      setResponse(`${context}${suggestion}`);
      setIsGenerating(false);
    }, 900);
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-slate-50 shadow-[0_40px_120px_-45px_rgba(16,24,40,0.65)]">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-5">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Agentic Co-Pilot
          </h2>
          <p className="text-sm text-slate-300">
            Natural-language workflows to accelerate incident resolution and
            vulnerability decisions.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-300">
          <Sparkles className="size-3.5 text-violet-400" />
          Real-time reasoning enabled
        </span>
      </header>

      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-xs uppercase tracking-wide text-slate-400">
              Select ticket
            </h3>
            <div className="mt-3 space-y-2">
              {tickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className={clsx(
                    "w-full rounded-xl border px-3 py-2 text-left text-sm transition",
                    ticket.id === selectedTicketId
                      ? "border-violet-400/60 bg-violet-500/10 text-white"
                      : "border-white/10 bg-white/[0.02] text-slate-200 hover:border-white/20",
                  )}
                >
                  <p className="font-semibold">{ticket.id}</p>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {ticket.summary}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-xs uppercase tracking-wide text-slate-400">
              Persona
            </h3>
            <div className="mt-3 space-y-2">
              {(["Service Desk", "Security Analyst", "Onboarding"] as Persona[]).map(
                (persona) => (
                  <button
                    key={persona}
                    onClick={() => setSelectedPersona(persona)}
                    className={clsx(
                      "w-full rounded-xl border px-3 py-2 text-left text-sm transition",
                      persona === selectedPersona
                        ? "border-violet-400/60 bg-violet-500/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-slate-200 hover:border-white/20",
                    )}
                  >
                    <p className="font-semibold">{persona}</p>
                    <p className="text-xs text-slate-400">
                      {personaDescriptions[persona]}
                    </p>
                  </button>
                ),
              )}
            </div>
          </div>
        </aside>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-xs uppercase tracking-wide text-slate-400">
              Assistant intents
            </h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {prompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => setSelectedPrompt(prompt)}
                  className={clsx(
                    "rounded-2xl border px-3 py-3 text-left transition",
                    prompt.id === selectedPrompt.id
                      ? "border-violet-400/60 bg-violet-500/10 text-white"
                      : "border-white/10 bg-white/[0.02] text-slate-200 hover:border-white/20",
                  )}
                >
                  <p className="text-sm font-semibold">{prompt.title}</p>
                  <p className="text-xs text-slate-400">{prompt.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-center justify-between pb-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  AI output
                </p>
                <p className="text-sm text-slate-300">
                  Tailored to selected persona & ticket context.
                </p>
              </div>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:bg-violet-500/60"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Thinking…
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    Generate
                  </>
                )}
              </button>
            </div>
            <textarea
              className="h-60 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-100"
              placeholder="Assistant suggestions will appear here."
              value={response}
              onChange={(event) => setResponse(event.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
