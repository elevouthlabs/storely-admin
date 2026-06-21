import { Icon } from "@iconify/react";
import { useMemo, useState, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (grace: string) => void;
  fullName: string;
  email: string;

  onSendMessage: (
  subject: string,
  message: string
) => Promise<void>;
};

export const SendMessage=({ isOpen, onClose, onApply, fullName, email, onSendMessage }: ModalProps)=>{
         const [subject, setSubject] = useState("");
         const [message, setMessage] = useState("");
         const [submitting, setSubmitting] = useState(false);

         const isSendEnabled = useMemo(() => {
              return  subject.trim().length > 0 && message.trim().length > 0;
           }, [subject, message]);
            
        useEffect(() => {
          if (!isOpen) return;
        
          const previousOverflow = document.body.style.overflow;
        
          document.body.style.overflow = "hidden";
        
          return () => {
            document.body.style.overflow = previousOverflow;
          };
        }, [isOpen]);
        
        const handleSendMessage = async () => {
  
          try {
            setSubmitting(true);

            await onSendMessage( subject, message);

            setSubject("");
            setMessage("");
        

            onClose();
          } finally {
            setSubmitting(false);
          }
        };

        if (!isOpen) return null;
        
        return (
        <div
          className="fixed inset-[-20px] z-[9999] flex items-center justify-center bg-[#28272AB0]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-coupon-title"
          onClick={onClose}
        >
          <div
            className="p-[24px] w-[448px] rounded-[10px] border bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-start justify-between">
              <h2 className="text-[20px] font-semibold text-[#47444B] leading-[28px] mb-[16px]">
                Message User
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

              <div className="pb-[8px]">
                <label className="block pb-[4px] font-medium text-[14px] leading-[20px]">Subject *</label>
                <input 
                value={subject}
                onChange={(e)=> setSubject(e.target.value)}
                type="text" placeholder="Enter message subject..." 
                className="placeholder:text-[#0A0A0A80] text-[16px] leading-[16px]
                px-3 py-2 border border-[#6A7282] rounded-[10px] w-full"/>
              </div>
    
              <div className="flex flex-col gap-[8px]">
                <label className="text-[14px] leading-[20px] font-medium inline-block">
                  Message *
                </label>
                <textarea 
                value={message}
                placeholder="Type your message here...."
                onChange={(e) => setMessage(e.target.value)}
                className="placeholder:text-[#0A0A0A80] border border-[#CAD5E2]
                 text-[16px] px-3 py-2 rounded-[10px] h-[162px]">
               </textarea>
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
                onClick={handleSendMessage}
                className={`rounded-[10px] w-1/2 p-3 text-[16px] font-medium text-white transition hover:opacity-95" ${
                  isSendEnabled ? "bg-[#4B0082] hover:opacity-95"
                    : "bg-[#4B0082] opacity-50 cursor-not-allowed"
                  }`}
                disabled={!isSendEnabled}
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </footer>
          </div>
        </div>
      );
}