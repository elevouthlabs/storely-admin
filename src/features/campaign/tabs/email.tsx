
export const Email = () => {
    return (
        <div className="flex flex-col gap-[16px] ">
            <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#47444B] font-medium">Subject Line</label>
                <input type="text" className="border border-[#CAD5E2] py-1.5 px-2 rounded-[10px] placeholder:text-[#0A0A0A80] focus:outline-none"
                    placeholder="Email subject" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#47444B] font-medium">Preview Text</label>
                <input type="text"
                    className="border border-[#CAD5E2] py-1.5 px-2 rounded-[10px] placeholder:text-[#0A0A0A80] focus:outline-none"
                    placeholder="Preview text shown in inbox" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#47444B] font-medium">Sender Name</label>
                <input type="text"
                    className="border border-[#CAD5E2] py-1.5 px-2 rounded-[10px] placeholder:text-[#0A0A0A80] focus:outline-none"
                    value="Storely Team" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#47444B] font-medium">Email Body</label>
                <textarea 
                className="border border-[#CAD5E2] py-1.5 px-2 rounded-[10px] placeholder:text-[#0A0A0A80] focus:outline-none min-h-[90px]"
                placeholder="Email content" />
            </div>
        </div>
    
    )
}