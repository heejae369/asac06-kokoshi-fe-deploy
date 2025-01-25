import { ApiResponse } from "@/feature/common/types/apiResponse";

export interface requestReservation {
  roomId: number;
  cartId?: number;
  capacity: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  reservationType: string;
}

export interface requestReservations {
  reservationRequestList: requestReservation[];
  reserveUser: string;
  reserveUserPhone: string;
}

export interface UseReservationMutationArg {
  requestReservations: requestReservations;
}

export type UseReservationMutationRes = ApiResponse<ReservationNumber>;

export interface ReservationNumber {
  reservationNumber: string;
}

export interface roomInfoForReserve {
  category: string;
  accommodationName: string;
  roomName: string;
  capacity: number;
  maxCapacity: number;
  price: number;
}

export interface requestRoomInfoForReserve {
  roomId: string;
  startDate: string;
  endDate: string;
  reservationType: string;
}
export interface UseRoomInfoForReserveArg {
  requestRoomInfoForReserve: requestRoomInfoForReserve;
}

export type UseRoomInfoForReserveRes = ApiResponse<roomInfoForReserve>;
