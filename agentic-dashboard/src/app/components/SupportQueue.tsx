import type { JSX } from "react";
import { BadgeCheck, Headphones, Phone, Timer } from "lucide-react";
import type { SupportTicket } from "@/app/data/mock-data";
import { clsx } from "clsx";

type Props = {
  tickets: SupportTicket[];
};

const priorityStyles: Record<SupportTicket["priority"], string> = {
  Critical: "bg-rose-100 text-rose-600",
  High: "bg-amber-100 text-amber-600",
  Medium: "bg-sky-100 text-sky-600",
  Low: "bg-emerald-100 text-emerald-600",
};

const statusIndicator: Record<SupportTicket["status"], string> = {
  Investigating: "bg-sky-500",
  "In Progress": "bg-indigo-500",
  Resolved: "bg-emerald-500",
  "Waiting on User": "bg-amber-500",
};

const channelIcon: Record<SupportTicket["channel"], JSX.Element> = {
  Teams: <Headphones className="size-3.5" />,
  Email: <BadgeCheck className="size-3.5" />,
  Phone: <Phone className="size-3.5" />,
  Portal: <Timer className="size-3.5" />,
};

export function SupportQueue({ tickets }: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/70 p-6 backdrop-blur">
      <header className="flex items-center justify-between pb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Tier 1 & 2 Queue
          </h2>
          <p className="text-sm text-slate-500">
            Prioritized incidents with real-time SLA tracking.
          </p>
        </div>
        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
          Dispatch Agent
        </button>
      </header>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <article
            key={ticket.id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm transition hover:border-slate-200 hover:shadow-md md:flex-row md:items-center md:gap-6"
          >
            <div className="flex items-center gap-3">
              <span
                className={clsx(
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                  priorityStyles[ticket.priority],
                )}
              >
                {ticket.priority}
              </span>
              <span className="text-sm font-semibold text-slate-900">
                {ticket.id}
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-600">
                  {channelIcon[ticket.channel]}
                  {ticket.channel}
                </span>
                <span className="inline-flex items-center gap-1">
                  Tier {ticket.tier.replace("L", "")}
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-medium text-slate-900">{ticket.device}</p>
                <p>{ticket.summary}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="space-y-1">
                  <p className="text-xs uppercase text-slate-400">Requester</p>
                  <p className="font-medium text-slate-900">
                    {ticket.requester}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase text-slate-400">Assignee</p>
                  <p className="font-medium text-slate-900">
                    {ticket.assignee}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase text-slate-400">ETA</p>
                  <p className="font-semibold text-indigo-600">{ticket.eta}</p>
                </div>
              </div>
            </div>
            <span
              className={clsx(
                "flex h-6 w-20 items-center justify-center rounded-full text-xs font-semibold text-white",
                statusIndicator[ticket.status],
              )}
            >
              {ticket.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
