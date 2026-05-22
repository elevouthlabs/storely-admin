import { Icon } from "@iconify/react";

type CommissionRow = {
  category: string;
  currentRate: number;
  newRate: number;
  effectiveDate: string;
};

const commissionRows: CommissionRow[] = [
  { category: "Fashion", currentRate: 8, newRate: 8, effectiveDate: "02/04/2026" },
  { category: "Electronics", currentRate: 10, newRate: 10, effectiveDate: "19/04/2026" },
  { category: "Beauty", currentRate: 8, newRate: 8, effectiveDate: "02/04/2026" },
  { category: "Home", currentRate: 7, newRate: 7, effectiveDate: "02/04/2026" },
  { category: "Sports", currentRate: 8, newRate: 8, effectiveDate: "02/04/2026" },
];

export const CommissionRates = () => {
  return (
    <section>
      <h2 className="text-[15px] font-semibold text-slate-900">Commission Rates by Category</h2>
      <p className="mt-1 text-xs text-slate-500">Set platform commission % per category</p>

      <div className="mt-4 overflow-hidden rounded-lg border border-[#ececf0]">
        <div className="grid grid-cols-[1.2fr_0.95fr_1fr_1fr] bg-[#f8f8fa] px-4 py-2.5 text-[11px] font-medium text-slate-600">
          <span>Category</span>
          <span>Current Rate</span>
          <span>New Rate</span>
          <span>Effective Date</span>
        </div>

        {commissionRows.map((row) => (
          <div
            key={row.category}
            className="grid grid-cols-[1.2fr_0.95fr_1fr_1fr] items-center border-t border-[#f0f0f3] px-4 py-2.5 text-xs"
          >
            <span className="font-medium text-slate-700">{row.category}</span>
            <span className="text-slate-500">{row.currentRate}%</span>

            <div className="flex items-center gap-1.5">
              <input
                defaultValue={row.newRate}
                className="h-7 w-[64px] rounded border border-[#dddde3] bg-white px-2 text-xs text-slate-700 outline-none focus:border-[#cfcfd8]"
              />
              <span className="text-slate-500">%</span>
            </div>

            <button
              type="button"
              className="flex h-7 w-[130px] items-center justify-between rounded border border-[#dddde3] bg-white px-2 text-xs text-slate-500"
            >
              <span>{row.effectiveDate}</span>
              <Icon icon="lucide:calendar" className="h-3 w-3 text-slate-500" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
