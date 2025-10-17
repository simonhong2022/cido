import React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import ExploreHeader from "../../components/Explore/ExploreHeader/ExploreHeader";
import ExploreGrid from "../../components/Explore/ExploreGrid/ExploreGrid";
import styles from "./Explore.module.css";

export default function Explore() {
  return (
    <div className={styles.exploreBg}>
      {/* Navigation - Home과 동일 */}
      <NavigationBar />

      <main className={styles.exploreContainer}>
        {/* 헤더: 제목 + 카테고리 필터 */}
        <ExploreHeader />

        {/* 프로젝트 그리드 (Masonry 레이아웃) */}
        <ExploreGrid />

        {/* 더보기 버튼 */}
        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreButton}>
            Log in to see more +
          </button>
        </div>
      </main>

      {/* Footer - Home과 동일 */}
      <Footer />
    </div>
  );
}
