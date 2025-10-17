import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './ProjectGrid.module.css';

const ProjectGrid = () => {
  const router = useRouter();
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const projects = [
    {
      id: 1,
      title: 'Piercing & Body Modification',
      category: 'illustration, Book Design',
      price: '64,300 won',
      image: '/project/source/piercing_body_modification.jpg'
    },
    {
      id: 2,
      title: '박환 공간',
      category: 'illustration, Book Design',
      price: '64,300 won',
      image: '/project/source/park_hwan_space.png'
    },
    {
      id: 3,
      title: '무제',
      category: 'illustration, Book Design',
      price: '64,300 won',
      image: '/project/Rectangle 34626263-1.png'
    },
    {
      id: 4,
      title: '가내수공업 포스터',
      category: 'illustration, Book Design',
      price: '64,300 won',
      image: '/project/source/poster_craft.png'
    },
    {
      id: 5,
      title: '헤쳐모여',
      category: 'illustration, Book Design',
      price: '64,300 won',
      image: '/project/Rectangle 34626263-3.png'
    },
    {
      id: 6,
      title: '캠퍼스 고민수집단',
      category: 'AI, illustration, Book Design',
      price: '64,300 won',
      image: '/project/source/Campus.png'
    },
    {
      id: 7,
      title: 'Allnsight',
      category: 'AI, Book Design',
      price: '64,300 won',
      image: '/project/source/Allnsight.png'
    },
    {
      id: 8,
      title: 'Christmas Card Set',
      category: 'illustration, Book Design',
      price: '64,300 won',
      image: '/project/image_19.png'
    },
    {
      id: 9,
      title: 'My Recipe Book',
      category: 'illustration, Book Design',
      price: '64,300 won',
      image: '/project/source/choi_lim_04.jpg'
    },
  ];

  const toggleLike = (id: number) => {
    setLikedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.gridContainer}>
      {projects.map((project) => (
        <div 
          key={project.id} 
          className={styles.projectCard}
          onClick={() => router.push(`/project/1`)}
          style={{ cursor: 'pointer' }}
        >
          <div className={styles.imageWrapper}>
            <img
              src={project.image}
              alt={project.title}
              className={styles.projectImage}
            />
          </div>
          <div className={styles.projectInfo}>
            <div className={styles.titleRow}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <button
                className={styles.heartButton}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(project.id);
                }}
                aria-label="좋아요"
              >
                <img
                  src="/Heart.svg"
                  alt=""
                  className={`${styles.heartIcon} ${likedItems.includes(project.id) ? styles.liked : ''}`}
                />
              </button>
            </div>
            <p className={styles.projectCategory}>{project.category}</p>
            <p className={styles.projectPrice}>{project.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
