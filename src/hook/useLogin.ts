import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hook/reduxHook"; 
import { login } from "../features/auth/authSlice";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (email: string, password: string) => {
    const resultAction = await dispatch(login({ email, password }));

    if (login.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  return {
    login: handleLogin,
    isLoading,
    error,
  };
};