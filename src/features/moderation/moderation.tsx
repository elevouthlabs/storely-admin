import sneakers from "../../assets/sneeks.jpg"
import watch from "../../assets/watch.jpg"
import headphone from "../../assets/headphone.jpg"
import { useState} from "react"
import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
// import { fetchStores, fetchStoreProduct } from "../store-directory/storeDirectory";

export const Product =[
    {icon: "", iconStatus:"misleading price",
     img:headphone, 
     itemName:"Premium Silk Evening Dress1", 
     store: "Adunni Couture", 
     price:"₦45,000", 
     status:"pending"
    },
    {icon: "", iconStatus:"pending",
     img:sneakers, 
     itemName:"Premium Silk Evening Dress2", 
     store: "Adunni Couture", 
     price:"₦45,000", 
     status:"pending"
    },
    {icon: "", iconStatus:"misleading price",
     img:watch, 
     itemName:"Premium Silk Evening Dress3", 
     store: "Adunni Couture", 
     price:"₦45,000", 
     status:"pending"
    },
    {icon: "", iconStatus:"misleading price",
     img:"", 
     itemName:"Premium Silk Evening Dress4", 
     store: "Adunni Couture", 
     price:"₦45,000", 
     status:"pending"
    },
    {icon: "", iconStatus:"misleading price",
     img:"", 
     itemName:"Premium Silk Evening Dress5", 
     store: "Adunni Couture", 
     price:"₦45,000", 
     status:"pending"
    },
    {icon: "", iconStatus:"prohibited item",
     img:"", 
     itemName:"Premium Silk Evening Dress6", 
     store: "Adunni Couture", 
     price:"₦45,000", 
     status:"pending"
    },
    {icon: "", iconStatus:"pending",
     img:"", 
     itemName:"Premium Silk Evening Dress7", 
     store: "Adunni Couture", 
     price:"₦45,000", 
     status:"pending"
    },
]

const Moderation = ()=>{
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    // const dispatch = useAppDispatch()
    // const {stores,products, isLoading, error} = useAppSelector((state)=> state.stores)
    // const token = useAppSelector((state)=> state.auth.token)
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (token) {
    //         dispatch(fetchStores({ page: 1, limit: 10 }));
    //         // dispatch(fetchStoreProduct());
    //     }
    
    // }, [dispatch, token]);

    // console.log(stores, products);
    // if(isLoading) return <p>store is loading...</p>
    // if(error) return <p>No stor found </p>
    

    const toggleProduct = (id: string) => {
        setSelectedProducts((prev) =>
        prev.includes(id)
            ? prev.filter((productId) => productId !== id)
            : [...prev, id]
        );
    };
    return(
    <section className="space-y-4 pb-10">
      <header>
        <h1 className="text-[30px] font-semibold leading-8 text-slate-900">Moderation Queue</h1>
        <p className="mt-1 text-[12px] font-normal leading-5 text-slate-500">
          Review queue for newly uploaded products
        </p>
      </header>
        {selectedProducts.length > 0 && (
        <div className="flex justify-between items-center bg-[#EAEAEA] border border-[#EAEAEA] p-4 rounded-[10px]">
            <p className="font-medium text-blue-700">
                {selectedProducts.length} products selected
            </p>
            <div className="flex gap-3">
                <button className="bg-[#1B5E20] rounded-[10px] text-[16px] leading-[24px] py-[6px] text-white px-3 font-medium">Approve Selected</button>
                <button className="bg-[#E7000B] rounded-[10px] text-[16px] leading-[24px] py-[6px] text-white px-3 font-medium">Reject Selected</button>
            </div>
        </div>
         )}

      <div className="grid gap-x-3 gap-y-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-4">
            {Product.map((item, idx)=>(
                <div key={idx} onClick={()=> navigate(`/dashboard/risk-moderation/details/${item.itemName}`)}
                 className="bg-white relative overflow-hidden rounded-[11.73px]">
                    <div className="h-[155.4px]">
                        {item.img ?(
                        <img src={item.img } alt="" 
                        className="object-cover rounded-tl-[13.68px] rounded-tr-[13.68px]
                        w-full h-full"/>
                    ): <div className="bg-[#D9D9D9] rounded-tl-[13.68px] rounded-tr-[13.68px]
                        w-full h-full"></div>}
                    </div>
                    <div className="p-[8px] rounded-bl-[14px] rounded-br-[14px]">
                        <div>
                            <p className="text-[#47444B] text-[14px] font-medium">{item.itemName}</p>
                            <p className="text-[#47444B] text-[14px]">{item.store}</p>
                        </div>
                        <div className="flex justify-between pt-2 items-center">
                            <p className="font-bold text-[#0F172B] text-[17.59px]">{item.price}</p>
                            <span className="bg-[#B45309] text-[12px] text-white rounded-full px-2 py-0.5">{item.status}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center absolute px-3 top-2 left-0 w-full">
                    <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            toggleProduct(item.itemName);
                        }}
                        className={`
                            bg-white
                            rounded-sm
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                            ${
                            selectedProducts.includes(item.itemName)
                            ? "h-[10px] w-[10px]"
                            : "h-[15px] w-[15px]"
                            }
                        `}
                        >
                        {selectedProducts.includes(item.itemName) && (
                            <span className="text-[12px] text-purple-600">
                            ✓
                            </span>
                        )}
                        </button>
                        <span className="text-[12px] bg-[#FB2C36] text-white px-2 rounded-full">{item.iconStatus}</span>
                    </div>
                </div>
            ))}
       </div>
    </section>
    )
}

export default Moderation;