import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/login/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
