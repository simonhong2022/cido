import React from "react";
import styles from "./CommunityCards.module.css";

const CommunityCards = () => {
  return (
    <section className={styles.communityCardsContainer} aria-label="커뮤니티 링크">
      {/* Project Link - 작품 등록하기 */}
      <a
        href="/project"
        className={styles.buttonLink}
      >
        <div className={styles.buttonBackground} style={{ backgroundColor: '#d7e1e3' }}></div>
        <span className={styles.buttonText} style={{ color: '#000000' }}>
          작품 등록하기
        </span>
        <img 
          src="/Cido Web_img/image 80.png"
          alt="작품 등록하기 이미지"
          className={styles.buttonImage}
        />
      </a>

      {/* Designer Link - 디자이너 신청하기 */}
      <a
        href="/designers"
        className={styles.buttonLink}
      >
        <div className={styles.buttonBackground} style={{ backgroundColor: '#0041a6' }}></div>
        <span className={styles.buttonText} style={{ color: '#ffffff' }}>
          디자이너 신청하기
        </span>
        <img 
          src="/Cido Web_img/source/ChatGPT Image 2025년 5월 21일 오후 11_38_22.png"
          alt="디자이너 신청하기 이미지"
          className={styles.buttonImage}
        />
      </a>

      {/* Hirer Link - 디자인 의뢰하기 */}
      <a
        href="/about"
        className={styles.buttonLink}
      >
        <div className={styles.buttonBackground} style={{ backgroundColor: '#1d1d58' }}></div>
        <span className={styles.buttonText} style={{ color: '#ffffff' }}>
          디자인 의뢰하기
        </span>
        <img 
          src="/Cido Web_img/source/ChatGPT Image 2025년 5월 21일 오후 11_44_30.png"
          alt="디자인 의뢰하기 이미지"
          className={styles.buttonImage}
        />
      </a>

      {/* Instagram Link - 인스타그램 둘러보기 */}
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.buttonLink}
      >
        <div className={styles.buttonBackground} style={{ backgroundColor: '#7570ae' }}></div>
        <span className={styles.buttonText} style={{ color: '#ffffff' }}>
          인스타그램 둘러보기
        </span>
        <img 
          src="/Cido Web_img/source/ChatGPT Image 2025년 5월 21일 오후 11_46_50.png"
          alt="인스타그램 둘러보기 이미지"
          className={styles.buttonImage}
        />
      </a>
    </section>
  );
};

export default CommunityCards;
