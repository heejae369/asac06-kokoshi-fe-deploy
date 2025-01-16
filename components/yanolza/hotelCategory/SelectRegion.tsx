import hotel_seoul from "@/assets/img/image_hotel_seoul.png";
import hotel_chungcheong from "@/assets/img/image_hotel_chungcheong.png";
import hotel_gyeungsang from "@/assets/img/image_hotel_gyeungsang.png";
import hotel_jeonla from "@/assets/img/image_hotel_jeonla.png";
import hotel_gangwon from "@/assets/img/image_hotel_gangwon.png";
import hotel_jeju from "@/assets/img/image_hotel_jeju.png";

export default function SelectRegion() {
  return (
    <>
      <h2 className="mt-24 font-bold">지역 선택</h2>
      <div className="mt-4 flex h-60 w-full flex-wrap justify-center text-sm font-semibold">
        <button className="mx-3 mb-2 flex h-28 w-20 flex-wrap justify-center">
          <img
            className="size-20 rounded-full bg-slate-50"
            src={hotel_seoul.src}
            alt="image_seoul"
          />
          <p>서울/경인</p>
        </button>
        <button className="mx-3 flex h-28 w-20 flex-wrap justify-center">
          <img
            className="size-20 rounded-full bg-slate-50"
            src={hotel_chungcheong.src}
            alt="image_chungcheong"
          />
          <p>충청</p>
        </button>
        <button className="mx-3 flex h-28 w-20 flex-wrap justify-center">
          <img
            className="size-20 rounded-full bg-slate-50"
            src={hotel_gyeungsang.src}
            alt="image_gyeungsang"
          />
          <p>경상</p>
        </button>
        <button className="mx-3 flex h-28 w-20 flex-wrap justify-center">
          <img
            className="size-20 rounded-full bg-slate-50"
            src={hotel_jeonla.src}
            alt="image_jeonla"
          />
          <p>전라</p>
        </button>
        <button className="mx-3 flex h-28 w-20 flex-wrap justify-center">
          <img
            className="size-20 rounded-full bg-slate-50"
            src={hotel_gangwon.src}
            alt="image_gangwon"
          />
          <p>강원</p>
        </button>
        <button className="mx-3 flex h-28 w-20 flex-wrap justify-center">
          <img
            className="size-20 rounded-full bg-slate-50"
            src={hotel_jeju.src}
            alt="image_jeju"
          />
          <p>제주</p>
        </button>
      </div>
    </>
  );
}
