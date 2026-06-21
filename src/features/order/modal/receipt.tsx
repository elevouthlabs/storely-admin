import { Icon } from "@iconify/react"

export const Receipt =()=>{
    return(
        <div className="p-[24px] bg-white rounded-[10px] max-w-[672px] mx-auto">
            <h2 className="text-[#47444B] border-[#E2E8F0]
            text-[20px] leading-[28px] font-semibold border-b pb-[24px]">
                Order Receipt
            </h2>
            <div className="flex flex-col gap-[8px] text-center py-[25px] border-b border-[#E2E8F0]">
                <h2 className="text-[#47444B] text-[24px] leading-[32px] font-bold">Storely</h2>
                <p className="text-[#6A7282] text-[14px] leading-[20px]">Official Order Receipt</p>
            </div>
            <div className="border-b border-[#E2E8F0] py-[25px] flex flex-col gap-[16px]">
                <div className="flex justify-center gap-[16px]">
                    <div className="w-1/2">
                        <p className="text-[#6A7282] text-[14px] leading-[20px] mb-[4px]">Order ID</p>
                        <h2 className="text-[#47444B] text-[16px] leading-[24px] font-medium">ORD-4818</h2>
                    </div>
                    <div className="w-1/2">
                        <p className="text-[#6A7282] text-[14px] leading-[20px] mb-[4px]">Order Date</p>
                        <h2 className="text-[#47444B] text-[16px] leading-[24px] font-medium">Apr 17, 2026 09:20</h2>
                    </div>
                </div>
                <div className="flex justify-center gap-[16px]">
                    <div className="w-1/2">
                        <p className="text-[#6A7282] text-[14px] leading-[20px] mb-[4px]">Status</p>
                        <h2 className="text-[#47444B] text-[16px] leading-[24px] font-medium">Disputed</h2>
                    </div>
                    <div className="w-1/2">
                        <p className="text-[#6A7282] text-[14px] leading-[20px] mb-[4px]">Payment Method</p>
                        <h2 className="text-[#47444B] text-[16px] leading-[24px] font-medium">Paystack</h2>
                    </div>
                </div>
            </div>
            <div className="flex justify-between py-[25px] border-b border-[#E2E8F0]">
                <div className="w-1/2">
                    <h2 className="text-[#47444B] text-[16px] leading-[24px] font-semibold mb-4">Buyer Information</h2>
                    <div className="flex flex-col gap-[4px] pb-[8px] w-1/2">
                        <p className="text-[#47444B] text-[14px] leading-[20px]">Tunde Adeyemi</p>
                        <p className="text-[#6A7282] text-[14px] leading-[20px]">tunde@email.com</p>
                        <p className="text-[#6A7282] text-[14px] leading-[20px]">+234 804 567 8901</p>
                    </div>
                    <p className="text-[#6A7282] text-[14px] leading-[20px]">42 Allen Avenue, Ikeja, Lagos</p>
                </div>
                <div className="w-1/2">
                    <h2 className="text-[#47444B] text-[16px] leading-[24px] font-semibold mb-4">Seller Information</h2>
                    <p className="text-[#6A7282] text-[14px] leading-[20px] pb-[4px]">Home Essentials</p>
                    <p className="text-[#6A7282] text-[14px] leading-[20px]">@homeessentials</p>
                </div>
            </div>
            <div>
                <h2 className="pb-[14px] pt-[22px]">Order Items</h2>
                <div className="w-full border-b border-[#E2E8F0] pb-[25px]">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr>
                            <th className="py-[8px] text-left
                            text-[14px] leading-[20px] text-[#6A7282] font-bold
                            ">Item</th>
                            <th className="py-[8px] text-center
                            text-[14px] leading-[20px] text-[#6A7282] font-bold
                            ">Qty</th>
                            <th className="py-[8px] text-right
                            text-[14px] leading-[20px] text-[#6A7282] font-bold
                            ">Price</th>
                            <th className="py-[8px]  text-right
                            text-[14px] leading-[20px] text-[#6A7282] font-bold
                            ">Total</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr className="border-t border-b border-[#F1F5F9]">
                            <td className="py-[12px] text-[#47444B] text-[14px] leading-[20px]">Premium Bedding Set</td>
                            <td className="py-[12px] text-[#47444B] text-[14px] leading-[20px] text-center">1</td>
                            <td className="py-[12px] text-[#47444B] text-[14px] leading-[20px] text-right">₦67,300</td>
                            <td className="py-[12px] text-[#47444B] text-[14px] leading-[20px] text-right">₦67,300</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between border-b border-[E2E8F0] pt-[24px] pb-[8px]">
                    <div className="flex flex-col gap-3">
                        <p className="text-[#6A7282] text-[14px] leading-[20px]">Subtotal</p>
                        <p className="text-[#6A7282] text-[14px] leading-[20px]">Delivery Fee</p>
                        <p className="text-[#00A63E] text-[14px] leading-[20px]">Discount</p>
                    </div>
                    <div className="text-right flex flex-col gap-3">
                        <p className="text-[#6A7282] text-[14px] leading-[20px]">₦67,300</p>
                        <p className="text-[#6A7282] text-[14px] leading-[20px]">₦3000</p>
                        <p className="text-[#00A63E] text-[14px] leading-[20px]">-₦3000</p>
                    </div>
                </div>
                <div className="flex justify-between pt-[12px] pb-[25px]">
                    <p className="text-[#47444B] text-[18px] leading-[28px] font-bold">Total Amount</p>
                    <p className="text-[#47444B] text-[18px] leading-[28px] font-bold">₦67300</p>
                </div>
            </div>
            <p className="border-t border-[#E2E8F0] text-[#6A7282]
             pt-[25px] text-[14px] leading-[20px]">Transaction ID: 
                <span>PAY-6644DE2F</span></p>
            <div className="bg-[#FEF2F2] border flex gap-[8px]
             border-[#FFC9C9] p-[17px] rounded-[10px] my-[24px]">
                 <Icon icon="lucide:triangle-alert" className="h-5 w-5 shrink-0 text-[#9F0712]"/>
                <div>
                   <p className="text-[#82181A] text-[14px] leading-[20px] font-medium mb-[4px]">
                    Dispute Active</p>
                    <p className="text-[#9F0712] text-[14px] leading-[20px]">Reason: Product not as described</p>
                    <p className="text-[#9F0712] text-[14px] leading-[20px]">Opened: Apr 19, 2026</p>
                </div>
            </div>
            <div className="text-center border-t border-[#E2E8F0] pt-[25px] text-[#62748E]">
                <p className="text-[12px] leading-[16px]">This is an official receipt from Storely</p>
                <p className="text-[12px] leading-[16px]">Generated on 4/21/2026 at 4:03:17 PM</p>
            </div>
             <footer className="flex items-center gap-2 mt-[24px]">
              <button
                type="button"
                className="rounded-[10px] border border-[#CAD5E2] w-1/2 p-3 text-[16px] font-medium text-[#47444B] hover:bg-slate-50"
              >
                Close
              </button>
               <button
                type="button"
                className="rounded-[10px] border border-[#CAD5E2] w-1/2 p-3 text-[16px] font-medium text-[#47444B] hover:bg-slate-50"
              >
                Print
              </button>
              <button
                type="button"
                className={`rounded-[10px] w-1/2 p-3 bg-[#4B0082] text-[16px] font-medium text-white transition hover:opacity-95" 
             `}
              >
                Download PDF
              </button>
            </footer>

        </div>

    )
}