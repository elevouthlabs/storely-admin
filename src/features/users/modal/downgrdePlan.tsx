import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

type ApplyCouponModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (grace: string) => void;
  fullName: string;

  onChangePlan: (plan: string)=> Promise<void>;
};

type option = "Free" | "Growth";

export const DowngradePlan=({ isOpen, onClose, fullName, onChangePlan }: ApplyCouponModalProps)=>{
         const [plan, setPlan] = useState<option>("Free");
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
            if (!isOpen) setPlan(plan);
          }, [isOpen]);
        
          if (!isOpen) return null;
        
         const handleChangePlan = async () => {
          
          if (!plan) return;

          try {
            setSubmitting(true);

            await onChangePlan(plan);

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
            className="p-[24px] w-[672px] h-[95vh] overflow-auto rounded-[10px] border bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-start justify-between">
              <h2 className="text-[20px] font-semibold text-[#47444B] leading-[28px] mb-[16px]">
                Downgrade Plan
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
                <p className="text-[#6A7282] text-[14px] leading-[20px]">Current plan:
                     <span className="text-[#155DFC] font-medium"> Pro</span></p>
              </div>
              <div>
                <p className="pb-[12px] font-medium text-[14px] leading-[20px]">Select downgrade plan *</p>
                <div className="flex gap-3">
                    <div onClick={()=>setPlan("Free")}
                    className={`pt-[48px] border-2 border-[#E2E8F0] rounded-[10px] px-[18px] min-h-[210px] w-[197px] 
                    ${plan==="Free" ? "bg-[#FEF5E7] border-2 border-[#B45309]": "border-[#E2E8F0]"}`}>
                        <h3 className="text-[#47444B] text-[16px] leading-[24px] font-semibold pb-[6px]">Free</h3>
                        <h1 className="text-[#47444B] text-[24px] leading-[32px] font-bold pb-[8px]">₦0</h1>
                        <div className="text-[#6A7282] text-[12px] leading-[16px] flex flex-col gap-1">
                            <p>• Up to 10 products</p>
                            <p>• Basic analytics</p>
                            <p>• Standard support</p>
                        </div>
                    </div>
                
                    <div onClick={()=>setPlan("Growth")}
                    className={`pt-[48px] border-2 border-[#E2E8F0] rounded-[10px] px-[18px] min-h-[210px] w-[197px] 
                    ${plan==="Growth" ? "bg-[#FEF5E7] border-2 border-[#B45309]": "border-[#E2E8F0]"}`}>
                        <h3 className="text-[#47444B] text-[16px] leading-[24px] font-semibold pb-[6px]">Growth</h3>
                        <h1 className="text-[#47444B] text-[24px] leading-[32px] font-bold pb-[8px]">₦25K</h1>
                        <div className="text-[#6A7282] text-[12px] leading-[16px] flex flex-col gap-1">
                            <p>• Up to 100 products</p>
                            <p>• Advanced analytics</p>
                            <p>• Priority support</p>
                            <p>• AI features</p>
                        </div>
                    </div>
                </div>
              </div>

              <div className="pb-[8px] mt-[24px]">
                <label className="block pb-[8px] font-medium text-[14px] leading-[20px]">Reason for downgrade *</label>
                <select
                className="placeholder:text-[16px] leading-[24px] text-[#6A7282]
                p-[10px] rounded-[8px] bg-[#F8FAFC] w-full">
                    <option value="Select a reason">Select a reason</option>
                    <option value="no reason">no reason</option>
                </select>
              </div>
    
              <div className="rounded-[10px] p-[17px]
               bg-[#FFF7ED] mt-[16px] border border-[#FEF3C7] flex gap-3">
                <Icon icon="lucide:lock" className="h-5 w-5 shrink-0 text-[#7E2A0C]"/>
                <div className="text-[#7E2A0C]">
                  <p className="text-[14px] leading-[20px] font-medium mb-[4px]">Downgrade Impact:</p>
                  <p className="text-[14px] leading-[20px]">Will take effect at the end of current billing period</p>
                  <p className="text-[14px] leading-[20px]">User will receive email notification</p>
                  <p className="text-[14px] leading-[20px]">Feature access will be adjusted automatically</p>
                  <p className="text-[14px] leading-[20px]">Any excess products will be hidden (not deleted)</p>
                  <p className="text-[14px] leading-[20px]">User can upgrade again at any time</p>
                </div>
              </div>
              {plan === "Free" &&
                <div className="bg-[#FEF2F2] border border-[#FFC9C9] p-[17px] flex gap-3 rounded-[10px] mt-[16px]">
                    <Icon icon="lucide:triangle-alert" className="h-5 w-5 shrink-0 text-[#82181A]"/>
                    <div className="text-[#82181A] text-[14px] leading-[20px]">
                        <p className="font-medium pb-[4px]">Warning: Downgrade to Free Plan</p>
                        <p>User will lose access to all premium features including AI tools, advanced analytics, and priority support. Stores with more than 10 products will have excess products automatically hidden.</p>
                    </div>
                </div>
              }
    
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
                 onClick={handleChangePlan}
                 disabled={!plan || submitting}
                className={`rounded-[10px] w-1/2 p-3 text-[16px] font-medium text-white transition hover:opacity-95"
                    ${
                  plan.trim()
                    ? "bg-[#B45309] hover:opacity-95"
                    : "bg-[#B45309] opacity-50 cursor-not-allowed"
                }
            `}
              >
                {submitting ? "Downgrading": "Confirm Downgrade"}
              </button>
            </footer>
          </div>
        </div>
      );
}