import { api } from "@/lib/api";
import {
  UseCreateTodoMutationArg,
  UseCreateTodoMutationRes,
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
    createTodo: builder.mutation<
      UseCreateTodoMutationRes,
      UseCreateTodoMutationArg
    >({
      query: ({ newTodo }) => {
        return {
          url: `/todos`,
          body: newTodo,
          method: "POST",
        };
      },
      invalidatesTags: ["todos"],
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

export const { useTodosQuery, useCreateTodoMutation, useUpdateTodoMutation } =
  todoApi;
