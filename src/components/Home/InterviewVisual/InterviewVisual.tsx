import React from "react";
import styles from "../AllVisual.module.css";

const InterviewVisual = () => (
  <div className={styles.projectVisualWrapper}>
    <img
      src="/Cido Web_img/source/designer_image_choi.png"
      alt="Hot Designer Banner"
      className={styles.projectVisualImage}
    />
    {/* Figma 디자인: Hot Designer (32px, weight:600, #ffffff) */}
    <span className={styles.hotProjectText}>Hot Designer</span>
    {/* Figma 디자인: cido의 Hot 디자이너 (60px, weight:800, #ffffff) */}
    <span className={styles.projectNameText}>cido의 Hot 디자이너</span>
    <div className={styles.buttonGroup}>
      {/* Figma 디자인: 더보기 (24px, weight:600, #000000) */}
      <button className={styles.moreButton}>더보기</button>
      {/* Figma 디자인: 소통하기 (24px, weight:600, #ffffff) */}
      <button className={styles.buyButton}>소통하기</button>
    </div>
  </div>
);

export default InterviewVisual;
