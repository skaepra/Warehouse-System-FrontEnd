import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { selectCartItems, selectCartQuantity, selectCartTotalPrice } from "../store/cartSelectors";
import { CartItem } from "../types/CartItem";



export function useShoppingCart() {
  const navigate = useNavigate();
  const storitems = useAppSelector(selectCartItems);
  const getTotals = useAppSelector(selectCartTotalPrice);
  const getAllQuantity = useAppSelector(selectCartQuantity);

  const totals = getTotals;
  const totalQuantity = getAllQuantity;
  const shippingFee = totalQuantity * 4;
  const allTotal = totals + shippingFee;
  const isEmpty = storitems.length === 0;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  //  إنشاء معرف فريد ومستقر لكل عنصر في قائمة السلة
  const getItemKey = (item: CartItem) =>
    `${String(item.id)}-${item.color}-${item.size || "default"}`;

  return {
    storitems,
    totals,
    shippingFee,
    allTotal,
    isEmpty,
    handleCheckout,
    getItemKey,
  };
}