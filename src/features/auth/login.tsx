import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { Icon } from "@iconify/react";
import { login } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../hook/useLogin";

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const { loginUser, isLoading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await loginUser(email, password)

    // const result = await dispatch(login({ email, password }));

    // if (login.fulfilled.match(result)) {
    //     navigate("/admin/otp/verification");
    //   }
    };
  return (
    <>
    <div className="py-10 h-screen bg-[#f5f5f5] flex flex-col items-center justify-center ">
       {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}
      <div className="flex flex-col
        w-[448px] max-w-lg px-10 py-12 mx-auto bg-[#ffffff] rounded-[10px] h-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex items-center mb-[8px]">
              <h3 className="text-[24px] leading-[32px] text-[#47444B] font-bold">Storely</h3>
              <span className="bg-[#EFE6FD] text-[#4B0082] py-[4px] ml-0.5
              px-[8px] rounded-[4px] text-[12px] font-semibold">Admin</span>
            </div>
            <p>Sign in to your admin account</p>
          </div>
          <div className="flex flex-col py-2 mt-[32px]">
            <label className="mb-0.5">Email Address</label>
            <input
            type="email"
            placeholder="admin@storely.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded-[10px]" />
          </div>
          <div className="flex flex-col py-2 relative">
            <label className="mb-0.5">Password</label>
            <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded-[10px] w-full"
            />
             <button
                type="button"
                onClick={() => setshowPassword(prev => !prev)}
                className="absolute right-4 top-[42px]"
              >
                <Icon
                  icon={showPassword ? "lucide:eye" : "lucide:eye-closed"}
                  className="h-5 w-5"
                />
              </button>
          </div>
          <div className="flex justify-between pb-4 pt-1">
            <p className="text-[12px]">Remember this device</p>
            <p className="text-[12px]" onClick={()=>navigate('/admin/forgetpassword')}>forget password</p> 
          </div>
          <button 
          disabled={isLoading}
          className="bg-[#4B0082] text-[16px] w-full p-2 rounded-[10px] font-medium my-2 text-white">
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="flex gap-2 w-full items-start text-[#6A7282] pt-5 border-t border-[#E5E7EB] mt-[24px]">
          <Icon icon="lucide:lock-keyhole" className="h-5 w-5 shrink-0"/>
          <p className="text-[12px]">This portal is for Storely staff only. Unauthorized access attempts are logged and monitored.</p>
        </div>
      </div>
    </div>
   </>
  )
}