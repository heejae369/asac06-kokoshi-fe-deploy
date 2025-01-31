import { ReservationNumber } from "@/feature/reservation/type/reservation.type";
import { authFetch } from "@/lib/utils";

interface KakaoPayRequestBody {
  reservationNumber: ReservationNumber;
}

export const KakaoPayReady = async ({
  requestBody,
}: {
  requestBody: KakaoPayRequestBody;
}): Promise<PaymentResponse | undefined> => {
  try {
    const response = await authFetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/kakaoPay/ready`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: PaymentResponse = await response.json();
    return data;
  } catch (err) {
    console.error("Error during KakaoPay request:", err);
    return undefined;
  }
};
