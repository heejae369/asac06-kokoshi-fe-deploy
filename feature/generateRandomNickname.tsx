export const generateRandomNickname = () => {
  const adjectives = [
    "발랄한",
    "귀여운",
    "똑똑한",
    "용감한",
    "행복한",
    "재밌는",
    "따뜻한",
    "차가운",
    "쾌활한",
    "기분좋은",
    "용맹한",
  ];
  const nouns = [
    "바나나",
    "고양이",
    "호랑이",
    "햄스터",
    "도마뱀",
    "토끼",
    "강아지",
    "곰돌이",
    "용가리",
    "티라노사우로스",
  ];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 100); // 0부터 99까지 숫자

  return `${randomAdjective}${randomNoun}${randomNumber}`;
};
