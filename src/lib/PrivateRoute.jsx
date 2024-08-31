import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = () => {
  const { hasAuthenticated } = useAuth();



  if (hasAuthenticated) {
    return <>{<Outlet />}</>;
  } else {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
