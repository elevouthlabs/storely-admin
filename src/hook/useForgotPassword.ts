import { useAppDispatch, useAppSelector } from "./reduxHook";
import { forgotPassword } from "../features/auth/authSlice";

export const useForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  const sendResetLink = async (email: string) => {
    return await dispatch(forgotPassword(email));
  };

  return {
    sendResetLink,
    isLoading,
    error,
  };
};