import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return { items: [], total: 0, user: null };
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Error al cargar el estado desde localStorage", e);
    return { items: [], total: 0, user: null };
  }
};

// Función para guardar el estado en localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.error("Error al guardar el estado en localStorage", e);
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: loadFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { item } = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (!existingItem) {
        state.items.push({ ...item, quantity: 1 });
        state.total += item.price;
      }
      saveToLocalStorage(state);
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((i) => i.id === id);
      if (existingItem) {
        state.items = state.items.filter((i) => i.id !== id);
        state.total -= existingItem.price * existingItem.quantity;
      }
      saveToLocalStorage(state);
    },
    clear: (state) => {
      state.items = [];
      state.total = 0;
      saveToLocalStorage(state);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      saveToLocalStorage(state);
    },
  },
});

export const { addItem, removeItem, clear, setUser } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartUser = (state) => state.cart.user;

export default cartSlice.reducer;
