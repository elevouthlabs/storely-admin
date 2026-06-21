type QuickActionsProps = {
  actions: {
    ban: () => void;
    warn: () => void;
    reset: () => void;
    message: () => void;
    password: () => void;
    plan: () => void;
  };
};

export const UserQuickActions = ({actions}: QuickActionsProps) => {
  return (
    <aside className="h-fit rounded-[10px] border border-[#ece9f2] bg-white px-3 pb-2 pt-3">
      <h2 className="pb-2 text-[16px] font-semibold text-[#2f273b]">Quick Actions</h2>
      <div className="mt-3 space-y-2">
        <button 
        onClick={actions.ban}
        type="button" 
         className="w-full rounded-[6px] bg-[#ef1c1c] px-3 py-2 text-[11px] font-medium text-white">
          Ban Account
        </button>
        <button onClick={actions.warn}
        type="button" className="w-full rounded-[6px] bg-[#cc6f09] px-3 py-2 text-[11px] font-medium text-white">
          Warn Account
        </button>
        <button 
        onClick={actions.reset}
        type="button" 
        className="w-full rounded-[6px] border border-[#e6e3eb] bg-white px-3 py-2 text-[11px] font-medium text-[#4f4a58]">
          Reset 2FA
        </button>
        <button onClick={actions.password}
        type="button" className="w-full rounded-[6px] border border-[#e6e3eb] bg-white px-3 py-2 text-[11px] font-medium text-[#4f4a58]">
          Force Password Reset
        </button>
        <button onClick={actions.message}
        type="button" className="w-full rounded-[6px] border border-[#e6e3eb] bg-white px-3 py-2 text-[11px] font-medium text-[#4f4a58]">
          Send Message
        </button>
        <button onClick={actions.plan}
        type="button" className="w-full rounded-[6px] border border-[#e6e3eb] bg-white px-3 py-2 text-[11px] font-medium text-[#4f4a58]">
          Downgrade Plan
        </button>
        <button type="button" className="w-full rounded-[6px] border border-[#e6e3eb] bg-white px-3 py-2 text-[11px] font-medium text-[#4f4a58]">
          View Audit Trail
        </button>
       
      </div>
    </aside>
  );
};
