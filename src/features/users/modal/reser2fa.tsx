import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (grace: string) => void;
  fullName: string;
  email: string;
};

export const Reset2fa=({ isOpen, onClose, onApply, fullName, email }: ModalProps)=>{
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
          className="fixed inset-[-20px] z-[9999] flex items-center justify-center bg-[#28272AB0]"
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
                Reset 2FA
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
                <h3 className="text-[#47444B] text-[16px] leading-[24px] font-medium">{fullName}</h3>
                <p className="text-[#6A7282] text-[14px] leading-[20px]">{email}</p>
              </div>

              <div className="rounded-[10px] p-[17px]
                bg-[#EFE6FD] mt-[16px] border border-[#EFE6FD] flex gap-3">
                <Icon icon="lucide:lock" className="h-5 w-5 shrink-0 text-[#4B0082]"/>
                <div>
                <p className="text-[#4B0082] text-[14px] leading-[20px] font-medium mb-[4px]">This will:</p>
                <p className="text-[#4B0082] text-[14px] leading-[20px]">Disable current 2FA setup</p>
                <p className="text-[#4B0082] text-[14px] leading-[20px]">Send setup instructions to user email</p>
                <p className="text-[#4B0082] text-[14px] leading-[20px]">Require user to reconfigure 2FA on next login</p>
                <p className="text-[#4B0082] text-[14px] leading-[20px]">Create an audit log entry</p>
                </div>
              </div>
    
              <div className="rounded-[10px] p-[13px]
               bg-[#FFF7ED] mt-[16px] border border-[#FEF3C7]">
                  <p className="text-[#B45309] text-[14px] leading-[20px]">
                  <span className="font-bold">Note: </span>Only reset 2FA if the user has lost access to their authentication device and verified their identity through support.</p>
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
                className={"rounded-[10px] w-1/2 p-3 text-[16px] bg-[#4B0082] font-medium text-white transition cursor-pointer"}
              >
                Reset 2FA
              </button>
            </footer>
          </div>
        </div>
      );
}