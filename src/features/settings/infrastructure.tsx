import { useNavigate } from "react-router-dom";
import {Icon} from "@iconify/react";
import type { ReactNode } from "react";

type FeatureCard = {
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
};

type StatCard = {
  title: string;
  value: string;
  caption: string;
  tone?: "neutral" | "success";
  icon: ReactNode;
};

const featureCards: FeatureCard[] = [
  {
    title: "Platform Settings",
    subtitle: "Global configuration and feature flags",
    description: "Manage global switches and thresholds",
    icon: <Icon icon="lucide:settings" className="h-5 w-5 text-amber-500" />,
  },
  {
    title: "Audit Log",
    subtitle: "Track all admin actions and changes",
    description: "Review account activity and policy updates",
    icon: <Icon icon="lucide:file-text" className="h-5 w-5 text-purple-700" />,
  },
  {
    title: "Admin Team",
    subtitle: "Manage admin users and permissions",
    description: "Invite and control team access levels",
    icon: <Icon icon="lucide:users" className="h-5 w-5 text-emerald-500" />,
  },
];

const statCards: StatCard[] = [
  {
    title: "Actions Today",
    value: "127",
    caption: "Across all modules",
    icon: <Icon icon="lucide:file-text" className="h-4 w-4 text-purple-700" />
  },
  {
    title: "Active Admins",
    value: "4",
    caption: "1 break, 3 suspended",
    icon: <Icon icon="lucide:users" className="h-4 w-4 text-emerald-500" />
  },
  {
    title: "System Status",
    value: "Operational",
    caption: "All systems normal",
    tone: "success",
    icon: <Icon icon="lucide:shield" className="h-4 w-4 text-purple-700" />
  },
];

export const Infrastructure = () => {
  const navigate = useNavigate();

  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-[30px] font-semibold leading-8 text-slate-900">Infrastructure</h1>
        <p className="mt-2 text-xs text-slate-500">Platform settings, audit logs, and admin team management</p>
      </header>

      
      <div className="grid gap-3 lg:grid-cols-3">
        {featureCards.map((card) => (
          <article
            key={card.title}
            onClick={() => {
              if (card.title === "Platform Settings") {
                navigate("/dashboard/settings/platform-settings");
              }
              if (card.title === "Admin Team") {
                navigate("/dashboard/settings/admin-team");
              }
            }}
            className={`rounded-lg border border-slate-200 bg-white p-4 shadow-sm ${
              card.title === "Platform Settings" || card.title === "Admin Team"
                ? "cursor-pointer transition hover:border-violet-200 hover:shadow-md"
                : ""
            }`}
          >
            <div className="mb-3 flex h-7 w-7 items-center justify-center">
              {card.icon}
            </div>
            <h2 className="text-sm font-semibold text-slate-800">{card.title}</h2>
            <p className="mt-1 text-[11px] text-slate-500">{card.subtitle}</p>
            <p className="mt-4 text-[11px] text-slate-500 text-md">{">"}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {statCards.map((card) => (
          <article key={card.title} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs text-slate-500">{card.title}</p>
              {card.icon}
            </div>
            <p className={`text-[30px] font-semibold leading-none ${card.tone === "success" ? "text-emerald-700" : "text-slate-900"}`}>
              {card.value}
            </p>
            <p className="mt-2 text-[11px] text-slate-500">{card.caption}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
