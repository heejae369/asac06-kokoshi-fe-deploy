import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todoApi } from "./api";
import { Todo } from "../types/todo.type";

const { todos } = todoApi.endpoints;

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [] as Todo[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(todos.matchFulfilled, (state, action: PayloadAction<{}>) => {
        return {
          ...action.payload,
        };
      })
      .addMatcher(todos.matchRejected, () => {});
  },
});

export default todoSlice;
