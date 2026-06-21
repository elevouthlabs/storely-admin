import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

type ApplyCouponModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (grace: string) => void;
};

export const RejectProduct=({ isOpen, onClose, onApply }: ApplyCouponModalProps)=>{
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
        
          const handleApply = () => {
            const trimmed = grace.trim();
            if (!trimmed) return;
            onApply?.(trimmed);
            onClose();
          };
        
        return (
        <div
          className="fixed inset z-[9999] flex items-center justify-center bg-[#28272AB0]"
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
                Reject Product
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
    
              <div className="flex flex-col gap-[8px]">
                <label className="text-[14px] leading-[20px] font-medium inline-block">
                  Rejection Reason *
                </label>
                <select 
                value={grace}
                onChange={(e) => setGrace(e.target.value)}
                className="placeholder:text-[#6A7282] text-[16px] bg-[#F8FAFC] p-[10px] rounded-[8px]">
                  
                  <option value="Select reason">Select reason</option>
                  <option value="Select reason">i dont want to</option>
                 
               </select>
              </div>
    
              <div className="rounded-[10px] p-[17px]
               bg-[#FEF2F2] mt-[16px] border border-[#FFC9C9] flex gap-3">
                <Icon icon="lucide:triangle-alert" className="h-5 w-5 shrink-0 text-[#E7000B]"/>
                <div>
                  <p className="text-[#B45309] text-[14px] leading-[20px] font-medium mb-[4px]">Warning:</p>
                  <p className="text-[#B45309] text-[14px] leading-[20px]">The seller will be notified of this rejection. Multiple rejections may result in account penalties.</p>
                </div>
              </div>
    
               <footer className="flex items-center gap-2 mt-[24px]">
              <button
                type="button"
                onClick={onClose}
                className="rounded-[10px] border border-[#CAD5E2] w-1/2 p-3 text-[16px] font-medium text-[#47444B] hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                 onClick={handleApply}
                 disabled={!grace.trim()}
                className={`rounded-[10px] w-1/2 p-3 text-[16px] font-medium text-white transition hover:opacity-95
                    ${
                  grace.trim()
                    ? "bg-[#E7000B] hover:opacity-95"
                    : "bg-[#E7000B] opacity-50 cursor-not-allowed"
                }
            `}
              >
                Confirm Rejection
              </button>
            </footer>
          </div>
        </div>
      );
}