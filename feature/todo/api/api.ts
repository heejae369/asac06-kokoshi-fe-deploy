import { api } from "@/lib/api";

export const todoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    todos: builder.query({
      query: () => {
        return {
          url: `/todos`,
        };
      },
    }),
  }),
});

export const { useTodosQuery } = todoApi;
