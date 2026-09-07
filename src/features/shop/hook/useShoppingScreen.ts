import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../products/types/product";
import Allproducts from "../../../data/Allproducts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addToCart } from "../../cart/store/cartSlice";
import { hand } from "../../products/store/productUiSlice";
import { selectWishlistItems } from "../../products/store/WishlisSelectors";
import { toggleWishlist } from "../../products/store/WishlistSlice";
export function useShoppingScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector (selectWishlistItems)



  // States
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const allProducts = useMemo(() => Allproducts as Product[], []);

  // Categories Calculation
  const categories = useMemo(() => {
    const categoryMap: Record<string, number> = {};

    allProducts.forEach((p) => {
      const cat = p.Category || "General";
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });

    return [
      { name: "All", count: allProducts.length },
      ...Object.keys(categoryMap).map((cat) => ({
        name: cat,
        count: categoryMap[cat],
      })),
    ];
  }, [allProducts]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "All" ||
          (product.Category || "General") === selectedCategory;

        const matchesSearch = product.Name.toLowerCase().includes(
          searchQuery.toLowerCase(),
        );

        const matchesPrice = product.Price <= maxPrice;

        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.Price - b.Price;
        if (sortBy === "price-high") return b.Price - a.Price;
        return 0;
      });
  }, [allProducts, selectedCategory, searchQuery, maxPrice, sortBy]);

  // Handlers
  const handleProductClick = (id: string) => {
    if (hand) dispatch(hand(id));
    navigate(`/product/${id}`);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        name: product.Name,
        price: product.Price,
        image: product.Images?.[0] || "",
        color: product.Colors?.[0] || "",
        size: product.Sizes?.[0] || "",
        quantity: 1,
      }),
    );

    setAddedToast(product.Name);
    setTimeout(() => setAddedToast(null), 2500);
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setMaxPrice(1000);
    setSortBy("default");
    setIsFilterMobileOpen(false);
  };

    const handleToggleWishlist = (product:Product) =>{
    dispatch(toggleWishlist(product))
  }

  const isProductInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  return {
    state: {
      selectedCategory,
      searchQuery,
      sortBy,
      maxPrice,
      isFilterMobileOpen,
      addedToast,
      categories,
      filteredProducts,
    },
    actions: {
      setSelectedCategory,
      setSearchQuery,
      setSortBy,
      setMaxPrice,
      setIsFilterMobileOpen,
      handleProductClick,
      handleQuickAdd,
      handleResetFilters,
      handleToggleWishlist,
      isProductInWishlist,
    },
  };
}
