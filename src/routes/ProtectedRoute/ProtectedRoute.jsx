import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAllowed, redirectTo = "login" }) {
  return isAllowed ? <Outlet /> : <Navigate replace to={redirectTo} />;
}
export default ProtectedRoute;
