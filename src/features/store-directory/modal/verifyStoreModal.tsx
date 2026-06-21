type VerifyStoreModalProps = {
  isOpen: boolean;
  onClose: () => void;
  storeName: string |undefined;
  storeHandle: string |undefined;
  isActive: boolean;

  onVerify: () => Promise<void>;
};

const checks = [
  "KYC documents verified",
  "Business registration confirmed",
  "Bank account verified",
  "Product authenticity confirmed",
];

export const VerifyStoreModal = ({ isOpen, onClose, storeName, storeHandle, onVerify, isActive }: VerifyStoreModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-[-20px] z-[9999] h-screen w-screen bg-slate-950/65 p-4 sm:p-6" role="dialog" aria-modal="true">
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-full max-w-[400px] rounded-lg border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
            <h2 className="text-[14px] font-semibold text-slate-900">Verify Store</h2>
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
              <p className="text-[11px] text-slate-400">{"@"+storeHandle}</p>
            </div>

            <div className="rounded-md border border-violet-100 bg-violet-50 px-3 py-2">
              <p className="text-[11px] font-medium text-violet-900">Verification Benefits</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[10px] text-violet-800">
                <li>Blue verified badge on storefront</li>
                <li>Increased customer trust</li>
                <li>Higher search ranking</li>
                <li>Priority customer support</li>
              </ul>
            </div>

            <div className="space-y-1.5">
              {checks.map((item) => (
                <label key={item} className="flex items-center gap-2 rounded-md border border-slate-200 px-2.5 py-2">
                  <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-violet-700" />
                  <span className="text-[11px] text-slate-700">{item}</span>
                </label>
              ))}
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
              onClick={async () => {
                if (isActive) return;
                await onVerify();
              }}
              disabled={isActive}
              className={`h-7 w-1/2 rounded-md px-7 text-[11px] font-semibold text-white ${
                isActive
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-violet-700 hover:bg-violet-800"
              }`}
            >
              {isActive ? "Already Verified" : "Verify Store"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
