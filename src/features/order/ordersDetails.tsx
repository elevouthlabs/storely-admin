import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { OpenDispute } from "./modal/openDispute";
import { useEffect, useState } from "react";
import { ResolveDispute } from "./modal/resolveDispute";
import {fetchOrderById} from "../order/orderSlice"
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { DateFormatter } from "../store-directory/utils/formatMoney";
import { IssueRefund } from "./modal/issueRefund";

type OrderDetailStatus = "Fulfilled" | "Processing" | "Pending" | "Disputed";

type TimelineStep = {
  label: string;
  timestamp?: string;
  state: "complete" | "current" | "upcoming";
};

const statusBadgeClass: Record<OrderDetailStatus, string> = {
  Fulfilled: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  Processing: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  Disputed: "bg-red-50 text-red-700 ring-1 ring-red-100",
};

const orderDetailSeed: Record<
  string,
  {
    status: OrderDetailStatus;
    placedAt: string;
    total: string;
    timeline: TimelineStep[];
    item: { name: string; quantity: number; price: string; imageAlt: string };
    subtotal: string;
    deliveryFee: string;
    paymentMethod: string;
    transactionId: string;
    buyer: { name: string; email: string; phone: string; address: string };
    store: { name: string; handle: string };
  }
> = {
  "ORD-4820": {
    status: "Processing",
    placedAt: "Apr 18, 2026 at 11:15",
    total: "₦128,000",
    timeline: [
      { label: "Placed", timestamp: "Apr 18, 11:12", state: "complete" },
      { label: "Payment Confirmed", timestamp: "Apr 18, 11:13", state: "complete" },
      { label: "Processing", timestamp: "Apr 18, 11:15", state: "current" },
      { label: "Fulfilled", state: "upcoming" },
    ],
    item: { name: 'MacBook Pro 16"', quantity: 1, price: "₦128,000", imageAlt: "MacBook Pro" },
    subtotal: "₦128,000",
    deliveryFee: "₦0",
    paymentMethod: "Flutterwave",
    transactionId: "FLW-3321XY45",
    buyer: {
      name: "Emeka Nwosu",
      email: "emeka@gmail.com",
      phone: "+234 802 345 6789",
      address: "7 Wuse Zone 5, Abuja",
    },
    store: { name: "Tech Gadgets NG", handle: "@techgadgets" },
  },
};

const defaultOrderId = "ORD-4820";

const CARD = "rounded-lg border border-[#E8EAED] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]";
const LABEL = "text-[11px] font-medium text-[#8B93A1]";
const VALUE = "text-[13px] font-medium text-[#1A1F2C]";

const InfoRow = ({ label, value, style=false }: { label: string; value: string; style: boolean }) => (
  <div className={`space-y-0.5 ${style ? "bg-[#f5f5f5] py-3 px-2 rounded-md" : "bg-white" }`}>
    <p className={LABEL}>{label}</p>
    <p className={VALUE}>{value}</p>
  </div>
);

const OrderTimeline = ({ steps }: { steps: TimelineStep[] }) => (
  <ol className="mt-6 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
    {steps.map((step, index) => {
      const isComplete = step.state === "complete";
      const isCurrent = step.state === "current";
      const isUpcoming = step.state === "upcoming";

      const isLastStep = index === steps.length - 1;

      return (
        <li
          key={step.label}
          className="relative flex min-w-0 flex-col items-center text-center"
        >
          {/* Connector Line */}
          {!isLastStep && (
            <span
              className={`${
                isComplete ? "bg-emerald-400" : "bg-[#E5E7EB]"
              }`}
              aria-hidden="true"
            />
          )}

          <span
            className={`relative z-[1] flex h-8 w-8 items-center justify-center rounded-full border-2 ${
              isComplete
                ? "border-emerald-500 bg-emerald-500"
                : isCurrent
                ? "border-slate-300 bg-slate-300"
                : "border-[#D1D5DB] bg-white"
            }`}
          >
            {isComplete ? (
              <Icon
                icon="lucide:circle-check-big"
                className="h-4 w-4 text-white"
              />
            ) : isCurrent ? (
              <Icon
                icon="lucide:clock-4"
                className="h-4 w-4 text-white"
              />
            ) : (
              <span className="h-2.5 w-2.5 rounded-full bg-[#D1D5DB]" />
            )}
          </span>

          <p
            className={`mt-2 text-[12px] font-semibold leading-tight ${
              isUpcoming ? "text-[#9CA3AF]" : "text-[#1F2937]"
            }`}
          >
            {step.label}
          </p>

          {step.timestamp && (
            <p className="mt-0.5 text-[10px] text-[#9CA3AF]">
              {step.timestamp}
            </p>
          )}
        </li>
      );
    })}
  </ol>
);

export const OrderDetails = () => {
  const { orderId } = useParams();
  const detail = orderDetailSeed[orderId] ?? orderDetailSeed[defaultOrderId];
  const [dispute, setDispute] = useState(false)
  const [resolve, setResolve] = useState(false)
  const [refund, setRefund] = useState(false)
  const [activeDispute, setActiveDispute] = useState(true)
  const dispatch = useAppDispatch()
  const {order, isFetchingOne, error} = useAppSelector((state)=> state.orders)

  console.log(order, orderId);
  

 useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
   
      }
    }, [dispatch, orderId]);
    if (isFetchingOne) return <p>Loading user...</p>;
  
    if (error) return <p>{error}</p>;
  
    if (!order) return <p>Store not found</p>;

  return (
    <section className="-mx-4 -mb-4 min-h-full px-4 pb-6 font-sans sm:-mx-6 sm:px-6 sm:pb-6">
      <nav className="pt-1 text-[12px] text-[#8B93A1]" aria-label="Breadcrumb">
        <Link to="/dashboard/order" className="hover:text-[#4B5563]">
          Order Ledger
        </Link>
        <span className="mx-1.5 text-[#C4C9D1]">/</span>
        <span className="font-medium text-[#4B5563]">{orderId}</span>
      </nav>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <article className={`${CARD} p-5 sm:p-6`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-[22px] font-semibold leading-tight text-[#111827] sm:text-[24px]">{orderId?.slice(0,8)}</h1>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusBadgeClass[detail.status]}`}
                  >
                    {detail.status}
                  </span>
                </div>
                <p className="mt-1.5 text-[12px] text-[#8B93A1]">Placed on {DateFormatter(order.createdAt)}</p>
              </div>
              <p className="text-[26px] font-semibold leading-none text-[#111827] sm:text-[28px]">{"₦"+order.items[0]?.subtotal}</p>
            </div>

            <OrderTimeline steps={detail.timeline} />
          </article>

          <article className={`${CARD} p-5 sm:p-6`}>
            <h2 className="text-[15px] font-semibold text-[#111827]">Order Items</h2>

            <div className="mt-4 flex items-center justify-between gap-3 border-b
             border-[#EEF0F3] px-2 py-3 bg-[#f5f5f5] w-full rounded-md">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#E8EAED] bg-white text-[10px] font-medium text-[#9CA3AF]">
                  IMG
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium text-[#1F2937]">{order.items[0]?.itemName}</p>
                  <p className="mt-0.5 text-[12px] text-[#8B93A1]">Quantity: {order.items[0]?.quantity}</p>
                </div>
              </div>
              <p className="shrink-0 text-[14px] font-semibold text-[#1F2937]">{"₦"+order.items[0]?.unitPrice}</p>
            </div>

            <div className="mt-4 space-y-2 sm:ml-auto lg:ml-0 lg:max-w-full sm:max-w-[220px]">
              <div className="flex items-center justify-between w-full text-[13px]">
                <span className="text-[#8B93A1]">Subtotal</span>
                <span className="font-medium text-[#374151]">{"₦"+order.items[0]?.subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[#8B93A1]">Delivery Fee</span>
                <span className="font-medium text-[#374151]">{"₦"+0}</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#EEF0F3] pt-2 text-[14px]">
                <span className="font-semibold text-[#111827]">Total</span>
                <span className="font-semibold text-[#111827]">{"₦"+order.items[0]?.subtotal}</span>
              </div>
            </div>
          </article>

          <article className={`${CARD} p-5 sm:p-6`}>
            <h2 className="text-[15px] font-semibold text-[#111827]">Payment Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <InfoRow label="Payment Method" value={detail.paymentMethod} style={true}/>
              <InfoRow label="Transaction ID" value={detail.transactionId} style={true} />
            </div>
          </article>
          {activeDispute && (
            <article className="p-4 rounded-[10px] border bg-[#fff]
             border-[#FFC9C9] flex flex-col gap-4">
              <h3 className="font-semibold text-[#0F172B] text-[18px] leading-[27px]">
                Active Dispute
              </h3>

              <div className="text-sm bg-[#FEF2F2] rounded-[10px] p-4 flex justify-between">
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[#82181A] text-[16px] leading-[24px] font-medium">Dispute Reason</p>
                  <p className="text-[#0F172B] text-[16px] leading-[24px]">Product not as described</p>
                </div>
                <p className="text-[#C10007] text-[14px] leading-[20px] ">Opened 2 days ago</p>
              </div>
              <div>
                <p className="text-[#0F172B] text-[16px] leading-[24px] pb-[10px]">Buyer's Statement</p>
                <div className="bg-[#F8FAFC] p-4 rounded-[10px] ">
                <p className="text-[#314158] text-[16px] leading-[24px] mb-[12px]">The bedding set I received is not the premium quality shown in the photos. The material feels cheap and the colors are faded.</p>
                <div className="text-[#4B0082] text-[14px] leading-[20px] flex gap-3 items-center">
                  <p className="bg-[#EFE6FD] py-[8px] px-[12px] rounded-[4px] inline-flex gap-1 items-center">
                    <Icon icon="lucide:camera" className="h-4 w-4 shrink-0 text-[#45556C] "/>
                    Photo 1</p>
                  <p className="bg-[#EFE6FD] py-[8px] px-[12px] rounded-[4px] inline-flex gap-1 items-center">
                    <Icon icon="lucide:camera" className="h-4 w-4 shrink-0 text-[#45556C] "/>
                    Photo 2</p>
                  <p className="bg-[#EFE6FD] py-[8px] px-[12px] rounded-[4px] inline-flex gap-1 items-center">
                    <Icon icon="lucide:camera" className="h-4 w-4 shrink-0 text-[#45556C] "/>
                    Photo 3</p>
                </div>
                </div>
              </div>
              <div>
                <p className="text-[#0F172B] text-[16px] leading-[24px] pb-[10px]">Seller's Response</p>
                <div className="bg-[#F8FAFC] p-4 rounded-[10px] ">
                  <p className="text-[#314158] text-[16px] leading-[24px] mb-[12px]">We sent the exact product as advertised. The photos are accurate representations of our product.</p>
                  <div className="text-[#4B0082] text-[14px] leading-[20px] flex gap-3 items-center">
                    <p className="bg-[#EFE6FD] py-[8px] px-[12px] rounded-[4px] inline-flex gap-1 items-center">
                      <Icon icon="lucide:camera" className="h-4 w-4 shrink-0 text-[#45556C] "/>
                      Original Photo</p>
                    <p className="bg-[#EFE6FD] py-[8px] px-[12px] rounded-[4px] inline-flex gap-1
                    items-center">
                      <Icon icon="lucide:file-text" className="h-4 w-4 shrink-0 text-[#45556C] "/>
                      Product Spec</p>
                  </div>
                </div>
              </div>
            <div className="border border-[#E2E8F0] p-4 rounded-[10px]">
                <h3 className="text-[#0F172B] text-[16px] leading-[24px] pb-[10px]">Message Timeline</h3>
                <div className="flex flex-col gap-3">
                  <div className="border border-[#CEB0FA] bg-[#EFE6FD] p-4 rounded-[10px] flex flex-col gap-[4px]">
                    <p className="text-[#0F172B] text-[14px] leading-[20px] font-medium inline-flex gap-1">
                      <Icon icon="lucide:user" className="h-4 w-4 shrink-0 text-[#4B0082] "/>
                      Buyer</p>
                    <p className="text-[#314158] text-[14px] leading-[20px]">The bedding set quality is very poor, not as shown in photos.</p>
                    <p className="border border-[#CAD5E2] px-[12px] py-[8px]
                    text-[#45556C] text-[12px] leading-[16px] bg-[#fff] w-fit rounded-[4px] inline-flex gap-1">
                      <Icon icon="lucide:paperclip" className="h-4 w-4 shrink-0 text-[#45556C] "/>
                      Attachment</p>
                  </div>
                  <div className="border border-[#E9D4FF] bg-[#FAF5FF] p-4 rounded-[10px]
                  flex flex-col gap-[4px]">
                    <p className="text-[#0F172B] text-[14px] leading-[20px] font-medium inline-flex gap-1">
                      <Icon icon="lucide:store" className="h-4 w-4 shrink-0 text-[#4B0082] "/>
                      Seller</p>
                    <p className="text-[#314158] text-[14px] leading-[20px]">Our photos are accurate. Can you provide pictures of what you received?</p>
                  </div>
                  <div className="border border-[#CEB0FA] bg-[#EFE6FD] p-4 rounded-[10px]
                  flex flex-col gap-[4px]">
                    <p className="text-[#0F172B] text-[14px] leading-[20px] font-medium inline-flex gap-1">
                      <Icon icon="lucide:user" className="h-4 w-4 shrink-0 text-[#4B0082] "/>
                      Buyer</p>
                    <p className="text-[#314158] text-[14px] leading-[20px]">See attached photos. The material is thin and colors are faded.</p>
                    <p className="border border-[#CAD5E2] px-[12px] py-[8px]
                    text-[#45556C] text-[12px] leading-[16px] bg-[#fff] w-fit rounded-[4px] inline-flex gap-1">
                      <Icon icon="lucide:paperclip" className="h-4 w-4 shrink-0 text-[#45556C] "/>
                      Attachment</p>
                  </div>
                </div>
              </div>
              <button className="w-full p-3 text-white text-[16px] bg-[#4B0082] rounded-[10px]">Resolve Dispute</button>
            </article>
          )}
        </div>
      
        <aside className="space-y-4">
          <article className={`${CARD} p-4 sm:p-5`}>
            <h2 className="text-[15px] font-semibold text-[#111827]">Admin Actions</h2>
            <div className="mt-3 space-y-2">
              <button
                onClick={()=> setRefund(true) }
                type="button"
                className="w-full rounded-md bg-[#F97316] px-3 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#EA580C]"
              >
                Issue Refund
              </button>
              <button
                type="button"
                onClick={()=> setDispute(true)}
                className="w-full rounded-md bg-[#DC2626] px-3 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#B91C1C]"
              >
                Open Dispute
              </button>
              <button
                type="button"
                className="w-full rounded-md border border-[#D1D5DB] bg-white px-3 py-2.5 text-[13px] font-semibold text-[#111827] transition hover:bg-[#F9FAFB]"
              >
                Override Status
              </button>
              <button
                type="button"
                className="w-full rounded-md border border-[#D1D5DB] bg-white px-3 py-2.5 text-[13px] font-semibold text-[#111827] transition hover:bg-[#F9FAFB]"
              >
                View Audit Trail
              </button>
            </div>
          </article>

          <article className={`${CARD} p-4 sm:p-5`}>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:user" className="h-5 w-5 text-blue-500" />
              <h2 className="text-[15px] font-semibold text-[#111827]">Buyer Information</h2>
            </div>
            <div className="mt-4 space-y-3">
              <InfoRow label="Name" value={order.customerName} style={false} />
              <InfoRow label="Email" value={order.customerEmail} style={false} />
              <InfoRow label="Phone" value={order.customerPhone} style={false} />
              <InfoRow label="Delivery Address" value={order.deliveryAddress} style={false} />
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-md border border-[#D1D5DB] bg-white px-3 py-2.5 text-[13px] font-semibold text-[#111827] transition hover:bg-[#F9FAFB]"
            >
              Contact Buyer
            </button>
          </article>

          <article className={`${CARD} p-4 sm:p-5`}>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:store" className="h-5 w-5 text-purple-700" />
              <h2 className="text-[15px] font-semibold text-[#111827]">Store Information</h2>
            </div>
            <div className="mt-4 space-y-3">
              <InfoRow label="Store Name" value={order?.business?.name} style={false} />
              <InfoRow label="Handle" value={"@"+order?.business?.slug}  style={false}/>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 ">
              <button
                type="button"
                className="rounded-md border border-[#D1D5DB] col-span-2
                 bg-white px-2 py-2.5 text-[12px] font-semibold text-[#111827] transition hover:bg-[#F9FAFB]"
              >
                Contact Seller
              </button>
              <button
                type="button"
                className="rounded-md border col-span-2
                 border-[#D1D5DB] bg-white px-2 py-2.5 text-[12px] font-semibold text-[#111827] transition hover:bg-[#F9FAFB]"
              >
                View Store Profile
              </button>
            </div>
          </article>
        </aside>
      </div>
      <div>
        {<OpenDispute isOpen={dispute} onClose={()=> setDispute(false)} onSubmit={()=>setActiveDispute(true)} />}
        {<ResolveDispute isOpen={resolve} onClose={()=> setResolve(false)} />}
        {<IssueRefund isOpen={refund} onClose={()=> setRefund(false)} />}
      </div>
    </section>
  );
};
