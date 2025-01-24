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

export interface UseReservationMutationArg {
  requestReservations: requestReservation[];
}

export type UseReservationMutationRes = ApiResponse<ReservationNumber>;

export interface ReservationNumber {
  reservationNumber: string;
}
