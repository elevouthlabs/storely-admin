import { useState } from "react";
import {Email }from "./email";
import {InBanner} from "./inBanner";
import {PushNotification} from "./pushNotification";

type Next = {
  goToNext: () => void;
};
export const PushNot =({ goToNext }: Next) => {
    const [activeTab, setActiveTab] = useState("Push Notification");
    const activeTabClasses = "border-b-2 text-[#4b0082] border-[#4b0082]";
    const inactiveTabClasses = "text-[#6A7282] hover:text-slate-700";
    return (
     <section className="min-h-full space-y-4 pb-10 md:pb-15">
        <div className="bg-white p-4 flex flex-col">
            <div>
                <h3 className="font-semibold text-[18px] text-[#47444B]">Compose your Message</h3>
                <div className="flex items-center gap-4 pt-5 border-b border-slate-200 cursor-pointer">
                    <p 
                    className={`pb-2 font-medium text-[16px] ${activeTab === "Push Notification" ? activeTabClasses : inactiveTabClasses}`}
                    onClick={() => setActiveTab("Push Notification")}
                    >Push Notification</p>
                    <p 
                     className={`pb-2 font-medium text-[16px] px-4 ${activeTab === "Email" ? activeTabClasses : inactiveTabClasses}`}
                    onClick={() => setActiveTab("Email")}
                    >Email</p>
                    <p 
                    className={`pb-2 font-medium text-[16px] px-4 ${activeTab === "In-app Banner" ? activeTabClasses : inactiveTabClasses}`}
                    onClick={() => setActiveTab("In-app Banner")}
                    >In-app Banner</p>
                </div>
            </div>
            <div className="flex flex-col gap-[16px] pt-4">
                {activeTab === "Push Notification" && <PushNotification />}
                {activeTab === "Email" && <Email />}
                {activeTab === "In-app Banner" && <InBanner />}
            </div>
            <div className="flex justify-between items-center pt-4 gap-4 mt-7 border-t border-slate-200">
                <div className="flex items-center gap-4">
                    <button type="button" className="text-[#28272a] border border-[#cad5e2] text-[16px] py-2 px-4 rounded-[10px]">
                        Use Template
                    </button>
                    <button type="button" className="text-[#28272a] border border-[#cad5e2] text-[16px] py-2 px-4 rounded-[10px]">
                        Save Draft
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <button type="button" className="text-[#28272a] border border-[#cad5e2] text-[16px] py-2 px-4 rounded-[10px]">
                        Back
                    </button>
                    <button type="button" 
                    onClick={goToNext}
                    className="bg-[#4b0082] text-white hover:bg-[#3a0066] py-2 px-4 rounded-[10px] text-[16px]">
                        Continue to Preview
                    </button>
                </div>
            </div>
        </div>
      </section>
    )
}