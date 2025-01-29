import { api, authApi } from "@/lib/api";
import {
  UsePasswordResetEmailMutationArg,
  UsePasswordResetEmailMutationRes,
  UsePasswordResetMutationRes,
  UsePasswordResetMutationArg,
  UsePhoneRequestRes,
  // UsePhoneRequestArg,
} from "@/feature/users/types/users.type";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    passwordResetEmail: builder.mutation<
      UsePasswordResetEmailMutationRes,
      UsePasswordResetEmailMutationArg
    >({
      query: ({ requestPwResetEmail }) => {
        return {
          url: "/users/requestPwResetEmail",
          body: requestPwResetEmail,
          method: "POST",
        };
      },
    }),

    passwordReset: builder.mutation<
      UsePasswordResetMutationRes,
      UsePasswordResetMutationArg
    >({
      query: ({ requestPwReset }) => {
        return {
          url: "/users/resetPassword",
          body: requestPwReset,
          method: "PUT",
        };
      },
    }),
  }),
});

export const userAuthApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    userInfo: builder.query<UsePhoneRequestRes, void>({
      query: () => {
        return {
          url: "/users/api/userPhone",
          method: "GET",
        };
      },
    }),
  }),
});
