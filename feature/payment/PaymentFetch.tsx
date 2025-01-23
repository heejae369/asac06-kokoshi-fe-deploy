import { PaymentResponseDto } from "@/feature/payment/payment";

export const PaymentFetch = async ({
  reservationNumber,
}: {
  reservationNumber: string;
}): Promise<PaymentResponseDto | null> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/payment?reservationNumber=${reservationNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: PaymentResponseDto = await response.json(); // 이곳에서 반환하는 데이터 타입을 PaymentResponseDto로 맞춥니다
    return data; // 정상적으로 데이터를 반환
  } catch (err) {
    console.error("Error during KakaoPay request:", err);
    return null; // 오류 발생 시 null 반환
  }
};
