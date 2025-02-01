"use client";

import MainHeaders from "@/components/MainHeaders";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  return (
    <div className="flex min-h-screen w-full justify-center bg-gray-100">
      <div className="flex w-[360px] flex-col bg-white px-5 font-sans">
        <MainHeaders title="위시리스트" backIcon />

        <div className="mt-6 flex flex-col gap-[15px]">
          <ProductCard hotel={"롯데 호텔 서울"} />
          <ProductCard hotel={"파라다이스 호텔"} />
        </div>
      </div>
    </div>
  );
}
