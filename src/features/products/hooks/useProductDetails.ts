import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Allproducts, {
  productsMap as allProductsMap,
} from "../../../data/Allproducts";
import homeProducts, {
  productsMap as homeProductsMap,
} from "../../../data/products";


import { Product } from "../types/product";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addToCart } from "../../cart/store/cartSlice";
import { selectWishlistItems } from "../store/WishlisSelectors";
import { toggleWishlist } from "../store/WishlistSlice";

const combinedAllProducts = [...Allproducts, ...homeProducts];

export function useProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const productId = Number(id);
  const product: Product | undefined = id
    ? allProductsMap[productId] || homeProductsMap[productId]
    : undefined;

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "details" | "reviews"
  >("description");
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const dispatch = useAppDispatch()
  const wishlist = useAppSelector (selectWishlistItems)

  const isWishlisted = product
    ? wishlist.some((item: Product) => item.id === product.id)
    : false;

  useEffect(() => {
    if (product) {
      setSelectedImage(product.Images?.[0] || "");
      setSelectedColor(product.Colors?.[0] || "");
      setSelectedSize(product.Sizes?.[0] || "");
      setQuantity(1);
    }
  }, [id, product]);

  const handleAddToCart = () => {
  if (!product) return;

  dispatch(
    addToCart({
      id: product.id,
      name: product.Name,
      price: product.Price,
      image: selectedImage,
      color: selectedColor,
      size: selectedSize,
      quantity,
    })
  );
   setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
};

  const handleToggleWishlist = () => {
    if (toggleWishlist && product) {
      dispatch(toggleWishlist(product));
    }
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const relatedProducts = product
    ? combinedAllProducts.filter(
        (p) => p.Category === product.Category && p.id !== product.id
      )
    : [];

  return {
    product,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    incrementQuantity,
    decrementQuantity,
    activeTab,
    setActiveTab,
    addedToast,
    isWishlisted,
    handleAddToCart,
    handleToggleWishlist,
    relatedProducts,
    navigate,
  };
}