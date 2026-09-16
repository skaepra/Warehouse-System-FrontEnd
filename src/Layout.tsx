import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AppThemeProvider } from "./features/dark-mode/dark";

import LoginScreen from "./features/auth/Screens/login";

import AppNavbar from "./features/home/components/navbar";
import NotFoundPage from "./features/error/NotFound";
import CreateEmployeeScreen from "./features/auth/Screens/CreateEmployee";
import EmployeeListScreen from "./features/employee.ts/screens/EmployeeList";

import { ManagerProductList } from "./features/products/screen/ManagerProductList";
import { SalesOrdersList } from "./features/order/screen/SalesOrdersList";
import { SalesProductCatalog } from "./features/home/screen/SalesProductCatalog";
import { RoleBasedRedirect } from "./Route/RoleBasedRedirect";

import { StorekeeperOrdersList } from "./features/order/screen/StorekeeperOrdersList";
import { InvoicesList } from "./features/invoice/Screens/InvoicesList";
import GuestRoute from "./Route/GuestRoute";
import { ProtectedRoute } from "./Route/ProtectedRoute";
import { StorekeeperAudit } from "./features/Audit/Screens/StorekeeperAudit";
import { ManagerAudit } from "./features/Audit/Screens/ManagerAudit";
import { CategoryManagement } from "./features/category/Screens/CategoryManagement";

export default function Layout(): React.JSX.Element {
  const location = useLocation();

  // تحديد النوع كـ مصفوفة نصوص ثابتة للقراءة فقط لضمان الحماية والأداء
  const hideNavbarRoutes: readonly string[] = [
    "/login",
    "/createEmployee",
    "/*",
  ];
  // const hideFooterRoutes: readonly string[] = ["/login", "/createEmployee"];
  const shouldHideNavbar: boolean = hideNavbarRoutes.includes(
    location.pathname,
  );

  return (
    <>
      <AppThemeProvider>
        <Routes>
          <Route path="/" element={<RoleBasedRedirect />} />

          {/* مسارات المدير */}
          <Route element={<ProtectedRoute allowedRoles={["Manager"]} />}>
            <Route path="/employeeList" element={<EmployeeListScreen />} />
            <Route path="/createEmployee" element={<CreateEmployeeScreen />} />
            <Route path="/product" element={<ManagerProductList />} />
            <Route path="/category" element={<CategoryManagement />} />
            <Route path="/invoice" element={<InvoicesList />} />
            <Route path="/managerAudit" element={<ManagerAudit />} />
          </Route>

          {/* مسارات المبيعات */}
          <Route element={<ProtectedRoute allowedRoles={["Sales"]} />}>
            <Route path="/productPay" element={<SalesProductCatalog />} />
            <Route path="/salesOrders" element={<SalesOrdersList />} />
          </Route>

          {/* مسارات أمين المخزن */}
          <Route element={<ProtectedRoute allowedRoles={["Storekeeper"]} />}>
            <Route
              path="/storekeeperOrders"
              element={<StorekeeperOrdersList />}
            />
            <Route path="/auditManagement" element={<StorekeeperAudit />} />
          </Route>

          {/* مسار تسجيل الدخول - محمي للضيوف فقط */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<LoginScreen />} />
          </Route>

          {/* صفحة غير موجود */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {!shouldHideNavbar && <AppNavbar />}
      </AppThemeProvider>
    </>
  );
}
