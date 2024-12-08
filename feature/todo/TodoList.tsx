"use client";

import { useTodosQuery } from "./api/api";

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
        <ul>{JSON.stringify(data)}</ul>
      </div>
    </section>
  );
}
