"use client";

import dynamic from "next/dynamic";

// Dynamic Import로 클라이언트 전용 컴포넌트 불러오기
const ReviewClient = dynamic(() => import("./ReviewClient"), { ssr: false });

export default function Review() {
  return <ReviewClient />;
}
