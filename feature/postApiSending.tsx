import CustomFetch from "@/feature/CustomFetch";

export const postApiSendingTest = () => {
  //로컬스토리지 데이터 수집
  if (typeof window !== "undefined") {
    const keys = [
      "name",
      "email",
      "pw",
      "phone",
      "birth",
      "address",
      "gender",
      "interest",
      "nickname",
      "terms",
    ];
    // gender 값을 매핑하기 위한 객체
    const genderMap = {
      남성: "MALE",
      여성: "FEMALE",
      기타: "OTHER",
    };

    const requestData: Record<string, string | boolean> = {};
    keys.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value) {
        // gender 처리: Enum 값으로 변환
        if (key === "gender") {
          const mappedGender = genderMap[value];
          if (mappedGender) {
            requestData[key] = mappedGender; // Enum 값 저장
          } else {
            console.warn(`gender 값이 올바르지 않습니다: '${value}'`);
          }
        }
        // JSON 데이터 처리
        else if (value.startsWith("{") || value.startsWith("[")) {
          try {
            requestData[key] = JSON.parse(value); // JSON 파싱
          } catch (error) {
            console.warn(`'${key}' 데이터 파싱 중 오류 발생:`, error);
          }
        }
        // 일반 문자열 데이터
        else {
          requestData[key] = value;
        }
      } else {
        console.warn(`로컬 스토리지에 '${key}'에 해당하는 데이터가 없습니다.`);
      }
    });
    // const requestData: Record<string, string> = {};
    // keys.forEach((key) => {
    //   const value = localStorage.getItem(key);
    //   if (value) {
    //     requestData[key] = value; // JSON 형식이면 파싱
    //   } else {
    //     console.warn(`로컬 스토리지에 '${key}'에 해당하는 데이터가 없습니다.`);
    //   }
    // });
    // 최종 requestData 확인 (디버깅용)
    console.log("최종 requestData:", requestData);
    console.log(requestData);

    CustomFetch("/users/test", "POST", requestData);
  }
};
