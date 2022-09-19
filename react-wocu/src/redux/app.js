import { createSlice } from "@reduxjs/toolkit";


const appSlice = createSlice({
  name: "app",
  initialState: {
    cart: {}
  },
  reducers: {
    fetchCart: (state, action) => {
      state.cart = action.payload;
    },
    addProduct: (state, action) => {
      state.cart[action.payload.product] = action.payload.quantity;
    }
  },
});

export const { fetchCart, addProduct } = appSlice.actions


export default appSlice.reducer;
