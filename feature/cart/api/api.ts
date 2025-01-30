import {
  UseAddToCartMutationArg,
  UseAddToCartMutationRes,
} from "@/feature/cart/type/cart.type";
import { authApi } from "@/lib/api";

export const cartApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    addCart: builder.mutation<UseAddToCartMutationRes, UseAddToCartMutationArg>(
      {
        query: ({ requestAddToCart }) => {
          return {
            url: "/api/cart/addToCart",
            body: requestAddToCart,
            method: "POST",
          };
        },
      }
    ),
  }),
});

export const cartCountApi = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/kakaoPay/ready`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 일단 유저 예시임 토큰으로 바꿔야 하지 않나?
        body: JSON.stringify({ userId: 1 }),
      }
    );

    if (!response.ok) {
      throw new Error("장바구니 개수를 가져오는 데 실패했습니다.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("장바구니 개수 가져오기 실패:", error);
  }
};
