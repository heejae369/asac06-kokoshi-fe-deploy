import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    return headers;
  },
});

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  baseQuery,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: ["todos"],
  /**
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
});

//---------------------------------------------------------------------------

const mutex = new Mutex();

const baseAuthQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken") || undefined;
    if (token) {
      headers.set("Authorization", token);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock(); // 다른 요청의 토큰 갱신이 끝날 때까지 대기
  let result = await baseAuthQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire(); // 다른 요청과 충돌 방지
      try {
        // 리프레시 토큰을 사용하여 새 액세스 토큰 요청
        const refreshResult = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/reissue`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (refreshResult.ok) {
          const newAccessToken = refreshResult.headers.get("authorization");
          localStorage.setItem("accessToken", newAccessToken);

          // 새 토큰으로 원래 요청 재시도
          result = await baseAuthQuery(args, api, extraOptions);
        } else {
          localStorage.clear();
          window.location.href = "/users/login"; // 로그인 페이지로 이동
        }
      } finally {
        release(); // 뮤텍스 해제
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions); // 다른 요청이 토큰을 갱신하면 다시 시도
    }
  }

  return result;
};

// -----------------------------------------------

export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
