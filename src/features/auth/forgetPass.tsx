import { Icon } from "@iconify/react"
import { useNavigate } from "react-router-dom"
import { useForgotPassword } from "../../hook/useForgotPassword";
import { forgotPassword } from "../../features/auth/authSlice";
import { useState } from "react";


export const ForgetPass = ()=>{
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const { sendResetLink, isLoading, error } =
    useForgotPassword();

    const handleSubmit = async () => {
        const result = await sendResetLink(email);

        if (forgotPassword.fulfilled.match(result)) {
        navigate("/admin-login");
        }
    };
    return(
        <div className="flex justify-center h-screen pt-10 items-start bg-[#f5f5f5]">
            <div className="bg-[#fff] w-[448px] max-w-lg h-auto px-10 py-12 rounded-[10px] ">
                 <button onClick={()=> navigate('/admin-login')}
                 className="mb-[24px] flex items-center gap-2 text-[#6A7282] text-[14px] hover:text-gray-800 transition-colors bg-transparent border-none cursor-pointer">
                    <Icon icon="lucide:arrow-left" width="16" height="16" />
                    Back to login
                </button>
                <div className="h-[48px] w-[48px] mb-[16px] rounded-full flex justify-center items-center bg-[#EFE6FD]">
                    <Icon icon="lucide:mail" className="h-[24px] w-[24px] text-[#4B0082]"/>
                </div>
                <div className="flex flex-col gap-[8px] mb-[32px]">
                    <h3 className="text-[#47444B] text-[24px] leading-[32px] font-bold">Forgot password?</h3>
                    <p className="text-[#6A7282] text-[16px] leading-[24px]">No worries! Enter your email address and we'll send you a link to reset your password.</p>
                </div>
                <div>
                    <label className="text-[#364153] text-[14px] leading-[20px] mb-0.5">Email address</label>
                    <input 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                    type="text" 
                    className="placeholder:text-[#0A0A0A80] text-[16px]
                     w-full border border-[#D1D5DC] px-[16px] py-[10px] rounded-[10px]"
                    placeholder="admin@storely.com" />
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-[#4B0082] w-full text-white py-2 mt-4 rounded-[10px]"
                    >
                    {isLoading
                        ? "Sending..."
                        : "Send reset link"}
                </button>
            </div>
        </div>
    )
}