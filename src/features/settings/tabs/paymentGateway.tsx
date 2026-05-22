type Gateway = {
  name: string;
  status: string;
  keyLabel: string;
  keyValue: string;
};

const gateways: Gateway[] = [
  {
    name: "Paystack",
    status: "Connected",
    keyLabel: "Public key",
    keyValue: "Storely",
  },
  {
    name: "Flutterwave",
    status: "Connected",
    keyLabel: "Public key",
    keyValue: "Storely",
  },
];

export const PaymentGateway = () => {
  return (
    <section className="overflow-hidden rounded border border-[#e6e6ea] bg-white">
      {gateways.map((gateway, index) => (
        <article
          key={gateway.name}
          className={index !== gateways.length - 1 ? "border-b border-[#eaeaee]" : ""}
        >
          <div className="px-3 py-2.5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-900">{gateway.name}</h3>
                <p className="mt-1 text-[10px] text-slate-500">{gateway.keyLabel}</p>
              </div>
              <span className="rounded-full bg-[#f2eaff] px-2.5 py-1 text-[10px] font-medium leading-none text-[#7a3ec8]">
                {gateway.status}
              </span>
            </div>
          </div>

          <div className="px-3 pb-2.5">
            <div className="rounded-md border border-[#e4e4e7] bg-[#f7f7f8] px-3 py-2">
              <p className="text-[11px] leading-none text-slate-500">{gateway.keyValue}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};