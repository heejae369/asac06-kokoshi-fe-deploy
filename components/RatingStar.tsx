import Image from "next/image";
import starFull from "@/assets/starFull.png";
import starEmpty from "@/assets/starEmpty.png";

// 별점 계산 함수
export const RatingStars = (rating: number) => {
  const roundedRating = Math.round(rating); // 반올림된 별의 개수
  const fullStars = roundedRating; // 채워진 별의 개수 (반올림 후)
  const emptyStars = 5 - fullStars; // 빈 별의 개수

  const stars: JSX.Element[] = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Image
        key={`full-${i}`}
        src={starFull}
        alt="full star"
        width={12}
        height={12}
      />
    ); // 채워진 별
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Image
        key={`empty-${i}`}
        src={starEmpty}
        alt="empty star"
        width={12}
        height={12}
      />
    ); // 빈 별
  }

  return stars; // 별 이미지 배열을 반환
};
