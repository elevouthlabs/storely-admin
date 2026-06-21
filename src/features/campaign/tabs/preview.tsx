import { Icon } from "@iconify/react";
type Next = {
  goToNext: () => void;
};
export const Preview = ({ goToNext }: Next) => {
    return (
        <div className="grid grid-cols-5 gap-4 items-start pb-10">
            <div className="col-span-3">
                <div className="bg-white px-4 py-5 rounded-lg flex flex-col gap-4 mb-[20px]">
                    <h3 className="text-[18px] text-[#0F172B] font-semibold">Preview</h3>
                    <div className="bg-[#f1f5f9] flex items-center justify-center py-5 rounded-[10px]">
                        <div className="bg-white p-4 rounded-[16px] w-[350px] flex gap-4 border-t-[25px] border-[#0F172B]">
                            <div className="bg-[#4b0082] flex justify-center items-center text-white font-bold w-[80px] h-[40px] rounded-[10px]">S</div>
                            <div>
                                <p className="text-[14px] text-[#0F172B] font-semibold">🔥 Flash Sale! Up to 50% Off</p>
                                <p className="text-[14px] text-[#45556C]">Limited time only! Shop now and save big on your favorite products.</p>
                                <p className="text-[12px] text-[#90A1B9]">now</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white py-[25px] px-[25px] rounded-[10px] flex flex-col gap-4">
                    <h3 className="text-[18px] text-[#0F172B] font-semibold">Audience</h3>
                    <div>
                        <p className="text-[14px] font-bold text-[#0A0A0A] inline">1,847</p> <span className="text-[14px] text-[#0A0A0A]">recipients</span>
                        <p className="text-[#45556C] text-[14px]">1,847 Push notifications</p>
                    </div>
                </div>
            </div>
            <div className="col-span-2 ">
                <div className="px-4 py-5 bg-white rounded-[10px]">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[18px] text-[#0F172B] font-semibold">NDPA Compliance Check</h3>
                        <span className="bg-[#DCFCE7] px-4 py-1 rounded-full text-[14px] font-medium text-[#1B5E20]">pass</span>
                    </div>
                   <div className="flex flex-col gap-3 pt-4">
                     <div className="bg-[#f0fdf4] p-[12px] rounded-[10px] flex gap-4">
                        <Icon
                            icon="lucide:circle-check-big"
                            className="h-[18px] w-[18px] text-[#0d542b] mt-[6px]"
                        />
                        <div>
                            <h3 className="text-[#0d542b] font-medium text-[14px]">Unsubscribe mechanism present</h3>
                            <p className="text-[#1b5e20] text-[12px]">Footer includes opt-out link</p>
                        </div>
                     </div>
                     <div className="bg-[#f0fdf4] p-[12px] rounded-[10px] flex gap-4">
                         <Icon
                            icon="lucide:circle-check-big"
                            className="h-[18px] w-[18px] text-[#0d542b] mt-[6px]"
                        />
                        <div>
                            <h3 className="text-[#0d542b] font-medium text-[14px]">Sender clearly identified</h3>
                            <p className="text-[#1b5e20] text-[12px]">Storely branding visible</p>
                        </div>
                     </div>
                     <div className="bg-[#f0fdf4] p-[12px] rounded-[10px] flex gap-4">
                         <Icon
                            icon="lucide:circle-check-big"
                            className="h-[18px] w-[18px] text-[#0d542b] mt-[6px]"
                        />
                        <div>
                            <h3 className="text-[#0d542b] font-medium text-[14px]">No prohibited language</h3>
                            <p className="text-[#1b5e20] text-[12px]">Content scanned and approved</p>
                        </div>
                     </div>
                     <div className="bg-[#f0fdf4] p-[12px] rounded-[10px] flex gap-4">
                         <Icon
                            icon="lucide:circle-check-big"
                            className="h-[18px] w-[18px] text-[#0d542b] mt-[6px]"
                        />
                        <div>
                            <h3 className="text-[#0d542b] font-medium text-[14px]">Data handling compliant</h3>
                            <p className="text-[#1b5e20] text-[12px]">Privacy policy referenced</p>
                        </div>
                     </div>
                   </div>
                    <p className="text-[#4b0082] pt-4 font-medium text-[14px]">View compliance details</p>
                </div>
                <div className="flex w-full gap-3 pt-7">
                     <button className="border border-[#50525633] rounded-[10px] w-1/2
                     py-[8px] font-medium text-[#28272A] text-[16px]">← Edit Message</button>
                    <button 
                    onClick={goToNext}
                    className="text-white bg-[#4b0082] text-[16px] font-medium
                     rounded-[10px] py-[8px] w-1/2">Continue to Send →</button>
                </div>
            </div>
        </div>
    )
}