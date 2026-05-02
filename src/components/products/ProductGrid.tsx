"use client";

import { useLocale } from "next-intl";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import products from "@/lib/data/arcwood-site-data.json";
import ProductCard from "./ProductCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductGrid() {
  const locale = useLocale();
  const productsData = products.mostViewedProducts;

  if (!productsData.length) {
    return (
      <section className="py-8 text-center text-sm text-neutral-500">
        {/* لا توجد منتجات في البيانات */}
      </section>
    );
  }

  return (
    <section aria-label="Products slider" className="products-swiper px-4 sm:px-8 lg:px-10">
      <Swiper
        modules={[Navigation, Pagination]}
        dir={locale === "ar" ? "rtl" : "ltr"}
        spaceBetween={24}
        slidesPerView={1}
        grabCursor
        navigation
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        breakpoints={{
          480: { slidesPerView: 1, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 28 },
          1280: { slidesPerView: 4, spaceBetween: 28 },
        }}
      
      >
        {productsData.map((product) => (
          <SwiperSlide key={product.name} >
            <div className="h-full pb-1">
              <ProductCard item={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
