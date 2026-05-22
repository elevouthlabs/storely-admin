import { useLogin } from "../../hook/useLogin";
import { useState } from "react";

export const Login =()=>{
    const { login, isLoading, error } = useLogin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await login(email, password);    
     };
  return (
    <div className="bg-slate-200 h-screen py-10 ">
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
      <div className="flex justify-center py-10
       h-[400px] w-[400px] bg-[#ffffff] mx-auto rounded-md">
        <form  className="w-[250px]" onSubmit={handleSubmit}>
          <h3 className="text-md font-semibold mb-3">Admin Login</h3>
          <label className="my-2">Email</label>
          <br />
          <input
           type="email"
           placeholder="abc@mail.com"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded-md w-full my-2 py" />
          <br />
          <label className="my-2">Password</label>
          <br />
          <input
           type={showPassword ? "text" : "password"}
           placeholder="Enter your password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           className="border p-2 rounded-md w-full my-2"
          />
          <br />
          <input
          onClick={() => setShowPassword(!showPassword)}
           type="checkbox" /> <span>show password</span>
          <br />
          <button 
          disabled={isLoading}
          className="bg-[#2D1B4E] w-full p-2 rounded-md my-2 text-white">
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  )
}