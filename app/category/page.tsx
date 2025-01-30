"use client";

import dynamic from "next/dynamic";

// ✅ CategoryClient를 다이나믹 임포트 (CSR 전용)
const CategoryClient = dynamic(() => import("./CategoryClient"), {
  ssr: false,
});

export default function CategoryPage() {
  return <CategoryClient />;
}
