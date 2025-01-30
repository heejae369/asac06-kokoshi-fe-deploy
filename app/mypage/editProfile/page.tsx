"use client";

import Footer from "@/components/Footer";
import MainHeaders from "@/components/MainHeaders";
import Image from "next/image";
import { useState } from "react";
import ProfileModal from "@/components/ProfileModal";

export default function EditProfile() {
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isResignModalOpen, setIsResignModalOpen] = useState(false);
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5 font-sans">
        <MainHeaders title="내 정보 수정" backIcon />
        <div className="relative inline-block">
          <Image className="mt-10" src={""} alt="" width={68} height={68} />
          <button
            className="absolute bottom-0 right-0 size-5 rounded-full"
            onClick={() => setIsImgModalOpen(true)}
            style={{
              backgroundImage: `url(${"/assets/icon/ic_mypage_camera.png"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        <div className="mb-8 flex items-baseline">
          <p className="mt-5 text-xl font-bold">회원 정보</p>
          <button className="ml-auto text-sm font-bold text-[#8728FF]">
            수정
          </button>
        </div>
        <div className="my-4 flex">
          <p className="w-24 text-sm text-gray-500">이름</p>
          <p className="text-sm font-semibold">{"홍**"}</p>
        </div>
        <div className="h-0.5 w-full bg-gray-100" />
        <div className="my-4 flex">
          <p className="w-24 text-sm text-gray-500">휴대폰 번호</p>
          <p className="text-sm font-semibold">{"010-1234-****"}</p>
        </div>
        <div className="h-0.5 w-full bg-gray-100" />
        <div className="my-4 flex">
          <p className="w-24 text-sm text-gray-500">생년월일</p>
          <p className="text-sm font-semibold">{"19**/**/**"}</p>
        </div>
        <div className="h-0.5 w-full bg-gray-100" />
        <div className="my-4 flex">
          <p className="w-24 text-sm text-gray-500">닉네임</p>
          <p className="text-sm font-semibold">{"nickname"}</p>
        </div>
        <div className="mt-2 flex text-sm text-gray-400 underline underline-offset-2">
          <button
            className="ml-auto"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            로그아웃
          </button>
          <button className="ml-3" onClick={() => setIsResignModalOpen(true)}>
            회원탈퇴
          </button>
        </div>
        <div className="-mx-5 -mt-6 h-80 w-[360px] bg-[#f6f6f6]" />

        {/* 로그아웃 모달 */}
        {isLogoutModalOpen && (
          <ProfileModal
            title={"로그아웃"}
            content={"로그아웃하시겠습니까?"}
            setState={setIsLogoutModalOpen}
            onClickFunc={() => console.log("Log-out")}
          />
        )}
        {/* 회원탈퇴 모달 */}
        {isResignModalOpen && (
          <ProfileModal
            title={"회원탈퇴"}
            content={
              "탈퇴하면 현재 계정으로 작성한 글,\n댓글 등을 수정하거나 삭제할 수 없습니다.\n지금 탈퇴하시겠습니까?"
            }
            setState={setIsResignModalOpen}
            onClickFunc={() => console.log("Resigned")}
          />
        )}
        <Footer />
      </div>
    </div>
  );
}
