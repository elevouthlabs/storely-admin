import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";

import { ApplyCouponModal } from "./modal/applyCupon";
import { ExtendedGraceModal } from "./modal/extendedGrace";
import { CancelSubscriptionModal } from "./modal/cancelSub";
import { subscriptionOverviewRows, type OverviewPlan } from "./mock/subscriptionOverviewSeed";
import { subscriptionStoreSlug } from "./mock/subscriptionPaths";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { fetchRevenueById } from "./revenueSlice";

const PRIMARY_PURPLE = "#580080";
const DESTRUCTIVE_RED = "#EF4444";
const INFO_CARD_BG = "#F8FAFC";

export type PaymentOnFile =
  | { kind: "visa"; last4: string; expires: string }
  | { kind: "mastercard"; last4: string; expires: string }
  | { kind: "other"; label: string; sublabel: string };

export type StoreSubscriptionDetail = {
  storeName: string;
  handle: string;
  plan: OverviewPlan;
  billingCycleStart: string;
  nextRenewal: string;
  autoRenew: boolean;
  payment: PaymentOnFile;
  invoices: { id: string; date: string; amount: string; status: "Paid" }[];
  planHistory: { label: string; date: string }[];
};

const BILLING_STARTS = ["Jan 15, 2025", "Mar 3, 2024", "Jun 12, 2024", "Sep 1, 2024", "Nov 20, 2024", "Feb 8, 2025"];

function parsePaymentOnFile(pm: string): PaymentOnFile {
  const expires = "12/2027";
  if (!pm || pm === "-") return { kind: "other", label: "No method on file", sublabel: "—" };
  if (/paystack/i.test(pm)) return { kind: "other", label: "Paystack", sublabel: "Wallet billing" };
  if (/bank transfer/i.test(pm)) return { kind: "other", label: "Bank Transfer", sublabel: "Manual settlement" };
  const last = pm.match(/(\d{4})/)?.[1] ?? "0000";
  if (/mastercard/i.test(pm)) return { kind: "mastercard", last4: last, expires };
  if (/visa/i.test(pm)) return { kind: "visa", last4: last, expires };
  return { kind: "other", label: pm, sublabel: "—" };
}

function invoicesForAmount(amount: string) {
  return [
    { id: "INV-2026-001", date: "Apr 1, 2026", amount, status: "Paid" as const },
    { id: "INV-2026-002", date: "Mar 1, 2026", amount, status: "Paid" as const },
    { id: "INV-2026-003", date: "Feb 1, 2026", amount, status: "Paid" as const },
    { id: "INV-2025-012", date: "Jan 1, 2026", amount, status: "Paid" as const },
  ];
}

function planHistoryFor(plan: OverviewPlan): { label: string; date: string }[] {
  if (plan === "Enterprise") {
    return [
      { label: "Pro -> Enterprise", date: "Jan 10, 2026" },
      { label: "Growth -> Pro", date: "Aug 1, 2025" },
    ];
  }
  if (plan === "Pro") {
    return [
      { label: "Growth -> Pro", date: "Feb 1, 2026" },
      { label: "Starter -> Growth", date: "Aug 10, 2025" },
    ];
  }
  return [
    { label: "Starter -> Growth", date: "Nov 5, 2025" },
    { label: "Free -> Starter", date: "Mar 1, 2025" },
  ];
}

function buildSubscriptionDetail(storeId: string | undefined): StoreSubscriptionDetail {
  const slug = (storeId ?? "fashionhub").toLowerCase();
  const row = subscriptionOverviewRows.find((r) => subscriptionStoreSlug(r.handle).toLowerCase() === slug);
  const idx = row ? subscriptionOverviewRows.indexOf(row) : 0;

  if (!row) {
    const title = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      storeName: title,
      handle: `@${slug}`,
      plan: "Growth",
      billingCycleStart: BILLING_STARTS[0],
      nextRenewal: "—",
      autoRenew: true,
      payment: { kind: "other", label: "No method on file", sublabel: "—" },
      invoices: invoicesForAmount("₦0"),
      planHistory: planHistoryFor("Growth"),
    };
  }

  return {
    storeName: row.store,
    handle: row.handle,
    plan: row.plan,
    billingCycleStart: BILLING_STARTS[idx % BILLING_STARTS.length],
    nextRenewal: row.renewal === "-" ? "—" : row.renewal,
    autoRenew: true,
    payment: parsePaymentOnFile(row.paymentMethod),
    invoices: invoicesForAmount(row.amount),
    planHistory: planHistoryFor(row.plan),
  };
}

const planPillClass: Record<StoreSubscriptionDetail["plan"], string> = {
  Pro: "bg-violet-50 text-violet-700",
  Growth: "bg-sky-50 text-sky-700",
  Enterprise: "bg-slate-100 text-slate-700",
};

const CARD_SHELL = "w-full rounded-lg border border-slate-200 bg-white p-4 shadow-sm";

function AutoRenewToggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className="relative inline-flex h-[22px] w-[40px] shrink-0 items-center rounded-full transition-colors"
      style={{ backgroundColor: enabled ? PRIMARY_PURPLE : "#CBD5E1" }}
    >
      <span
        className="inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-sm transition-transform"
        style={{ transform: enabled ? "translateX(19px)" : "translateX(3px)" }}
      />
    </button>
  );
}

export default function RevenueDetails() {
  const { storeId } = useParams();
  const detail = useMemo(() => buildSubscriptionDetail(storeId), [storeId]);
  const [autoRenew, setAutoRenew] = useState(detail.autoRenew);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isGraceOpen, setIsGraceOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const {revenue, isFetchingOne, error }= useAppSelector((state) => state.revenues);
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   setAutoRenew(detail.autoRenew);
  //   if(storeId){
  //     dispatch(fetchRevenueById(storeId))
  //   }
  // }, [detail, dispatch, storeId]);

  // console.log(revenue);
  

  //  if (isFetchingOne) return <p>Loading orders...</p>;
  //  if (error) return <p>Error: {error}</p>;   

  return (
    <section className="min-h-full pb-8">
      <nav className="text-[12px] text-slate-500" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link to="/dashboard/revenue" className="hover:text-slate-700">
              Subscription Overview
            </Link>
          </li>
          <li aria-hidden="true" className="px-0.5 text-slate-400">
            /
          </li>
          <li className="font-medium text-slate-600">{detail.storeName}</li>
        </ol>
      </nav>

      <div className="mt-4 border border-slate-200 bg-white sm:mt-5 p-[16px] !pb-[34px] rounded-md shadow-sm">
        <div className="px-6 py-4 bg-white">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-[24px] font-semibold leading-8 text-slate-900">{detail.storeName}</h1>
              <p className="mt-0.5 text-[13px] text-slate-500">{detail.handle}</p>
            </div>
            <span className={`inline-flex shrink-0 self-start rounded-md px-2.5 py-1 text-[11px] font-semibold ${planPillClass[detail.plan]}`}>
              {detail.plan}
            </span>
          </header>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="px-6 py-3 sm:py-3.5 rounded-md border" style={{ backgroundColor: INFO_CARD_BG }}>
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Billing Cycle Start</p>
            <p className="mt-1 text-[15px] font-semibold text-slate-900">{detail.billingCycleStart}</p>
          </div>
          <div className="px-6 py-3 sm:py-3.5 rounded-md" style={{ backgroundColor: INFO_CARD_BG }}>
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Next Renewal</p>
            <p className="mt-1 text-[15px] font-semibold text-slate-900">{detail.nextRenewal}</p>
          </div>
          <div className="px-6 py-3 sm:py-3.5 rounded-md" style={{ backgroundColor: INFO_CARD_BG }}>
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Auto-Renew</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="text-[15px] font-semibold text-slate-900">{autoRenew ? "Enabled" : "Disabled"}</span>
              <AutoRenewToggle enabled={autoRenew} onChange={setAutoRenew} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_19.45rem] lg:items-start lg:gap-5">
        {/* Left: same-width stack — Payment, Invoice, Plan */}
        <div className="min-w-0 space-y-4">
          <div className={CARD_SHELL}>
            <h2 className="text-[15px] font-semibold text-slate-900">Payment Method on File</h2>
            <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                {detail.payment.kind === "visa" ? (
                  <span className="flex h-10 w-[52px] shrink-0 items-center justify-center rounded-md bg-violet-50 sm:h-11 sm:w-14">
                    <Icon icon="logos:visa" className="h-6 w-9 sm:h-7 sm:w-10" />
                  </span>
                ) : detail.payment.kind === "mastercard" ? (
                  <span className="flex h-10 w-[52px] shrink-0 items-center justify-center rounded-md bg-violet-50 sm:h-11 sm:w-14">
                    <Icon icon="logos:mastercard" className="h-6 w-9 sm:h-7 sm:w-10" />
                  </span>
                ) : (
                  <span className="flex h-10 min-w-[52px] shrink-0 items-center justify-center rounded-md bg-violet-50 px-2 text-center text-[10px] font-bold leading-tight text-violet-800 sm:h-11 sm:min-w-14">
                    PAY
                  </span>
                )}
                <div className="min-w-0">
                  {detail.payment.kind === "visa" || detail.payment.kind === "mastercard" ? (
                    <>
                      <p className="text-[13px] font-semibold text-slate-800">
                        {detail.payment.kind === "visa" ? "Visa" : "Mastercard"} **** {detail.payment.last4}
                      </p>
                      <p className="text-[11px] text-slate-500">Expires {detail.payment.expires}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[13px] font-semibold text-slate-800">{detail.payment.label}</p>
                      <p className="text-[11px] text-slate-500">{detail.payment.sublabel}</p>
                    </>
                  )}
                </div>
              </div>
              <button type="button" className="shrink-0 text-[12px] font-semibold hover:opacity-80" style={{ color: PRIMARY_PURPLE }}>
                Update
              </button>
            </div>
          </div>

          <div className={CARD_SHELL}>
            <h2 className="text-[15px] font-semibold text-slate-900">Invoice History</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {["Invoice #", "Date", "Amount", "Status", "Download"].map((h) => (
                      <th key={h} className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500 first:pl-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {detail.invoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-slate-100 last:border-b-0">
                      <td className="px-3 py-3.5 text-[13px] font-medium text-slate-800">{inv.id}</td>
                      <td className="px-3 py-3.5 text-[12px] text-slate-600">{inv.date}</td>
                      <td className="px-3 py-3.5 text-[13px] font-semibold text-slate-800">{inv.amount}</td>
                      <td className="px-3 py-3.5">
                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-[12px] font-semibold hover:opacity-80"
                          style={{ color: PRIMARY_PURPLE }}
                        >
                          <Icon icon="lucide:download" className="h-3.5 w-3.5" />
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={CARD_SHELL}>
            <h2 className="text-[15px] font-semibold text-slate-900">Plan History</h2>
            <ul className="mt-3 divide-y divide-slate-100">
              {detail.planHistory.map((entry) => (
                <li
                  key={`${entry.label}-${entry.date}`}
                  className="flex flex-col gap-3 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:py-4"
                >
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-50 text-[#4B0082]">
                      <Icon icon="lucide:trending-up" className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-slate-900">{entry.label}</p>
                      <p className="text-[12px] text-slate-500">{entry.date}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 self-start rounded-lg bg-[#e8efe9] px-2.5 py-2 text-[12px] font-medium text-[#1b5e20] shadow-sm hover:bg-[#b3d4b8] sm:self-center"
                  >
                    Upgrade
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

    
        <aside className="min-w-0 lg:w-full col-span-1">
          <div className={CARD_SHELL}>
            <h2 className="text-[15px] font-semibold text-slate-900">Actions</h2>
            <div className="mt-3 flex flex-col gap-2">
              <button
                type="button"
                className="w-full rounded-lg py-2.5 text-[13px] font-semibold text-white shadow-sm hover:opacity-95"
                style={{ backgroundColor: PRIMARY_PURPLE }}
              >
                Change Plan
              </button>
              <button
                type="button"
                onClick={() => setIsCouponModalOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border bg-white py-2.5 text-[13px] font-semibold hover:bg-violet-50/40"
                style={{ borderColor: PRIMARY_PURPLE, color: PRIMARY_PURPLE }}
              >
                <Icon icon="lucide:gift" className="h-4 w-4 shrink-0" />
                Apply Coupon
              </button>
              <button
                type="button"
                onClick={() => setIsCancelOpen(true)}
                className="w-full rounded-lg py-2.5 text-[13px] font-semibold text-white shadow-sm hover:opacity-95"
                style={{ backgroundColor: DESTRUCTIVE_RED }}
              >
                Cancel Subscription
              </button>
              <button
                type="button"
                onClick={() => setIsGraceOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-[13px] font-semibold text-slate-900 hover:bg-slate-50"
              >
                <Icon icon="lucide:clock-4" className="h-4 w-4 shrink-0 text-slate-900" />
                Extend Grace Period
              </button>
            </div>
          </div>
        </aside>
      </div>
      <ApplyCouponModal isOpen={isCouponModalOpen} onClose={() => setIsCouponModalOpen(false)} />
      <ExtendedGraceModal isOpen={isGraceOpen} onClose={() => setIsGraceOpen(false)} />
      <CancelSubscriptionModal isOpen={isCancelOpen} onClose={() => setIsCancelOpen(false)} />
    </section>
  );
}
