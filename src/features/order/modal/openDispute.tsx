type DisputeProps = {
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
//   onApply?: (couponCode: string) => void;
};

export const OpenDispute =({isOpen, onClose, onSubmit}: DisputeProps)=>{
    if (!isOpen) return null;
    return(
        <>
        {isOpen ? (
        <div onClick={onClose}
        className="bg-[#28272AB0] fixed inset-0 z-[9999] flex items-center justify-center pt-5">
            <div onClick={(event) => event.stopPropagation()}
            className="bg-[#fff] rounded-[10px] w-[672px] h-full overflow-auto p-[24px]">
                 <header className="flex items-start justify-between">
                    <h2 className="text-[#0F172B] leading-[28px] text-[20px] mb-[16px] font-semibold">Open Dispute</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded text-[30px] leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </header>
                <div className="p-[16px] flex flex-col gap-[8px] bg-[#F8FAFC] mb-[24px] rounded-[10px]">
                    <h3 className="text-[#0F172B] leading-[24px] text-[16px] font-medium">Order ORD-4820</h3>
                    <div className="flex justify-between">
                        <p className="text-[#6A7282] leading-[20px] text-[14px]">Emeka Nwosu • Tech Gadgets NG</p>
                        <p className="text-[#47444B] leading-[24px] text-[16px] font-medium">₦128,000</p>
                    </div>
                </div>
                <p className="text-[#47444B] leading-[20px] text-[14px] font-medium mb-[12px]">Who is initiating the dispute? *</p>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#EFE6FD] border-2 border-[#4B0082] rounded-[10px] p-4 py-7">
                        <p className="text-[#47444B] leading-[24px] text-[16px] font-medium">
                            Buyer
                        </p>
                        <p className="text-[#6A7282] leading-[16px] text-[12px] font-medium">
                            Emeka Nwosu
                        </p>
                    </div>
                    <div className="bg-[#EFE6FD] border-2 border-[#4B0082] rounded-[10px] p-4 py-7">
                        <p className="text-[#47444B] leading-[24px] text-[1p6x] font-medium">
                            Seller
                        </p>
                        <p className="text-[#6A7282] leading-[16px] text-[12px] font-medium">
                            Tech Gadgets NG
                        </p>
                    </div>
                    <div className="bg-[#EFE6FD] border-2 border-[#4B0082] rounded-[10px] p-4 py-7">
                        <p className="text-[#47444B] leading-[24px] text-[1p6x] font-medium">
                            Admin
                        </p>
                        <p className="text-[#6A7282] leading-[16px] text-[12px] font-medium">
                            Platform
                        </p>
                    </div>
                </div>
                <p  className="text-[#47444B] leading-[20px] text-[14px] font-medium pt-[16px] mb-[8px]">
                    Dispute reason *
                </p>
                <select 
                 className="bg-[#F8FAFC] p-[10px] rounded-[8px] w-full mb-[]16px">
                   <option value="Select a reason">Select a reason</option>
                 </select>
                <p className="text-[#47444B] leading-[20px] text-[14px] font-medium mb-[8px] mt-[13px]">
                    Dispute details *
                </p>
                <textarea
                className="placeholder:text-[#0A0A0A80] text-[16px] w-full
                border border-[#CAD5E2] px-[12px] py-[8px] rounded-[10px] min-h-[162px]"
                 placeholder="Provide detailed information about the dispute. Include any relevant facts, timelines, or context that will help in resolution...">

                </textarea>
                <p className="pt-[10px] pb-[8px]">This information will be shared with both parties</p>
                <div className="bg-[#EFE6FD] px-4 flex flex-col gap-[4px]
                 p-[17px] border border-[#EFE6FD] rounded-[10px]">
                    <p className="text-[#1C398E] leading-[20px] text-[14px] font-medium mb-[8px]">
                        What happens next:
                    </p>
                    <p className="text-[#1C398E] leading-[20px] text-[14px] font-medium">
                        Both buyer and seller will be notified
                    </p>
                    <p className="text-[#1C398E] leading-[20px] text-[14px] font-medium">
                        Order status will change to "Disputed"
                    </p>
                    <p className="text-[#1C398E] leading-[20px] text-[14px] font-medium">
                        Payment will be held pending resolution
                    </p>
                    <p className="text-[#1C398E] leading-[20px] text-[14px] font-medium">
                        Parties can submit evidence and statements
                    </p>
                    <p className="text-[#1C398E] leading-[20px] text-[14px] font-medium">
                        Admin team will review and make final decision    
                    </p>  
                    <p className="text-[#1C398E] leading-[20px] text-[14px] font-medium">
                        Resolution typically takes 3-7 business days    
                    </p>  
                </div>
                <p className="text-[#47444B] leading-[20px] text-[14px] font-medium pb-[8px] pt-[16px]">
                    Recommended actions before opening:
                </p>
                <div className="px-4 flex flex-col gap-[4px]">
                    <p className="text-[#6A7282] leading-[24px] text-[16px] font-medium">
                        Contacted both parties to understand the issue
                    </p>
                    <p className="text-[#6A7282] leading-[24px] text-[16px] font-medium">
                        Reviewed order history and timeline
                    </p>
                    <p className="text-[#6A7282] leading-[24px] text-[16px] font-medium">
                        Verified all payment and delivery information
                    </p>
                    <p className="text-[#6A7282] leading-[24px] text-[16px] font-medium">
                        Documented evidence or communication attempts
                    </p>
                </div>
                <div className="pt-[24px] flex gap-3">
                    <button className="rounded-[10px] p-2 w-1/2 border border-[#CAD5E2] text-[#0A0A0A] text-[16px]">Cancel</button>
                    <button onClick={() => {
                        onSubmit();
                        onClose();
                    }}
                    className="bg-[#E7000B] text-[16px] rounded-[10px] p-2 w-1/2 text-white">Open Dispute</button>
                </div>
            </div>
        </div>
    ):null}
</>
    )
}