import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  createdAt: string;
}

const initialState: UserState = {
  email: "",
  createdAt: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setCreatedAt: (state, action: PayloadAction<string>) => {
      state.createdAt = action.payload;
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.createdAt = action.payload.createdAt;
    },
  },
});

export const { setEmail, setCreatedAt, setUser } = userSlice.actions;
export default userSlice.reducer;
