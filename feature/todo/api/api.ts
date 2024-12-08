import { api } from "@/lib/api";
import {
  UseTodosQueryArg,
  UseTodosQueryRes,
  UseUpdateTodoMutationArg,
  UseUpdateTodoMutationRes,
} from "../types/api.type";

export const todoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    todos: builder.query<UseTodosQueryRes, UseTodosQueryArg>({
      query: () => {
        return {
          url: `/todos`,
        };
      },
      providesTags: ["todos"],
    }),
    updateTodo: builder.mutation<
      UseUpdateTodoMutationRes,
      UseUpdateTodoMutationArg
    >({
      query: ({ id, updateTodo }) => {
        return {
          url: `/todos/${id}`,
          body: updateTodo,
          method: "PUT",
        };
      },
      invalidatesTags: ["todos"],
    }),
  }),
});

export const { useTodosQuery, useUpdateTodoMutation } = todoApi;
