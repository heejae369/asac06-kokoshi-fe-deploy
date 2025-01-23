export interface PaymentRoom {
  roomImage: string;
  roomName: string;
  reservationRoomPrice: number;
  reservationRoomStartTime: string;
  reservationRoomEndTime: string;
  reservationRoomStartDate: string;
  reservationRoomEndDate: string;
}

export interface PaymentResponseDto {
  paymentRooms: PaymentRoom[];
  accommodationCategory: string;
  paymentMethod: string;
  paymentAt: string;
  paymentStatus: string;
  reservationNumber: string;
}
