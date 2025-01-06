import { api } from "@/lib/api";

export const pwResetApi = api.injectEndpoints({
  endpoints: (builder) => ({
    passwordResetEmail: builder.query<res, arg>({
      query: ({ arg }) => {
        return {
          url: `/api/accommodation/${arg.id}`,
          body: requestPwResetEmail,
          method: "GET",
        };
      },
    }),
  }),
});
