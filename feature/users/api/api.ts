import { api } from "@/lib/api";
import {
  UsePasswordResetEmailMutationArg,
  UsePasswordResetEmailMutationRes,
  UsePasswordResetMutationRes,
  UsePasswordResetMutationArg,
} from "@/feature/users/types/users.type";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const pwResetApi = api.injectEndpoints({
  endpoints: (builder) => ({
    passwordResetEmail: builder.mutation<
      UsePasswordResetEmailMutationRes,
      UsePasswordResetEmailMutationArg
    >({
      query: ({ requestPwResetEmail }) => {
        return {
          url: "/api/member/requestPwResetEmail",
          body: requestPwResetEmail,
          method: "POST",
        };
      },
    }),

    passwordReset: builder.mutation<
      UsePasswordResetMutationRes,
      UsePasswordResetMutationArg
    >({
      query: ({ requestPwResetEmail }) => {
        return {
          url: "/api/member/requestPwResetEmail",
          body: requestPwResetEmail,
          method: "POST",
        };
      },
    }),
  }),
});

// export const pwResetApi = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
//   endpoints: (builder) => ({
//     passwordResetEmail: builder.mutation<
//       UsePasswordResetEmailMutationRes,
//       UsePasswordResetEmailMutationArg
//     >({
//       query: ({ requestPwResetEmail }) => {
//         return {
//           url: "/api/member/requestPwResetEmail",
//           body: requestPwResetEmail,
//           method: "POST",
//         };
//       },
//     }),
//   }),
// });
