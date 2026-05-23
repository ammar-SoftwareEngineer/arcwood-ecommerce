"use client";

import CategoryCard from "@/components/categories/CategoryCard";
import { type Category } from "@/lib/api/categories";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";



export default function CategoryGrid({ categories }: { categories: Category[] }) {


  return (
    <motion.div initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: 0.1 }}>
      <section className="hidden md:grid grid-cols-12 gap-8 justify-items-center">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
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
          loop={true}

          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            480: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
            1400: { slidesPerView: 4, spaceBetween: 28 },
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
    </motion.div>
  );
}
