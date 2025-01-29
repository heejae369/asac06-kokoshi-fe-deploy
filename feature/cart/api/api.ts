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
