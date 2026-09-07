import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types/CartItem";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

interface Cartinformation {
  id: string;
  color: string;
  size: string;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromCart(
      state,
      action: PayloadAction<Cartinformation>,
    ) {
      state.items = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.color === action.payload.color &&
            item.size === action.payload.size
          ),
      );
    },

    clearCart(state) {
      state.items = [];
    },

    increaseQuantity(
      state,
      action: PayloadAction<Cartinformation>,
    ) {
      state.items = state.items.map((item) =>
        item.id === action.payload.id &&
        item.color === action.payload.color &&
        item.size === action.payload.size
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    },

    decreaseQuantity(
      state,
      action: PayloadAction<Cartinformation>,
    ) {
      state.items = state.items.map((item) =>
        item.id === action.payload.id &&
        item.color === action.payload.color &&
        item.size === action.payload.size &&
        item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
