import { useEffect } from "react";
import type { BatchStoreRow } from "../mock/payoutBatchData";
import { Icon } from "@iconify/react";

type PaymentDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  store: BatchStoreRow | null;
};

const NET_PAYOUT_BG = "#E8F5E9";
const NET_PAYOUT_TEXT = "#166534";


const DetailField = ({ label, value }: { label: string; value: string }) => (
  <div className="min-w-0">
    <p className="text-[10px] font-medium text-slate-500">{label}</p>
    <p className="mt-1 text-[13px] font-medium text-slate-900">{value}</p>
  </div>
);

const FinancialRow = ({
  label,
  value,
  valueClassName = "text-slate-800",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) => (
  <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0">
    <span className="text-[13px] text-slate-600">{label}</span>
    <span className={`text-[13px] font-medium ${valueClassName}`}>{value}</span>
  </div>
);

export const PaymentDetailsModal = ({ isOpen, onClose, store }: PaymentDetailsModalProps) => {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !store) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/50 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payout-details-title"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-[760px] flex-col overflow-hidden rounded-md border
         border-slate-200 bg-white shadow-2xl !ml-[50px]"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="shrink-0 border-b border-slate-200 px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 pr-6">
              <h2 id="payout-details-title" className="text-[15px] font-semibold leading-snug text-slate-900">
                {store.store} – Payout Details
              </h2>
              <p className="mt-1 text-[12px] text-slate-500">{store.periodRange}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-md p-1 text-xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <section className="rounded-lg border border-slate-100 bg-white">
            <FinancialRow
              label="Payment Processing Fees (2%)"
              value={`- ${store.processingFees}`}
              valueClassName="text-red-600"
            />
            <FinancialRow
              label="Refunds Issued"
              value={`- ${store.refundsIssued}`}
              valueClassName="text-red-600"
            />
            <div
              className="flex items-center justify-between gap-4 rounded-md px-3 py-3"
              style={{ backgroundColor: NET_PAYOUT_BG }}
            >
              <span className="text-[13px] font-semibold text-slate-900">Net Payout</span>
              <span className="text-[15px] font-bold" style={{ color: NET_PAYOUT_TEXT }}>
                {store.netPayout}
              </span>
            </div>
          </section>

          <section className="mt-5">
            <h3 className="text-[13px] font-semibold text-slate-900">Bank Account Details</h3>
            <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50/80 p-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <DetailField label="Bank Name" value={store.bankName} />
                <DetailField label="Account Number" value={store.accountNumber} />
                <DetailField label="Account Name" value={store.accountName} />
              </div>
            </div>
          </section>

          <section className="mt-5">
            <h3 className="text-[13px] font-semibold text-slate-900">Recent Payout History</h3>
            <div className="mt-2 overflow-hidden rounded-lg border border-slate-200">
              <table className="min-w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    {["Date", "Amount", "Status", "Reference"].map((heading) => (
                      <th
                        key={heading}
                        className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {store.payoutHistory.map((entry) => (
                    <tr key={entry.reference} className="border-t border-slate-100">
                      <td className="px-3 py-2.5 text-[12px] text-slate-700">{entry.date}</td>
                      <td className="px-3 py-2.5 text-[12px] font-medium text-slate-800">{entry.amount}</td>
                      <td className="px-3 py-2.5">
                        <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                          {entry.status}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-[11px] text-slate-400">{entry.reference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <footer className="flex shrink-0 items-center justify-end gap-2 border-t border-slate-200 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
          >
            <Icon icon="lucide:download" className="h-3 w-3 shrink-0"/>
            Download Statement
          </button>
        </footer>
      </div>
    </div>
  );
};
