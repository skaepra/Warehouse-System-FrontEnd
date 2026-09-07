import { RootState } from "../../../store/store";

export const selectWishlistItems = (state: RootState) => state.Wishlist.wishlist;