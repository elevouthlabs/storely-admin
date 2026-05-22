type FieldProps = {
  label: string;
  value: string;
  isSelect?: boolean;
};

const ChevronDownIcon = () => (
  <svg className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Field({ label, value, isSelect }: FieldProps) {
  return (
    <div>
      <label className="mb-1 block text-[11px] text-slate-500">{label}</label>
      <div className="flex h-8 items-center justify-between rounded border border-[#e4e4e7] bg-[#f7f7f8] px-2.5 text-xs text-slate-500">
        <span>{value}</span>
        {isSelect ? <ChevronDownIcon /> : null}
      </div>
    </div>
  );
}

export const GeneralTab = () => {
  return (
    <section>
      <h2 className="text-[15px] font-semibold text-slate-900">General Settings</h2>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Platform Name" value="Storely" />
        <Field label="Support Email" value="support@storely.com" isSelect />
        <Field label="Default Currency" value="NGN (N)" isSelect />
        <Field label="Date Format" value="DD/MM/YYYY" isSelect />
        <Field label="Timezone" value="Africa/Lagos(WAT)" isSelect />
        <Field label="Default Language" value="English" isSelect />
      </div>
    </section>
  );
};
