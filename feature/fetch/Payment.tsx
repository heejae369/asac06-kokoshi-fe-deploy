export const PaymentFetch = async ({
  reservationNumber,
}: {
  reservationNumber: string;
}): Promise<PaymentResponse | undefined> => {
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

    const data: PaymentResponse = await response.json();
    return data;
  } catch (err) {
    console.error("Error during KakaoPay request:", err);
    return undefined;
  }
};
