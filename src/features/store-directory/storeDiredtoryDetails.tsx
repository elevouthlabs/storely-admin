import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SendMessageModal } from "./modal/sendMessageModal";
import { VerifyStoreModal } from "./modal/verifyStoreModal";
import { SuspendStoreModal } from "./modal/suspendStoreModal";
import { StoreQuickActions } from "./utils/StoreQuickActions";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { fetchStoreById, fetchStoreOrders } from "./storeDirectory";
import { FormatGMV, DateFormatter } from "./utils/formatMoney";
import { useStoreActions } from "../../hook/useStoreActions";

export const StoreDirectoryDetails = () => {
  const { storeId } = useParams();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {store, orders, isFetchingOne, error} = useAppSelector((state)=> state.stores)
   const { handleVerify, handleSuspend, handleSendMessage } =
  useStoreActions(storeId);
  
  
    useEffect(() => {
    if (!storeId) return; 
      dispatch(fetchStoreById(storeId));
      dispatch(fetchStoreOrders(storeId))
      
    }, [dispatch, storeId]);

    console.log(store);
    

    const totalRevenue = orders.reduce((acc, order) => {
      return acc + Number(order.totalAmount);
    }, 0);
  
  
    if (error) return <p>{error}</p>;
    if (!store) return;
  
  return (
    <section className="space-y-4">
      <p className="text-sm text-slate-500" onClick={()=> navigate("/dashboard/store-directory")}>
        Store Directory <span className="mx-1">/</span> <span className="text-slate-700">{store?.name}</span>
      </p>

      <article className="rounded-xl bg-[linear-gradient(90deg,#1D4ED8,#7C3AED,#A21CAF)] p-4 text-white shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
            src={store?.logoUrl}
            alt={store?.name}
            className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/90 text-2xl" />
            <div>
              <h1 className="text-4xl font-semibold leading-tight">{store?.name}</h1>
              <p className="text-sm text-white/85">{"@"+store?.slug}</p>
              <Link to="/store-directory" className="mt-1 inline-block text-sm text-white underline underline-offset-2">
                View live store →
              </Link>
            </div>
          </div>
          <span className="rounded-full bg-emerald-300 px-2 py-1 text-xs font-semibold text-emerald-950">live</span>
        </div>
      </article>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.7fr]">
        <article className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-4 border-b border-slate-200 px-4 pt-3 text-sm">
            <button className="border-b-2 border-violet-700 pb-2 font-medium text-violet-700">Overview</button>
            <Link to={`/dashboard/store-directory/${storeId}/products`} className="pb-2 text-slate-500 hover:text-violet-700">
              Products
            </Link>
            <Link to={`/dashboard/store-directory/${storeId}/orders`} className="pb-2 text-slate-500 hover:text-violet-700">
              Orders
            </Link>
          </div>
          {isFetchingOne ? <p>Loading....</p> : (
          <div className="space-y-4 p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">GMV</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{FormatGMV(totalRevenue)}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">Total Orders</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{orders?.length || 0}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">Member Since</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{DateFormatter(store.createdAt)}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">Store Description</h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-600">
                {store.description || "n/a"}
              </p>
              <h3 className="mt-3 text-sm font-semibold text-slate-700">Category</h3>
              <span className="mt-1 inline-flex rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
                {store.category || "n/a"}
              </span>
            </div>

            <article className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <h3 className="text-sm font-semibold text-slate-800">Share-link traffic (last 30 days)</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-4">
                <div>
                  <p className="text-xs text-slate-500">WhatsApp</p>
                  <p className="text-xl font-semibold text-slate-900">1240</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Instagram</p>
                  <p className="text-xl font-semibold text-slate-900">820</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">X / Twitter</p>
                  <p className="text-xl font-semibold text-slate-900">410</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Direct</p>
                  <p className="text-xl font-semibold text-slate-900">1980</p>
                </div>
              </div>
            </article>
          </div>
          )}
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
        storeName={store.name}
        storeHandle={store.slug}
        onSendMessage={handleSendMessage}
      />
      <VerifyStoreModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        storeName={store.name}
        storeHandle={store.slug}
        isActive ={store.isActive}
        onVerify={handleVerify}
      />
      <SuspendStoreModal
        isOpen={isSuspendModalOpen}
        onClose={() => setIsSuspendModalOpen(false)}
        storeName={store.name}
        storeHandle={store.slug}
         onSuspend={handleSuspend}
      />
    </section>
  );
};

