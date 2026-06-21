import { useState } from "react";

type Next = {
  goToNext: () => void;
};

type SendOption = "now" | "later";

export const FinalReview = ({ goToNext }: Next) => {
  const [sendOption, setSendOption] = useState<SendOption>("now");

  return (
    <div className="p-[24px] bg-[#ffffff] rounded-[10px] w-full max-w-[768px] mx-auto">
      <h3 className="font-semibold text-[18px] text-[#47444B]">Final Review & Send</h3>

      <div className="bg-[#f8fafc] p-[16px] rounded-[10px] mt-4">
        <h4 className="font-semibold mb-4 text-[18px] text-[#47444B]">Campaign Summary</h4>

        <div className="flex mb-4">
          <div className="w-1/2">
            <p className="text-[14x] text-[#6A7282]">Name</p>
            <p className="text-[14px] text-[#47444B]">Untitled Campaign</p>
          </div>

          <div className="w-1/2">
            <p className="text-[14x] text-[#6A7282]">Channel</p>
            <p className="text-[14px] text-[#47444B]">Push</p>
          </div>
        </div>

        <div className="flex">
          <div className="w-1/2">
            <p className="text-[14x] text-[#6A7282]">Audience Size</p>
            <p className="text-[14px] text-[#47444B]">1,847 stores</p>
          </div>

          <div className="w-1/2">
            <p className="text-[14x] text-[#6A7282]">Estimated Delivery</p>
            <p className="text-[14px] text-[#47444B]">~15 minutes</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-[14px] text-[#47444B] py-4">Send Options</h4>

        <div
          onClick={() => setSendOption("now")}
          className={`p-[16px] rounded-[10px] flex gap-4 items-center cursor-pointer transition-colors
            ${
              sendOption === "now"
                ? "bg-gradient-to-r from-[#4B00821A] via-[#8A2BE20D] to-[#8A2BE20D]"
                : "border border-[#EFE6FD]"
            }`}
        >
          <div
            className={`w-5 h-5 rounded-full relative flex items-center justify-center
              ${
                sendOption === "now"
                  ? "bg-[#4b0082]"
                  : "border border-slate-400"
              }`}
          >
            {sendOption === "now" && (
              <span className="w-2 h-2 rounded-full bg-white"></span>
            )}
          </div>

          <div>
            <p className="font-medium text-[16px] text-[#47444B]">Send Now</p>
            <p className="font-medium text-[14px] text-[#6A7282]">Campaign will be sent immediately</p>
          </div>
        </div>

        <div
          onClick={() => setSendOption("later")}
          className={`p-[16px] rounded-[10px] flex gap-4 items-center mt-4 cursor-pointer transition-colors
            ${
              sendOption === "later"
                ? "bg-gradient-to-r from-[#4B00821A] via-[#8A2BE20D] to-[#8A2BE20D]"
                : "border-2 border-[#EFE6FD]"
            }`}
        >
          <div
            className={`w-5 h-5 rounded-full relative flex items-center justify-center
              ${
                sendOption === "later"
                  ? "bg-[#4b0082]"
                  : "border border-[#EFE6FD]"
              }`}
          >
            {sendOption === "later" && (
              <span className="w-2 h-2 rounded-full bg-white"></span>
            )}
          </div>

          <div>
            <p className="font-medium text-[16px] text-[#47444B]">Schedule for Later</p>
            <p className="font-medium text-[14px] text-[#6A7282]">Choose a specific date and time</p>
          </div>
        </div>

        {sendOption === "later" && (
          <div className="pt-4">
            <div className="flex gap-4">
              <div className="flex flex-col w-1/2">
                <label className="mb-1 text-sm">Date</label>
                <input
                  type="date"
                  className="border border-slate-300 bg-[#f5f5f5] rounded-[8px] px-3 py-3"
                />
              </div>

              <div className="flex flex-col w-1/2">
                <label className="mb-1 text-sm">Time</label>
                <input
                  type="time"
                  className="border border-slate-300 bg-[#f5f5f5]  rounded-[8px] px-3 py-3"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-[#fff7ed] p-[17px] rounded-[10px] my-4">
        <h3 className="font-semibold text-[#b45302] mb-4 text-[16px]">
          Final Checklist
        </h3>

        <div className="font-medium text-[#b45302] px-5 flex flex-col gap-3">
          <p className="font-medium text-[#b45302] text-[14px]">I have reviewed the message content and it is accurate</p>
          <p className="font-medium text-[#b45302] text-[14px]">I have verified the target audience is correct</p>
          <p className="font-medium text-[#b45302] text-[14px]">I understand this action cannot be undone once sent</p>
        </div>
      </div>

      <div className="bg-[#f8fafc] p-[16px] rounded-[10px] flex justify-between">
        <div>
          <p className="text-[14px] text-[#6A7282]">Estimated Cost</p>
          <p className="text-[12px] text-[#6A7282]">No additional charges for this campaign</p>
        </div>

        <p className="text-[#47444B] text-[16px] font-bold">$0.00</p>
      </div>

      <div className="flex justify-between pt-5">
        <div className="flex gap-4">
          <button
            type="button"
            className="border px-5 py-2 rounded-[10px] text-[16px] font-medium text-[#28272A]"
          >
            ← Back
          </button>

          <button
            type="button"
            className="border px-5 py-2 rounded-[10px] text-[16px] font-medium text-[#28272A]"
          >
            Save as Draft
          </button>
        </div>

        <button
          type="button"
          onClick={goToNext}
          className="bg-[#4b0082] px-5 py-2 rounded-[10px] text-white text-[18px] font-semibold"
        >Send Now
        </button>
      </div>
    </div>
  );
};