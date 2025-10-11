import React from 'react';
import styles from './ExploreGrid.module.css';

const ExploreGrid = () => {
  // public/explore 폴더의 실제 이미지 사용
  const allProjects = [
    { id: 1, src: '/explore/Image_1.png' },
    { id: 2, src: '/explore/Image_2.png' },
    { id: 3, src: '/explore/Image_3.png' },
    { id: 4, src: '/explore/Image_4.png' },
    { id: 6, src: '/explore/Image_6.png' },
    { id: 7, src: '/explore/Image_7.png' },
    { id: 8, src: '/explore/Image_8.png' },
    { id: 9, src: '/explore/Image_9.png' },
    { id: 10, src: '/explore/Image_10.png' },
  ];

  return (
    <div className={styles.gridContainer}>
      {allProjects.map((project) => (
        <div key={project.id} className={styles.projectCard}>
          <img
            src={project.src}
            alt={`Project ${project.id}`}
            className={styles.projectImage}
          />
        </div>
      ))}
    </div>
  );
};

export default ExploreGrid;

