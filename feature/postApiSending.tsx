import CustomFetch from "@/feature/CustomFetch";

export const postApiSendingTest = () => {
  //로컬스토리지 데이터 수집
  if (typeof window !== "undefined") {
    const keys = [
      "gender",
      "interest",
      "nickname",
      "birth",
      "address",
      "terms",
    ];
    const requestData: Record<string, string> = {};
    keys.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value) {
        requestData[key] = value; // JSON 형식이면 파싱
      } else {
        console.warn(`로컬 스토리지에 '${key}'에 해당하는 데이터가 없습니다.`);
      }
    });
    // 최종 requestData 확인 (디버깅용)
    console.log("최종 requestData:", requestData);

    CustomFetch("/users/api", "POST", requestData);
  }
};
