import { PaymentResponseDto } from "@/feature/payment/payment";
import { authFetch } from "@/lib/utils";

export const PaymentFetch = async ({
  reservationNumber,
}: {
  reservationNumber: string;
}): Promise<PaymentResponseDto | null> => {
  try {
    const response = await authFetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/payment?reservationNumber=${reservationNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
        credentials: "include",
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

// `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/payment?reservationNumber=${reservationNumber}`,

// const test = async () => {
//   const option = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: localStorage.getItem('accessToken'),
//     },
//     credentials: 'include',
//   }
//   // 아래 둘 선택하여 사용
//   const response = await authFetch('http://localhost:8080/api/test', option) // 1 옵션까지 같이 명시해서 사용

//   const response = await defaultAuthGetFetch('http://localhost:8080/api/test') // 2 기본 get 요청시에 사용
//   console.log('test response : ', response)
// }
