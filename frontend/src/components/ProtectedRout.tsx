import { Navigate, Outlet } from "react-router";
import { useAuth } from "../ontext/Auth/Authcontext";

const ProtectedRout = () => {
  const { isAuthenticatio } = useAuth();
  if (!isAuthenticatio) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return <Outlet />;
};

export default ProtectedRout;
