import { ApiResponse } from "@/feature/common/types/apiResponse";

export interface requestAddToCart {
  roomId: number;
  // capacity: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  reservationType: string;
}

export interface UseAddToCartMutationArg {
  requestAddToCart: requestAddToCart;
}

export type UseAddToCartMutationRes = ApiResponse<any>;
