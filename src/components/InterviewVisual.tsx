import React from "react";
import styles from "../styles/ProjectVisual.module.css";

const InterviewVisual = () => (
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
    <span className={styles.hotProjectText}>Interview</span>
    <span className={styles.projectNameText}>
      완성보다 과정에서 더 많이 배웠어요
    </span>
    <div className={styles.buttonGroup}>
      <button className={styles.moreButton}>더보기</button>
      <button className={styles.buyButton}>제안하기</button>
    </div>
  </div>
);

export default InterviewVisual;
