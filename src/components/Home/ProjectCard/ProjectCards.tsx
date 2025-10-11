import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Swiper 스타일
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from "./ProjectCards.module.css";

const ProjectCards = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // source 폴더의 순수한 배경 이미지 사용 (텍스트 없음)
  const projects = [
    {
      id: 1,
      title: "루이스바라간 폰트 제작",
      designer: "박소현",
      description: "프로젝트 1에 대한 간단한 설명입니다.",
      backgroundSrc: "/Cido Web_img/source/5bb62a1cde6bfd183f7ccfed3b76c4a324e73a5a.jpg",
      bookmarkIcon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4750200c-1ecd-48c7-a576-facf929eb776",
      heartIcon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/dd1e59d8-854d-4d9b-80b4-1491ecf89174"
    },
    {
      id: 2,
      title: "Allnsight",
      designer: "김선형 민혜진 심예원 임다인",
      description: "Allnsight 프로젝트입니다.",
      backgroundSrc: "/Cido Web_img/source/AIInsight (1).jpg",
      bookmarkIcon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d34915d2-f4e9-41fb-b160-8321391528f6",
      heartIcon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/68a7cd04-333d-4173-8844-ec2593254843"
    },
    {
      id: 3,
      title: "Making New Sequence",
      designer: "홍영주",
      description: "프로젝트 3에 대한 간단한 설명입니다.",
      backgroundSrc: "/Cido Web_img/source/1ec11a84090c50e2c3bb103c05575e7f7977944b.jpg",
      bookmarkIcon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d3fcbf0e-5c9c-4521-b26d-2abf8aae7dcd",
      heartIcon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6c020f68-f16c-46c8-a3e7-ee5c7993c304"
    },
    {
      id: 4,
      title: "2025 국제주류박람회",
      designer: "박지현",
      description: "프로젝트 4에 대한 간단한 설명입니다.",
      backgroundSrc: "/Cido Web_img/source/3be1de1bbe4f72c3e8b269f4b1faa9d6f7722809.jpg",
      bookmarkIcon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/155b82b2-80fb-410f-aa28-07da3a85593a",
      heartIcon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/e008e9e6-8fc9-4950-8219-bbd99e55c1c2"
    },
    {
      id: 5,
      title: "A Misty Place",
      designer: "박소현",
      description: "프로젝트 5에 대한 간단한 설명입니다.",
      backgroundSrc: "/Cido Web_img/source/4011b291dd0a7a7b4aad2829ef4db73ec86fdf17.jpg",
      bookmarkIcon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d9ef2a2c-1f55-49d5-828a-a43f54f9efaa",
      heartIcon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d5a5cba6-19b6-42d0-a1f1-78d9b0f0c90b"
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
    <div className={styles.projectCardsContainer}>
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
        {projects.map((project) => (
          <SwiperSlide key={project.id} className={styles.swiperSlide}>
                     <div className={styles.cardWrapper}>
                       <div className={styles.projectCard}>
                                {/* 배경 이미지 */}
                                <img
                                  src={project.backgroundSrc}
                                  alt={project.title}
                                  className={styles.cardImage}
                                />
                                
                                {/* 북마크 아이콘 */}
                                <div 
                                  className={styles.bookmarkIcon}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('북마크 클릭:', project.title);
                                  }}
                                >
                                  <img
                                    src={project.bookmarkIcon}
                                    alt="북마크 아이콘"
                                    className={styles.iconImage}
                                  />
                                </div>

                                {/* 하트 아이콘 */}
                                <div 
                                  className={styles.heartIcon}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('하트 클릭:', project.title);
                                  }}
                                >
                                  <img
                                    src={project.heartIcon}
                                    alt="하트 아이콘"
                                    className={styles.iconImage}
                                  />
                                </div>
                         
                         <div className={styles.cardOverlay}>
                           <p className={styles.cardDescription}>{project.description}</p>
                         </div>
                       </div>
                       <h3 className={styles.cardTitle}>{project.title}</h3>
                       <p className={styles.designerName}>{project.designer}</p>
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

export default ProjectCards;
