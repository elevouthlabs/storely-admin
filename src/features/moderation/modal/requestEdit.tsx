
import { useEffect, useState } from "react";
type ApplyCouponModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onApply?: (grace: string) => void;
};
export const RequestEdit = ({ isOpen, onClose, onApply }: ApplyCouponModalProps)=>{ 
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
      className="fixed inset-0 z-[9999] top-0 flex items-center justify-center bg-[#28272AB0]"
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
            Request Edits
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

        <label className="text-[14px] font-medium leading-[20px] mb-[8px] inline-block">
          What needs to be changed? *
        </label>
        <textarea 
         value={grace}
         onChange={(e) => setGrace(e.target.value)}
         placeholder="Provide specific feedback on what the seller needs"
         className="p-[12px] py-[8px] w-full rounded-[10px]
         h-[138px] placeholder:text-[#0A0A0A80] text-[16px] border border-[#50525633]"
        >
        </textarea>
      
        <p className="text-[#28272A] text-[14px] p-[17px] rounded-[10px]
        leading-[20px] bg-[#FEF5E7] border border-[#F59E0B] mt-[16px]"
        >
          The product will remain pending until the seller makes the requested changes and resubmits for review.</p>

        <footer className="flex items-center gap-2 mt-[24px]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[10px] w-1/2 p-3 border-2 border-[#F8FAFC] text-[16px] font-medium text-[#47444B] hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={!grace.trim()}
            className={`rounded-[10px] w-1/2 p-3 text-[16px] font-medium 
            text-[#28272A]
                ${
                  grace.trim()
                    ? "bg-[#F59E0B] text-[#28272A] hover:opacity-95"
                    : "bg-[#F59E0B] text-[#28272A] opacity-50 cursor-not-allowed"
                }
            `}
          >
            Send to Seller
          </button>
        </footer>
      </div>
    </div>
  );
}