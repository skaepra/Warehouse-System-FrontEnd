import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../cart/store/cartSlice";
import {
  Product,
  productService,
} from "../../products/services/productService";

export interface ProductDto {
  id: string;
  name: string;
  categoryName?: string;
  unitSellingPrice: number;
  availableStock: number;
}

export const useSalesCatalog = () => {
  const dispatch = useDispatch();

  // Redux Cart State
  const cart = useSelector((state: RootState) => state.cart.items);

  // Local State
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data: Product[] = await productService.getAllProducts();

      const mappedProducts: ProductDto[] = data.map((item) => ({
        id: item.id,
        name: item.name,
        categoryName: item.categoryName || "عام",
        unitSellingPrice: item.sellingPrice,
        availableStock: item.quantityInStock,
      }));

      setProducts(mappedProducts);
    } catch (err: any) {
      setError("حدث خطأ أثناء جلب قائمة المنتجات المتاحة.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Compute Categories
  const categories = useMemo(() => {
    return [
      "ALL",
      ...(Array.from(
        new Set(products.map((p) => p.categoryName).filter(Boolean))
      ) as string[]),
    ];
  }, [products]);

  // Filter Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "ALL" || product.categoryName === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Compute Totals
  const totalCartAmount = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.quantity * item.unitSellingPrice,
      0
    );
  }, [cart]);

  const totalCartItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Cart Actions Dispatchers
  const handleAddToCart = (product: ProductDto) => {
    dispatch(
      addToCart({
        productId: product.id,
        productName: product.name,
        unitSellingPrice: product.unitSellingPrice,
        quantity: 1,
        availableStock: product.availableStock,
      })
    );
  };

  const handleIncreaseQuantity = (productId: string) => {
    dispatch(increaseQuantity({ productId }));
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantity({ productId }));
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart({ productId }));
  };

  return {
    // States
    cart,
    loading,
    error,
    searchTerm,
    selectedCategory,
    categories,
    filteredProducts,
    isCartOpen,
    isOrderModalOpen,
    totalCartAmount,
    totalCartItemsCount,

    // State Setters & Actions
    setSearchTerm,
    setSelectedCategory,
    setIsCartOpen,
    setIsOrderModalOpen,
    fetchProducts,

    // Dispatch Handlers
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveFromCart,
  };
};