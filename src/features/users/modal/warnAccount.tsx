import { useEffect, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fullName: string;
  email: string;

  onWarn: (message: string) => Promise<void>;
};

export const WarnAccount=({ isOpen, onClose, fullName, email, onWarn }: ModalProps)=>{
         const [message, setMessage] = useState("");
         const [submitting, setSubmitting] = useState(false);
            
        useEffect(() => {
          if (!isOpen) return;
        
          const previousOverflow = document.body.style.overflow;
        
          document.body.style.overflow = "hidden";
        
          return () => {
            document.body.style.overflow = previousOverflow;
          };
        }, [isOpen]);
        
          useEffect(() => {
            if (!isOpen) setMessage("");
          }, [isOpen]);
        
          if (!isOpen) return null;

        const handleWarn = async () => {
          const trimmed = message.trim();

          if (!trimmed) return;

          try {
            setSubmitting(true);

            await onWarn(trimmed);

            setMessage("");
            onClose();
          } finally {
            setSubmitting(false);
          }
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
                Warn Account
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

              <div className="flex flex-col gap-[8px]">
                <label className="text-[14px] leading-[20px] font-medium inline-block">
                  Warning message *
                </label>
                <textarea 
                value={message}
                placeholder="Add details for audit trail..."
                onChange={(e) => setMessage(e.target.value)}
                className="placeholder:text-[#6A7282] border border-[#CAD5E2]
                 text-[16px] p-[10px] rounded-[10px] h-[90px]">
               </textarea>
              </div>
    
              <div className="rounded-[10px] p-[13px]
               bg-[#FFF7ED] mt-[16px] border border-[#FEF3C7]">
                  <p className="text-[#B45309] text-[14px] leading-[20px]">The user will receive this warning via email and in-app notification. Multiple warnings may lead to account suspension.</p>
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
                onClick={handleWarn}
                disabled={!message.trim() || submitting}
                className={`rounded-[10px] w-1/2 p-3 text-[16px] font-medium text-white ${
                  message.trim()
                    ? "bg-[#F54900]"
                    : "bg-[#F54900] opacity-50 cursor-not-allowed"
                }`}
                >
                {submitting ? "Sending..." : "Send Warning"}
              </button>
            </footer>
          </div>
        </div>
      );
}