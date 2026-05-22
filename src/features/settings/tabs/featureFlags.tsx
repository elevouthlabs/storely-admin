type FeatureFlag = {
  title: string;
  description: string;
};

const featureFlags: FeatureFlag[] = [
  {
    title: "Buyer reviews",
    description: "Allow buyers to leave product reviews",
  },
  {
    title: "Guest checkout",
    description: "Allow buyers to checkout without account",
  },
  {
    title: "Store analytics export",
    description: "Let sellers export their store data",
  },
];

const ToggleOn = () => (
  <button type="button" aria-label="Enabled" className="relative h-5 w-9 rounded-full bg-[#5a1ea5]">
    <span className="absolute right-[2px] top-[2px] h-4 w-4 rounded-full bg-white shadow-sm" />
  </button>
);

export const FeatureFlags = () => {
  return (
    <section>
      <h2 className="text-[15px] font-semibold text-slate-900">Maintenance Mode</h2>

      <div className="mt-4 rounded-md bg-white p-3">
        {featureFlags.map((flag, index) => (
          <article
            key={flag.title}
            className={index !== featureFlags.length - 1 ? "mb-3" : ""}
          >
            <div className="flex items-center justify-between rounded border border-[#efeff2] bg-[#f8f8f9] px-4 py-3">
              <div>
                <p className="text-xs font-medium text-slate-800">{flag.title}</p>
                <p className="mt-1 text-[10px] text-slate-500">{flag.description}</p>
              </div>
              <ToggleOn />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
