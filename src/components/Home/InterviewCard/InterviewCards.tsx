import React from "react";
import styles from "./InterviewCards.module.css";

const InterviewCards = () => {
  // Example interview data - you can replace this with your actual data
  const interviews = [
    {
      id: 1,
      title: "Interview 1",
      designer: "최하은, 이학민, 김시은",
      category: "#Branding #Graphic",
      description:
        "인터뷰 1에 대한 간단한 설명입니다. 인터뷰의 주요 내용과 특징을 설명합니다.",
      src: "/interview1.png",
    },
    {
      id: 2,
      title: "Interview 2",
      designer: "심현영",
      category: "#Branding #Graphic",
      description:
        "인터뷰 2에 대한 간단한 설명입니다. 인터뷰의 주요 내용과 특징을 설명합니다.",
      src: "/interview2.png",
    },
    {
      id: 3,
      title: "Interview 3",
      designer: "박소현",
      category: "#Branding #UX/UI",
      description:
        "인터뷰 3에 대한 간단한 설명입니다. 인터뷰의 주요 내용과 특징을 설명합니다.",
      src: "/interview3.png",
    },
    {
      id: 4,
      title: "Interview 4",
      designer: "최림",
      category: "#Illustration #Graphic",
      description:
        "인터뷰 4에 대한 간단한 설명입니다. 인터뷰의 주요 내용과 특징을 설명합니다.",
      src: "/interview4.png",
    },
  ];

  return (
    <div className={styles.interviewCardsContainer}>
      <div className={styles.cardsWrapper}>
        {interviews.map((interview) => (
          <div key={interview.id} className={styles.cardWrapper}>
            <div className={styles.interviewCard}>
              <img
                src={interview.src}
                alt={interview.title}
                className={styles.cardImage}
              />
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
