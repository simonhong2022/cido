import React from "react";
import styles from "../styles/CommunityCards.module.css";

const CommunityCards = () => {
  // Example community data - you can replace this with your actual data
  const communities = [
    {
      id: 1,
      title: "작품 등록하기",
      description: "디자이너들의 소통과 성장을 위한 공간",
    },
    {
      id: 2,
      title: "프로젝트 등록하기",
      description: "전문가와 함께하는 포트폴리오 피드백",
    },
    {
      id: 3,
      title: "디자이너 등록하기",
      description: "최신 디자인 트렌드와 인사이트 공유",
    },
    {
      id: 4,
      title: "인스타그램",
      description: "경험 많은 디자이너와의 1:1 멘토링",
    },
  ];

  return (
    <div className={styles.communityCardsContainer}>
      <div className={styles.cardsWrapper}>
        {communities.map((community) => (
          <div key={community.id} className={styles.cardWrapper}>
            <div className={styles.communityCard}>
              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>{community.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityCards;
