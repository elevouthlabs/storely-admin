const ChevronDownIcon = () => (
  <svg className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ToggleOn = () => (
  <button
    type="button"
    aria-label="Maintenance mode enabled"
    className="relative h-5 w-9 rounded-full bg-[#5a1ea5] transition"
  >
    <span className="absolute right-[2px] top-[2px] h-4 w-4 rounded-full bg-white shadow-sm" />
  </button>
);

export const MaintenanceMode = () => {
  return (
    <section>
      <h2 className="text-[15px] font-semibold text-slate-900">Maintenance Mode</h2>

      <div className="mt-4 rounded-md border border-[#efefef] bg-[#faf4ea] px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#7a4d08]">Maintenance Mode</p>
            <p className="mt-0.5 text-[11px] text-[#a77a3d]">Platform is operational</p>
          </div>
          <ToggleOn />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label className="mb-1 block text-[11px] text-slate-500">Scheduled Start Time</label>
          <button
            type="button"
            className="flex h-8 w-full items-center justify-between rounded border border-[#e4e4e7] bg-[#f7f7f8] px-3 text-xs text-slate-400"
          >
            <span>DD/MM/YYYY</span>
            <ChevronDownIcon />
          </button>
        </div>

        <div>
          <label className="mb-1 block text-[11px] text-slate-500">Scheduled End Time</label>
          <button
            type="button"
            className="flex h-8 w-full items-center justify-between rounded border border-[#e4e4e7] bg-[#f7f7f8] px-3 text-xs text-slate-400"
          >
            <span>DD/MM/YYYY</span>
            <ChevronDownIcon />
          </button>
        </div>

        <div>
          <label className="mb-1 block text-[11px] text-slate-500">Custom Message</label>
          <textarea
            rows={4}
            className="w-full resize-none rounded border border-[#e4e4e7] bg-[#ffffff] px-3 py-2 text-xs text-slate-600 outline-none"
          />
        </div>
      </div>
    </section>
  );
};
