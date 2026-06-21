

export const Product = ()=>{
    return(
        <div className="bg-white w-full max-w-[896px] ml-5 rounded-[10px] p-[24px] overflow-y-scrollscroll">
            <div className="flex justify-between border-b pb-6">
                <div>
                    <h2 className="font-semibold text-[18px] text-[#0F172B]">April Product Updates</h2>
                    <p className="text-[#45556C]">Campaign Details</p>
                </div>
                &times;
            </div>
            <div className="my-4 grid grid-cols-4 gap-4">
                <div className="bg-[#f8fafc] rounded-[10px] p-[16px] mb-2">
                    <p className="text-[#6a7282]">Type</p>
                    <p className="bg-[#efecfd] w-fit px-[8px] rounded-[4px] py-1">Email</p>
                </div>
                <div className="bg-[#f8fafc] rounded-[10px] p-[16px] mb-2">
                    <p className="text-[#6a7282]">Status</p>
                    <p className="bg-[#e8efe9] w-fit px-[8px] py-1 rounded-[4px]">Sent</p>
                </div>
                <div className="bg-[#f8fafc] rounded-[10px] p-[16px]">
                    <p className="text-[#6a7282]">Audience Size</p>
                    <p className="font-bold">1247</p>
                </div>
                <div className="bg-[#f8fafc] rounded-[10px] p-[16px]">
                    <p className="text-[#6a7282]">Sent Date</p>
                    <p className="font-medium">Apr 15, 2026</p>
                </div>
            </div>
            <div >
                <h2 className="text-[#47444b]">Performance</h2>
                <div className="my-4 grid grid-cols-4 gap-4">
                    <div className="border border-slate-400 rounded-[10px] p-[16px] flex flex-col gap-1">
                        <p className="text-[#6a7282] text-[14px]">Delivered</p>
                        <h3 className="text-[#47444b] font-bold text-[24px]">1247</h3>
                        <p className="text-[#1b5e20]">100% delivery rate</p>
                    </div>
                    <div className="border border-slate-400 rounded-[10px] p-[16px] flex flex-col gap-1">
                        <p className="text-[#6a7282] text-[14px]">Opened</p>
                        <h3 className="text-[#47444b] font-bold text-[24px]">527</h3>
                        <p className="text-[#4b0082]">42.3% open rate</p>
                    </div>
                    <div className="border border-slate-400 rounded-[10px] p-[16px] flex flex-col gap-1">
                        <p className="text-[#6a7282] text-[14px]">Clicked</p>
                        <h3 className="text-[#47444b] font-bold text-[24px]">158</h3>
                        <p className="text-[#9810FA]">12.7% click rate</p>
                    </div>
                    <div className="border border-slate-400 rounded-[10px] p-[16px] flex flex-col gap-1">
                        <p className="text-[#6a7282] text-[14px]">Conversions</p>
                        <h3 className="text-[#47444b] font-bold text-[24px]">79</h3>
                        <p className="text-[#1b5e20]">6.3% conversion</p>
                    </div>
                </div>
            </div>
            <div className="my-4">
                <h3 className="mb-4 text-[#47444b]">Message Content</h3>
                <div className="bg-[#f8fafc] p-[24px] !pl-[35px] rounded-[10px]">
                    <div className="w-[448px] h-[120px] rounded-[10px] overflow-hidden flex flex-col">
                        <div className="bg-[#47444b] h-1/2 flex-1 text-white p-[10px]">
                            <h3 className="text-[14px]">April Product Updates</h3>
                            <p className="text-[12px]">Preview text here...</p>
                        </div>
                        <p className=" bg-[#fff] h-1/2 p-[10px] text-[12px] text-[#47444b]">Email body content preview...</p>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-[#47444b]">Audience Targeting</h3>
                <div className="bg-[#f8fafc] flex gap-4 justify-between rounded-[10px] p-4">
                    <div>
                        <p className="text-[#6a7282] text-[14px]">Plan Tiers</p>
                        <p className="text-[#47444b] text-[14px]">All tiers</p>
                    </div>
                    <div>
                        <p className="text-[#6a7282] text-[14px]">Categories</p>
                        <p className="text-[#47444b] text-[14px]">All categories</p>
                    </div>
                    <div>
                        <p className="text-[#6a7282] text-[14px]">Locations</p>
                        <p className="text-[#47444b] text-[14px]">All states</p>
                    </div>
                    <div>
                        <p className="text-[#6a7282] text-[14px]">Activity</p>
                        <p className="text-[#47444b] text-[14px]">Active stores</p>
                    </div>
                </div>
            </div>
        </div>
    )
}