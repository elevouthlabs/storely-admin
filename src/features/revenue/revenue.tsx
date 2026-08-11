import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FAILED_PAYMENTS_COUNT, FailedPaymentsPanel } from "./tab/failedPayment";
import { subscriptionOverviewRows } from "./mock/subscriptionOverviewSeed";
import { subscriptionDetailPath } from "./mock/subscriptionPaths";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { fetchRevenue } from "./revenueSlice";

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
  { title: "Failed Payments", value: String(FAILED_PAYMENTS_COUNT), delta: "Requires attention", tone: "danger", dataTone: "default" },
];

const planBadgeClass: Record<(typeof subscriptionOverviewRows)[number]["plan"], string> = {
  Pro: "bg-violet-50 text-violet-700",
  Growth: "bg-sky-50 text-sky-700",
  Enterprise: "bg-slate-100 text-slate-700",
};

const statusBadgeClass: Record<(typeof subscriptionOverviewRows)[number]["status"], string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  "Grace Period": "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
};


const TabFailedDot = () => (
  <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
);

export default function Revenue() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const panelTitle = "All Subscriptions";
  const activeTabClasses = "border-b-2 font-medium pb-2 text-[12px]";
  const inactiveTabClasses = "border-b-2 border-transparent pb-2 font-medium text-[12px] text-slate-500 hover:text-slate-700";
  const {revenues, isLoading, error }= useAppSelector((state) => state.revenues);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch()

    useEffect(() => {
        if (token) {
          dispatch(fetchRevenue({ page: 1, limit: 10 }));
        }
      }, [dispatch, token]);
      
      console.log(revenues);
  
   if (isLoading) return <p>Loading orders...</p>;
   if (error) return <p>Error: {error}</p>;   
  return (
    <section className="min-h-full space-y-4">
      <header>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-[30px] font-semibold leading-8 text-slate-900">Subscription Overview</h1>
            <p className="mt-1 text-[12px] font-normal leading-5 text-slate-500">
              All stores&apos; plan status, billing health, and renewal pipeline
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/dashboard/revenue/dashboard"}
              className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-600"
            >
              Revenue Dashboard
            </Link>
            <Link
              to={"/dashboard/revenue/payout-scheduler"}
              className="rounded-md px-3 py-1.5 text-[12px] font-medium text-white shadow-sm hover:opacity-95"
              style={{ backgroundColor: PRIMARY_PURPLE }}
            >
              Payout Schedule
            </Link>
          </div>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
        <div className="border-b border-slate-200 px-5 pt-4">
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "all"}
              onClick={() => setActiveTab("all")}
              className={activeTab === "all" ? activeTabClasses : inactiveTabClasses}
              style={activeTab === "all" ? { borderColor: PRIMARY_PURPLE, color: PRIMARY_PURPLE } : undefined}
            >
              All Subscriptions
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "failed"}
              onClick={() => setActiveTab("failed")}
              className={`inline-flex items-center gap-2 ${activeTab === "failed" ? activeTabClasses : inactiveTabClasses}`}
              style={activeTab === "failed" ? { borderColor: PRIMARY_PURPLE, color: PRIMARY_PURPLE } : undefined}
            >
              Failed Payments
              <TabFailedDot />
            </button>
          </div>
        </div>

        <div className="p-5">
          {activeTab === "all" ? (
            <>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center
               sm:justify-between bg-white p-4">
                <h2 className="text-[18px] font-semibold text-slate-900">{panelTitle}</h2>
                <div className="flex gap-2">
                  <div className="flex h-9 min-w-[200px] items-center rounded-md border
                   border-slate-200 bg-white px-3 text-[12px] text-slate-400">
                    <Icon icon="lucide:search" className="h-3 w-3 shrink-0 mr-1"/>
                    Search stores...
                  </div>
                  <button
                    type="button"
                    className="rounded-md inline-flex items-center border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800"
                  >
                    <Icon icon="lucide:filter" className="h-3 w-3 shrink-0 mr-1"/>
                    Filters
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left bg-white">
                  <thead className="bg-[#F8FAFC]">
                    <tr className="border-y border-slate-200">
                      {["Store", "Plan", "Status", "Next Renewal", "Payment Method", "Amount", "Actions"].map((heading) => (
                        <th key={heading} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptionOverviewRows.map((row) => (
                      <tr key={`${row.store}-${row.handle}`} className="border-b border-slate-100 last:border-b-0">
                        <td className="px-4 py-3.5">
                          <p className="text-[13px] font-medium text-slate-800">{row.store}</p>
                          <p className="text-[11px] text-slate-400">{row.handle}</p>
                        </td>
                        <td className="px-3 py-3.5">
                          <span className={`inline-flex rounded px-2 py-1 text-[10px] font-semibold ${planBadgeClass[row.plan]}`}>{row.plan}</span>
                        </td>
                        <td className="px-3 py-3.5">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusBadgeClass[row.status]}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 text-[12px] text-slate-500">{row.renewal}</td>
                        <td className="px-3 py-3.5 text-[12px] text-slate-500">{row.paymentMethod}</td>
                        <td className="px-3 py-3.5 text-[13px] font-semibold text-slate-700">{row.amount}</td>
                        <td className="px-3 py-3.5">
                          <Link
                            to={subscriptionDetailPath(row.handle)}
                            className="text-[12px] font-medium hover:opacity-80"
                            style={{ color: PRIMARY_PURPLE }}
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <FailedPaymentsPanel primaryPurple={PRIMARY_PURPLE} />
          )}
        </div>
      </section>
    </section>
  );
}
