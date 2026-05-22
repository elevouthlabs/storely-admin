import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hook/reduxHook";

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

//   if (user?.role !== "ADMIN") {
//     return <Navigate to="/admin-login" replace />;
//   }

  return children;
};