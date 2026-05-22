import { GeneralTab } from "./tabs/general";
import { useState } from "react";
import { CommissionRates } from "./tabs/commissionRates";
import { MaintenanceMode } from "./tabs/maintenanceMode";
import { PaymentGateway } from "./tabs/paymentGateway";
import { FeatureFlags } from "./tabs/featureFlags";
import { Link } from "react-router-dom";
import {Icon} from "@iconify/react";


type SettingsItem = {
  label: string;
  icon: string;
};

const settings: SettingsItem[] = [
  { label: "General", icon: "lucide:settings" },
  { label: "Payment Gateway", icon: "lucide:shield" },
  { label: "Feature Flags", icon: "lucide:toggle-right" },
  { label: "Onboarding", icon: "lucide:users" },
  { label: "Commission Rates", icon: "lucide:file-text" },
  { label: "Maintenance Mode", icon: "lucide:circle-alert" },
];

export const PlatformSettings = ()=> {
  const [activeTab, setActiveTab] = useState("General")
 return (
    <section className="space-y-4">
      <header>
        <div className="mb-4 flex items-center justify-between">
          <nav className="text-[12px] text-slate-500" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link to="/dashboard/settings" className="hover:text-slate-700">
                   Infrastructure
                </Link>
              </li>
              <li className="px-0.5 text-slate-400" aria-hidden="true">
                /
              </li>
              <li className="font-medium text-slate-600">{activeTab}</li>
            </ol>
          </nav>
          <button
            type="button"
            className="rounded-lg bg-[#4f1d95] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#40167a]"
          >
            Save Changes
          </button>
        </div>
        <h1 className="text-[30px] font-semibold leading-8 text-slate-900">Platform Settings</h1>
        <p className="mt-1 text-xs text-slate-500">Global configuration affeccting all SMEs and customers</p>
      </header>

        <div className="grid gap-4 lg:grid-cols-[356px_1fr]">
        <aside className="h-fit rounded-xl border border-[#e9e9ec] bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <div className="space-y-1">
            {settings.map((tab) => {
              const isActive = activeTab === tab.label;
              return (
              <button
                type="button"
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-xs transition ${
                  isActive ? "bg-[#f4ecff] text-[#6d28d9]" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon icon={tab.icon} 
                  className={`h-4 w-4 ${
                  isActive ? "text-[#6d28d9]" : "text-slate-500"
                }`} />
                <span>{tab.label}</span>
              </button>
            )})}
          </div>
        </aside>

          {/* Form Card */}
          <div className="flex-1 bg-white rounded-xl p-6 shadow-md">
            {/* <h3 className="font-semibold mb-4">{activeTab}</h3> */}

            {activeTab === 'General' && (
              <GeneralTab/>
            )}
            {activeTab === 'Payment Gateway' && (
              <PaymentGateway/>
            )}
            {activeTab === 'Feature Flags' && (
              <FeatureFlags/>
            )}
            {activeTab === 'Onboarding' && (
              <GeneralTab/>
            )}
            {activeTab === 'Commission Rates' && (
              <CommissionRates/>
            )}
            {activeTab === 'Maintenance Mode' && (
              <MaintenanceMode/>
            )}
        
          </div>
    
        </div>


    </section>
  );
};

