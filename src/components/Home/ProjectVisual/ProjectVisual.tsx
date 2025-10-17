import React from "react";
import styles from "../AllVisual.module.css";

const ProjectVisual = () => (
  <div className={styles.projectVisualWrapper}>
    <img
      src="/Cido Web_img/source/박환 공간3.png"
      alt="Hot Project Banner"
      className={styles.projectVisualImage}
    />
    {/* Figma 디자인: Hot Project (32px, weight:600, #ffffff) */}
    <span className={styles.hotProjectText}>Hot Project</span>
    {/* Figma 디자인: 지금 핫한 작품을 살펴보세요 (60px, weight:800, #ffffff) */}
    <span className={styles.projectNameText}>지금 핫한 작품을 살펴보세요</span>
    <div className={styles.buttonGroup}>
      {/* Figma 디자인: 더보기 (24px, weight:600, #000000) */}
      <button className={styles.moreButton}>더보기</button>
      {/* Figma 디자인: 구매하기 (24px, weight:600, #ffffff) */}
      <button className={styles.buyButton}>구매하기</button>
    </div>
  </div>
);

export default ProjectVisual;
