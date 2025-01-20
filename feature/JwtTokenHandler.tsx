import JwtPostApi from "@/feature/JwtPostApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function JwtTokenHandler() {
  const router = useRouter();

  useEffect(() => {
    // local storage에 저장된 accesssToken 추출
    const accessToken = localStorage.getItem("accessToken");

    // 만약 accessToken이 없다면 로그인 페이지로 리디렉션
    if (!accessToken) {
      console.log("accessToken이 존재하지 않음");
      router.push("/users/login");
    } else
      JwtPostApi({
        accessToken,
        router,
      });
  });
}
