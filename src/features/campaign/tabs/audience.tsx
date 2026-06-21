type Next = {
  goToNext: () => void;
};

export const Audience =({ goToNext }: Next)=>{
    return(
      <div className="grid gap-4 md:grid-cols-5 items-start">
        <div className="bg-white rounded-[10px] p-[16px] shadow-sm md:col-span-3">
            <h3 className="mb-6 text-[#000000] text-[20px] font-medium">Filter your audience</h3>
            <div className="grid md:grid-cols-2 gap-4">
               <div className="flex flex-col gap-2">
                 <label className="text-[16px] text-[#47444B] font-medium">All Plan</label>
                <p className="p-[10px] bg-[#f5f5f5] rounded-[8px] text-[16px] text-[#6B7280]">All Plans</p>
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-[16px] text-[#47444B] font-medium">All Categories</label>
                <p className="p-[10px] bg-[#f5f5f5] rounded-[8px] text-[16px] text-[#6B7280]">All Categories</p>
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-[16px] text-[#47444B] font-medium">All State</label>
                <p className="p-[10px] bg-[#f5f5f5] rounded-[8px] text-[16px] text-[#6B7280]">All States</p>
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-[16px] text-[#47444B] font-medium">Activity</label>
                <p className="p-[10px] bg-[#f5f5f5] rounded-[8px] text-[16px] text-[#6B7280]">Active</p>
               </div>
            </div>
        </div>
          <div className="bg-white rounded-[10px] p-[16px] shadow-sm md:col-span-2">
          <h3 className="text-[#47444B] text-[18px] font-semibold">Estimated Audience</h3>
          <div className="flex flex-col text-center py-8">
            <h2 className="text-[#4b0082] font-bold text-[48px]">1,847</h2>
            <p className="text-[14px] text-[#6A7282]">Store will receive this campaign</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <p className="text-[#6A7282] text-[14px]">Plan Tier</p>
                <p className="text-[#47444B] text-[14px] font-medium">All</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-[#6A7282] text-[14px]">Categories</p>
                <p className="text-[#47444B] text-[14px] font-medium">All</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-[#6A7282] text-[14px]">Locations</p>
                <p className="text-[#47444B] text-[14px] font-medium">All</p>
            </div>
            <button
            onClick={goToNext}
            className=" rounded-[10px] px-3 py-3 text-[16px] font-medium text-white shadow-sm hover:opacity-95 bg-[#4b0082]">
              Continue to Message →
            </button>
          </div>
        </div>
    
      </div>
    )
}