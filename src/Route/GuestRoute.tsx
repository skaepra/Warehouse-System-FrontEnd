import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const GuestRoute: React.FC = () => {
  const token = localStorage.getItem("token");

  // إذا كان الـ Token موجوداً، يعيد توجيهه إلى الصفحة الرئيسية
  if (token) {
    return <Navigate to="/" replace />;
  }
  // إذا لم يكن مسجلاً لدخوله، يتيح الوصول لصفحة الـ Login
  return <Outlet />;
};
export default GuestRoute;