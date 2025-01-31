import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import hotel_banner from "@/assets/img/image_hotel_banner.png";
import { useRouter } from "next/navigation";

export default function EventBanner() {
  const router = useRouter();
  return (
    <>
      <div className="ml-[-20px] w-[360px]">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0} // 슬라이드 간 간격
          slidesPerView={1} // 한 번에 보여지는 슬라이드 수
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          loop={true} // 슬라이드 반복
          autoplay={true}
        >
          <SwiperSlide>
            <button onClick={() => router.push("/yanolza/event")}>
              <img src={hotel_banner.src} alt="Banner 1" />
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button onClick={() => router.push("/yanolza/event")}>
              <img src={hotel_banner.src} alt="Banner 2" />
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button onClick={() => router.push("/yanolza/event")}>
              <img src={hotel_banner.src} alt="Banner 3" />
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button onClick={() => router.push("/yanolza/event")}>
              <img src={hotel_banner.src} alt="Banner 4" />
            </button>
          </SwiperSlide>
          <SwiperSlide>
            <button onClick={() => router.push("/yanolza/event")}>
              <img src={hotel_banner.src} alt="Banner 5" />
            </button>
          </SwiperSlide>
          <div
            className="swiper-pagination"
            style={{
              bottom: "3px", // 페이지네이션의 위치 조정
            }}
          />
        </Swiper>
      </div>
    </>
  );
}
