import React, { useState } from 'react';
import styles from './ExploreHeader.module.css';

const ExploreHeader = () => {
  const [activeCategory, setActiveCategory] = useState('Random');

  const categories = ['Random', 'New', 'My Likes', 'Cart'];

  return (
    <div className={styles.headerContainer}>
      {/* 제목 영역 */}
      <div className={styles.titleContainer}>
        <h2 className={styles.subtitle}>Explore</h2>
        <h1 className={styles.title}>이미지만 모아보다</h1>
      </div>

      {/* 카테고리 필터 */}
      <div className={styles.categoryContainer}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${
              activeCategory === category ? styles.active : ''
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExploreHeader;

