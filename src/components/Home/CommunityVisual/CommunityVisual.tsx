import React from "react";
import styles from "../AllVisual.module.css";

const CommunityVisual = () => (
  <div className={styles.projectVisualWrapper}>
    <img
      src="/community_background.png"
      alt="Description of the image"
      className={styles.projectVisualImage}
    />
    <span className={styles.hotProjectText}>Community</span>
    <span className={styles.projectNameText}>많은 사람들과 소통하다</span>
    <div className={styles.buttonGroup}>
      <button className={styles.moreButton}>더보기</button>
      <button className={styles.buyButton}>쇼핑하기</button>
    </div>
  </div>
);

export default CommunityVisual;
