import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AppThemeProvider } from "./features/dark-mode/dark";

import Home from "./features/home/screen/home";
import ShoppingCartScreen from "./features/cart/screen/ShoppingCart";
import LoginScreen from "./features/auth/Screens/login";

import SignUpScreen from "./features/auth/Screens/SignUp";

import Footer from "./features/home/components/Footer";
import FAQPage from "./features/customer-care/FAQ";
import ShippingInfoPage from "./features/customer-care/ShippingInfo";
import ReturnsRefundsPage from "./features/customer-care/ReturnsRefundsPage";
import ContactUsPage from "./features/customer-care/ContactUsPage";
import ShopingScreen from "./features/shop/screen/Shoping";
import ProductDetails from "./features/products/screen/ProductDetails";
import OrdersPage from "./features/order/screen/OrdersPage";
import WishlistPage from "./features/products/screen/WishlistPage";
import CheckOutScreen from "./features/checkout/screen/CheckOut";

import AppNavbar from "./features/home/components/navbar";
import NotFoundPage from "./features/error/NotFound";


export default function Layout(): React.JSX.Element {
  const location = useLocation();

  // تحديد النوع كـ مصفوفة نصوص ثابتة للقراءة فقط لضمان الحماية والأداء
  const hideNavbarRoutes: readonly string[] = ["/login", "/singUp"];
  const hideFooterRoutes: readonly string[] = ["/login", "/singUp"];
  const shouldHideNavbar: boolean = hideNavbarRoutes.includes(
    location.pathname,
  );
  const shouldHideFooter: boolean = hideFooterRoutes.includes(
    location.pathname,
  );

  return (
    <>
      <AppThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopingScreen />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<ShoppingCartScreen />} />
          <Route path="/checkOut" element={<CheckOutScreen />} />
          <Route path="/order" element={<OrdersPage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/singUp" element={<SignUpScreen />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/shipping" element={<ShippingInfoPage />} />
          <Route path="/returns" element={<ReturnsRefundsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="*" element={<NotFoundPage/>} />      
        </Routes>

        {!shouldHideNavbar && <AppNavbar />}
        {!shouldHideFooter && <Footer />}
      </AppThemeProvider>
    </>
  );
}
