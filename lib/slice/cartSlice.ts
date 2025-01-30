import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// cartSlice.ts
interface CartState {
  cartCount: number;
}

// 카트 값 처음에 받아와야 할 거 같은데
const initialState: CartState = {
  cartCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (
      state,
      action: PayloadAction<number | ((prevCount: number) => number)>
    ) => {
      if (typeof action.payload === "function") {
        state.cartCount = action.payload(state.cartCount);
      } else {
        state.cartCount = action.payload;
      }
    },
  },
});

export const { setCartCount } = cartSlice.actions;

export default cartSlice.reducer;
