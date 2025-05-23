import React from "react";
import styles from "../AllVisual.module.css";

const CommunityVisual = () => (
  <div className={styles.projectVisualWrapper}>
    <svg
      className={styles.projectVisualSvg}
      width="1920"
      height="716"
      viewBox="0 0 1920 716"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1920" height="716" fill="#8E8E93" />
    </svg>
    <span className={styles.hotProjectText}>Community</span>
    <span className={styles.projectNameText}>많은 사람들과 소통하다</span>
    <div className={styles.buttonGroup}>
      <button className={styles.moreButton}>더보기</button>
      <button className={styles.buyButton}>쇼핑하기</button>
    </div>
  </div>
);

export default CommunityVisual;
