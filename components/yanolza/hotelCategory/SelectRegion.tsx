import hotel_seoul from "@/assets/img/image_hotel_seoul.png";
import hotel_chungcheong from "@/assets/img/image_hotel_chungcheong.png";
import hotel_gyeungsang from "@/assets/img/image_hotel_gyeungsang.png";
import hotel_jeonla from "@/assets/img/image_hotel_jeonla.png";
import hotel_gangwon from "@/assets/img/image_hotel_gangwon.png";
import hotel_jeju from "@/assets/img/image_hotel_jeju.png";
import { useRouter } from "next/navigation";

interface Region {
  region: string;
  url: string;
  img: string;
}
export default function SelectRegion({ category }) {
  const router = useRouter();
  const url = (region: string) => {
    return `/search?search=${region}&category=${category}`;
  };
  const regions: Region[] = [
    {
      region: "서울",
      url: url("서울"),
      img: hotel_seoul.src,
    },
    {
      region: "경기",
      url: url("경기"),
      img: "/images/Gyeonggi-do.png",
    },
    {
      region: "인천",
      url: url("인천"),
      img: "/images/Incheon.png",
    },
    {
      region: "충청",
      url: url("충청"),
      img: hotel_chungcheong.src,
    },
    {
      region: "경상",
      url: url("경상"),
      img: hotel_gyeungsang.src,
    },
    {
      region: "전라",
      url: url("전라"),
      img: hotel_jeonla.src,
    },
    {
      region: "강원",
      url: url("강원"),
      img: hotel_gangwon.src,
    },
    { region: "제주", url: url("제주"), img: hotel_jeju.src },
  ];
  return (
    <>
      <h2 className="mt-2 font-bold">지역 선택</h2>
      <div className="mt-4 flex h-auto w-full flex-wrap justify-center text-sm font-semibold">
        {regions.map((region, index) => (
          <button
            key={index}
            className="mx-3 mb-2 flex h-28 w-20 flex-wrap justify-center"
            onClick={() => router.push(region.url)}
          >
            <img
              className="size-20 rounded-full bg-slate-50"
              src={region.img}
              alt="image_seoul"
            />
            <p>{region.region}</p>
          </button>
        ))}
      </div>
    </>
  );
}
