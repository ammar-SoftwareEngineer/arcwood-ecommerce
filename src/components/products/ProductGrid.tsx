"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard, {
  type BestSellerProduct,
  type MostViewedProduct,
} from "./ProductCard";

import "swiper/css";
import "swiper/css/navigation";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

export default function ProductGrid({ bestSeller, productBestSellerData, productMostViewedData }: { bestSeller?: boolean, productBestSellerData?: BestSellerProduct[], productMostViewedData?: MostViewedProduct[] }) {
  const locale = useLocale();
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  // Always resolve to an array to avoid undefined paths.
  const productsData = bestSeller
    ? (productBestSellerData ?? [])
    : (productMostViewedData ?? []);
  const loopEnabled = productsData.length >= 8;
  return (
    <section aria-label="Products slider" className="products-swiper ">
      <Swiper
        modules={[Autoplay, Navigation]}
        dir={locale === "ar" ? "rtl" : "ltr"}
        spaceBetween={40}
        slidesPerView={1}
        grabCursor
        navigation={{
          nextEl: nextButtonRef.current,
          prevEl: prevButtonRef.current,
        }}
        onBeforeInit={(swiper) => {
          const navigationOptions = swiper.params.navigation;
          if (!navigationOptions || navigationOptions === true) return;
          navigationOptions.prevEl = prevButtonRef.current;
          navigationOptions.nextEl = nextButtonRef.current;
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

            <div className="h-full  pb-1">
              <ProductCard item={product} />
            </div>

          </SwiperSlide>
        ))}
        <div className="swiper-buttons md:block hidden ">
          <button ref={nextButtonRef} type="button" className="swiper-button-next" aria-label="Next products">
            {locale === "ar" ? <IoIosArrowRoundBack size={20} /> : <IoIosArrowRoundForward size={20} />}
          </button>
          <button ref={prevButtonRef} type="button" className="swiper-button-prev" aria-label="Previous products">
            {locale === "ar" ? <IoIosArrowRoundForward size={20} /> : <IoIosArrowRoundBack size={20} />}
          </button>
        </div>

      </Swiper>
    </section>
  );
}
