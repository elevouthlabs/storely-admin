import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

type ApplyCouponModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (reason: string) => void;
  fullName: string;
  email: string;

  onForcePassword: (reason: string)=> Promise<void>
};

export const PasswordReset=({ isOpen, onClose, onForcePassword, fullName, email }: ApplyCouponModalProps)=>{
         const [reason, setReason] = useState("");
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
            if (!isOpen) setReason("");
          }, [isOpen]);
        
          if (!isOpen) return null;
        
         const handleForce = async () => {

          if (!reason) return;

          try {
            setSubmitting(true);

            await onForcePassword(reason);

            setReason("");
            onClose();
          } finally {
            setSubmitting(false);
          }
        };
        
        return (
        <div
          className="fixed inset-[-20px] z-[9999] flex items-center justify-center bg-[#28272AB0] "
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-coupon-title"
          onClick={onClose}
        >
          <div
            className="p-[24px] w-[488px] h-[95vh] overflow-auto rounded-[10px] border bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <header className="flex items-start justify-between">
              <h2 className="text-[20px] font-semibold text-[#47444B] leading-[28px] mb-[16px]">
                Force Password Reset
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
                <label className="block pb-[4px]">Reason for password reset *</label>
                <select
                className="placeholder:text-[16px] leading-[24px] text-[#6A7282]
                p-[10px] rounded-[8px] bg-[#F8FAFC] w-full">
                    <option value="Select a reason">Select a reason</option>
                    <option value="Suspected breach">Suspected breach</option>
                    <option value="Requested">Requested</option>
                </select>
              </div>
    
              <div className="rounded-[10px] p-[17px]
               bg-[#EFE6FD] mt-[16px] border border-[#EFE6FD] flex gap-3">
                <Icon icon="lucide:lock" className="h-5 w-5 shrink-0 text-[#4B0082]"/>
                <div className="text-[#4B0082]">
                  <p className="text-[14px] leading-[20px] font-medium mb-[4px]">This action will:</p>
                  <p className="text-[14px] leading-[20px]">Immediately invalidate the current password</p>
                  <p className="text-[14px] leading-[20px]">Log out all active sessions</p>
                  <p className="text-[14px] leading-[20px]">Send password reset link to user's email</p>
                  <p className="text-[14px] leading-[20px]">Require new password on next login</p>
                  <p className="text-[14px] leading-[20px]">Create an audit log entry</p>
                  <p className="text-[14px] leading-[20px]">Send security notification to user</p>
                </div>
              </div>

              <div className="rounded-[10px] p-[17px]
               bg-[#FFF7ED] mt-[16px] border border-[#FEF3C7] flex gap-3">
                <Icon icon="lucide:triangle-alert" className="h-5 w-5 shrink-0 text-[#9F0712]"/>
                <div className="text-[#7E2A0C]">
                  <p className="text-[14px] leading-[20px] font-medium mb-[4px]">Security Notice</p>
                  <p className="text-[14px] leading-[20px]">The user will be immediately logged out of all devices and must create a new password to regain access. Use this action only when necessary for security reasons.</p>
               
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <div className="px-[34px] py-[13px] border border-[#E2E8F0] rounded-[10px]">
                    <p className="text-[#47444B] text-[14px] leading-[20px] font-medium">Email user immediately</p>
                    <p className="text-[#6A7282] text-[12px] leading-[16px] font-medium">Send password reset instructions to {email}</p>
                </div>
                <div className="px-[34px] py-[13px] border border-[#E2E8F0] rounded-[10px]">
                    <p className="text-[#47444B] text-[14px] leading-[20px] font-medium">End all active sessions</p>
                    <p className="text-[#6A7282] text-[12px] leading-[16px] font-medium">Force logout from all devices immediately</p>
                </div>
                <div className="px-[34px] py-[13px] border border-[#E2E8F0] rounded-[10px]">
                    <p className="text-[#47444B] text-[14px] leading-[20px] font-medium">Require 2FA re-setup</p>
                    <p className="text-[#6A7282] text-[12px] leading-[16px] font-medium">Force user to reconfigure two-factor authentication</p>
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
                 onClick={handleForce}
                 disabled={!reason || submitting}
                className={`rounded-[10px] w-1/2 p-3 text-[16px] font-medium text-white transition hover:opacity-95"
                    ${
                  reason
                    ? "bg-[#4B0082] hover:opacity-95"
                    : "bg-[#4B0082] opacity-50 cursor-not-allowed"
                }
            `}
              >
                {submitting ? "Resetting...": "Force Password Reset"}
              </button>
            </footer>
          </div>
        </div>
      );
}