import {
  UseReservationMutationArg,
  UseReservationMutationRes,
  UseRoomInfoForReserveArg,
  UseRoomInfoForReserveRes,
} from "@/feature/reservation/type/reservation.type";
import { api } from "@/lib/api";

export const reservationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    reservation: builder.mutation<
      UseReservationMutationRes,
      UseReservationMutationArg
    >({
      query: ({ requestReservations }) => {
        return {
          url: "/api/reservation",
          body: requestReservations,
          method: "POST",
        };
      },
    }),

    roomInfoForReserve: builder.query<
      UseRoomInfoForReserveRes,
      UseRoomInfoForReserveArg
    >({
      query: ({ requestRoomInfoForReserve }) => {
        return {
          url: `/api/room/reserve/${requestRoomInfoForReserve.roomId}`,
          params: requestRoomInfoForReserve,
          method: "GET",
        };
      },
    }),
  }),
});
