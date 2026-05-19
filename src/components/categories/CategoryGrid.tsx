"use client";

import siteData from "@/lib/data/site.json";
import CategoryCard, { type CardCategory } from "@/components/categories/CategoryCard";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function CategoryGrid() {
  const categories: CardCategory[] = siteData.mainCategories;

  return (
    <>
      <section className="hidden md:grid grid-cols-12 gap-7 justify-items-center">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.name}
            category={category}
            index={index}
            variant="grid"
          />
        ))}
      </section>

      <section className="md:hidden w-full overflow-visible px-4 pb-8">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView="auto"
          loop={categories.length > 2}

          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="category-swiper "
        >
          {categories.map((category, index) => (
            <SwiperSlide
              key={category.name}

            >
              <CategoryCard
                category={category}
                index={index}
                variant="slider"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
