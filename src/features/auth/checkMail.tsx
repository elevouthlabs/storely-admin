import { Icon } from "@iconify/react"
import { useNavigate } from "react-router-dom"


export const CheckMail = ()=>{
    const navigate = useNavigate()
    return(
        <div className="flex justify-center items-start h-screen pt-10 bg-[#f5f5f5]">
            <div className="bg-[#fff] w-[448px] max-w-lg h-auto px-10 py-12 rounded-[10px] text-center">
                <div className="h-[64px] w-[64px] mb-[16px] mx-auto rounded-full flex justify-center items-center bg-[#E8EFE9]">
                    <Icon icon="lucide:circle-check-big" className="h-[32px] w-[32px] text-[#1B5E20]"/>
                </div>
                <div className="flex flex-col gap-[8px] mb-[32px]">
                    <h3 className="text-[#47444B] text-[24px] leading-[32px] font-bold">Check your email</h3>
                    <p className="text-[#4A5565] text-[16px] leading-[24px]">We've sent a password reset link to<br/>
                    <span className="text-[#4A5565] font-semibold text-[16px] leading-[24px]">dafizzy92@gmail.com</span>
                    </p>
                </div>
                <div className="bg-[#F3EAFC80] border border-[#4B0082] p-[17px] rounded-[10px] mb-[22px]">
                   <p className="text-[#4B0082] text-[14px] leading-[20px]">Didn't receive the email? Check your spam folder or wait a few minutes and try again.</p> 
                </div>
                <p onClick={()=> navigate('/admin-login')}
                className="text-[#4B0082] text-[16px] leading-[24px] font-medium flex items-center justify-center gap-1">
                    <span><Icon icon="lucide:arrow-left" width="16" height="16" /></span>
                    Back to login</p>
            </div>
        </div>
    )
}