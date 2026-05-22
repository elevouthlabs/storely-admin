import { useState } from "react";
import { Link } from "react-router-dom";
import { ApproveProcessModal } from "./modal/approveProcess";
import { PaymentDetailsModal } from "./modal/paymentDetails";
import { batchStores, type BatchStoreRow, type PayoutStatus } from "./mock/payoutBatchData";
import { Icon } from "@iconify/react";

const PRIMARY_PURPLE = "#6B46C1";
const PAGE_BG = "#F5F7FA";

const statusBadgeClass: Record<PayoutStatus, string> = {
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  "On Hold": "bg-red-50 text-red-600 ring-1 ring-red-100",
};

const actionClass = {
  blue: "text-[#2563EB] hover:text-[#1D4ED8]",
  purple: "font-medium hover:opacity-80",
} as const;

const tableHeadings = ["Store", "Amount Owed", "Payment Method", "Last Payout", "Status", "Actions"] as const;

export default function PayoutScheduler() {
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<BatchStoreRow | null>(null);

  const openStoreDetails = (row: BatchStoreRow) => {
    if (row.actionLabel === "View Details") {
      setSelectedStore(row);
    }
  };

  const closeStoreDetails = () => setSelectedStore(null);

  return (
    <section
      className="-mx-4 -mb-4 min-h-full px-4 pb-6 sm:-mx-6 sm:px-6 sm:pb-6 space-y-4">
      <nav className="pt-1 text-[12px] text-slate-500" aria-label="Breadcrumb">
        <Link to="/dashboard/revenue" className="hover:text-slate-700">
          Subscription Overview
        </Link>
        <span className="mx-1.5 text-slate-300">/</span>
        <span className="font-medium text-slate-600">Payout Scheduler</span>
      </nav>

      <header className="mt-3">
        <h1 className="text-[30px] font-semibold leading-8 text-slate-900">Payout Scheduler</h1>
        <p className="mt-1 text-[12px] leading-5 text-slate-500">Review and approve pending store payouts</p>
      </header>

      <article className="mt-4 rounded-lg border border-violet-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-[15px] font-semibold text-slate-900">Pending Batch: April 22, 2026</h2>
            <p className="mt-0.5 text-[11px] text-slate-500">Next scheduled payout run</p>
          </div>
          <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-100">
            Pending Approval
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-y border-slate-100 py-5 sm:grid-cols-4">
          <div>
            <p className="text-[11px] font-medium text-slate-500">Total Stores</p>
            <p className="mt-1 text-[26px] font-semibold leading-8 text-slate-900">5</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Total Amount</p>
            <p className="mt-1 text-[26px] font-semibold leading-8 text-slate-900">₦8.48M</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">On Hold</p>
            <p className="mt-1 text-[26px] font-semibold leading-8 text-amber-600">1</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Ready to Process</p>
            <p className="mt-1 text-[26px] font-semibold leading-8 text-emerald-600">4</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsApproveModalOpen(true)}
          className="mt-5 w-full rounded-md py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:opacity-95"
          style={{ backgroundColor: PRIMARY_PURPLE }}
        >
          Approve &amp; Process Batch
        </button>
      </article>

      <article className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
          <h2 className="text-[15px] font-semibold text-slate-900">Stores in Current Batch</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-600 hover:bg-slate-50"
            >
              <Icon icon="lucide:filter" className="h-4 w-4" />
              Filter
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-600 hover:bg-slate-50"
            >
              <Icon icon="lucide:download" className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto px-4 pb-4 sm:px-5">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-slate-200">
                {tableHeadings.map((heading) => (
                  <th
                    key={heading}
                    className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500 first:pl-0"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {batchStores.map((row) => (
                <tr key={row.store} className="border-b border-slate-100 last:border-b-0">
                  <td className="px-3 py-3.5 text-[13px] font-semibold text-slate-800 first:pl-0">{row.store}</td>
                  <td className="px-3 py-3.5 text-[13px] font-medium text-slate-800">{row.amountOwed}</td>
                  <td className="px-3 py-3.5 text-[12px] text-slate-600">{row.paymentMethod}</td>
                  <td className="px-3 py-3.5 text-[12px] text-slate-600">{row.lastPayout}</td>
                  <td className="px-3 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusBadgeClass[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <button
                      type="button"
                      onClick={() => openStoreDetails(row)}
                      className={`text-[12px] font-medium ${actionClass[row.actionTone]}`}
                      style={row.actionTone === "purple" ? { color: PRIMARY_PURPLE } : undefined}
                    >
                      {row.actionLabel}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <ApproveProcessModal isOpen={isApproveModalOpen} onClose={() => setIsApproveModalOpen(false)} />

      <PaymentDetailsModal
        isOpen={selectedStore !== null}
        onClose={closeStoreDetails}
        store={selectedStore}
      />
    </section>
  );
}
