import { useState } from "react";

type SuspendStoreModalProps = {
  isOpen: boolean;
  onClose: () => void;
  storeName: string;
  storeHandle: string;
};

export const SuspendStoreModal = ({ isOpen, onClose, storeName, storeHandle }: SuspendStoreModalProps) => {
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  const canSuspend =  reason.trim().length > 0 && note.trim().length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-[-20px] z-[9999] h-screen w-screen bg-slate-950/65 p-4 sm:p-6" role="dialog" aria-modal="true">
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-full max-w-[400px] rounded-lg border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
            <h2 className="text-[14px] font-semibold text-slate-900">Suspend this store?</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          <div className="space-y-3 px-4 py-3">
            <div className="rounded-md bg-slate-50 px-2.5 py-2">
              <p className="text-sm font-medium text-slate-800">{storeName}</p>
              <p className="text-[11px] text-slate-400">{storeHandle}</p>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-medium text-slate-600">Reason for suspension *</label>
              <select
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                className="h-8 w-full rounded-md border border-slate-200 px-2.5 text-xs text-slate-600 outline-none focus:border-rose-400"
              >
                <option value="">Select reason...</option>
                <option value="Fraudulent activity">Fraudulent activity</option>
                <option value="Policy violation">Policy violation</option>
                <option value="Repeated customer complaints">Repeated customer complaints</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-medium text-slate-600">Note to seller (optional)</label>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value.slice(0, 250))}
                placeholder="This message will be visible to the seller..."
                rows={3}
                className="min-h-[72px] w-full resize-none rounded-md border border-slate-200 px-2.5 py-2 text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-rose-400"
              />
            </div>

            <div className="rounded-md border border-rose-100 bg-rose-50 px-3 py-2">
              <p className="text-[10px] text-rose-700">The seller will be notified and their storefront will go offline immediately.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-slate-100 px-4 py-2.5">
            <button
              type="button"
              onClick={onClose}
              className="h-7 w-1/2 rounded-md border border-slate-200 bg-white px-7 text-[11px] font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              className={`h-7 w-1/2 rounded-md px-7 text-[11px] font-semibold text-white ${
                canSuspend ? "bg-rose-500 hover:bg-rose-600" : "cursor-not-allowed bg-rose-300"
              }`}
              disabled={!canSuspend}
            >
              Suspend Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
