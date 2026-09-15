import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types/CartItem";



interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // إضافة منتج للسلة
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        // عدم التجاوز للمخزون المتاح
        if (existingItem.quantity < existingItem.availableStock) {
          existingItem.quantity += action.payload.quantity || 1;
        }
      } else {
        state.items.push(action.payload);
      }
    },

    // إزالة منتج بالكامل من السلة بواسطة id المنتج
    removeFromCart(state, action: PayloadAction<{ productId: string }>) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId
      );
    },

    // تفريغ السلة بالكامل
    clearCart(state) {
      state.items = [];
    },

    // زيادة الكمية بمقدار 1
    increaseQuantity(state, action: PayloadAction<{ productId: string }>) {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId
      );
      if (item && item.quantity < item.availableStock) {
        item.quantity += 1;
      }
    },

    // إنقاص الكمية بمقدار 1 (وإزالته إذا أصبحت الكمية 0)
    decreaseQuantity(state, action: PayloadAction<{ productId: string }>) {
      const index = state.items.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1); // إزالة العنصر عند إنقاصه من 1
        }
      }
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