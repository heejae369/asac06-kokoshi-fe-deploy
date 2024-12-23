import NicknameInput from "@/components/NicknameInput";
// import dynamic from "next/dynamic";

// const NicknameInput = dynamic(() => import("@/components/NicknameInput"), {
//   ssr: false, // 서버 사이드 렌더링 비활성화
// });

export default function NicknamePage() {
  return (
    <div className="flex h-screen w-full justify-center bg-gray-100">
      <div className="w-[360px] bg-white px-5">
        <NicknameInput />
      </div>
    </div>
  );
}
