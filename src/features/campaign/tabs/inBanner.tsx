import { useState } from "react"

export const InBanner = () => {
    return (
       <div className="flex flex-col gap-[16px] ">
            <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#47444B] font-medium">Headline</label>
                <input type="text" className="border border-[#CAD5E2] py-1.5 px-2 rounded-[10px] placeholder:text-[#0A0A0A80] focus:outline-none"
                    placeholder="Banner Headline" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#47444B] font-medium">Body</label>
                <textarea 
                className="border border-[#CAD5E2] py-1.5 px-2 rounded-[10px] placeholder:text-[#0A0A0A80] focus:outline-none min-h-[90px]"
                placeholder="Banner Message" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#47444B] font-medium">CTA Button Label</label>
                <input type="text"
                    className="border border-[#CAD5E2] py-1.5 px-2 rounded-[10px] placeholder:text-[#0A0A0A80] focus:outline-none"
                    placeholder="eg., Learn More" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#47444B] font-medium">CTA URL</label>
                <input type="text"
                    className="border border-[#CAD5E2] py-1.5 px-2 rounded-[10px] placeholder:text-[#0A0A0A80] focus:outline-none"
                    placeholder="storely://screen/name" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#47444B] font-medium">Display Duration</label>
                <input type="text"
                    className="border border-[#CAD5E2] py-1.5 px-2 rounded-[10px] placeholder:text-[#0A0A0A80] focus:outline-none"
                    />
            </div>
          
        </div>
    )
}