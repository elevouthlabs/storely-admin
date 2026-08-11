import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { fetchOrders } from "./orderSlice";
import { Icon } from "@iconify/react";
import { DateFormatter } from "../store-directory/utils/formatMoney";

type OrderStatus = "Fulfilled" | "Processing" | "Pending" | "Disputed";


const statusOptions = ["All Status", "Fulfilled", "Processing", "Pending", "Disputed"] as const;

const statusBadgeClass: Record<OrderStatus, string> = {
  Fulfilled: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  Processing: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  Disputed: "bg-red-50 text-red-700 ring-1 ring-red-100",
};

const tableHeadings = ["Order ID", "Store", "Buyer", "Amount", "Status", "Date", "Payment"] as const;

const Order = () => {
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]>("All Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1)
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { orders, pagination, isLoading, error } = useAppSelector((state) => state.orders);
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const summaryStats = [
  { label: "Total Orders", value: orders.length },
  { label: "Total Value", value: "₦"+orders[0]?.totalAmount },
  { label: "Refund Rate", value: "2.4%" },
] as const;

    useEffect(() => {
      if (token) {
        dispatch(fetchOrders({ page: 1, limit: 10 }));
      }
    }, [dispatch, token]);
    
    console.log(orders);
    
     
    if (isLoading) return <p>Loading orders...</p>;
    if (error) return <p>Error: {error}</p>;

  const filteredRows = orders.filter((row) => {
    const matchesStatus = statusFilter === "All Status" || row.status === statusFilter;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      row.id.toLowerCase().includes(query) ||
      // row.store.toLowerCase().includes(query) ||
      row.customerName.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const handleCopy = async (orderId: string) => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopiedId(orderId);
      window.setTimeout(() => setCopiedId(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-[30px] font-semibold leading-8 text-slate-900">Order Ledger</h1>
        <p className="mt-1 text-[12px] font-normal leading-5 text-slate-500">
          Full cross-platform view of every order
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        {summaryStats.map((stat) => (
          <article key={stat.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{stat.label}</p>
            <p className="mt-2 text-[28px] font-semibold leading-8 text-slate-900">{stat.value}</p>
          </article>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <label className="flex w-full max-w-md items-center gap-2 rounded-md border border-slate-200 px-3 py-2">
            <Icon icon="lucide:search" className="h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by transaction ID, order ID, or customer..."
              className="w-full min-w-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </label>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as (typeof statusOptions)[number])}
              className="appearance-none rounded-md border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-600 focus:outline-none"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
              <Icon icon="lucide:chevron-down" className="h-4 w-4 text-slate-400" />
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {tableHeadings.map((heading) => (
                  <th
                    key={heading}
                    className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500 first:pl-0"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id} 
                onClick={() => navigate(`/dashboard/order/${row.id}`)}
                className="border-b border-slate-100 last:border-none cursor-pointer">
                  <td className="px-3 py-3.5 first:pl-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-slate-800">{row.id.slice(0,8)}</span>
                      <button
                        type="button"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          handleCopy(row.id)
                        }}
                        className="rounded p-0.5 hover:bg-slate-100"
                        aria-label={`Copy ${row.id}`}
                        title={copiedId === row.id ? "Copied" : "Copy order ID"}
                      >
                      <Icon icon="lucide:copy" className="h-4 w-4 text-slate-400" />
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-slate-700">Rufftech</td>
                  <td className="px-3 py-3.5 text-slate-700">{row.customerName}</td>
                  <td className="px-3 py-3.5 font-medium text-slate-800">{"₦"+row.totalAmount}</td>
                  <td className="px-3 py-3.5">
                    {/* <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusBadgeClass[row.status]}`}
                    >
                      {row.status}
                    </span> */}
                  </td>
                  <td className="px-3 py-3.5 text-slate-600">{DateFormatter(row.createdAt)}</td>
                  {/* <td className="px-3 py-3.5 text-slate-600">{row.payment}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
           <p>
            Showing {(page - 1) * 10 + 1} to{" "}
            {Math.min(page * 10, pagination?.total ?? 0)} of{" "}
            {pagination?.total ?? 0} results
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded border px-3 py-1 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from(
              { length: pagination?.totalPages ?? 0 },
              (_, i) => i + 1
            ).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`rounded px-3 py-1 ${
                  page === pageNum
                    ? "bg-violet-700 text-white"
                    : "border"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              disabled={page === pagination?.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded border px-3 py-1 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Order;
