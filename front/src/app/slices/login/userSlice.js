import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false,
    errorStatus: null,
    invalidCredentials: false,
    serverFailed: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    failure: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;

      state.errorStatus = action.payload.error;
      if (state.errorStatus === "401") {
        state.invalidCredentials = true;
      }
      if (state.errorStatus === "500") {
        state.serverFailed = true;
      }
    },
  },
});

//Acciones
export const { login, logout, failure } = userSlice.actions;

//Selectores
export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectInvalidCredentials = (state) =>
  state.user.invalidCredentials;
export const selectServerFailed = (state) => state.user.serverFailed;

//Reducer
export default userSlice.reducer;
