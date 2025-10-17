import React from "react";
import styles from "../AllVisual.module.css";

const CommunityVisual = () => (
  <div className={styles.projectVisualWrapper}>
    <img
      src="/Cido Web_img/source/community_Image.png"
      alt="Community Banner"
      className={styles.projectVisualImage}
    />
    {/* Figma 디자인: Community (32px, weight:600, #ffffff) */}
    <span className={styles.hotProjectText}>Community</span>
    {/* Figma 디자인: 많은 사람들과 소통해요 (60px, weight:800, #ffffff) */}
    <span className={styles.projectNameText}>많은 사람들과 소통해요</span>
    <div className={styles.buttonGroup}>
      {/* Figma 디자인: 더보기 (24px, weight:600, #000000) */}
      <button className={styles.moreButton}>더보기</button>
      {/* Figma 디자인: 소통하기 (24px, weight:600, #ffffff) */}
      <button className={styles.buyButton}>소통하기</button>
    </div>
  </div>
);

export default CommunityVisual;
