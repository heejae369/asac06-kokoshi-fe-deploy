"use client";

import Footer from "@/components/Footer";
import MainHeaders from "@/components/MainHeaders";
import { Switch } from "@/components/ui/switch";

export default function settings() {
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5 font-sans">
        <MainHeaders title="설정" backIcon />
        <p className="mb-3 mt-5 text-sm font-bold">푸시 알림</p>
        <div className="h-1 w-full bg-gray-100" />
        <div className="flex items-center justify-between">
          <div className="my-5 w-72 text-sm">
            <p className="font-bold">쇼핑 알림</p>
            <p className="text-gray-400">이벤트 및 다양한 정보를 제공합니다.</p>
          </div>
          <Switch className="h-5 data-[state=checked]:bg-[#8728ff]" />
        </div>
        <div className="h-0.5 w-full bg-gray-100" />
        <div className="flex items-center justify-between">
          <div className="my-5 w-72 text-sm">
            <p className="font-bold">핫딜 알림</p>
            <p className="text-gray-400">
              특별한 혜택 및 할인 알람을 받아보세요.
            </p>
          </div>
          <Switch className="h-5 data-[state=checked]:bg-[#8728ff]" />
        </div>
        <div className="h-0.5 w-full bg-gray-100" />

        <p className="mb-3 mt-5 text-sm font-bold">기타 알림</p>
        <div className="h-1 w-full bg-gray-100" />
        <div className="flex items-center justify-between">
          <div className="my-5 w-72 text-sm">
            <p className="font-bold">이메일 알림</p>
            <p className="text-gray-400">이메일로 특별한 행사를 알려드려요.</p>
          </div>
          <Switch className="h-5 data-[state=checked]:bg-[#8728ff]" />
        </div>
        <div className="h-0.5 w-full bg-gray-100" />
        <div className="flex items-center justify-between">
          <div className="my-5 w-72 text-sm">
            <p className="font-bold">SMS 알림</p>
            <p className="text-gray-400">
              문자를 통해 할인 소식을 접할 수 있어요.
            </p>
          </div>
          <Switch className="h-5 data-[state=checked]:bg-[#8728ff]" />
        </div>
        <div className="h-0.5 w-full bg-gray-100" />
        <Footer />
      </div>
    </div>
  );
}
