import { useState } from "react";
import { Link } from "react-router-dom";

import { campaignOverviewRows } from "./mock/campaignData";

import { Icon } from "@iconify/react";

const PRIMARY_PURPLE = "#6B46C1";

type TabKey = "all" | "failed";

type OverviewMetric = {
  title: string;
  value: string;
  delta: string;
  tone?: "default" | "danger";
  dataTone?: "success" | "default" | "danger";
};

const overviewMetrics: OverviewMetric[] = [
  { title: "Active Subscriptions", value: "1,423", delta: "+8% MoM", dataTone: "success" },
  { title: "MRR", value: "₦34.2M", delta: "+12% MoM", dataTone: "success" },
  { title: "Churned This Month", value: "47", delta: "3.3% churn rate", dataTone: "default" },
//   { title: "Failed Payments", value: String(FAILED_PAYMENTS_COUNT), delta: "Requires attention", tone: "danger", dataTone: "default" },
];


const statusBadgeClass: Record<(typeof campaignOverviewRows)[number]["status"], string> = {
  "Sent": "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  "Scheduled": "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  "Draft": "bg-slate-100 text-slate-700 ring-1 ring-slate-100",
};



export default function Campaign() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section className="min-h-full space-y-4">
      <header>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-[30px] font-semibold leading-8 text-slate-900">Communications Hub</h1>
            <p className="mt-1 text-[12px] font-normal leading-5 text-slate-500">
              Overview of all campaigns — sent, scheduled, and draft
            </p>
          </div>

          <div> 
            <Link
              to={"/dashboard/campaign/new"}
              className="rounded-md px-3 py-1.5 text-[12px] font-medium text-white shadow-sm hover:opacity-95"
              style={{ backgroundColor: PRIMARY_PURPLE }}
            >
              New Campaign
            </Link>
          </div>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {overviewMetrics.map((metric) => (
          <article key={metric.title} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <p className="text-[11px] font-medium text-slate-500">{metric.title}</p>
              {metric.title === "Active Subscriptions" ? (
                <Icon icon="lucide:credit-card" className="mt-0.5 h-5 w-5 text-[#4b0082]" />
              ) : metric.title === "MRR" ? (
                <Icon icon="lucide:dollar-sign" className="mt-0.5 h-5 w-5 text-[#1b5e20]" />
              ) : metric.title === "Churned This Month" ? (
                <Icon icon="lucide:circle-alert" className="mt-0.5 h-5 w-5 text-[#f54900]" />
              ) : (
                 <Icon icon="lucide:circle-alert" className="mt-0.5 h-5 w-5 text-[#e7000b]" />
              )}
            </div>
            <p className="mt-2 text-[31px] font-semibold leading-8 text-slate-900">{metric.value}</p>
            <p
              className={`mt-1 flex items-center gap-1 text-[11px] ${
                metric.dataTone === "success"
                  ? "text-emerald-600"
                  : metric.tone === "danger"
                    ? "text-slate-500"
                    : "text-slate-500"
              }`}
            >
              {metric.dataTone === "success" ? <span aria-hidden="true">↗</span> : null}
              <span className={metric.title === "Failed Payments" ? "text-slate-500" : undefined}>{metric.delta}</span>
            </p>
          </article>
        ))}
      </div>

      <section>
        <div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left bg-white">
                  <thead className="bg-[#F8FAFC]">
                    <tr className="border-y border-slate-200">
                      {["Campaign Name", "Type", "Audience Size", "Status", "Sent Date", "Open Rate", "Actions"].map((heading) => (
                        <th key={heading} className="px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-500">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                   <tbody>
                    {campaignOverviewRows.map((row) => (
                      <tr key={`${row.name}-${row.type}`} className="border-b border-slate-100 last:border-b-0">
                        <td className="px-4 py-3.5">
                          <p className="text-[13px] font-medium text-slate-800">{row.name}</p>
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="text-[11px] text-slate-400">{row.type}</p>
                        </td>
                        <td className="px-4 py-3.5">
                            <p className="text-[11px] text-slate-400">{row.audienceSize.toLocaleString()}</p>
                        </td>
                        <td className="px-3 py-3.5">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusBadgeClass[row.status]}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 text-[12px] text-slate-500">{row.Date.toLocaleDateString()}</td>
                        <td className="px-5 py-3.5 text-[12px] text-slate-500">{row.rate}</td>
                        <td className="px-5 py-3.5">
                            ...
                        </td>
                      </tr>
                    ))}
                  </tbody> 
                </table>
              </div>
        </div>
      </section>
    </section>
  );
}
