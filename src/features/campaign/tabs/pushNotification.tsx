

export const PushNotification = () => {
    return (
          <>
            <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#47444B] font-medium">Title</label>
                <input type="text" className="border border-[#CAD5E2] py-1.5 px-2 rounded-[10px] placeholder:text-[#0A0A0A80] focus:outline-none"
                    placeholder="Enter push notification content" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#47444B] font-medium">Body</label>
                <textarea 
                className="border border-[#CAD5E2] py-1.5 px-2 rounded-[10px] placeholder:text-[#0A0A0A80] focus:outline-none min-h-[90px]"
                placeholder="Enter push notification content" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#47444B] font-medium">Deep Link URL (Optional)</label>
                <input type="text"
                    className="border border-[#CAD5E2] py-1.5 px-2 rounded-[10px] placeholder:text-[#0A0A0A80] focus:outline-none"
                    placeholder="storely://screen/name" />
            </div>
          </>
    )
}