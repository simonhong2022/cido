import React from "react";
import styles from "./MainVisual.module.css";

const MainVisual = () => (
  <section className={styles.mainVisualWrapper} aria-label="메인 배너">
    {/* 왼쪽 대괄호 벡터 */}
    <img 
      src="/Cido Web_icon/Vector-1.svg" 
      alt=""
      className={styles.bracketLeft}
      aria-hidden="true"
    />

    {/* 메인 텍스트 */}
    <h1 className={styles.mainText}>시도는 멈추지 않는다.</h1>

    {/* 오른쪽 대괄호 벡터 */}
    <img 
      src="/Cido Web_icon/Vector.svg" 
      alt=""
      className={styles.bracketRight}
      aria-hidden="true"
    />
  </section>
);

export default MainVisual;
