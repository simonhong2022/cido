import React from "react";
import styles from "../styles/InterviewCards.module.css";

const InterviewCards = () => {
  // Example interview data - you can replace this with your actual data
  const interviews = [
    {
      id: 1,
      title: "Interview 1",
      designer: "디자이너 이름1",
      category: "UI/UX",
      description:
        "인터뷰 1에 대한 간단한 설명입니다. 인터뷰의 주요 내용과 특징을 설명합니다.",
    },
    {
      id: 2,
      title: "Interview 2",
      designer: "디자이너 이름2",
      category: "Graphic Design",
      description:
        "인터뷰 2에 대한 간단한 설명입니다. 인터뷰의 주요 내용과 특징을 설명합니다.",
    },
    {
      id: 3,
      title: "Interview 3",
      designer: "디자이너 이름3",
      category: "Branding",
      description:
        "인터뷰 3에 대한 간단한 설명입니다. 인터뷰의 주요 내용과 특징을 설명합니다.",
    },
    {
      id: 4,
      title: "Interview 4",
      designer: "디자이너 이름4",
      category: "Motion Design",
      description:
        "인터뷰 4에 대한 간단한 설명입니다. 인터뷰의 주요 내용과 특징을 설명합니다.",
    },
  ];

  return (
    <div className={styles.interviewCardsContainer}>
      <div className={styles.cardsWrapper}>
        {interviews.map((interview) => (
          <div key={interview.id} className={styles.cardWrapper}>
            <div className={styles.interviewCard}>
              <div className={styles.cardOverlay}>
                <p className={styles.cardDescription}>
                  {interview.description}
                </p>
              </div>
            </div>
            <h3 className={styles.designerName}>{interview.designer}</h3>
            <p className={styles.category}>{interview.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewCards;
