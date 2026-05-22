import { useEffect } from "react";

type ApproveProcessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
};

const PROCESS_GREEN = "#15803D";

const gatewayRows = [
  {
    tone: "success" as const,
    gateway: "Paystack",
    readyLabel: "3 stores ready",
    stores: "Fashion Hub Lagos, Beauty Palace, Home Essentials",
    amount: "₦5,410,000",
  },
  {
    tone: "success" as const,
    gateway: "Flutterwave",
    readyLabel: "1 store ready",
    stores: "Tech Gadgets NG",
    amount: "₦1,890,000",
  },
  {
    tone: "hold" as const,
    gateway: "On Hold - Will Not Process",
    readyLabel: "1 store flagged for review",
    stores: "Sports Arena - Unusual activity detected",
    amount: "₦1,180,000",
  },
];

const warningItems = [
  "This action will initiate ₦7.3M in payouts (excluding holds)",
  "Payouts typically process within 24-48 hours",
  "This action cannot be undone once confirmed",
  "Stores on hold will NOT receive payouts until cleared",
];

const CheckCircleIcon = () => (
  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M8 12.5L11 15.5L16 9.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HoldIcon = () => (
  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const WarningIcon = () => (
  <svg className="h-4 w-4 text-amber-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 8V13M12 16H12.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const SummaryCell = ({ label, value, valueClassName = "text-slate-900" }: { label: string; value: string; valueClassName?: string }) => (
  <div className="min-w-0">
    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">{label}</p>
    <p className={`mt-1 text-[14px] font-semibold leading-tight ${valueClassName}`}>{value}</p>
  </div>
);

export const ApproveProcessModal = ({ isOpen, onClose, onConfirm }: ApproveProcessModalProps) => {
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/50 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="approve-payout-title"
      onClick={onClose}
    >
      <div
        className="flex max-h-[550px] w-full max-w-[760px] flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-2xl !ml-[50px]"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 id="approve-payout-title" className="text-[15px] font-semibold text-slate-900">
            Approve &amp; Process Payout Batch
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close modal"
          >
            &times;
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Batch Summary</h3>
            <div className="mt-2 grid grid-cols-2 gap-4 rounded-lg border border-slate-200 bg-slate-50/50 p-4 sm:grid-cols-4">
              <SummaryCell label="Batch Date" value="Apr 22, 2026" />
              <SummaryCell label="Total Stores" value="5" />
              <SummaryCell label="Total Amount" value="₦8.48M" />
              <SummaryCell label="Ready to Process" value="4 stores" valueClassName="text-emerald-600" />
            </div>
          </section>

          <section className="mt-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Payment Gateway Breakdown
            </h3>
            <ul className="mt-2 space-y-2.5 bg-slate-50/50">
              {gatewayRows.map((row) => {
                const isHold = row.tone === "hold";

                return (
                  <li
                    key={row.gateway}
                    className={`flex items-start justify-between gap-3 rounded-lg border px-3.5 py-3 ${
                      isHold
                        ? "border-red-300 bg-red-50"
                        : "bg-slate-70/50 bg-slate-50/50"
                    }`}
                  >
                    <div className="flex min-w-0 flex-1 gap-2.5">
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                          isHold ? "bg-red-500" : "bg-emerald-500"
                        }`}
                      >
                        {isHold ? <HoldIcon /> : <CheckCircleIcon />}
                      </span>
                      <div className="min-w-0">
                        <p className={`text-[13px] font-semibold ${isHold ? "text-red-700" : "text-slate-900"}`}>
                          {row.gateway}
                        </p>
                        <p className={`mt-0.5 text-[11px] font-medium ${isHold ? "text-red-600" : "text-slate-500"}`}>
                          {row.readyLabel}
                        </p>
                        <p className={`mt-1 text-[10px] leading-snug ${isHold ? "text-red-500" : "text-slate-500"}`}>
                          {row.stores}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`shrink-0 text-[13px] font-semibold ${isHold ? "text-red-700" : "text-slate-900"}`}
                    >
                      {row.amount}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-3">
            <div className="flex items-center gap-2">
              <WarningIcon />
              <h3 className="text-[12px] font-semibold text-amber-900">Important Warnings</h3>
            </div>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[11px] leading-relaxed text-amber-950 marker:text-amber-600">
              {warningItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <p className="mt-5 text-[12px] leading-relaxed text-slate-600">
            I confirm that I have reviewed all payout details and authorize the processing of{" "}
            <span className="font-semibold text-slate-800">₦7.3M to 4 stores</span> via their respective payment
            gateways.
          </p>
        </div>

        <footer className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-200 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            className="rounded-md px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:opacity-95"
            style={{ backgroundColor: PROCESS_GREEN }}
          >
            Process Batch Now
          </button>
        </footer>
      </div>
    </div>
  );
};
