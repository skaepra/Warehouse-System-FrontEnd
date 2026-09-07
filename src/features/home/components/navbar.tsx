import { NavLink } from "react-router-dom";
import { Taggol } from "../../dark-mode/taggol";
import LocationPickerMaps from "../../google-map/screen/LocationPickerMaps";

import {
  IoCartOutline,
  IoLocationOutline,
  IoMenu,
  IoClose,
  IoSparklesOutline,
} from "react-icons/io5";
import { navItems, useNavbar } from "../hook/useNavbar";
import { useAppSelector } from "../../../store/hooks";
import { selectCartQuantity } from "../../cart/store/cartSelectors";

export default function AppNavbar() {
  const {
    isVisible,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isMapOpen,
    setIsMapOpen,
    selectedAddress,
    mode,
    toggleMode,
    toggleMobileMenu,
    handleConfirmLocation,
  } = useNavbar();

  const quantity = useAppSelector(selectCartQuantity);

  return (
    <>
      {/* 1. Header Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="bg-slate-900/85 dark:bg-zinc-900/85 backdrop-blur-md border-b border-white/10 dark:border-zinc-800 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Left Section: Logo & Desktop Links */}
            <div className="flex items-center gap-8">
              <NavLink to="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center p-1.5 shadow-md shadow-cyan-500/20 transition-transform group-hover:scale-105">
                  <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="w-full h-full brightness-200"
                    alt="Logo"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Flowbite
                </span>
              </NavLink>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.link}
                    onClick={() => window.scrollTo({ top: 0 })}
                    className={({ isActive }) =>
                      `px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
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

            {/* Right Section: Location, DarkMode, Cart & Auth */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Location Picker */}
              <button
                onClick={() => setIsMapOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="تحديد الموقع"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <IoLocationOutline className="text-rose-400 text-base" />
                <span className="hidden lg:inline max-w-[110px] truncate text-gray-200">
                  {selectedAddress || "Select Location"}
                </span>
              </button>

              {/* Theme Toggle */}
              <div className="flex items-center mr-[-12px]">
                <Taggol mode={mode} toggleMode={toggleMode} />
              </div>

              {/* Cart Button */}
              <NavLink
                to="/cart"
                className="relative p-2 rounded-full hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
                title="Cart"
              >
                <IoCartOutline className="text-2xl" />
                {quantity > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                    {quantity > 99 ? "99+" : quantity}
                  </span>
                )}
              </NavLink>

              {/* Subscribe Button */}
              <NavLink
                to="/login"
                className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-500 hover:shadow-indigo-500/40 dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-medium text-xs shadow-md shadow-purple-500/20 transition-all dark:hover:shadow-purple-500/40 active:scale-95"
              >
                <IoSparklesOutline />
                <span>Subscribe</span>
              </NavLink>

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
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div className="relative ml-auto w-[70%] max-w-xs h-full bg-slate-900 dark:bg-zinc-900 border-l border-white/10 p-6 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
            <div className="space-y-6">
              {/* Header Drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-lg font-bold text-white">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <IoClose className="text-2xl" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-1">
                {navItems.map((item, index) => (
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

                <NavLink
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5"
                >
                  <span>Shopping Cart</span>
                  <span className="bg-rose-500/20 text-rose-300 text-xs px-2 py-0.5 rounded-full font-bold">
                    {quantity} Items
                  </span>
                </NavLink>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsMapOpen(true);
                  }}
                  className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <IoLocationOutline className="text-lg" />
                  <span className="truncate">
                    {selectedAddress ? `📍 ${selectedAddress}` : "تحديد الموقع الجغرافي"}
                  </span>
                </button>
              </nav>
            </div>

            {/* Footer / Login Button */}
            <div className="pt-4 border-t border-white/10">
              <NavLink
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-3 text-center rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-medium text-sm shadow-md active:scale-95 transition-transform"
              >
                Subscribe / Login
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* 3. Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl h-[520px] bg-white dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/10">
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold shadow-md pointer-events-auto">
                📍 اختر موقعك
              </span>
              <button
                onClick={() => setIsMapOpen(false)}
                className="pointer-events-auto bg-slate-900/80 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-md"
              >
                ✕
              </button>
            </div>

            <div className="w-full h-full relative">
              <LocationPickerMaps onConfirm={handleConfirmLocation} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}