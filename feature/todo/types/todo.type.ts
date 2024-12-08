export type TodoStatus = "not-started" | "in-progress" | "pending";

export interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
  dueDate: string; // ISO date string
  created: string; // ISO date string
  lastModified: string; // ISO date string
}
