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
export default function SelectRegion() {
  const router = useRouter();
  const regions: Region[] = [
    {
      region: "서울/경인",
      url: "/search?search=서울경인",
      img: hotel_seoul.src,
    },
    {
      region: "충청",
      url: "/search?search=충청",
      img: hotel_chungcheong.src,
    },
    {
      region: "경상",
      url: "/search?search=경상",
      img: hotel_gyeungsang.src,
    },
    {
      region: "전라",
      url: "/search?search=전라",
      img: hotel_jeonla.src,
    },
    {
      region: "강원",
      url: "/search?search=강원",
      img: hotel_gangwon.src,
    },
    { region: "제주", url: "/search?jeju", img: hotel_jeju.src },
  ];
  return (
    <>
      <h2 className="mt-24 font-bold">지역 선택</h2>
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
