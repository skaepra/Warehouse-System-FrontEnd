import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "../features/cart/store/cartSlice";

const cartPersistConfig  = {
  key:"cart",
  storage,
};


const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig ,cartReducer),
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
