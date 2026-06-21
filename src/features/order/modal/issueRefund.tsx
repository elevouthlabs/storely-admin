import { useEffect, useState } from "react";

type ApplyCouponModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (grace: string) => void;
};

export const IssueRefund =({ isOpen, onClose, onApply }: ApplyCouponModalProps)=>{
      const [grace, setGrace] = useState("");
            
        useEffect(() => {
          if (!isOpen) return;
        
          const previousOverflow = document.body.style.overflow;
        
          document.body.style.overflow = "hidden";
        
          return () => {
            document.body.style.overflow = previousOverflow;
          };
        }, [isOpen]);

        useEffect(() => {
        if (!isOpen) setGrace("");
      }, [isOpen]);
    
      if (!isOpen) return null;
    
  
        
        return (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#28272AB0] "
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-coupon-title"
          onClick={onClose}
        >
          <div
            className="p-[24px] max-w-[448px] rounded-[10px] border bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-start justify-between">
              <h2 className="text-[20px] font-semibold text-[#47444B] leading-[28px] mb-[16px]">
                Issue Refund
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded p-1 text-lg leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close modal"
              >
                &times;
              </button>
            </header>
    
            <div className="bg-[#F8FAFC] p-[12px] rounded-[10px] mb-[8px]">
            <h3 className="text-[#47444B] text-[16px] leading-[24px] font-medium">ORD-4821</h3>
            <p className="text-[#6A7282] text-[14px] leading-[20px]">45000</p>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-[#0F172B] text-[14px] leading-[20px] pb-[8px]">Refund Amount</p>
                <input type="text" placeholder="₦0.00" className="w-full
                 placeholder:text-[#6A7282] text-[16px] leading-[24px]"/>
                <p>Refund Full Amount</p>
            </div>
            <div className="flex flex-col gap-2 rounded-[8px] bg-[#F8FAFC] p-2.5">
                <p className="text-[#0F172B] text-[14px] leading-[20px] pb-[8px]">Reason *</p>
                <select name="" id="" className="w-full placeholder:text-[#6A7282] text-[16px] leading-[24px]">
                    <option value="Select a reason">Select a reason</option>
                </select>
            </div>
             
            <p className="text-[14px] leading-[20px] text-[#4B0082] bg-[#EFE6FD] p-[13px] rounded-[10px]">
            The refund will be processed to the original payment method. Both buyer and seller will be notified.
            </p>
           
            <footer className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-[10px] border border-[#CAD5E2] w-1/2 p-3 text-[16px] font-medium text-[#47444B] hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-[10px] w-1/2 p-3 text-[16px] font-medium bg-[#4B0082] text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Confirm Approval
              </button>
            </footer>
          </div>
        </div>
      );
}