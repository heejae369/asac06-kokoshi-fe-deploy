import {
  UseAddToCartMutationArg,
  UseAddToCartMutationRes,
} from "@/feature/cart/type/cart.type";
import { api } from "@/lib/api";

export const cartApi = api.injectEndpoints({
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
