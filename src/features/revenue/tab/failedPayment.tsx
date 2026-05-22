import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import { subscriptionOverviewRows } from "../mock/subscriptionOverviewSeed";
import { subscriptionDetailPath } from "../mock/subscriptionPaths";

export const FAILED_PAYMENTS_COUNT = 23;

export type FailedPaymentPlan = "Pro" | "Growth" | "Enterprise";

export type FailedPaymentRow = {
  store: string;
  handle: string;
  plan: FailedPaymentPlan;
  status: "Pending";
  renewal: string;
  paymentMethod: string;
  amount: string;
};

const planBadgeClass: Record<FailedPaymentPlan, string> = {
  Pro: "bg-violet-50 text-violet-700",
  Growth: "bg-sky-50 text-sky-700",
  Enterprise: "bg-slate-100 text-slate-700",
};

const failedPaymentRows: FailedPaymentRow[] = subscriptionOverviewRows.map((r) => ({
  store: r.store,
  handle: r.handle,
  plan: r.plan,
  status: "Pending",
  renewal: r.renewal,
  paymentMethod: r.paymentMethod.replace(/••••/g, "****"),
  amount: r.amount,
}));

type FailedPaymentsPanelProps = {
  primaryPurple: string;
};

export function FailedPaymentsPanel({ primaryPurple }: FailedPaymentsPanelProps) {
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white p-4">
        <h2 className="text-[18px] font-semibold text-slate-900">Failed Payment</h2>
        <div className="flex gap-2">
          <div className="flex h-9 min-w-[200px] items-center rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-400">
            <Icon icon="lucide:search" className="h-3 w-3 shrink-0 mr-1"/>
            Search stores...
          </div>
          <button type="button" className="rounded-md border inline-flex items-center border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800">
            <Icon icon="lucide:filter" className="h-3 w-3 shrink-0 mr-1"/>
            Filters
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left bg-white">
          <thead>
            <tr className="border-y border-slate-200 bg-[#F8FAFC]">
              {["Store", "Plan", "Status", "Next Renewal", "Payment Method", "Amount", "Actions"].map((heading) => (
                <th key={heading} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {failedPaymentRows.map((row, index) => (
              <tr key={`${row.store}-${row.handle}-${index}`} className="border-b border-slate-100 last:border-b-0">
                <td className="px-4 py-3.5">
                  <p className="text-[13px] font-medium text-slate-800">{row.store}</p>
                  <p className="text-[11px] text-slate-400">{row.handle}</p>
                </td>
                <td className="px-3 py-3.5">
                  <span className={`inline-flex rounded px-2 py-1 text-[10px] font-semibold ${planBadgeClass[row.plan]}`}>{row.plan}</span>
                </td>
                <td className="px-3 py-3.5">
                  <span className="inline-flex rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-semibold text-orange-800 ring-1 ring-orange-100">
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
                    style={{ color: primaryPurple }}
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
