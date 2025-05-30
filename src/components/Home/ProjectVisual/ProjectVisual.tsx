import React from "react";
import styles from "../AllVisual.module.css";

const ProjectVisual = () => (
  <div className={styles.projectVisualWrapper}>
    <img
      src="/박환 공간3.png"
      alt="Description of the image"
      className={styles.projectVisualImage}
    />
    <span className={styles.hotProjectText}>Hot Project</span>
    <span className={styles.projectNameText}>여명대학교 | 박환 공간</span>
    <div className={styles.buttonGroup}>
      <button className={styles.moreButton}>더보기</button>
      <button className={styles.buyButton}>구매하기</button>
    </div>
  </div>
);

export default ProjectVisual;
