import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "../features/cart/store/cartSlice";
import productUiReducer from "../features/products/store/productUiSlice";
import WishlistReducer from "../features/products/store/WishlistSlice";

const cartPersistConfig  = {
  key:"cart",
  storage,
};
const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig ,cartReducer),
  productUi:productUiReducer,
  Wishlist: persistReducer(wishlistPersistConfig ,WishlistReducer),
});


export const store = configureStore({
  reducer: rootReducer ,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
