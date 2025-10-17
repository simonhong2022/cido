import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Swiper 스타일
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from "./InterviewCards.module.css";

const InterviewCards = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Figma 디자인 데이터
  const interviews = [
    {
      id: 1,
      designer: "최하은, 이학민, 김시은",
      category: "#Branding #Graphic",
      description: "디자이너에 대한 설명입니다.",
      src: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/738a5e8a-1a2e-4eb5-b65d-9ac3009ec2a6",
    },
    {
      id: 2,
      designer: "심현영",
      category: "#Branding #Graphic",
      description: "디자이너에 대한 설명입니다.",
      src: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/52d252c5-0b49-4225-a908-79bfb7f2c148",
    },
    {
      id: 3,
      designer: "박소현",
      category: "#Branding #UXUI",
      description: "디자이너에 대한 설명입니다.",
      src: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/2c50b667-e35f-4ca3-a3b7-1f7ed39ee9db",
    },
    {
      id: 4,
      designer: "최림",
      category: "#illustration #Graphic",
      description: "디자이너에 대한 설명입니다.",
      src: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/070b74ba-19a6-411d-956c-38acc3dc1854",
    },
    {
      id: 5,
      designer: "김아름",
      category: "#Product",
      description: "디자이너에 대한 설명입니다.",
      src: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d33aef1f-53a8-408e-805b-3e7c79870f18",
    },
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
    <div className={styles.interviewCardsContainer}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={24}
        slidesPerView={4}
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
          dynamicBullets: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          744: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1660: {
            slidesPerView: 4,
          },
        }}
        className={styles.swiper}
      >
        {interviews.map((interview) => (
          <SwiperSlide key={interview.id} className={styles.swiperSlide}>
            <div className={styles.cardWrapper}>
              <div className={styles.interviewCard}>
                <img
                  src={interview.src}
                  alt={interview.designer}
                  className={styles.cardImage}
                />
                <div className={styles.cardOverlay}>
                  <p className={styles.cardDescription}>
                    {interview.description}
                  </p>
                </div>
              </div>
              <h3 className={styles.designerName}>{interview.designer}</h3>
              <p className={styles.category}>{interview.category}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 재생/정지 버튼 */}
      <button
        className={`${styles.playPauseButton} ${isPlaying ? styles.playing : styles.paused}`}
        onClick={toggleAutoPlay}
        aria-label={isPlaying ? '갤러리 정지' : '갤러리 재생'}
        type="button"
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
  );
};

export default InterviewCards;
