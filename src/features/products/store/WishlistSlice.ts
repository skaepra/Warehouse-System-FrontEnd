import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/product";

interface WishlistState {
  wishlist: Product[];
}

const initialState: WishlistState = {
  wishlist: [],
};

const WishlistSlice = createSlice({
  name: "Wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.wishlist.some(
        (item) => item.id === action.payload.id,
      );

      if (exists) {
        state.wishlist = state.wishlist.filter(
          (item) => item.id !== action.payload.id,
        );
      } else {
        state.wishlist.push(action.payload);
      }
    },
  },
});

export const {
  toggleWishlist,
} = WishlistSlice.actions;
export default WishlistSlice.reducer;