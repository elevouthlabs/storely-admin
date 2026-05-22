import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const PRIMARY_PURPLE = "#6B46C1";

const planSlices = [
  { label: "Pro", pct: 41, color: "#6B46C1" },
  { label: "Growth", pct: 25, color: "#3B82F6" },
  { label: "Enterprise", pct: 25, color: "#F97316" },
  { label: "Free", pct: 15, color: "#94A3B8" },
];

const topStores = [
  { rank: 1, name: "Fashion Hub Lagos", tier: "Enterprise", plan: "Pro" as const, gmv: "₦5,745,000", commission: "₦143,625" },
  { rank: 1, name: "Fashion Hub Lagos", tier: "Enterprise", plan: "Pro" as const, gmv: "₦5,745,000", commission: "₦143,625" },
  { rank: 1, name: "Fashion Hub Lagos", tier: "Enterprise", plan: "Pro" as const, gmv: "₦5,745,000", commission: "₦143,625" },
  { rank: 1, name: "Fashion Hub Lagos", tier: "Enterprise", plan: "Pro" as const, gmv: "₦5,745,000", commission: "₦143,625" },
  { rank: 1, name: "Fashion Hub Lagos", tier: "Enterprise", plan: "Pro" as const, gmv: "₦5,745,000", commission: "₦143,625" }
];

const tableHeadings = ["#", "Store", "Plan", "GMV", "Commission"] as const;

export default function RevenueDashboard() {
  return (
    <section className="min-h-full space-y-4 pb-8">
      <nav className="text-[12px] text-slate-500" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link to="/dashboard/revenue" className="hover:text-slate-700">
              Subscription Overview
            </Link>
          </li>
          <li className="px-0.5 text-slate-400" aria-hidden="true">
            /
          </li>
          <li className="font-medium text-slate-600">Revenue Dashboard</li>
        </ol>
      </nav>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[24px] font-semibold leading-8 text-slate-900">Revenue Dashboard</h1>
          <p className="mt-1 text-[12px] text-slate-500">Platform-wide revenue analytics and trends</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] font-medium text-slate-600 shadow-sm hover:bg-slate-50"
        >
          <Icon icon="lucide:download" className="h-4 w-4" />
          Export Report
        </button>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-medium text-slate-500">Total Revenue MTD</p>
            <Icon icon="lucide:dollar-sign" className="mt-0.5 h-5 w-5 text-[#1b5e20]" />
          </div>
          <p className="mt-2 text-[28px] font-semibold leading-8 text-slate-900">₦34.2M</p>
          <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600">
            <span aria-hidden="true">↗</span>
            +8% vs MOM
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-medium text-slate-500">Subscription Revenue</p>
            <Icon icon="lucide:credit-card" className="mt-0.5 h-5 w-5 text-[#4b0082]" />
          </div>
          <p className="mt-2 text-[28px] font-semibold leading-8 text-slate-900">₦42.5M</p>
          <p className="mt-1 text-[11px] text-slate-500">81% of total revenue</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-medium text-slate-500">Commission Revenue</p>
            <Icon icon="lucide:dollar-sign" className="mt-0.5 h-5 w-5 text-[#1b5e20]" />
          </div>
          <p className="mt-2 text-[28px] font-semibold leading-8 text-slate-900">₦9.8M</p>
          <p className="mt-1 text-[11px] text-slate-500">19% of total revenue</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-medium text-slate-500">Avg Revenue per Store</p>
            <Icon icon="lucide:circle-alert" className="mt-0.5 h-5 w-5 text-[#e7000b]" />
          </div>
          <p className="mt-2 text-[28px] font-semibold leading-8 text-slate-900">₦28,340</p>
          <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600">
            <span aria-hidden="true">↗</span>
            +5% vs avg
          </p>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-12 lg:items-stretch">
        {/* Equal-height chart cards: shared flex column + min-h chart body so pie/bar align */}
        <div className="flex h-full min-h-0 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-7">
          <h2 className="shrink-0 text-[15px] font-semibold text-slate-900">Revenue trend - last 12 months</h2>
          <div className="mt-4 flex min-h-[252px] flex-1 flex-col">
            <div className="flex flex-1 gap-2">
              <div className="flex h-[200px] w-9 shrink-0 flex-col justify-between py-0.5 text-right text-[9px] leading-none text-slate-400">
                <span>14M</span>
                <span>11.2M</span>
                <span>8.4M</span>
                <span>5.6M</span>
                <span>2.8M</span>
                <span>0</span>
              </div>
              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <div className="flex h-[200px] flex-1 items-end gap-1 border-b border-l border-slate-200 pb-0 pl-1 pr-1 pt-1 sm:gap-1.5">
                 {/* chart for months against revenue */}
                </div>
                <div className="mt-2 flex justify-between gap-0.5">
                  {/* months  */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full min-h-0 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-5">
          <h2 className="shrink-0 text-[15px] font-semibold text-slate-900">Revenue by Plan</h2>
          <div className="mt-4 flex min-h-[252px] flex-1 flex-col justify-center">
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
               {/* piechart area */}
              <ul className="flex w-full flex-col justify-center gap-2.5 text-[11px] sm:max-w-[11rem] sm:flex-1">
                {planSlices.map((s) => (
                  <li key={s.label} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: s.color }} />
                    <span className="font-medium text-slate-700">{s.label}</span>
                    <span className="text-slate-500">{s.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-[15px] font-semibold text-slate-900">Top 10 Stores by Revenue</h2>

        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full min-w-fulltext-sm
          table-fixed border-separate [border-spacing:0_5px] text-left">
            <thead>
              <tr>
                {tableHeadings.map((heading) => (
                  <th
                    key={heading}
                    className="px-3 pb-2 text-[11px] font-semibold text-slate-500">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topStores.map((row) => (
                <tr key={row.rank} 
                 className="bg-[#F8FAFC]">
                  <td className="rounded-l-xl py-3.5 align-middle">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-[11px] font-bold text-[#4B0082]">
                      {row.rank}
                    </span>
                  </td>
                  <td className="px-8 py-3.5 align-middle">
                    <p className="text-[13px] font-semibold text-slate-900">{row.name}</p>
                    <p className="text-[11px] text-slate-500">{row.tier}</p>
                  </td>
                  <td className="pr-[150px] py-3.5 text-right align-middle">
                    <span className="inline-flex bg-purple-100 px-2.5 py-1 text-[10px] font-semibold text-[#4B0082] rounded-xl">{row.plan}</span>
                  </td>
                  <td className="pr-[150px] py-3.5 text-right text-[13px] font-semibold text-slate-900 align-middle">{row.gmv}</td>
                  <td className="rounded-r-xl pr-[150px] py-3.5 text-right text-[13px] font-semibold text-slate-900 align-middle">{row.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
