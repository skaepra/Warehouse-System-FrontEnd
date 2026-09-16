import { useEffect, useRef, useState } from "react";
import { useThemeMode } from "../../dark-mode/dark";


export interface NavItem {
  name: string;
  link: string;
  allowedRoles?: ("Manager" | "Sales" | "Storekeeper")[]; 
}

export const navItems: NavItem[] = [
  { name: "Product", link: "/productPay" ,allowedRoles: ["Sales"]}, 
  { name: "Order", link: "/salesOrders" ,allowedRoles: ["Sales"]}, 
  
  { name: "Inventory", link: "/inventory", allowedRoles: ["Manager"] },
  { name: "Employee", link: "/employeeList", allowedRoles: ["Manager"] }, 
  { name: "Product", link: "/product", allowedRoles: ["Manager"] }, 
  { name: "Category", link: "/category", allowedRoles: ["Manager"] }, 
  { name: "Invoice", link: "/invoice", allowedRoles: ["Manager"] }, 

  { name: "Order", link: "/storekeeperOrders" ,allowedRoles: ["Storekeeper"]}, 
];

export function useNavbar() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const { mode, toggleMode } = useThemeMode() as {
    mode: string;
    toggleMode: () => void;
  };


  const prevScrollRef = useRef<number>(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleConfirmLocation = (locationData: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setSelectedAddress(locationData.address);
    setIsMapOpen(false);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScroll > prevScrollRef.current && currentScroll > 60) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          prevScrollRef.current = currentScroll;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
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
  };
}