type DisputeProps = {
  isOpen: boolean;
  onClose: () => void;
//   onApply?: (couponCode: string) => void;
};

export const ResolveDispute =({isOpen, onClose}: DisputeProps)=>{
    if (!isOpen) return null;
    return(
        <>
        {isOpen ? (
        <div onClick={onClose}
        className="bg-[#28272AB0] fixed inset-0 z-[9999] flex items-center justify-center pt-5">
            <div onClick={(event) => event.stopPropagation()}
            className="bg-[#fff] rounded-[10px] w-[672px] h-full overflow-auto p-[24px]">
                 <header className="flex items-start justify-between">
                    <h2 className="text-[#0F172B] leading-[28px] text-[20px] mb-[16px] font-semibold">Resolve Dispute</h2>
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
                    <div className="flex justify-between">
                        <h3 className="text-[#47444B] leading-[24px] text-[16px] font-medium">Order ORD-4818</h3>
                        <p   className="text-[#6A7282] leading-[20px] text-[14px]">2 days open</p>
                    </div>
                    <p className="text-[#6A7282] leading-[20px] text-[14px]">Dispute: Product not as described</p>
                </div>
                <p className="text-[#47444B] leading-[20px] text-[14px] font-medium mb-[16px] mt-[24px]">
                    Dispute details *
                </p>
                   <div className="flex flex-col gap-[8px]">
                    <div className="border border-[#E2E8F0] rounded-[10px] py-[18px] px-[43px]">
                        <h3 className="text-[#47444B] text-[16px] leading-[24px] font-medium">Refund Buyer</h3>
                        <p className="text-[#6A7282] text-[14px] leading-[20px] font-medium">Full refund to buyer, seller absorbs loss</p>
                    </div>
                    <div className="border border-[#E2E8F0] rounded-[10px] py-[18px] px-[43px]">
                        <h3 className="text-[#47444B] text-[16px] leading-[24px] font-medium">Release to Seller</h3>
                        <p className="text-[#6A7282] text-[14px] leading-[20px] font-medium">Seller keeps payment, no refund issued</p>
                    </div>
                    <div className="border border-[#E2E8F0] rounded-[10px] py-[18px] px-[43px]">
                        <h3 className="text-[#47444B] text-[16px] leading-[24px] font-medium">Split Decision</h3>
                        <p className="text-[#6A7282] text-[14px] leading-[20px] font-medium">Partial refund, shared resolution</p>
                    </div>
                    <div className="border border-[#E2E8F0] rounded-[10px] py-[18px] px-[43px]">
                        <h3 className="text-[#47444B] text-[16px] leading-[24px] font-medium">Request More Information</h3>
                        <p className="text-[#6A7282] text-[14px] leading-[20px] font-medium">Ask parties for additional evidence</p>
                    </div>
                </div>
                <p className="pt-[16px] pb-[8px]">Admin Notes (internal) *</p>
                <textarea
                className="placeholder:text-[#0A0A0A80] text-[16px] w-full
                border border-[#CAD5E2] px-[12px] py-[8px] rounded-[10px] min-h-[162px]"
                 placeholder="Document your reasoning for this decision...">

                </textarea>
                <div className="bg-[#EFE6FD] flex flex-col gap-[4px] mt-[16px]
                 p-[17px] border border-[#EFE6FD] rounded-[10px]">
                    <p className="text-[#4B0082] leading-[20px] text-[14px] font-medium mb-[8px]">
                        Resolution Timeline:
                    </p>
                    <p className="text-[#4B0082] leading-[20px] text-[14px] font-medium">
                        • Both parties will be notified immediately
                    </p>
                    <p className="text-[#4B0082] leading-[20px] text-[14px] font-medium">
                        • Refund processed within 3-5 business days                    </p>
                    <p className="text-[#4B0082] leading-[20px] text-[14px] font-medium">
                        • Dispute marked as resolved in system
                    </p>
                    <p className="text-[#4B0082] leading-[20px] text-[14px] font-medium">
                        • Audit trail created automatically
                    </p>  
                </div>
            
                <div className="pt-[24px] flex gap-1">
                    <button className="rounded-[10px] p-2  border border-[#CAD5E2]  text-[#0A0A0A] text-[16px]">Cancel</button>
                    <button className="rounded-[10px] p-2 border border-[#CAD5E2] flex-1 text-[#0A0A0A] text-[16px]">Escalate to Senior Admin</button>
                    <button className="bg-[#E7000B] text-[16px] rounded-[10px] p-2 flex-1 text-white">Open Dispute</button>
                </div>
            </div>
        </div>
    ):null}
</>
    )
}