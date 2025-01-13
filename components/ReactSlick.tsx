"use client";

import React from "react";
import Slider from "react-slick";
import "@/styles/react-slick/slick-theme.css"; // slick-carousel CSS 추가
import "@/styles/react-slick/slick.css"; // slick-carousel 테마 CSS 추가
import Image from "next/image";

export default function ReactSlick({ dataImages }) {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: "progressive",
  };

  return (
    <div>
      <Slider {...settings}>
        {dataImages.map((item, index) => (
          <div key={index}>
            <Image
              src={item}
              alt={`Image ${index + 1}`}
              width={360}
              height={230}
              className="w-[360px] h-[230px]"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
