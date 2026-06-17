'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './NewsCarousel.module.css';

export default function NewsCarousel({ children }: { children: React.ReactNode[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: 1 });
  const [activeIndex, setActiveIndex] = useState(1);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setActiveIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={styles.carouselContainer}>
      <button 
        className={`${styles.navButton} ${styles.prevButton}`} 
        onClick={scrollPrev}
        aria-label="Previous"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {children.map((child, i) => (
            <div key={i} className={styles.emblaSlide}>
              <div className={styles.slideContent}>
                {child}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        className={`${styles.navButton} ${styles.nextButton}`} 
        onClick={scrollNext}
        aria-label="Next"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>

      <div className={styles.dots}>
        {children.map((_, i) => (
          <button 
            key={i} 
            className={`${styles.dot} ${i === activeIndex ? styles.activeDot : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
