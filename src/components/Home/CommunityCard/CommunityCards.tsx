import React from "react";
import styles from "./CommunityCards.module.css";

const CommunityCards = () => {
  // Example community data - you can replace this with your actual data
  const communities = [
    {
      id: 1,
      title: "작품 등록하기",
      description: "디자이너들의 소통과 성장을 위한 공간",
      src: "/작품등록하기.png",
    },
    {
      id: 2,
      title: "디자이너 신청하기",
      description: "최신 디자인 트렌드와 인사이트 공유",
      src: "/디자이너신청하기.png",
    },
    {
      id: 3,
      title: "파트너 신청하기",
      description: "피드백 받고 싶은 디자이너를 찾아보세요",
      src: "/파트너신청하기.png",
    },
    {
      id: 4,
      title: "인스타그램",
      description: "경험 많은 디자이너와의 1:1 멘토링",
      src: "/인스타그램.png",
    },
  ];

  return (
    <div className={styles.communityCardsContainer}>
      <div className={styles.cardsWrapper}>
        {communities.map((community) => (
          <div key={community.id} className={styles.cardWrapper}>
            <div
              className={`${styles.communityCard} ${
                styles["communityCard" + community.id]
              }`}
            >
              <img
                src={community.src}
                alt={community.title}
                className={`${styles.cardImage} ${
                  styles["cardImage" + community.id]
                }`}
              />
              <div className={styles.cardContent}>
                <p
                  className={`${styles.cardTitle} ${
                    styles["cardTitle" + community.id]
                  }`}
                >
                  {community.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityCards;
