import React from "react";
import Head from "next/head";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import styles from "./Community.module.css";

const CommunityPage = () => {
  // Mock data for featured articles
  const featuredArticles = [
    {
      id: 1,
      title: "이 시안 어때요?\n야작러들의 모임 추천",
      author: "심현영 디자이너의 글입니다.",
      tag: "인터뷰",
      image: "https://www.figma.com/api/mcp/asset/placeholder1",
    },
    {
      id: 2,
      title: "Mid-journey\n꿀팁 대방출!",
      author: "박소현 디자이너의 글입니다.",
      tag: "아티클",
      image: "https://www.figma.com/api/mcp/asset/placeholder2",
    },
    {
      id: 3,
      title: "컨텐츠 디자인을 위한\n폰트 & 레이아웃",
      author: "김민서 디자이너의 글입니다.",
      tag: "아티클",
      image: "https://www.figma.com/api/mcp/asset/placeholder3",
    },
  ];

  // Mock data for Q&A
  const qaList = [
    {
      id: 1,
      title: "일러스트 작업 외주 금액 책정은 어떻게 해야할까요?",
      replies: 4,
    },
    {
      id: 2,
      title: "20살에 결혼하는 친구 축의금은 얼마나 내야할까?",
      replies: 4,
    },
    { id: 3, title: "내게 맞는 직무 정하는 방법!", replies: 4 },
    { id: 4, title: "디자인 대외활동 해야할까요?", replies: 4 },
    { id: 5, title: "현장실습은 인턴인가요?", replies: 4 },
    {
      id: 6,
      title: "일러스트 작업 외주 금액 책정은 어떻게 해야할까요?",
      replies: 4,
    },
    {
      id: 7,
      title: "20살에 결혼하는 친구 축의금은 얼마나 내야할까?",
      replies: 4,
    },
    {
      id: 8,
      title: "일러스트 작업 외주 금액 책정은 어떻게 해야할까요?",
      replies: 4,
    },
    {
      id: 9,
      title: "일러스트 작업 외주 금액 책정은 어떻게 해야할까요?",
      replies: 4,
    },
    {
      id: 10,
      title: "일러스트 작업 외주 금액 책정은 어떻게 해야할까요?",
      replies: 4,
    },
  ];

  // Mock data for designer interviews
  const interviews = [
    {
      id: 1,
      title: "인터뷰 제목",
      designer: "디자이너 이름",
      image:
        "https://www.figma.com/api/mcp/asset/f9510fd3-fa2b-481d-b100-2d03e6d21036",
    },
    {
      id: 2,
      title: "인터뷰 제목",
      designer: "디자이너 이름",
      image:
        "https://www.figma.com/api/mcp/asset/f9510fd3-fa2b-481d-b100-2d03e6d21036",
    },
    {
      id: 3,
      title: "인터뷰 제목",
      designer: "디자이너 이름",
      image:
        "https://www.figma.com/api/mcp/asset/f9510fd3-fa2b-481d-b100-2d03e6d21036",
    },
    {
      id: 4,
      title: "인터뷰 제목",
      designer: "디자이너 이름",
      image: "https://www.figma.com/api/mcp/asset/placeholder",
    },
  ];

  // Mock data for exhibitions
  const exhibitions = [
    {
      id: 1,
      title: "뉴욕의 거장들: 잭슨 플록과\n마크 로스코의 친구들",
      location: "노원문화예술회관 노원아트뮤지엄",
      discount: "30%",
      price: "10,500원",
      image: "https://www.figma.com/api/mcp/asset/placeholder",
    },
    {
      id: 2,
      title: "[얼리버드] 캐서린 번하드전",
      location: "예술의전당 한가람미술관 3층",
      discount: "30%",
      price: "15,400원",
      image: "https://www.figma.com/api/mcp/asset/placeholder",
    },
    {
      id: 3,
      title: "서울일러스트레이션페어V.19\n슈퍼 얼리버드 티켓",
      location: "코엑스 C홀",
      discount: "20%",
      price: "11,200원",
      image: "https://www.figma.com/api/mcp/asset/placeholder",
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Community - Cido</title>
        <meta name="description" content="시도와 함께하는 커뮤니티" />
      </Head>

      <NavigationBar />

      <main className={styles.main}>
        {/* Featured Articles Section */}
        <section className={styles.featuredSection}>
          {featuredArticles.map((article) => (
            <div key={article.id} className={styles.featuredCard}>
              <div className={styles.featuredImage}>
                {/* Placeholder for image */}
              </div>
              <div className={styles.featuredContent}>
                <div className={styles.featuredTag}>{article.tag}</div>
                <h3 className={styles.featuredTitle}>{article.title}</h3>
                <p className={styles.featuredAuthor}>{article.author}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Q&A Section */}
        <section className={styles.qaSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.qaTitle}>
              학생 디자이너로서 고민되는 점이 있나요?
              <br />
              시도와 함께 고민해보세요!
            </h2>
            <button className={styles.viewAllButton}>
              전체보기
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          <div className={styles.qaContainer}>
            <div className={styles.qaBadge}>BEST Q&A</div>
            <div className={styles.qaGrid}>
              <div className={styles.qaColumn}>
                {qaList.slice(0, 5).map((qa) => (
                  <div key={qa.id} className={styles.qaItem}>
                    <span className={styles.qaNumber}>{qa.id}</span>
                    <span className={styles.qaTitle}>{qa.title}</span>
                    <span className={styles.qaReplies}>({qa.replies})</span>
                  </div>
                ))}
              </div>
              <div className={styles.qaDivider}></div>
              <div className={styles.qaColumn}>
                {qaList.slice(5, 10).map((qa) => (
                  <div key={qa.id} className={styles.qaItem}>
                    <span className={styles.qaNumber}>{qa.id}</span>
                    <span className={styles.qaTitle}>{qa.title}</span>
                    <span className={styles.qaReplies}>({qa.replies})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Designer Interview Section */}
        <section className={styles.interviewSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              시도와 함께하는 디자이너 인터뷰
            </h2>
            <button className={styles.viewAllButton}>
              전체보기
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          <div className={styles.interviewScroll}>
            {interviews.map((interview) => (
              <div key={interview.id} className={styles.interviewCard}>
                <div className={styles.interviewImage}>
                  <img src={interview.image} alt={interview.title} />
                </div>
                <div className={styles.interviewInfo}>
                  <h3 className={styles.interviewTitle}>{interview.title}</h3>
                  <p className={styles.interviewDesigner}>
                    {interview.designer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Exhibition & Performance Section */}
        <section className={styles.exhibitionSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>영감을 주는 전시&공연 추천</h2>
            <button className={styles.viewAllButton}>
              전체보기
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          <div className={styles.exhibitionGrid}>
            {exhibitions.map((exhibition) => (
              <div key={exhibition.id} className={styles.exhibitionCard}>
                <div className={styles.exhibitionImage}>
                  {/* Placeholder for image */}
                </div>
                <div className={styles.exhibitionInfo}>
                  <h3 className={styles.exhibitionTitle}>{exhibition.title}</h3>
                  <p className={styles.exhibitionLocation}>
                    {exhibition.location}
                  </p>
                  <div className={styles.exhibitionPrice}>
                    <span className={styles.discount}>
                      {exhibition.discount}
                    </span>
                    <span className={styles.price}>{exhibition.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CommunityPage;
