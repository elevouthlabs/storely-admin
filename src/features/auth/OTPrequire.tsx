// import { useState, useRef, useEffect } from "react";
// import { Icon } from "@iconify/react";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
// import { verifyOTP } from "../auth/authSlice";

// const OTPVerification = () => {
//   const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
//   const [timer, setTimer] = useState(25);
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
//   const dispatch = useAppDispatch();
//   const pendingUserId = useAppSelector((state) => state.auth.pendingUserId);
//   const pendingEmail = useAppSelector((state) => state.auth.pendingEmail);
//   const { isLoading } = useAppSelector(
//   (state) => state.auth
// );

//   // Countdown timer
//   useEffect(() => {
//     if (timer <= 0) return;
//     const interval = setInterval(() => setTimer((t) => t - 1), 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleChange = (index: number, value: string) => {
//     if (!/^\d*$/.test(value)) return; // numbers only
//     const newOtp = [...otp];
//     newOtp[index] = value.slice(-1); // only last digit
//     setOtp(newOtp);
//     // Auto move to next input
//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handlePaste = (e: React.ClipboardEvent) => {
//     e.preventDefault();
//     const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
//     const newOtp = [...otp];
//     pasted.forEach((char, i) => {
//       if (/^\d$/.test(char)) newOtp[i] = char;
//     });
//     setOtp(newOtp);
//     inputRefs.current[Math.min(pasted.length, 5)]?.focus();
//   };

//   const isComplete = otp.every((d) => d !== "");
//   const navigate = useNavigate()

//   const handleVerify = async () => {
//      if (!pendingUserId) {
//       navigate("/admin-login");
//       return;
//     }
//     const code = otp.join("");

//     const result = await dispatch(
//       verifyOTP({
//         userId: pendingUserId!,
//         otp: code,
//       })
//     );
  
//     if (verifyOTP.fulfilled.match(result)) {
//       navigate("/dashboard");
//     }
//   };

//   useEffect(() => {
//     if (!pendingUserId) {
//       navigate("/admin-login");
//     }
//   }, [pendingUserId, navigate]);

//   return (
//     <div className="h-screen bg-[#f5f5f5] flex py-10 items-center justify-center px-4">
//       <div className="bg-white rounded-2xl h-auto shadow-sm border border-gray-100 w-[448px] max-w-lg px-5 py-12">

//         <button onClick={()=> navigate('/admin-login')}
//         className="mb-[24px] flex items-center gap-2 text-[#6A7282] text-[14px] hover:text-gray-800 transition-colors bg-transparent border-none cursor-pointer">
//           <Icon icon="lucide:arrow-left" width="16" height="16" />
//           Back to login
//         </button>

//         <div className="mb-[32px]">
//           <h1 className="text-[24px] font-bold text-[#47444B] mb-[8px]">
//             Verify your identity
//           </h1>
//           <p className="text-[#6A7282] text-[16px] leading-relaxed">
//             Enter the 6-digit code sent to your {pendingEmail}
//           </p>
//         </div>

//         {/* OTP Inputs */}
//         <div className="flex items-center gap-3 mb-6 justify-center">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               ref={(el) => (inputRefs.current[index] = el)}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               value={digit}
//               onChange={(e) => handleChange(index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(index, e)}
//               onPaste={handlePaste}
//               className={`w-[48px] h-[56px] text-center text-[20px] font-semibold rounded-[10px] outline-none transition-all duration-150
//                 ${
//                   index === 0 && !digit
//                     ? "border-2 border-[#7C3AED] bg-white"
//                     : digit
//                     ? "border-2 border-[#7C3AED] bg-white text-[#0B0B0D]"
//                     : "border border-[#D1D5DC] bg-white text-[#0B0B0D]"
//                 }
//                 focus:border-2 focus:border-[#7C3AED]`}
//             />
//           ))}
//         </div>

//         {/* Timer */}
//         <p className="text-gray-500 text-[14px] mb-6 text-center">
//           Code expires in{" "}
//           <span className="text-[#7C3AED] font-semibold">{timer}s</span>
//         </p>

//         {/* Verify Button */}
//         <button
//            onClick={handleVerify}
//            disabled={!isComplete}
//           className={`w-full py-2 rounded-xl text-[16px] font-semibold transition-colors duration-200 border-none cursor-pointer
//             ${
//               isComplete
//                 ? "bg-[#7C3AED] hover:bg-[#6d28d9] text-white"
//                 : "bg-[#D1D5DC] text-gray-400 cursor-not-allowed"
//             }`}
//         >
//           {isLoading ? "Verifying..." : "Verify"}
//         </button>
//         <div className="border-t border-[#E5E7EB] pt-[20px] mt-[24px]">
//             <p className="font-medium text-[14px] text-center text-[#6A7282]">Use backup code instead</p>
//         </div>

//         {/* Resend + Backup */}
//         {/* <div className="flex flex-col items-center gap-3 mt-6">
//           <p className="text-gray-500 text-[14px]">
//             Didn't receive a code?{" "}
//             <button
//               onClick={() => setTimer(25)}
//               className="text-[#7C3AED] font-semibold bg-transparent border-none cursor-pointer hover:underline"
//             >
//               Resend
//             </button>
//           </p>
//         </div> */}

//       </div>
//     </div>
//   );
// };

// export default OTPVerification;