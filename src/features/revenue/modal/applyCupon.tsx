import { useEffect, useState } from "react";

const PRIMARY_PURPLE = "#580080";

type ApplyCouponModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (couponCode: string) => void;
};

export const ApplyCouponModal = ({ isOpen, onClose, onApply }: ApplyCouponModalProps) => {
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
  if (!isOpen) return;

  const previousOverflow = document.body.style.overflow;

  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = previousOverflow;
  };
}, [isOpen]);

  useEffect(() => {
    if (!isOpen) setCouponCode("");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    const trimmed = couponCode.trim();
    if (!trimmed) return;
    onApply?.(trimmed);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-coupon-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[400px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <h2 id="apply-coupon-title" className="text-[14px] font-semibold text-slate-900">
            Apply Coupon
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
          <div>
            <label htmlFor="coupon-code" className="text-[11px] font-medium text-slate-500">
              Coupon Code
            </label>
            <input
              id="coupon-code"
              type="text"
              value={couponCode}
              onChange={(event) => setCouponCode(event.target.value)}
              placeholder="Enter coupon code"
              className="mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-100"
              autoFocus
            />
          </div>

          <div className="rounded-md bg-slate-50 px-3 py-2.5">
            <p className="text-[11px] leading-relaxed text-slate-600">
              Examples: <span className="font-medium text-slate-700">SAVE20</span>,{" "}
              <span className="font-medium text-slate-700">FIRSTMONTH</span>,{" "}
              <span className="font-medium text-slate-700">ANNUAL50</span>
            </p>
          </div>
        </div>

        <footer className="flex items-center justify-end gap-2 border-t border-slate-100 px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-[12px] font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={!couponCode.trim()}
            className="rounded-md px-4 py-2 text-[12px] font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: PRIMARY_PURPLE }}
          >
            Apply Coupon
          </button>
        </footer>
      </div>
    </div>
  );
};
