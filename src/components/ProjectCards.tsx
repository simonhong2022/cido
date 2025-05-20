import React from "react";
import styles from "../styles/ProjectCards.module.css";

const ProjectCards = () => {
  // Example project data - you can replace this with your actual data
  const projects = [
    {
      id: 1,
      title: "Project 1",
      designer: "디자이너 이름1",
      description:
        "프로젝트 1에 대한 간단한 설명입니다. 프로젝트의 주요 특징과 목적을 설명합니다.",
    },
    {
      id: 2,
      title: "Project 2",
      designer: "디자이너 이름2",
      description:
        "프로젝트 2에 대한 간단한 설명입니다. 프로젝트의 주요 특징과 목적을 설명합니다.",
    },
    {
      id: 3,
      title: "Project 3",
      designer: "디자이너 이름3",
      description:
        "프로젝트 3에 대한 간단한 설명입니다. 프로젝트의 주요 특징과 목적을 설명합니다.",
    },
    {
      id: 4,
      title: "Project 4",
      designer: "디자이너 이름4",
      description:
        "프로젝트 4에 대한 간단한 설명입니다. 프로젝트의 주요 특징과 목적을 설명합니다.",
    },
  ];

  return (
    <div className={styles.projectCardsContainer}>
      <div className={styles.cardsWrapper}>
        {projects.map((project) => (
          <div key={project.id} className={styles.cardWrapper}>
            <div className={styles.projectCard}>
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
