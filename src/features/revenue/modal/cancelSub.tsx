import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const PRIMARY_PURPLE = "#E7000B";

type ApplyCouponModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (grace: string) => void;
};

const statusOptions = [
    "Select a reason", "Subscription too high", "Money Back Issues", "Thinking about it", "Subscription Cancelled", "Others"
] as const;

export const CancelSubscriptionModal = ({ isOpen, onClose, onApply }: ApplyCouponModalProps) => {
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]>("Select a reason");

 useEffect(() => {
  if (!isOpen) return;

  const previousOverflow = document.body.style.overflow;

  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = previousOverflow;
  };
}, [isOpen]);

  useEffect(() => {
    if (!isOpen) setStatusFilter("Select a reason");
  }, [isOpen]);

  if (!isOpen) return null;

const handleApply = () => {
  if (statusFilter === "Select a reason") return;

  onApply?.(statusFilter);
  onClose();
};

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[400px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <h2 id="apply-coupon-title" className="text-[14px] font-semibold text-slate-900">
            Cancel Subscription
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-lg leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close modal"
          >
            &times;
          </button>
        </header>

        <div className="space-y-3 px-4 py-4">
          
          <div className="rounded-md px-3 py-2.5 bg-[#fef2f2]">
            <p className="text-[11px] leading-relaxed text-slate-600">
              <span className="font-medium flex gap-1 text-[#82181a]">
                <Icon icon="lucide:triangle-alert" className="h-4 w-4 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  This will cancel the subscription at the end of the current billing period.
                </p>
              </span>
            </p>
          </div>
          
          <div>
            <label htmlFor="coupon-code" className="text-[11px] font-medium text-slate-500">
              Cancellation Reason
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as (typeof statusOptions)[number])}
                className="mt-1.5 w-full rounded-md bg-[#f8fafc] appearance-none
                 px-3 py-2.5 text-[13px] text-slate-500 outline-none"
                >
                {statusOptions.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
                ))}
              </select>
            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
                <Icon icon="lucide:chevron-down" className="h-5 w-5 text-slate-500" />
            </span>
            </div>
          </div>
        </div>

        <footer className="flex items-center justify-end gap-2 border-t border-slate-100 px-4 py-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border w-1/2
             border-slate-200 bg-white px-4 py-2 text-[12px] font-medium text-slate-700 hover:bg-slate-50"
          >
            Keep Subscription
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={statusFilter === "Select a reason"}
            className="rounded-md px-4 py-2 text-[12px] w-1/2
            font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: PRIMARY_PURPLE }}
          >
            Confirm Cancellation
          </button>
        </footer>
      </div>
    </div>
  );
};
