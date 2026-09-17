import { NavLink } from "react-router-dom";

import {
  IoMenu,
  IoClose,
  IoLogOutOutline,
} from "react-icons/io5";
import { navItems, useNavbar } from "../hook/useNavbar";
import { hasRole } from "../../../shared/utils/auth";
import { logoutUser } from "../../auth/services/logoutApi";

export default function AppNavbar() {


  const {
    isVisible,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,
  } = useNavbar();

  const filteredNavItems = navItems.filter((item) => {
    if (!item.allowedRoles || item.allowedRoles.length === 0) return true;
    return hasRole(item.allowedRoles);
  });

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <>
      {/* 1. Header Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="bg-[#1E293B] dark:bg-zinc-900/85 backdrop-blur-md border-b border-white/10 dark:border-zinc-800 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Left Section: Logo & Desktop Links */}
            <div className="flex items-center gap-3">
              <NavLink
                to="/"
                onClick={() => window.scrollTo({ top: 0 })}
                className="flex items-center shrink-0"
              >
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-11 w-auto object-contain"
                />
              </NavLink>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-3">
                {filteredNavItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.link}
                    onClick={() => window.scrollTo({ top: 0 })}
                    className={({ isActive }) =>
                      `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-white/10 text-white shadow-inner font-semibold"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Right Section: DarkMode & Logout Button */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Logout Button (Desktop) */}
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-xs transition-all active:scale-95 shadow-md"
              >
                <span>تسجيل الخروج</span>
                <IoLogOutOutline className="text-base" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <IoClose className="text-2xl" />
                ) : (
                  <IoMenu className="text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Mobile Sidebar Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative ml-auto w-[70%] max-w-xs h-full bg-slate-900 dark:bg-zinc-900 border-l border-white/10 p-6 shadow-2xl flex flex-col justify-between z-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-lg font-bold text-white">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <IoClose className="text-2xl" />
                </button>
              </div>

              <nav className="flex flex-col space-y-1">
                {filteredNavItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-white/10 text-white font-bold"
                          : "text-gray-300 hover:bg-white/5"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Mobile Footer Logout Button */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full py-3 text-center rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-md"
              >
                <IoLogOutOutline className="text-lg" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}