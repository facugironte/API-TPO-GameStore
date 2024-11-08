import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("user");
    if (serializedState === null) {
      return {
        user: null,
        isLoggedIn: false,
        errorStatus: null,
        invalidCredentials: false,
        serverFailed: false,
      };
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Error al cargar el estado desde localStorage", e);
    return {
      user: null,
      isLoggedIn: false,
      errorStatus: null,
      invalidCredentials: false,
      serverFailed: false,
    };
  }
};

const saveUserToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("user", serializedState);
  } catch (e) {
    console.error("Error al guardar el estado en localStorage", e);
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState: loadUserFromLocalStorage(),
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.invalidCredentials = false;
      state.serverFailed = false;
      saveUserToLocalStorage(state);
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      saveUserToLocalStorage(state);
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
      saveUserToLocalStorage(state);
    },
    addGameToPurchases: (state, action) => {
      state.user.user.purchased_games.push(action.payload);
      saveUserToLocalStorage(state);
    },
    addPaymentMethod: (state, action) => {
      state.user.user.payment_methods.push(action.payload);
      saveUserToLocalStorage(state);
    },
    deleteCompanyGame: (state, action) => {
      console.log(state.user)
      console.log(action.payload)
      state.user.user.company_games=[]//.filter((game) => game.id !== action.payload);
      saveUserToLocalStorage(state);
    },
  },
});

//Acciones
export const { login, logout, failure, addGameToPurchases, addPaymentMethod, deleteCompanyGame } =
  userSlice.actions;

//Selectores
export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectInvalidCredentials = (state) =>
  state.user.invalidCredentials;
export const selectServerFailed = (state) => state.user.serverFailed;

//Reducer
export default userSlice.reducer;