// ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { hasRole } from "./shared/utils/auth";


interface Props {
  allowedRoles: string[];
}

export const ProtectedRoute = ({ allowedRoles }: Props) => {
  if (!hasRole(allowedRoles)) {
    return <Navigate to="*" replace />;
  }
  return <Outlet />;
};