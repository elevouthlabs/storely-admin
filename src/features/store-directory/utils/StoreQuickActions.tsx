type StoreQuickActionsProps = {
  onSuspendStore: () => void;
  onVerifyStore: () => void;
  onSendMessage: () => void;
};

export const StoreQuickActions = ({ onSuspendStore, onVerifyStore, onSendMessage }: StoreQuickActionsProps) => {
  return (
    <article className="h-fit rounded-xl border border-[#64C8FF] bg-white p-3 shadow-sm">
      <h2 className="mb-3 text-base font-semibold text-slate-900">Quick Actions</h2>
      <div className="space-y-2">
        <button
          className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
          onClick={onSuspendStore}
        >
          Suspend Store
        </button>
        <button
          className="w-full rounded-md bg-violet-700 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-800"
          onClick={onVerifyStore}
        >
          Verify Store
        </button>
        <button
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          onClick={onSendMessage}
        >
          Send Message
        </button>
        <button className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
          View as Customer
        </button>
        <button className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
          Change Plan
        </button>
        <button className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
          View Audit Trail
        </button>
      </div>
    </article>
  );
};
