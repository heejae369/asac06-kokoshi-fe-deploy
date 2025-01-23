interface KakaoPayRequestBody {
  quantity: number;
  totalAmount: number;
}

export const KakaoPayReady = async ({
  requestBody,
}: {
  requestBody: KakaoPayRequestBody;
}): Promise<PaymentResponse | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/kakaoPay/ready`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
