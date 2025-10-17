import React, { useState } from 'react';
import styles from './ProjectHeader.module.css';

const ProjectHeader = () => {
  const [activeCategory, setActiveCategory] = useState('전체');
  
  const categories = ['전체', 'UIUX', 'BIBX', 'Product', 'Graphic', 'Motion', 'Illustration', 'AI', 'Craft'];

  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.subtitle}>모든 시도를 모아보다</h2>
        <h1 className={styles.title}>모아보다, cido</h1>
      </div>
      
      <div className={styles.categoryContainer}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectHeader;
