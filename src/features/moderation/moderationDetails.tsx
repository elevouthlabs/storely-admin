import { Link, useParams } from "react-router-dom"
import { Icon } from "@iconify/react";
import { RejectProduct } from "./modal/rejectProduct";
import { ApproveProduct } from "./modal/approveProduct";
import { RequestEdit } from "./modal/requestEdit";
import { useState, useEffect } from "react";
import { Product } from "./moderation";

const ModerationDetails = ()=>{
    const {itemName} = useParams()
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = [1, 2, 3, 4, 5]; // just placeholders
    const product = Product.find((p)=> p.itemName === itemName)
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const [isGraceOpen, setIsGraceOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const CARD = "rounded-lg border border-[#E8EAED] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]";

   useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
    }, [slides.length]);

    const next = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prev = () => {
    setCurrentIndex((prev) =>
        prev === 0 ? slides.length - 1 : prev - 1
    );
    };
    return(
    <section className="min-h-full space-y-4 pb-8 relative">
        <nav className="text-[12px] text-slate-500" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1">
            <li>
                <Link to="/dashboard/risk-moderation" className="hover:text-slate-700">
                Moderation Queue
                </Link>
            </li>
            <li className="px-0.5 text-slate-400" aria-hidden="true">
                /
            </li>
            <li className="font-medium text-slate-600">{product?.itemName}</li>
            </ol>
        </nav>
        <div className="bg-white p-[25px] flex justify-between items-center">
            <div className="flex flex-col gap-1">
                <h2 className="text-[30px] leading-[36px] font-bold text-[#47444B]">{product?.itemName}</h2>
                <p className="text-[#6A7282] text-[16px] leading-[24px] ">Uploaded Apr 21, 2026 12:00
                <span className="text-[#314158] text-[14px] leading-[20px] bg-[#F1F5F9] px-[8px] py-[4px] ml-2">Fashion & Accessories</span></p>
            </div>
            <p className="bg-[#FEF2F2] border border-[#FFC9C9] py-[8px] px-[16px]
            text-[#82181A] text-[16px] leading-[24px] font-medium rounded-[10px]">AI Flagged</p>
        </div>
        <div className="grid gap-4 md:grid-cols-5 items-start">
           <div className="col-span-3">
                <div className="rounded-[16px] bg-[#ffffff] p-[20px] flex flex-col">
                    <div className="my-4">
                        <p className="font-medium text-[20px] pb-4">Primary Image</p>
                      <div className="relative w-full h-[253px] overflow-hidden rounded-[10px]">

                        {/* TRACK */}
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                            }}
                        >
                           {slides.map((_, idx) => (
                            <div
                                key={idx}
                                className="min-w-full h-[253px] flex items-center justify-center text-3xl font-bold bg-[#D9D9D9]"
                            >
                                Slide {idx + 1}
                            </div>
                            ))}
                        </div>

                        {/* LEFT BUTTON */}
                        <button
                            onClick={prev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                        >
                            <Icon icon="lucide:chevron-left" />
                        </button>

                        {/* RIGHT BUTTON */}
                        <button
                            onClick={next}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                        >
                            <Icon icon="lucide:chevron-right" />
                        </button>
                        {/* INDICATORS */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {slides.map((_, idx) => (
                            <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                currentIndex === idx
                                ? "bg-[#4B0082] scale-125"
                                : "bg-gray-300"
                            }`}
                            />
                        ))}
                        </div>
                        </div>
                    </div>
                    <div>
                        <p className="font-medium text-[20px] pb-4">Additional Images</p>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-[120px] rounded-[8px] bg-[#D9D9D9]"></div>
                            <div className="h-[120px] rounded-[8px] bg-[#D9D9D9]"></div>
                            <div className="h-[120px] rounded-[8px] bg-[#D9D9D9]"></div>
                        </div>
                    </div>
                </div>
                <div className="border border-[#E2E8F0] p-4 mt-3
                rounded-[10px] bg-white flex flex-col gap-4">
                    <h3 className="text-[#47444B] font-semibold text-[18px]">Product Information</h3>
                    <div>
                        <p className="text-[#6A7282] text-[14px] leading-[20px]">Price</p>
                        <h3 className="text-[24px] font-bold leading-[32px] text-[#6A7282] ">{product?.price}</h3>
                    </div>
                    <div>
                        <p className="text-[#6A7282] text-[14px] leading-[20px]">Stock Available</p>
                        <p className="text-[16px] font-medium leading-[24px] text-[#47444B]">12 units</p>
                    </div>
                    <div>
                        <p className="text-[#6A7282] text-[14px] leading-[20px]">Description</p>
                        <p className="text-[16px] leading-[24px] text-[#47444B]">Luxury designer handbag with gold hardware. Genuine leather, includes dust bag and authenticity card.</p>
                    </div>
                </div>
                <div className=" p-4 mt-3 rounded-[10px] bg-white flex flex-col">
                    <div className="mb-[26px]">
                        <h3 className="text-[#0F172B] text-[18px] leading-[22px] font-semibold">AI Screening Results</h3>
                        <p className="text-[#000] text-[14px] leading-[18px] font-medium">Flagged Issues:</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <p className="bg-[#FFE2E2] border border-[#FFA2A2] rounded-full px-[12px] py-[4px] text-[#C10007]">Counterfeit signal</p>
                        <p className="bg-[#FFE2E2] border border-[#FFA2A2] rounded-full px-[12px] py-[4px] text-[#C10007]">Prohibited brand</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 my-[20px]">
                        <div className="bg-[#F8FAFC] rounded-[8px] p-[12px] flex flex-col gap-2">
                            <p className="text-[#6A7282] text-[16px] font-medium leading-[22px]">Counterfeit</p>
                            <p className="text-[#E7000B] text-[16px] font-medium leading-[22px]">Very High</p>
                        </div>
                        <div className="bg-[#F8FAFC] rounded-[8px] p-[12px] flex flex-col gap-2">
                            <p className="text-[#6A7282] text-[16px] font-medium leading-[22px]">Pricing Risk</p>
                            <p className="text-[#E7000B] text-[16px] font-medium leading-[22px]">High</p>
                        </div>
                        <div className="bg-[#F8FAFC] rounded-[8px] p-[12px] flex flex-col gap-2">
                            <p className="text-[#6A7282] text-[16px] font-medium leading-[22px]">Prohibited Item</p>
                            <p className="text-[#E7000B] text-[16px] font-medium leading-[22px]">High</p>
                        </div>
                    </div>
                    <div className="bg-[#F8FAFC] rounded-[8px] p-[12px]">
                        <p className="text-[#0F172B] text-[14px] font-medium leading-[20px]">AI Analysis:</p>
                        <p className="text-[#6A7282] text-[14px] leading-[20px]">Strong indicators of counterfeit luxury goods. Price far below retail. Brand name matches prohibited list. Recommend rejection.</p>
                    </div>
                </div>
                <div className=" p-4 mt-3 rounded-[10px] bg-white flex flex-col">
                    <h3 className="text-[#47444B] font-semibold text-[18px] leading-[27px] mb-4">Similar Approved Products (For Comparison)</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] p-[12px]">
                            <div className="flex flex-col gap-1">
                                <p className="text-[#47444B] font-medium text-[16px] leading-[24px]">Silk Evening Gown</p>
                                <p className="text-[#6A7282] text-[16px] leading-[24px]">Elite Fashion</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[#47444B] text-[16px] leading-[24px] font-bold">₦85,000</p>
                                <p className="text-[#1B5E20] text-[12px] leading-[16px] bg-[#E8EFE9] py-[4px] px-[8px]">Approved</p>
                            </div>
                        </div>
                        <div className="flex justify-between bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] p-[12px]">
                            <div className="flex flex-col gap-1">
                                <p className="text-[#47444B] font-medium text-[16px] leading-[24px]">Silk Evening Gown</p>
                                <p className="text-[#6A7282] text-[16px] leading-[24px]">Elite Fashion</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[#47444B] text-[16px] leading-[24px] font-bold">₦85,000</p>
                                <p className="text-[#1B5E20] text-[12px] leading-[16px] bg-[#E8EFE9] py-[4px] px-[8px]">Approved</p>
                            </div>
                        </div>
                        <div className="flex justify-between bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] p-[12px]">
                            <div className="flex flex-col gap-1">
                                <p className="text-[#47444B] font-medium text-[16px] leading-[24px]">Silk Evening Gown</p>
                                <p className="text-[#6A7282] text-[16px] leading-[24px]">Elite Fashion</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[#47444B] text-[16px] leading-[24px] font-bold">₦85,000</p>
                                <p className="text-[#1B5E20] text-[12px] leading-[16px] bg-[#E8EFE9] py-[4px] px-[8px]">Approved</p>
                            </div>
                        </div>                      
                    </div>
                </div>
           </div>
           <div className="col-span-2 flex flex-col gap-[24px]">
                <article className={`${CARD} p-4 sm:p-5`}>
                    <div className="flex items-center gap-2 mb-[16px]">
                        <Icon icon="lucide:store" className="h-5 w-5 text-purple-700" />
                        <h2 className="text-[18px] leading-[27px] font-semibold text-[#0F172B]">Store Information</h2>
                    </div>
                    <div className="mb-[12px] flex flex-col gap-2">
                         <div>
                            <p className="text-[#45556C] text-[14px] leading-[20px]">Store Name</p>
                            <p className="text-[#0F172B] text-[16px] leading-[24px] font-medium">Beauty Place</p>
                        </div>
                        <div>
                            <p className="text-[#45556C] text-[14px] leading-[20px]">Handle</p>
                            <p className="text-[#0F172B] text-[16px] leading-[24px]">@beautypalace</p>
                        </div>
                        <div>
                            <p className="text-[#45556C] text-[14px] leading-[20px]">Plan Tier</p>
                            <p  className="bg-[#DBEAFE] py-[4px] px-[8px] text-[14px] leading-[20px]
                            text-[#1447E6] w-fit rounded-[4px]">Pro</p>
                        </div>
                    </div>
                    
                    <button
                    type="button"
                    className="rounded-md border w-full
                        border-[#CAD5E2] bg-white px-2 py-[16px] text-[14px] font-medium text-[#0A0A0A]"
                    >
                    View Store Profile
                    </button>
                
                </article>
                 <article className={`${CARD} p-4 sm:p-5`}>
                   <h3 className="pb-[16px] text-[18px] leading-[27px] font-semibold text-[#0F172B]">Moderation History</h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between bg-[#F0FDF4]
                         items-center border border-[#B9F8CF] p-[12px] rounded-[10px]">
                            <p className="text-[#0D542B] text-[14px] leading-[20px]">Approvals</p>
                            <p className="text-[#0D542B] text-[20px] leading-[28px] font-bold">203</p>
                        </div>
                        <div className="flex justify-between bg-[#FFF7ED]
                         items-center border border-[#FFD6A8] p-[12px] rounded-[10px]">
                            <p className="text-[#7E2A0C] text-[14px] leading-[20px]">Rejections</p>
                            <p className="text-[#7E2A0C] text-[20px] leading-[28px] font-bold">8</p>
                        </div>
                       <div className="flex justify-between bg-[#FEF2F2]
                         items-center border border-[#FFC9C9] p-[12px] rounded-[10px]">
                            <p className="text-[#82181A] text-[14px] leading-[20px]">Strikes</p>
                            <p className="text-[#82181A] text-[20px] leading-[28px] font-bold">2</p>
                        </div>
                    </div>                
                </article>
                 <article className={`${CARD} p-4 sm:p-5`}>
                    <h3 className="pb-[16px] text-[18px] leading-[27px] font-semibold text-[#47444B]">Moderation Decision</h3>
                    <div className="flex flex-col gap-3">
                    <button
                    type="button"
                    onClick={() => setIsCouponModalOpen(true)}
                    className="rounded-[10px] w-full
                         bg-[#4B0082] px-2 py-[12px] text-[16px] font-medium text-[#FFFFFF]"
                    >
                    Approve Product
                    </button>
                    <button
                    type="button"
                    onClick={() => setIsCancelOpen(true)}
                    className="rounded-[10px] w-full
                         bg-[#F59E0B] px-2 py-[12px] text-[16px] font-medium text-[#28272A]"
                    >
                    Request Edits
                    </button>
                    <button
                    onClick={() => setIsGraceOpen(true)}
                    type="button"
                    className="rounded-[10px] w-full
                         bg-[#E7000B] px-2 py-[12px] text-[16px] font-medium text-[#FFFFFF]"
                    >
                    Reject Product
                    </button>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <p className="text-[#47444B] text-[14px] leading-[20px]">Admin Notes (Optional)</p>
                        <textarea placeholder="Add internal notes about this decision..."
                        className="border border-[#CAD5E2] rounded-[10px] py-4 px-2
                        placeholder:text-[#0A0A0A80] text-[14px] leading-[20px]
                        "></textarea>
                    </div>
                
                </article>
           </div>
        </div>
        <ApproveProduct isOpen={isCouponModalOpen} onClose={() => setIsCouponModalOpen(false)}  />
        <RejectProduct isOpen={isGraceOpen} onClose={() => setIsGraceOpen(false)} />
        <RequestEdit isOpen={isCancelOpen} onClose={() => setIsCancelOpen(false)} />
    </section>
    )   
}
export default ModerationDetails;