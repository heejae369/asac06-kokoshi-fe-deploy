// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface LoginState {
//   userEmail: string;
//   isLogin: boolean;
// }

// const initialState: LoginState = {
//   userEmail: "",
//   isLogin: false,
// };

// export const loginSlice = createSlice({
//   name: "login",
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<string>) => {
//       state.userEmail = action.payload;
//       state.isLogin = true;
//     },
//     logout: (state) => {
//       state.userEmail = "";
//       state.isLogin = false;
//     },
//   },
// });

// export const { login, logout } = loginSlice.actions;
// export default loginSlice.reducer;
