export const dataArray = (searchResultData, selectedArray) => {
  const sortedData = [...searchResultData]; // 데이터 복사

  if (selectedArray === "리뷰 많은 순") {
    sortedData.sort((a, b) => b.reviewCount - a.reviewCount); // 리뷰 개수 기준 내림차순 정렬
  } else if (selectedArray === "평점 높은 순") {
    sortedData.sort((a, b) => b.star - a.star); // 평점 기준 내림차순 정렬
  } else if (selectedArray === "낮은 가격 순") {
    sortedData.sort((a, b) => a.price - b.price); // 가격 기준 오름차순 정렬 (낮은 가격 순)
  } else if (selectedArray === "높은 가격 순") {
    sortedData.sort((a, b) => b.price - a.price); // 가격 기준 내림차순 정렬 (높은 가격 순)
  }

  return sortedData;
};
