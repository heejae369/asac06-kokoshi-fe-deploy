"use client";

import { useTodosQuery } from "./api/api";
import Todo from "./Todo";

export default function TodoList() {
  const { data } = useTodosQuery({});

  return (
    <section className="flex h-full flex-col items-center justify-center">
      {/* todo title */}
      <div className="">
        <h2 className="text-2xl font-bold">TODO LIST</h2>
      </div>
      {/* todo list */}
      <div className="mt-4 grow">
        <ul>{data?.map((todo) => <Todo key={todo.id} todo={todo}></Todo>)}</ul>
      </div>
    </section>
  );
}
