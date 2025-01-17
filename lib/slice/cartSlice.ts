import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  cartCount: number;
}

const initialState: ModalState = {
  cartCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount(state, action: PayloadAction<number>) {
      state.cartCount = action.payload;
    },
  },
});

export const { setCartCount } = cartSlice.actions;

export default cartSlice.reducer;
