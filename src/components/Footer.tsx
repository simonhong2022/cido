import React from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Instagram Icon */}
      <div className={styles.instagramIcon}>
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#222"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
        </svg>
      </div>
      <div className={styles.cido}>cido</div>
      <div className={styles.description}>
        홍익대학교 학생들의 실험적인 시도, 세상과 연결하는 창의적 플랫폼.
      </div>
      <div className={styles.info}>대표자: OOO | 010-0000-0000</div>
      <div className={styles.info}>
        BUSINESS NO. 644-13-01361 | 2021-서울광진-1854
      </div>
      <div className={styles.info}>
        서울시 광진구 아차산로78길 7 | sideinseoul@gmail.com
      </div>
      <div className={styles.copyright}>
        Copyright © SIDE. All Rights Reserved.
      </div>
      <div className={styles.links}>
        <a href="#" className={styles.link}>
          이용약관
        </a>
        <a href="#" className={styles.link}>
          개인정보처리방침
        </a>
      </div>
    </footer>
  );
}
