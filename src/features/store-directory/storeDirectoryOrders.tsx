import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { TopNavbar } from "../../component/topNavbar";
import { SendMessageModal } from "./modal/sendMessageModal";
import { VerifyStoreModal } from "./modal/verifyStoreModal";
import { SuspendStoreModal } from "./modal/suspendStoreModal";
import { StoreQuickActions } from "./utils/StoreQuickActions";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { fetchStoreOrders, fetchStoreById } from "./storeDirectory";
import type { OrderStatus } from "./storeDirectory.type";

const statusClass = (status: OrderStatus) => {
  if (status === "NEW") return "bg-blue-100 text-blue-700";
  if (status === "PROCESSING") return "bg-amber-100 text-amber-700";
  if (status === "SHIPPED") return "bg-violet-100 text-violet-700";
  // if (status === "Cancelled") return "bg-red-100 text-red-700";

  return "bg-slate-100 text-slate-600";
};


export const StoreDirectoryOrders = () => {
  const { storeId } = useParams();
  const {orders, store, isFetchingOne, error} = useAppSelector((state)=> state.stores)
  const dispatch = useAppDispatch()
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);

   useEffect(()=>{
      if(storeId){
        dispatch(fetchStoreOrders(storeId))
        dispatch(fetchStoreById(storeId))
      }
  
    }, [dispatch, storeId])
  
    if (isFetchingOne) return <p>Loading products...</p>;
    
    if (error) return <p>{error}</p>;

    console.log(orders);
    

  return (
    <section className="space-y-4">
      <TopNavbar searchPlaceholder="Search this store..." />

      <p className="text-sm text-slate-500">
        Store Directory <span className="mx-1">/</span> <span className="text-slate-700">{store?.name} Lagos</span>
      </p>

      <article className="rounded-xl bg-[linear-gradient(90deg,#1D4ED8,#7C3AED,#A21CAF)] p-4 text-white shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/90 text-2xl">🛍️</div>
            <div>
              <h1 className="text-3xl font-semibold leading-tight">{store?.name} Lagos</h1>
              <p className="text-sm text-white/85">{"@"+store?.slug}</p>
              <a href="#" className="mt-1 inline-block text-xs text-white underline underline-offset-2">
                View live store →
              </a>
            </div>
          </div>
          <span className="rounded-full bg-emerald-300 px-2 py-1 text-xs font-semibold text-emerald-950">live</span>
        </div>
      </article>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_0.7fr]">
        <article>
          <div className="flex items-center gap-4 border-b border-slate-200 px-4 pt-3 text-sm mb-[23px]">
            <Link to={`/dashboard/store-directory/${storeId}`} className="pb-2 text-slate-500 hover:text-violet-700">
              Overview
            </Link>
            <Link to={`/dashboard/store-directory/${storeId}/products`} className="pb-2 text-slate-500 hover:text-violet-700">
              Products
            </Link>
            <button className="border-b-2 border-violet-700 pb-2 font-medium text-violet-700">Orders</button>
          </div>

          <div className="p-3 rounded-xl border bg-white shadow-sm">
            <div className="overflow-x-auto bg-white">
              <table className="min-w-full text-left text-sm">
                <thead className="text-xs text-slate-500 bg-white">
                  <tr className="border-b border-slate-200">
                    <th className="px-3 py-3 font-medium">Order ID</th>
                    <th className="px-3 py-3 font-medium">Customer</th>
                    <th className="px-3 py-3 font-medium">Date</th>
                    <th className="px-3 py-3 font-medium">Status</th>
                    <th className="px-3 py-3 font-medium">Amounts</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={`${order.id}-${index}`} className="border-b border-slate-100 last:border-none">
                      <td className="px-3 py-3 text-slate-700">{"ORD-"+order.id.slice(0, 4)+"..."}</td>
                      <td className="px-3 py-3 text-slate-700">{order.customerName}</td>
                      <td className="px-3 py-3 text-slate-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-3 py-3">
                        <span className={`rounded-full px-2 py-1 text-[11px] text-center font-medium ${statusClass(order.status)}`}>{order.status}</span>
                      </td>
                      <td className="px-3 py-3 text-slate-700">{order.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </article>

        <StoreQuickActions
          onSuspendStore={() => setIsSuspendModalOpen(true)}
          onVerifyStore={() => setIsVerifyModalOpen(true)}
          onSendMessage={() => setIsMessageModalOpen(true)}
        />
      </div>

      <SendMessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        storeName="Fashion Hub Lagos"
        storeHandle="@fashionhub"
      />
      <VerifyStoreModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        storeName="Fashion Hub Lagos"
        storeHandle="@fashionhub"
      />
      <SuspendStoreModal
        isOpen={isSuspendModalOpen}
        onClose={() => setIsSuspendModalOpen(false)}
        storeName="Fashion Hub Lagos"
        storeHandle="@fashionhub"
      />
    </section>
  );
};
