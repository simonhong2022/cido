import React from "react";
import styles from "./ProjectCards.module.css";

const ProjectCards = () => {
  // Example project data - you can replace this with your actual data
  const projects = [
    {
      id: 1,
      title: "루이스바라간 폰트 제작",
      designer: "박소현",
      description:
        "프로젝트 1에 대한 간단한 설명입니다. 프로젝트의 주요 특징과 목적을 설명합니다.",
      src: "/project1.png",
    },
    {
      id: 2,
      title: "A Misty Place",
      designer: "박소현",
      description:
        "프로젝트 2에 대한 간단한 설명입니다. 프로젝트의 주요 특징과 목적을 설명합니다.",
      src: "/project2.png",
    },
    {
      id: 3,
      title: "Making New Sequence",
      designer: "홍영주",
      description:
        "프로젝트 3에 대한 간단한 설명입니다. 프로젝트의 주요 특징과 목적을 설명합니다.",
      src: "/project3.png",
    },
    {
      id: 4,
      title: "2025 국제주류박람회",
      designer: "박지현",
      description:
        "프로젝트 4에 대한 간단한 설명입니다. 프로젝트의 주요 특징과 목적을 설명합니다.",
      src: "/project4.png",
    },
  ];

  return (
    <div className={styles.projectCardsContainer}>
      <div className={styles.cardsWrapper}>
        {projects.map((project) => (
          <div key={project.id} className={styles.cardWrapper}>
            <div className={styles.projectCard}>
              <img
                src={project.src}
                alt={project.title}
                className={styles.cardImage}
              />
              <div className={styles.cardOverlay}>
                <p className={styles.cardDescription}>{project.description}</p>
              </div>
            </div>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.designerName}>{project.designer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCards;
