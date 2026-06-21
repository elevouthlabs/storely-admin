import { useEffect, useState } from "react";

type ApplyCouponModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (grace: string) => void;
};

export const ApproveProduct =({ isOpen, onClose, onApply }: ApplyCouponModalProps)=>{
      const PRIMARY_PURPLE = "#580080";
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
                Approve Product
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
    
            
              <div className="bg-[#F8FAFC] p-[12px] rounded-[10px] mb-[16px]">
                <h3 className="text-[#47444B] text-[16px] leading-[24px] font-medium">Designer Handbag</h3>
                <p className="text-[#6A7282] text-[14px] leading-[20px]">Beauty Palace</p>
              </div>
    
              <div className="p-[17px] bg-[#F0FDF4] rounded-[10px] mb-[24px]">
                <p className="text-[14px] leading-[20px] text-[#1B5E20]">
                Approving this product will make it live on the platform immediately. The seller will be notified.
                </p>
              </div>
    
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
                className="rounded-[10px] w-1/2 p-3 text-[16px] font-medium bg-[#1B5E20] text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Confirm Approval
              </button>
            </footer>
          </div>
        </div>
      );
}