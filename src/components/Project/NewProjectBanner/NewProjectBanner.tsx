import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

import styles from './NewProjectBanner.module.css';

const NewProjectBanner = () => {
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const bannerImages = [
    { id: 1, src: '/project/source/yeomyeong_university.png', alt: 'yeomyeong university', projectId: 1 },
    { id: 2, src: '/project/source/70ee3a5f178bfc6ca21fca6d79b2fbb3267f62db.jpg', alt: 'Allnsight', projectId: 1 },
    { id: 3, src: '/project/source/23954657a411fac81780941a5630408453210919.png', alt: 'Campus', projectId: 1 },
    { id: 4, src: '/project/source/Allnsight.png', alt: 'Allnsight', projectId: 1 },
    { id: 5, src: '/project/source/Campus.png', alt: 'Campus', projectId: 1 },
  ];

  const toggleAutoPlay = () => {
    if (swiperRef.current) {
      if (isPlaying) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className={styles.bannerContainer} aria-label="새 프로젝트">
      <div className={styles.titleContainer}>
        <h2 className={styles.subtitle}>New Project</h2>
        <h1 className={styles.title}>최근 프로젝트</h1>
      </div>
      
      {/* 배너 이미지 슬라이더 */}
      <div className={styles.sliderWrapper}>
        <Swiper
          modules={[Autoplay, Pagination]}
                 slidesPerView={2.8}
                 spaceBetween={20}
          loop={true}
          centeredSlides={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={600}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
                 breakpoints={{
                   320: {
                     slidesPerView: 1.2,
                     spaceBetween: 12,
                   },
                   744: {
                     slidesPerView: 2,
                     spaceBetween: 16,
                   },
                   1660: {
                     slidesPerView: 2.8,
                     spaceBetween: 20,
                   },
                 }}
          className={styles.swiper}
        >
          {bannerImages.map((image) => (
            <SwiperSlide key={image.id} className={styles.swiperSlide}>
              <div 
                className={styles.bannerImageItem}
                onClick={() => router.push(`/project/${image.projectId}`)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  className={styles.bannerImage}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 재생/정지 버튼 */}
        <button
          className={styles.playPauseButton}
          onClick={toggleAutoPlay}
          aria-label={isPlaying ? '슬라이더 정지' : '슬라이더 재생'}
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
};

export default NewProjectBanner;
