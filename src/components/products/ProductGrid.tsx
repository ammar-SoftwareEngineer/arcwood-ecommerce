"use client";

import { useLocale } from "next-intl";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard, {
  type BestSellerProduct,
  type MostViewedProduct,
} from "./ProductCard";

import "swiper/css";

export default function ProductGrid({ bestSeller, productBestSellerData, productMostViewedData }: { bestSeller?: boolean, productBestSellerData?: BestSellerProduct[], productMostViewedData?: MostViewedProduct[] }) {
  const locale = useLocale();
  // Always resolve to an array to avoid undefined paths.
  const productsData = bestSeller
    ? (productBestSellerData ?? [])
    : (productMostViewedData ?? []);
  const loopEnabled = productsData.length >= 8;
  return (
    <section aria-label="Products slider" className="products-swiper ">
      <Swiper
        modules={[Autoplay]}
        dir={locale === "ar" ? "rtl" : "ltr"}
        spaceBetween={40}
        slidesPerView={1}
        grabCursor
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
           
            <div className="h-full  pb-1">
              <ProductCard item={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
