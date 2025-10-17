import React, { useState } from "react";
import Head from "next/head";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import styles from "./Mypage.module.css";
import { useAuth } from "../../contexts/AuthContext";

const MyPage = () => {
  const { user } = useAuth();

  // 사용자 역할 확인 (임시로 판매자로 설정, 실제로는 user 데이터에서 가져옴)
  const isSeller = true; // user?.role === 'seller' || user?.role === 'designer';

  // 판매자면 'seller' 탭이 기본, 아니면 'buyer' 탭이 기본
  const [activeTab, setActiveTab] = useState(isSeller ? "seller" : "buyer");

  // Mock data for projects
  const projects = [
    {
      id: 1,
      title: "Piercing & Body Modification",
      category: "illustration, Book Design",
      price: "64,300 won",
      image:
        "https://www.figma.com/api/mcp/asset/5f3926a0-f55d-47b4-af1d-27670d5b5aec",
    },
    {
      id: 2,
      title: "박환 공간",
      category: "illustration, Book Design",
      price: "24,000 won",
      image:
        "https://www.figma.com/api/mcp/asset/aae39427-f2b1-426f-a5aa-842b7a1c0217",
    },
    {
      id: 3,
      title: "무제",
      category: "illustration, Book Design",
      price: "36,000 won",
      image:
        "https://www.figma.com/api/mcp/asset/15c46525-9839-4c67-9e56-65cdf909eba3",
    },
    {
      id: 4,
      title: "Piercing & Body Modification",
      category: "illustration, Book Design",
      price: "64,300 won",
      image:
        "https://www.figma.com/api/mcp/asset/5f3926a0-f55d-47b4-af1d-27670d5b5aec",
    },
    {
      id: 5,
      title: "박환 공간",
      category: "illustration, Book Design",
      price: "24,000 won",
      image:
        "https://www.figma.com/api/mcp/asset/aae39427-f2b1-426f-a5aa-842b7a1c0217",
    },
    {
      id: 6,
      title: "무제",
      category: "illustration, Book Design",
      price: "36,000 won",
      image:
        "https://www.figma.com/api/mcp/asset/15c46525-9839-4c67-9e56-65cdf909eba3",
    },
  ];

  // Mock data for portfolios
  const portfolios = [
    {
      id: 1,
      title: "Cido Graphic 리브랜딩, 웹디자인",
      category: "Enterprise",
      image:
        "https://www.figma.com/api/mcp/asset/d47765ce-2ac7-4e7e-96a6-eec3eb6d9540",
    },
    {
      id: 2,
      title: "세종시 청년 IT 동아리 '시퀀스' 브랜딩",
      category: "Interdisciplinary",
      image:
        "https://www.figma.com/api/mcp/asset/d47765ce-2ac7-4e7e-96a6-eec3eb6d9540",
    },
    {
      id: 3,
      title: "[포커스 인터뷰] 디자인 교육과 AI의 만남 ... 혁신적 전자책 실험",
      category: "사카베 히토미 교수",
      image:
        "https://www.figma.com/api/mcp/asset/d47765ce-2ac7-4e7e-96a6-eec3eb6d9540",
    },
    {
      id: 4,
      title: "[포커스 인터뷰] 디자인 교육과 AI의 만남 ... 혁신적 전자책 실험",
      category: "사카베 히토미 교수",
      image:
        "https://www.figma.com/api/mcp/asset/d47765ce-2ac7-4e7e-96a6-eec3eb6d9540",
    },
  ];

  // Mock data for buyer (구매자 데이터)
  const purchasedItems = [
    {
      id: 1,
      title: "Piercing & Body Modification",
      category: "illustration, Book Design",
      price: "64,300 won",
      image:
        "https://www.figma.com/api/mcp/asset/5f3926a0-f55d-47b4-af1d-27670d5b5aec",
    },
  ];

  const likedJobs = [
    {
      id: 1,
      company: "Midjourney (주)",
      title: "[Midjourney] 서비스 디자인 모집",
      tags: ["디자인", "메인 디자이너 구함"],
      image: "https://www.figma.com/api/mcp/asset/placeholder",
    },
  ];

  const wishlistItems = [
    {
      id: 1,
      title: "AIInsight",
      category: "Branding",
      price: "12,000 won",
      image: "https://www.figma.com/api/mcp/asset/placeholder",
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>마이페이지 - Cido</title>
        <meta name="description" content="나의 프로젝트와 포트폴리오" />
      </Head>

      <NavigationBar />

      <main className={styles.main}>
        {/* Profile Header Section */}
        <section className={styles.profileHeader}>
          <div className={styles.profileImageWrapper}>
            <img
              src="https://www.figma.com/api/mcp/asset/06bcbcc9-a063-4087-bc2d-5da367ca71ab"
              alt="Profile"
              className={styles.profileImage}
            />
          </div>
          <div className={styles.profileInfo}>
            <h1 className={styles.profileName}>사용자 이름</h1>
            <div className={styles.profileDetails}>
              <div className={styles.detailColumn}>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}></span>
                  <span>주요 디자인 분야</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}></span>
                  <span>소속</span>
                </div>
              </div>
              <div className={styles.detailColumn}>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}></span>
                  <span>SNS 계정</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}></span>
                  <span>1000p</span>
                </div>
              </div>
            </div>
            <p className={styles.profileBio}>
              트렌드와 국내 현실에 맞닿은 2030 세대의 트렌드, 문화 생활상을 담은
              2D 일러스트와 영상 작업을 진행하고 있습니다. 비주얼 작업 외에
              세계관 안팎으로 젊은 세대가 겪는 불안과 문제점을 대표하는 캐릭터를
              설정하여 진행되는 스토리텔링 작업도 진행하고 있습니다
            </p>
          </div>
          <div className={styles.profileActions}>
            <button className={styles.actionButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              프로필 편집
            </button>
            <button className={styles.actionButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              업로드하기
            </button>
          </div>
        </section>

        {/* Tabs */}
        <div className={styles.tabs}>
          {isSeller && (
            <button
              className={`${styles.tab} ${
                activeTab === "seller" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("seller")}
            >
              판매자 활동
            </button>
          )}
          <button
            className={`${styles.tab} ${
              activeTab === "buyer" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("buyer")}
          >
            구매 활동
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "info" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("info")}
          >
            작가 정보
          </button>
        </div>

        {/* Content Section */}

        {/* 판매자 활동 탭 */}
        {activeTab === "seller" && isSeller && (
          <>
            {/* Projects Section */}
            <section className={styles.projectsSection}>
              <h2 className={styles.sectionTitle}>
                여명대학교 님의 프로젝트 상품
              </h2>
              <div className={styles.projectGrid}>
                {projects.map((project) => (
                  <div key={project.id} className={styles.projectCard}>
                    <div className={styles.projectImage}>
                      <img src={project.image} alt={project.title} />
                      <div className={styles.projectActions}>
                        <button className={styles.iconButton}>❤</button>
                        <button className={styles.iconButton}>🛒</button>
                      </div>
                    </div>
                    <div className={styles.projectInfo}>
                      <span className={styles.projectNumber}>{project.id}</span>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p className={styles.projectCategory}>
                        {project.category}
                      </p>
                      <p className={styles.projectPrice}>{project.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className={styles.moreButton}>+ more</button>
            </section>

            {/* Portfolios Section */}
            <section className={styles.portfoliosSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  시도와 함께한 포트폴리오
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
              <div className={styles.portfolioScroll}>
                {portfolios.map((portfolio) => (
                  <div key={portfolio.id} className={styles.portfolioCard}>
                    <div className={styles.portfolioImage}>
                      <img src={portfolio.image} alt={portfolio.title} />
                    </div>
                    <div className={styles.portfolioInfo}>
                      <h3 className={styles.portfolioTitle}>
                        {portfolio.title}
                      </h3>
                      <p className={styles.portfolioCategory}>
                        {portfolio.category}
                      </p>
                      <button className={styles.portfolioButton}>더보기</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* 구매 활동 탭 */}
        {activeTab === "buyer" && (
          <>
            {/* Purchased Items Section */}
            <section className={styles.buyerSection}>
              <h2 className={styles.sectionTitle}>
                Midjourney CEO님의 구매한 상품
              </h2>
              <div className={styles.buyerGrid}>
                {purchasedItems.map((item) => (
                  <div key={item.id} className={styles.buyerCard}>
                    <div className={styles.buyerImage}>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className={styles.buyerInfo}>
                      <h3 className={styles.buyerTitle}>{item.title}</h3>
                      <p className={styles.buyerCategory}>{item.category}</p>
                      <p className={styles.buyerPrice}>{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Liked Jobs Section */}
            <section className={styles.buyerSection}>
              <h2 className={styles.sectionTitle}>
                미드저니 CEO님이 좋은 공고
              </h2>
              <div className={styles.jobsList}>
                {likedJobs.map((job) => (
                  <div key={job.id} className={styles.jobCard}>
                    <div className={styles.jobIcon}>
                      <img src={job.image} alt={job.company} />
                    </div>
                    <div className={styles.jobInfo}>
                      <p className={styles.jobCompany}>{job.company}</p>
                      <h3 className={styles.jobTitle}>{job.title}</h3>
                      <div className={styles.jobTags}>
                        {job.tags.map((tag, idx) => (
                          <span key={idx} className={styles.jobTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Wishlist Section */}
            <section className={styles.buyerSection}>
              <h2 className={styles.sectionTitle}>찜한 상품</h2>
              <div className={styles.buyerGrid}>
                {wishlistItems.map((item) => (
                  <div key={item.id} className={styles.wishlistCard}>
                    <div className={styles.wishlistImage}>
                      <img src={item.image} alt={item.title} />
                      <button className={styles.wishlistHeart}>❤</button>
                    </div>
                    <div className={styles.wishlistInfo}>
                      <h3 className={styles.wishlistTitle}>{item.title}</h3>
                      <p className={styles.wishlistCategory}>{item.category}</p>
                      <p className={styles.wishlistPrice}>{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* 작가 정보 탭 */}
        {activeTab === "info" && (
          <div className={styles.emptyState}>
            <p>작가 정보</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyPage;
