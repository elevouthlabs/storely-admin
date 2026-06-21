import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { useEffect, useMemo } from "react";
import { fetchStores } from "./storeDirectory";
import { fetchOrders } from "../order/orderSlice";
import { Icon } from "@iconify/react";

// const planBadge = (plan: StoreRow["plan"]) => {
//   if (plan === "Pro") return "bg-emerald-100 text-emerald-700";
//   if (plan === "Growth") return "bg-violet-100 text-violet-700";
//   return "bg-amber-100 text-amber-700";
// };

// const statusBadge = (status: StoreRow["status"]) => {
//   if (status === "Active") return "bg-emerald-100 text-emerald-700";
//   if (status === "Blocked") return "bg-rose-100 text-rose-700";
//   return "bg-amber-100 text-amber-700";
// };

export const StoreDirectory = () => {
  const {stores, isLoading, error} = useAppSelector((state)=> state.stores)
  const {orders} = useAppSelector((state)=> state.orders)
  const token = useAppSelector((state) => state.auth.token);
  const dispatch =useAppDispatch()
  const navigate = useNavigate() 
  
  console.log(stores, orders);
  
useEffect(() => {
  if (!token) return;

  const load = async () => {
    await Promise.all([
      dispatch(fetchStores({ page: 1, limit: 10 })),
      dispatch(fetchOrders({ page: 1, limit: 10 })),
        ]);
      };

      load();
    }, [dispatch, token]);

  const ordersByStore = useMemo(() => {
    return orders.reduce((acc, order) => {
      const storeId = order.businessId;

      if (!storeId) return acc;

      if (!acc[storeId]) {
        acc[storeId] = [];
      }

      acc[storeId].push(order);

      return acc;
    }, {} as Record<string, typeof orders>);
  }, [orders]);

  const gmvByStore = useMemo(() => {
    return orders.reduce((acc, order) => {
      const storeId = order.businessId;
      if (!storeId) return acc;

      acc[storeId] = (acc[storeId] || 0) + Number(order.totalAmount);

      return acc;
    }, {} as Record<string, number>);
  }, [orders]);

     if (isLoading) return <p>Loading stores...</p>;
     if (error) return <p>Error: {error}</p>;
  
  return (
    <section className="space-y-4">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Store Directory</h1>
          <p className="mt-1 text-sm text-slate-500">Search, filter and browse all registered stores</p>
        </div>
        <button className="rounded-md bg-[#4b0082] px-3 py-2 text-sm font-medium text-white hover:bg-violet-800">
          Export CSV
        </button>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex w-full max-w-md items-center gap-2 rounded-md border border-slate-200 px-3 py-2">
            <Icon icon="lucide:search" className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by transaction ID, order ID, or customer..."
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </label>

          <div className="flex items-center gap-2">
            <button className="rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-600">All Plans</button>
            <button className="rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-600">All Status</button>
            <button className="rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-600">Sort Revenue</button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-500">
              <tr className="border-b border-slate-200">
                <th className="px-3 py-3">
                  <input type="checkbox" />
                </th>
                <th className="px-3 py-3 font-medium">Store</th>
                <th className="px-3 py-3 font-medium">Plan</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">GMV</th>
                <th className="px-3 py-3 font-medium">Orders</th>
                <th className="px-3 py-3 font-medium">Joined</th>
                <th className="px-3 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => {
                const initials = store.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase();
                 
                return (
                <tr key={store.id}
                onClick={()=> navigate(`/dashboard/store-directory/${store.id}`)}
                 className="border-b border-slate-100 last:border-none">
                  <td className="px-3 py-3">
                    <input type="checkbox" onClick={(e)=> e.stopPropagation()}/>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      {/* <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white ${store.color}`}> */}
                      <div className={`flex h-7 w-7 items-center justify-center uppercase rounded-full text-xs font-semibold text-white bg-purple-400`}>
                        {initials}
                      </div>
                      <div>
                        <Link to={`store-directory/${store.id}`} className="font-medium text-slate-800 hover:text-violet-700">
                          {store.name}
                        </Link>
                        <p className="text-xs text-slate-500">{"@"+store.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    {/* <span className={`rounded-full px-2 py-1 text-xs font-medium ${planBadge(store.plan)}`}>{store.plan}</span> */}
                    <span className={`rounded-full px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700`}>Pro</span>
                  </td>
                  <td className="px-3 py-3">
                    {/* <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusBadge(store.status)}`}>{store.status}</span> */}
                    <span className={`rounded-full px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700`}>Active</span>
                  </td>
                  <td className="px-3 py-3 text-slate-700">₦{gmvByStore[store.id] ?? 0}</td>
                  <td className="px-3 py-3 text-slate-700">{ordersByStore[store.id]?.length ?? 0}</td>
                  <td className="px-3 py-3 text-slate-700">{new Date(store.createdAt).toLocaleDateString()}</td>
                  <td className="px-3 py-3">
                    <div className="flex justify-end">
                      <button className="rounded p-1 hover:bg-slate-100">
                        <Icon icon="lucide:ellipsis-vertical" className="h-4 w-4 text-slate-400" />
                      </button>
                    </div>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <footer className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
          <p>Showing 1 to 5 of 150 results</p>
          <div className="flex items-center gap-1">
            <button className="rounded border border-slate-200 px-2 py-1">Prev</button>
            <button className="rounded bg-violet-700 px-2 py-1 text-white">1</button>
            <button className="rounded border border-slate-200 px-2 py-1">2</button>
            <button className="rounded border border-slate-200 px-2 py-1">3</button>
            <button className="rounded border border-slate-200 px-2 py-1">Next</button>
          </div>
        </footer>
      </div>
    </section>
  );
};
