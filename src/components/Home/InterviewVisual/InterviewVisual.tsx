import React from "react";
import styles from "../AllVisual.module.css";

const InterviewVisual = () => (
  <div className={styles.projectVisualWrapper}>
    <img
      src="/interview_background.png"
      alt="Description of the image"
      className={styles.projectVisualImage}
    />
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
