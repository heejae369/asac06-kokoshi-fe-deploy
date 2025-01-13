import {
  ApiResponse,
  Page,
  Pageable,
  Slice,
} from "@/feature/common/types/apiResponse";

export enum RoomType {
  STAY = "STAY",
  ALL = "ALL",
}

// export enum AccommodationCategory {
//   HOTEL = "호텔",
//   MOTEL = "모텔",
//   PENSION = "펜션",
//   RESORT = "리조트",
//   GUESTHOUSE = "게스트하우스",
// }

// accommodation - detail
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
export type UseAccommodationImagesRes = ApiResponse<Slice<AccommodationImage>>;

export interface AccommodationImage {
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
  reservationStart: string;
  reservationEnd: string;
  capacity: number;
}
export interface UseAccommodationRoomDetailArg {
  requestAccommodationRoomDetail: requestAccommodationRoomDetail;
}
export type UseAccommodationRoomDetailRes = ApiResponse<Room>;
// export interface RoomDetail {
export interface Room {
  roomId: number;
  name: string;
  comment: string;
  thumbnail: string;
  capacity: number;
  maxCapacity: number;
  //숙박은 default
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

// export const roomType = {
//   STAY: "STAY",
//   ALL: "ALL",
// };

// export interface Rooms {
//   title: string;
//   thunbnail: string;
//   capacity: number;
//   maxCapacity: number;
//   minPrice: number;
//   checkIn: string;
//   checkOut: string;
//   type: RoomType;
//   // 아래는 RoomType에 따라 없을수도 있는 값
//   dayUseMinPrice: number;
//   dayUseTime: string;
// }
