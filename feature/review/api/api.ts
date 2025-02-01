import {
  UseAccommodationReviewQueryArg,
  UseAccommodationReviewRes,
  UseAccommodationReviewStatisticsQueryArg,
  UseAccommodationReviewStatisticsRes,
} from "@/feature/review/type/review.type";
import { authApi } from "@/lib/api";

export const reviewApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    accommodationReview: builder.query<
      UseAccommodationReviewRes,
      UseAccommodationReviewQueryArg
    >({
      query: ({ requestAccommodationReview }) => {
        return {
          url: `/api/review/${requestAccommodationReview.accommodationId}`,
          params: requestAccommodationReview,
          method: "GET",
        };
      },
    }),

    accommodationReviewStatistics: builder.query<
      UseAccommodationReviewStatisticsRes,
      UseAccommodationReviewStatisticsQueryArg
    >({
      query: ({ requestAccommodationReviewStatistics }) => {
        return {
          url: `/api/review/${requestAccommodationReviewStatistics.accommodationId}/reviewStatistics`,
          params: requestAccommodationReviewStatistics,
          method: "GET",
        };
      },
    }),
  }),
});
