const RECENT_SEARCHES_KEY = "recentSearch"; // 로컬스토리지 키
const MAX_RECENT_SEARCHES = 10; // 최대 검색어 저장 개수

const isValidSearchTerm = (term) => {
  // 1. null 또는 빈 문자열인 경우 false 반환
  if (term === null || term === "") return false;

  return true;
};

// 검색어를 로컬스토리지에 추가
export const addRecentSearches = (newSearchTerm) => {
  // 1. 유효한 검색어인지 확인 (null 또는 빈 문자열 제외)
  if (!isValidSearchTerm(newSearchTerm)) {
    console.log("Invalid search term:", newSearchTerm);
    return; // 유효하지 않으면 저장하지 않음
  }

  // 2. 로컬스토리지에서 기존 검색어 불러오기
  const storedSearches =
    JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || [];

  // 3. 중복 제거 및 새로운 검색어 추가
  const updatedSearches = [
    newSearchTerm,
    ...storedSearches.filter((term) => term !== newSearchTerm),
  ];

  // 4. 최대 길이 제한 (오래된 검색어 삭제)
  if (updatedSearches.length > MAX_RECENT_SEARCHES) {
    updatedSearches.pop(); // 배열의 마지막 요소 제거
  }

  // 5. 업데이트된 목록을 다시 로컬스토리지에 저장
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
};

// 로컬스토리지에서 검색어 가져오기
export const getRecentSearches = () => {
  if (typeof window === "undefined") {
    // 서버 측에서는 빈 배열 반환
    return [];
  }
  return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || [];
};

// 로컬스토리지의 검색어 초기화
export const clearRecentSearches = () => {
  localStorage.removeItem(RECENT_SEARCHES_KEY);
};
