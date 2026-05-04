"use client";

import { useLocale } from "next-intl";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import products from "@/lib/data/arcwood-site-data.json";
import ProductCard from "./ProductCard";

import "swiper/css";
import "swiper/css/navigation";

export default function ProductGrid() {
  const locale = useLocale();
  const productsData = products.mostViewedProducts;
  const loopEnabled = productsData.length >= 8;
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <section aria-label="Products slider" className="products-swiper ">
      <Swiper
        modules={[Navigation, Autoplay]}
        dir={locale === "ar" ? "rtl" : "ltr"}
        spaceBetween={40}
        slidesPerView={1}
        grabCursor
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        loop={loopEnabled}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          480: { slidesPerView: 1, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 28 },
          1280: { slidesPerView: 4, spaceBetween: 28 },
        }}
        observer
        observeParents
      >
        {productsData.map((product, index) => (
          <SwiperSlide key={`${product.name}-${index}`} >
            <div className="h-full min-w-0 pb-1">
              <ProductCard item={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
