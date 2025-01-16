import {
  ApiResponse,
  Pageable,
  Slice,
} from "@/feature/common/types/apiResponse";

export interface requestAccommodationReview extends Pageable {
  accommodationId: string;
}

export interface UseAccommodationReviewQueryArg {
  requestAccommodationReview: requestAccommodationReview;
}

export type UseAccommodationReviewRes = ApiResponse<Slice<Review>>;

export interface Review {
  nickName: string;
  roomName: string;
  rate: number;
  content: string;
  createDate: string;
  reviewPhoto: string[];
}

export interface requestAccommodationReviewStatistics {
  accommodationId: string;
}

export interface UseAccommodationReviewStatisticsQueryArg {
  requestAccommodationReviewStatistics: requestAccommodationReviewStatistics;
}

export type UseAccommodationReviewStatisticsRes = ApiResponse<
  ReviewStatistics[]
>;

export interface ReviewStatistics {
  rate: number;
  rateCount: number;
}
