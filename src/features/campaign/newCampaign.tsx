import { Audience } from "./tabs/audience";
import { PushNot } from "./tabs/pushNot";
import { Preview } from "./tabs/preview";
import { FinalReview } from "./tabs/finalReview";
import { useState } from "react";


type TabKey = "Audience" | "Message" | "Preview" | "Send";

export const NewCampaign =()=>{
    const [active, setActive] = useState<TabKey>("Audience");
    const [completed, setCompleted] = useState<TabKey[]>([]);

    const steps: TabKey[] = ["Audience", "Message", "Preview", "Send"];

    const handleStepClick = (step: TabKey) => {
      setActive(step);

      const clickedIndex = steps.indexOf(step);

      setCompleted((prev) =>
        prev.filter(
          (completedStep) =>
            steps.indexOf(completedStep) < clickedIndex
        )
      );
    };

    const goToNext = () => {
      if (active === "Audience") {
        setCompleted((prev) => [...prev, "Audience"]);
        setActive("Message");
      }

      if (active === "Message") {
        setCompleted((prev) => [...prev, "Message"]);
        setActive("Preview");
      }

      if (active === "Preview") {
        setCompleted((prev) => [...prev, "Preview"]);
        setActive("Send");
      }
    };

    const isCompleted = (step: TabKey) => completed.includes(step);

    return(
    <section className="min-h-full space-y-4 pb-10 md:pb-15">
      <header className="pb-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-[30px] font-semibold leading-8 text-slate-900">New campaign</h1>
            <p className="mt-1 text-[12px] font-normal leading-5 text-slate-500">
              Reach Storely sellers via push, email or in-app message.
            </p>
          </div>
        </div>
      </header>

      <div className="bg-white rounded-[10px] p-6 shadow-sm flex gap-4">
        <div className="flex items-center gap-3">
            <span onClick={() => handleStepClick("Audience")}
            className={`inline-flex items-center text-[16px] font-semibold justify-center rounded-full h-[40px] w-[40px] cursor-pointer
                ${
                  isCompleted("Audience")
                  ? "bg-[#4b0082] text-white"
                  : "bg-[#e2e8f0] text-[#6A7282]"
                }`}
              >1</span>
            <span className={`font-medium text-[14px]
              ${
                isCompleted("Audience")
                ? "text-[#000]"
                : "text-[#6A7282]"
              }`}>Audience
            </span>
            
            <span className={`inline-flex w-[100px] h-[4px]
              ${
                isCompleted("Audience")
                ? "bg-[#4b0082]"
                : "bg-[#e2e8f0]"
              }`}>
            </span>
        </div>
        <div className="flex items-center gap-3">
            <span onClick={() => handleStepClick("Message")}
            className={`inline-flex items-center text-[16px] font-semibold justify-center rounded-full h-[40px] w-[40px] cursor-pointer
                ${
                   isCompleted("Message")
                    ? "bg-[#4b0082] text-white"
                    : "bg-[#e2e8f0] text-[#6A7282]"
                }`}>2</span>
             <span className={`font-medium  text-[14px]
                ${
                  isCompleted("Message")
                  ? "text-[#000]"
                  : "text-[#6A7282]"
                }`}>Message
            </span>
            <span className={`inline-flex w-[100px] h-[4px]
              ${
                  isCompleted("Message")
                  ? "bg-[#4b0082]"
                  : "bg-[#e2e8f0]"
              }`}>
            </span>
        </div>
        <div className="flex items-center gap-3">
            <span onClick={() => handleStepClick("Preview")}
            className={`inline-flex items-center text-[16px] font-semibold justify-center rounded-full h-[40px] w-[40px] cursor-pointer
                ${
                    isCompleted("Preview")
                    ? "bg-[#4b0082] text-white"
                    : "bg-[#e2e8f0] text-[#6A7282]"
                }`}>3</span>
             <span className={`font-medium text-[14px]
                ${
                  isCompleted("Preview")
                  ? "text-[#000]"
                  : "text-[#6A7282]"
                }`}>Preview
             </span>
             <span className={`inline-flex w-[100px] h-[4px]
                ${
                    isCompleted("Preview")
                    ? "bg-[#4b0082]"
                    : "bg-[#e2e8f0]"
                }`}>
              </span>
        </div>

        <div className="flex items-center gap-3">
            <span onClick={() => handleStepClick("Send")}
            className={`inline-flex items-center text-[16px] font-semibold justify-center rounded-full h-[40px] w-[40px] cursor-pointer
              ${
                  isCompleted("Send")
                  ? "bg-[#4b0082] text-white"
                  : "bg-[#e2e8f0] text-[#6A7282]"
              }`}>4
            </span>
            <span className={`font-medium text-[14px]
                ${
                  isCompleted("Send")
                  ? "text-[#000]"
                  : "text-[#6A7282]"
                }`}>Send
            </span>
        </div>
      </div>
      
      <div>
        {active === "Audience" && <Audience goToNext={goToNext} />}
        {active === "Message" && <PushNot goToNext={goToNext} />}
        {active === "Preview" && <Preview goToNext={goToNext} />}
        {active === "Send" && <FinalReview goToNext={goToNext}/>}
      </div>
    </section>
    )
}