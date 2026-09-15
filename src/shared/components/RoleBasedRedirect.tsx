import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRoles } from "../utils/auth";


export const RoleBasedRedirect: React.FC = () => {
  const roles = getUserRoles();

  if (roles.includes("Manager")) {
    return <Navigate to="/employeeList" replace />;
  }
  if (roles.includes("Sales")) {
    return <Navigate to="/productPay" replace />;
  }
  if (roles.includes("Storekeeper")) {
    return <Navigate to="/inventory" replace />;
  }

  return <Navigate to="/login" replace />;
};