enum RoomType {
  STAY = "STAY",
  ALL = "ALL",
}

export type UseAccommodationQueryRes = Rooms[];

export interface UseAccommodationQueryArg {
  accommodationId: string;
  reservationStart: string;
  reservationEnd: string;
  capacity: number;
}

export interface Rooms {
  title: string;
  thunbnail: string;
  capacity: number;
  maxCapacity: number;
  minPrice: number;
  checkIn: string;
  checkOut: string;
  type: RoomType;
  // 아래는 RoomType에 따라 없을수도 있는 값
  dayUseMinPrice: number;
  dayUseTime: string;
}

export const roomType = {
  NORMAL: "NORMAL",
  DAY_USE: "DAY_USE",
};
