import { configureStore } from "@reduxjs/toolkit";
import { api, authApi } from "./api";
import userReducer from "./slice/userSlice";
import modalReducer from "./slice/modalSlice";
import calendarReducer from "./slice/calendarSlice";
import cartReducer from "./slice/cartSlice";
// import loginResucer from "./slice/loginSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    user: userReducer,
    calendar: calendarReducer,
    modal: modalReducer,
    cart: cartReducer,
    // login: loginResucer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, authApi.middleware),
  devTools: {
    name: "sample todo app",
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
