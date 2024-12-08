/** */

import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "./types/todo.type";
import { useMemo } from "react";
import { useUpdateTodoMutation } from "./api/api";

interface Props {
  todo: Todo;
}

export default function UpdateTodo({ todo }: Props) {
  const checked = useMemo(() => todo.status === "done", [todo]);
  const [update] = useUpdateTodoMutation();

  const handleUpdate = (updateTodo: Todo) => {
    console.log("here?");
    update({
      id: todo.id,
      updateTodo,
    });
  };

  return (
    <Checkbox
      checked={checked}
      onClick={() =>
        handleUpdate({
          ...todo,
          status: todo.status === "done" ? "not-started" : "done",
        })
      }
    />
  );
}
