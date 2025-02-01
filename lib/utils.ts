import { useIsLoginState } from "@/feature/context/IsLoginContext";
import { clsx, type ClassValue } from "clsx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function defaultAuthGetFetch(url) {
  const option = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    credentials: "include",
  };
  return actualFetch(url, option);
}

export async function authFetch(url, option) {
  option.headers = {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("accessToken"),
  };
  return actualFetch(url, option);
}

export async function authFormFetch(url, option) {
  option.headers = {
    Authorization: localStorage.getItem("accessToken"),
  };
  return actualFetch(url, option);
}

async function actualFetch(url, option) {
  // 기본 요청
  const response = await fetch(url, option);

  // 토큰 만료
  if (response.status === 401) {
    // 리프레시 토큰으로 새로운 액세스 토큰을 요청
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/reissue`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    if (refreshResponse.ok) {
      const newAccessToken = refreshResponse.headers.get("authorization");
      // 새로운 액세스 토큰을 로컬 스토리지에 저장
      localStorage.setItem("accessToken", newAccessToken);

      option.headers.Authorization = newAccessToken;

      // 새로 발급된 액세스 토큰으로 원래 요청을 다시 시도
      const retryResponse = await fetch(url, option);

      return retryResponse;
    } else {
      localStorage.clear();
      window.location.href = "/users/login";
    }
  }

  if (response.status === 403) {
    localStorage.clear();
    window.location.href = "/users/login";
  }
  return response;
}

// 사용 예시

// const test = async () => {
//   const option = {
// method: 'GET',
// headers: {
//   'Content-Type': 'application/json',
//   Authorization: localStorage.getItem('accessToken'),
// },
// credentials: 'include',
//   }
//   // 아래 둘 선택하여 사용
//   const response = await authFetch('http://localhost:8080/api/test', option) // 1 옵션까지 같이 명시해서 사용

//   const response = await defaultAuthGetFetch('http://localhost:8080/api/test') // 2 기본 get 요청시에 사용
//   console.log('test response : ', response)
// }

export const useLoginGuard = () => {
  // const { email, isLogin } = useSelector((state: any) => state.login);
  const isLogin = useIsLoginState();
  const router = useRouter();
  useEffect(() => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      router.push("/users/login");
      // window.location.href = "/users/login";
    }
  }, [isLogin, router]);
};
