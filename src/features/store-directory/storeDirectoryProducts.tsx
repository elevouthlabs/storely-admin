import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { TopNavbar } from "../../component/topNavbar";
import { SendMessageModal } from "./modal/sendMessageModal";
import { VerifyStoreModal } from "./modal/verifyStoreModal";
import { SuspendStoreModal } from "./modal/suspendStoreModal";
import { StoreQuickActions } from "./utils/StoreQuickActions";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { fetchStoreProduct, fetchStoreById } from "./storeDirectory";

export const StoreDirectoryProducts = () => {
  const { storeId } = useParams();
  const {products, store, isFetchingOne, error} = useAppSelector((state)=> state.stores)
  const dispatch = useAppDispatch()
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);

  useEffect(()=>{
    if(storeId){
      dispatch(fetchStoreProduct(storeId))
      dispatch(fetchStoreById(storeId))
    }

  }, [dispatch, storeId])

  if (isFetchingOne) return <p>Loading products...</p>;
  
  if (error) return <p>{error}</p>;
  
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
              <h1 className="text-3xl font-semibold leading-tight">{store?.name}</h1>
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
            <button className="border-b-2 border-violet-700 pb-2 font-medium text-violet-700">Products</button>
            <Link to={`/dashboard/store-directory/${storeId}/orders`} className="pb-2 text-slate-500 hover:text-violet-700">
              Orders
            </Link>
          </div>

          <div className="grid gap-3 p-3 sm:grid-cols-2 xl:grid-cols-3">
            {Array.isArray(products) && products.length > 0 ? products.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                <div  className="relative h-40 w-full overflow-hidden rounded-sm bg-slate-100">
                  {/* <span className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-medium ${statusBadgeClass(product.status)}`}>
                    {product.status}
                  </span> */}
                  <img 
                   src={product.imageUrls?.[0].url}
                   alt={product.name}
                   className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                  {/* <span className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-medium`}>
                    {product.status}
                  </span> */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
                <div className="space-y-1 p-2.5">
                  <h3 className="truncate text-xs font-medium text-slate-800">{product.name}</h3>
                  <div className="flex items-end justify-between">
                    <p className="text-sm font-semibold text-slate-900">{product.price}</p>
                    <p className="text-[11px] text-slate-500">Stock: {product.stockQuantity}</p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    {/* <span>{product.sales} sales</span>
                    <span>{product.views} views</span> */}
                  </div>
                </div>
              </article>
            )): "no product available"}
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
