import { useNavigate } from "react-router-dom";
import { Product } from "../../products/types/product";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { hand } from "../../products/store/productUiSlice";
import { selectWishlistItems } from "../../products/store/WishlisSelectors";
import { toggleWishlist } from "../../products/store/WishlistSlice";

export function useHomeScreen() {
  const wishlist = useAppSelector (selectWishlistItems)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const handleProductClick = (id: string ) => {
    if (hand) dispatch(hand(id));
    navigate(`/product/${id}`);
    window.scrollTo({ top: 20 });
  };

  const isProductFavorite = (productId: string ) => {
    return wishlist.some((item) => item.id === productId);
  };

   const handleToggleWishlist = (product:Product) =>{
    dispatch(toggleWishlist(product))
  }

  return {
    handleProductClick,
    isProductFavorite,
    handleToggleWishlist,
  };
}