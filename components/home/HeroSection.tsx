"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import slider1 from "@/public/slider/slider1.webp";
import slider2 from "@/public/slider/slider2.webp";
import styles from "@/styles/home/HeroSection.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const COLS = 4;
const STAGGER = 70;
const ANIM_MS = 450;
const HOLD_MS = 3000;
const blindImageOffsetClasses = [
  styles.blindImage0,
  styles.blindImage1,
  styles.blindImage2,
  styles.blindImage3,
];

const slides = [{ image: slider1.src }, { image: slider2.src }];

interface BlindState {
  image: string;
  open: boolean;
  direction: "next" | "prev";
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [bgImage, setBgImage] = useState(slides[0].image);
  const [blinds, setBlinds] = useState<BlindState[]>([]);
  const busy = useRef(false);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const staggerTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    if (autoTimer.current) {
      clearTimeout(autoTimer.current);
      autoTimer.current = null;
    }
    staggerTimers.current.forEach(clearTimeout);
    staggerTimers.current = [];
  }, []);

  const goTo = useCallback(
    (nextIdx: number, curIdx: number, direction: "next" | "prev") => {
      if (nextIdx === curIdx || busy.current) return;
      busy.current = true;
      clearTimers();

      const nextSlide = slides[nextIdx];

      const initialBlinds: BlindState[] = Array.from({ length: COLS }, () => ({
        image: nextSlide.image,
        open: false,
        direction,
      }));
      setBlinds(initialBlinds);

      const timers: ReturnType<typeof setTimeout>[] = [];
      for (let i = 0; i < COLS; i += 1) {
        const openIndex = direction === "prev" ? COLS - 1 - i : i;
        const t = setTimeout(() => {
          setBlinds((prev) =>
            prev.map((blind, idx) => (idx === openIndex ? { ...blind, open: true } : blind))
          );
        }, i * STAGGER + 30);
        timers.push(t);
      }
      staggerTimers.current = timers;

      const totalDuration = COLS * STAGGER + ANIM_MS + 100;
      const endTimer = setTimeout(() => {
        setBgImage(nextSlide.image);
        setBlinds([]);
        setCurrent(nextIdx);
        busy.current = false;
      }, totalDuration);

      staggerTimers.current.push(endTimer);
    },
    [clearTimers]
  );

  const scheduleAuto = useCallback(
    (curIdx: number) => {
      if (autoTimer.current) clearTimeout(autoTimer.current);
      autoTimer.current = setTimeout(() => {
        goTo((curIdx + 1) % slides.length, curIdx, "next");
      }, HOLD_MS);
    },
    [goTo]
  );

  useEffect(() => {
    scheduleAuto(current);
  }, [current, scheduleAuto]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const handlePrev = () => {
    const prev = (current - 1 + slides.length) % slides.length;
    goTo(prev, current, "prev");
  };

  const handleNext = () => {
    const next = (current + 1) % slides.length;
    goTo(next, current, "next");
  };

  return (
    <section className={styles.wrapper + " h-[60vh] md:h-screen "}>
      <div className={styles.bg} style={{ backgroundImage: `url(${bgImage})` }} />

      {blinds.length > 0 && (
        <div className={styles.blindsContainer}>
          {blinds.map((blind, i) => (
            <div
              key={`${blind.image}-${i}`}
              className={`${styles.blind} ${
                blind.direction === "prev" ? styles.blindFromPrev : styles.blindFromNext
              } ${blind.open ? styles.blindOpen : ""}`}
            >
              <span
                className={`${styles.blindImage} ${blindImageOffsetClasses[i] ?? styles.blindImage0}`}
                style={{ backgroundImage: `url(${blind.image})` }}
              />
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <FaChevronLeft size={25} className="text-main cursor-pointer transition-colors hover:text-black!" />
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={handleNext}
        aria-label="Next slide"
      >
   <FaChevronRight size={25} className="text-main cursor-pointer transition-colors hover:text-black!" />
      </button>

     
    </section>
  );
}
