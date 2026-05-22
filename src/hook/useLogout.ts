import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hook/reduxHook"; 
import { logout } from "../features/auth/authSlice";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/admin-login");
    };

  return {
    logout: handleLogout,
  };
};