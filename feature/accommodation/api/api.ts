import {
  UseAccommodationRoomDetailArg,
  UseAccommodationRoomDetailRes,
  UseAccommodationRoomListRes,
  UseAccommodationDetailQueryArg,
  UseAccommodationDetailQueryRes,
  UseAccommodationRoomListArg,
  UseAccommodationImagesRes,
  UseAccommodationImagesArg,
  UseAccommodationRoomImagesRes,
  UseAccommodationRoomImagesArg,
} from "@/feature/accommodation/type/accommodation.type";
import { api } from "@/lib/api";

export const accommodationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    accommodationDetail: builder.query<
      UseAccommodationDetailQueryRes,
      UseAccommodationDetailQueryArg
    >({
      query: ({ requestAccommodationDetail }) => {
        return {
          url: `/api/accommodation/${requestAccommodationDetail.accommodationId}`,
        };
      },
    }),

    accommodationRoomList: builder.query<
      UseAccommodationRoomListRes,
      UseAccommodationRoomListArg
    >({
      query: ({ requestAccommodationRoomList }) => {
        return {
          // url: `/api/accommodation/${requestAccommodationRoomList.accommodationId}/roomList`,
          url: `/api/room/${requestAccommodationRoomList.accommodationId}/roomList`,
          params: requestAccommodationRoomList,
          method: "GET",
        };
      },
    }),

    //requestAccommodationRoomDetail
    accommodationRoomDetail: builder.query<
      UseAccommodationRoomDetailRes,
      UseAccommodationRoomDetailArg
    >({
      query: ({ requestAccommodationRoomDetail }) => {
        return {
          url: `/api/room/${requestAccommodationRoomDetail.roomId}`,
          params: requestAccommodationRoomDetail,
          method: "GET",
        };
      },
    }),

    accommodationImages: builder.query<
      UseAccommodationImagesRes,
      UseAccommodationImagesArg
    >({
      query: ({ requestAccommodationImages }) => {
        return {
          // url: `/api/accommodation/${requestAccommodationRoomList.accommodationId}/roomList`,
          url: `/api/accommodation/${requestAccommodationImages.accommodationId}/images`,
          params: requestAccommodationImages,
          method: "GET",
        };
      },
    }),

    accommodationRoomImages: builder.query<
      UseAccommodationRoomImagesRes,
      UseAccommodationRoomImagesArg
    >({
      query: ({ requestAccommodationRoomImages }) => {
        return {
          url: `/api/room/images`,
          params: requestAccommodationRoomImages,
          method: "GET",
        };
      },
    }),
  }),
});
