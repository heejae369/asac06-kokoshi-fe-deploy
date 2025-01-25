export interface paymentProducts {
  roomImage: string;
  roomName: string;
  reservationRoomPrice: number;
  reservationRoomStartTime: string;
  reservationRoomEndTime: string;
  reservationRoomStartDate: string;
  reservationRoomEndDate: string;
  reservationRoomCapacity: number;
  reservationRoomMaxCapacity: number;
}

export interface PaymentResponseDto {
  paymentProducts: paymentProducts[];
  accommodationCategory: string;
  paymentMethod: string;
  paymentAt: string;
  paymentStatus: string;
  reservationNumber: string;
}
