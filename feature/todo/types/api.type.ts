import { Todo } from "./todo.type";

export type UseTodosQueryRes = Todo[];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UseTodosQueryArg {}

export type UseUpdateTodoMutationRes = any;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UseUpdateTodoMutationArg {
  id: number;
  updateTodo: Todo;
}
