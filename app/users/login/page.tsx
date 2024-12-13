"use client";
import GetFetch from "@/feature/todo/GetFetch";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    GetFetch();
  }, []);
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white">test</div>
    </div>
  );
}
