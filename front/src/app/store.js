import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/login/userSlice";
import cartReducer from "./slices/cart/cartSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
