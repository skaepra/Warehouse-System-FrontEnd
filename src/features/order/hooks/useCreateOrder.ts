import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { clearCart } from "../../cart/store/cartSlice";
import { CreateOrderDto, orderService } from "../services/orderService";

export const useCreateOrder = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitOrder = async (ShopName: string, Address: string) => {
    if (!ShopName.trim()) {
      setError("يرجى إدخال اسم الزبون.");
      return false;
    }
    if (!Address.trim()) {
      setError("يرجى إدخال عنوان المتجر.");
      return false;
    }

    if (cartItems.length === 0) {
      setError("السلة فارغة، أضف منتجات أولاً.");
      return false;
    }

    setLoading(true);
    setError(null);

    const payload: CreateOrderDto = {
      shopName: ShopName,
      address: Address,
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitSellingPrice: item.unitSellingPrice,
      })),
    };

    try {
      await orderService.createOrder(payload);

      // 1. تفريغ السلة عند النجاح
      dispatch(clearCart());
      return true;
    } catch (err: any) {
      // Axios يضع الخطأ القادم من C# Backend داخل err.response.data
      const message =
        err.response?.data?.message ||
        err.message ||
        "حدث خطأ غير متوقع أثناء إرسال الطلب.";

      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitOrder, loading, error, setError };
};
