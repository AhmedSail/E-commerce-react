import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import CartSlice from "./CartSlice";
const store = configureStore({
  reducer: {
    cart: CartSlice,
    product: ProductSlice,
  },
});

export default store;
