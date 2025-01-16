import {
  ApiResponse,
  Pageable,
  Slice,
} from "@/feature/common/types/apiResponse";

export enum RoomType {
  STAY = "STAY",
  ALL = "ALL",
}

export interface requestAccommodationDetail {
  accommodationId: string;
}

export interface UseAccommodationDetailQueryArg {
  requestAccommodationDetail: requestAccommodationDetail;
}

export type UseAccommodationDetailQueryRes = ApiResponse<AccommodationDetail>;

export interface AccommodationDetail {
  name: string;
  rating: number;
  totalReview: number;
  accommodationCategory: string;
}

// -----------------------------------------------

export interface requestAccommodationImages extends Pageable {
  accommodationId: string;
}

export interface UseAccommodationImagesArg {
  requestAccommodationImages: requestAccommodationImages;
}

export type UseAccommodationImagesRes = ApiResponse<Slice<SlideImage>>;

export interface requestAccommodationRoomImages extends Pageable {
  roomId: string;
}

export interface UseAccommodationRoomImagesArg {
  requestAccommodationRoomImages: requestAccommodationRoomImages;
}
export type UseAccommodationRoomImagesRes = ApiResponse<Slice<SlideImage>>;

export interface SlideImage {
  imageUrl: string;
}

// -----------------------------------------------

// accmmondation - roomList
export interface requestAccommodationRoomList {
  accommodationId: string;
  startDate: string;
  endDate: string;
  capacity: number;
}
export interface UseAccommodationRoomListArg {
  requestAccommodationRoomList: requestAccommodationRoomList;
}
export type UseAccommodationRoomListRes = ApiResponse<Room[]>;

// accmmondationRoom - datail
export interface requestAccommodationRoomDetail {
  roomId: string;
  startDate: string;
  endDate: string;
  capacity: number;
}
export interface UseAccommodationRoomDetailArg {
  requestAccommodationRoomDetail: requestAccommodationRoomDetail;
}
export type UseAccommodationRoomDetailRes = ApiResponse<Room>;

export interface Room {
  roomId: number;
  name: string;
  comment: string;
  thumbnail: string;
  capacity: number;
  maxCapacity: number;
  minPrice: number;
  checkIn: string;
  checkOut: string;
  roomType: string;
  availableQuantity: number | null;
  dayUseInfo: {
    dayUseMinPrice: number;
    dayUseTime: number;
    dayUseStartTime: string | null;
    dayUseEndTime: string | null;
    dayUseAvailableQuantity: number | null;
  } | null;
}

export const accommodationCategory = {
  HOTEL: "호텔",
  MOTEL: "모텔",
  PENSION: "펜션",
  RESORT: "리조트",
  GUESTHOUSE: "게스트하우스",
};
