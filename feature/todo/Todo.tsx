import { Todo as ITodo } from "./types/todo.type";

interface Props {
  todo: ITodo;
}

export default function Todo({ todo }: Props) {
  return <li className="">{todo.title}</li>;
}
