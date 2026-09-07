import { useAppDispatch } from "../../../store/hooks";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../store/cartSlice";

export interface CartItemProps {
  id: string ;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  image: string;
}

export function useCartItem(item: CartItemProps) {
  const dispatch = useAppDispatch();

  const total = item.price * item.quantity;

  const handleIncrease = () =>dispatch(increaseQuantity({id:item.id,color:item.color,size:item.size})) 
  const handleDecrease = () =>  dispatch(decreaseQuantity({id:item.id,color:item.color,size:item.size})) 
  const handleRemove = () => dispatch(removeFromCart({id:item.id,color:item.color,size:item.size})) 

  return {
    total,
    handleIncrease,
    handleDecrease,
    handleRemove,
  };
}