"use client";

import Image from "next/image";
import slider1 from "@/public/slider/slider1.webp";
import slider2 from "@/public/slider/slider2.webp";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  { src: slider1, alt: "Arcwood furniture slider one" },
  { src: slider2, alt: "Arcwood furniture slider two" },
];

export default function HeroSection() {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="h-[260px] md:h-[420px] lg:h-[calc(100vh-70px)]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.alt}>
            <Image
              src={slide.src}
              alt={slide.alt}
              className="h-full w-full object-cover"
              
             
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
