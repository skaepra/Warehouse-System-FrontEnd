import { useEffect, useRef, useState } from "react";
import { useThemeMode } from "../../dark-mode/dark";


export interface NavItem {
  name: string;
  link: string;
}

export const navItems: NavItem[] = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "Order", link: "/order" },
  { name: "Favorite", link: "/wishlist" },
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