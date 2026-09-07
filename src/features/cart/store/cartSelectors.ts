import { RootState } from "../../../store/store";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartQuantity = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotalPrice = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
