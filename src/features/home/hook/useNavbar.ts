import { useEffect, useRef, useState } from "react";
import { useThemeMode } from "../../dark-mode/dark";


export interface NavItem {
  name: string;
  link: string;
  allowedRoles?: ("Manager" | "Sales" | "Storekeeper")[]; 
}

export const navItems: NavItem[] = [
  { name: "المنتجات", link: "/productPay" ,allowedRoles: ["Sales"]}, 
  { name: "الطلبات", link: "/salesOrders" ,allowedRoles: ["Sales"]}, 
  
  { name: "الموظفين", link: "/employeeList", allowedRoles: ["Manager"] }, 
  { name: "المنتجات", link: "/product", allowedRoles: ["Manager"] }, 
  { name: "التصنيفات", link: "/category", allowedRoles: ["Manager"] }, 
  { name: "عمليات الجرد", link: "/inventory", allowedRoles: ["Manager"] },
  { name: "الفواتير", link: "/invoice", allowedRoles: ["Manager"] }, 

  { name: "Order", link: "/storekeeperOrders" ,allowedRoles: ["Storekeeper"]}, 
];

export function useNavbar() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const { mode, toggleMode } = useThemeMode() as {
    mode: string;
    toggleMode: () => void;
  };


  const prevScrollRef = useRef<number>(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
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
    mode,
    toggleMode,
    toggleMobileMenu,
  };
}