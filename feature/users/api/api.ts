import { api, authApi } from "@/lib/api";
import {
  UsePasswordResetEmailMutationArg,
  UsePasswordResetEmailMutationRes,
  UsePasswordResetMutationRes,
  UsePasswordResetMutationArg,
  UsePhoneRequestRes,
  UseUserEditInfoRes,
  UseUpdateUserMutationRes,
  UseUpdateUserMutationArg,
  // UsePhoneRequestArg,
} from "@/feature/users/types/users.type";
import { ApiResponse } from "@/feature/common/types/apiResponse";
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

    userEditInfo: builder.query<UseUserEditInfoRes, void>({
      query: () => {
        return {
          url: "/users/api/userEditInfo",
          method: "GET",
        };
      },
    }),

    // 추후 리덕스로 등록?
    logout: builder.mutation<ApiResponse<void>, void>({
      query: () => {
        return {
          url: "/logout",
          method: "POST",
          credentials: "include",
        };
      },
    }),

    updateUser: builder.mutation<
      UseUpdateUserMutationRes,
      UseUpdateUserMutationArg
    >({
      query: ({ requestUpdateUser }) => {
        return {
          url: "/users/api/edit",
          body: requestUpdateUser,
          method: "PUT",
        };
      },
    }),

    // 추후 리덕스로 등록?
    deleteUser: builder.mutation<ApiResponse<void>, void>({
      query: () => {
        return {
          url: "/users/api/deleteUser",
          method: "DELETE",
          credentials: "include",
        };
      },
    }),
  }),
});
