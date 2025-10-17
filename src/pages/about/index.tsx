import React from "react";
import Head from "next/head";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import styles from "./About.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Assets
const ASSETS = {
  hero: "/about/image 42.png",
  visionLeftImg:
    "https://www.figma.com/api/mcp/asset/d01fedb6-b4fc-465d-b486-de3f4bea09f6",
  visionMidImg:
    "https://www.figma.com/api/mcp/asset/fc22e896-e80a-4cd8-a351-462e6dad3971",
  visionRightImg:
    "https://www.figma.com/api/mcp/asset/b8b75c90-6cfa-46ce-9d47-19f4daa7cd5a",
  connectInterdisciplinary:
    "https://www.figma.com/api/mcp/asset/c6e687c6-90f3-4e17-bdb9-80c193789999",
  connectDesigner:
    "https://www.figma.com/api/mcp/asset/bf60106a-1558-4c01-8131-2f5fa8799573",
  connectEnterprise:
    "https://www.figma.com/api/mcp/asset/d3c27f32-1c28-4d89-a13a-0086c463b78f",
  connectArtist:
    "https://www.figma.com/api/mcp/asset/295f7899-1589-4243-8179-74c53f3de030",
};

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>About - Cido</title>
        <meta name="description" content="About cido" />
      </Head>

      <NavigationBar />

      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackground}>
            <img
              src={ASSETS.hero}
              alt="About hero"
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay} />
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>About, cido</h1>
            <div className={styles.heroTextGroup}>
              <p className={`${styles.heroLine} ${styles.heroLineDesktop}`}>
                {
                  "cido는 홍익대학교 학생들의 Idea Factory, 창의적 공작소입니다. 인쇄, 간판, 그래픽, 일러스트, 북 디자인 등 "
                }
              </p>
              <p className={`${styles.heroLine} ${styles.heroLineDesktop}`}>
                {
                  "다양한 시각 분야에서 학생들의 실험적인 아이디어와 도전이 모여 새로운 가능성을 만드는 플랫폼입니다."
                }
              </p>
              <p className={`${styles.heroLine} ${styles.heroLineMobile}`}>
                {
                  "cido는 홍익대학교 학생들의 Idea Factory, 창의적 공작소입니다. 인쇄, 간판, 그래픽, 일러스트, 북 디자인 등 다양한 시각 분야에서 학생들의 실험적인 아이디어와 도전이 모여 새로운 가능성을 만드는 플랫폼입니다."
                }
              </p>
              <p className={`${styles.heroLine} ${styles.heroLineDesktop}`}>
                &nbsp;
              </p>
              <p className={styles.heroLine}>
                {
                  "'더 나아가는' 정신 아래, 신진 디자이너와 다양한 소비자가 만나 영감을 나누고, 새로운 문화와 비즈니스를 실험합니다. "
                }
              </p>
              <p className={styles.heroLine}>
                {
                  "큐레이션된 컬렉션, 독창적인 작품 판매, 그리고 홍익대학교 학생들의 이야기를 담은 트렌디한 플랫폼."
                }
              </p>
              <p className={`${styles.heroLine} ${styles.heroLineDesktop}`}>
                &nbsp;
              </p>
              <p className={styles.heroLine}>
                {"당신의 첫 창작, cido에서 시작하세요."}
              </p>
            </div>
          </div>
        </section>

        {/* Vision (per Figma 153-1891 exact layout) */}
        <section className={styles.visionExact}>
          <div className={styles.visionHeadline}>
            <p>포트폴리오부터 수익, 커리어까지.</p>
            <p>cido는 학생들의 미래를 위합니다.</p>
          </div>

          {/* Left card */}
          <div className={styles.visionCardLeft}>
            <div className={styles.visionCardLeftBg} />
            <h3 className={styles.visionCardTitleLeft}>Portfolio</h3>
            <div className={styles.visionCardKickerLeft}>
              <p>인터뷰 콘텐츠, 아카이빙 등</p>
              <p>나를 알릴 수 있는 다양한 기회</p>
            </div>
            <div className={styles.visionLeftImageWrap}>
              <img src={ASSETS.visionLeftImg} alt="portfolio sample" />
            </div>
            <div className={styles.visionLeftDesc}>
              <p>작업물을 소개하고 판매, 포트폴리오를 구축할 수 있습니다.</p>
              <p>SNS, 프로필, 기업과의 연결을 통해</p>
              <p>학생의 시도와 결과물이 한눈에 정리됩니다.</p>
            </div>
          </div>

          {/* Middle card */}
          <div className={styles.visionCardMid}>
            <div className={styles.visionCardMidBg} />
            <h3 className={styles.visionCardTitleMid}>Career</h3>
            <div className={styles.visionCardKickerMid}>
              <p>파트너와의 연결을 통해</p>
              <p>실질적인 실무 경험과 커리어 확장</p>
            </div>
            <div className={styles.visionMidImageWrap}>
              <img src={ASSETS.visionMidImg} alt="career sample" />
            </div>
            <div className={styles.visionMidDesc}>
              <p>학생의 디자인이 실질적인 기회로 연결되도록 지원합니다.</p>
              <p>브랜드, 소상공인 등 외부와의 연결을 통해</p>
              <p>실무 경험을 쌓고 커리어를 확장시킬 수 있습니다.</p>
            </div>
          </div>

          {/* Right card */}
          <div className={styles.visionCardRight}>
            <div className={styles.visionCardRightBg} />
            <h3 className={styles.visionCardTitleRight}>Market</h3>
            <div className={styles.visionCardKickerRight}>
              <p>작품을 직접 판매,수익을 창출하며</p>
              <p>직접적인 경제적 경험</p>
            </div>
            <div className={styles.visionRightImageWrap}>
              <img src={ASSETS.visionRightImg} alt="market sample" />
            </div>
            <div className={styles.visionRightDesc}>
              <p>작품을 직접 판매하거나 협업을 통해 수익을 창출합니다.</p>
              <p>자신의 결과물을 시장에 노출시키고</p>
              <p>실질적인 경제적 경험을 쌓을 수 있습니다.</p>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section className={styles.connectSection}>
          <div className={styles.connectTitle}>
            <p>
              cido는 디자인 프로젝트를 위한 <br className={styles.titleBreak} />
              연결을 제공합니다.
            </p>
            <p>cido에서 연결되세요!</p>
          </div>

          <div className={styles.connectGrid}>
            {/* Interdisciplinary */}
            <div className={styles.connectCard} data-card="interdisciplinary">
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitleEn}>Interdisciplinary</h3>
                <h4 className={styles.cardTitleKo}>학제 간 융합연구</h4>
                <div className={styles.cardDescription}>
                  <p>UXUI 프로토타입이 필요한 개발자,</p>
                  <p>브랜딩이 필요한 학교 동아리,</p>
                  <p>컨텐츠 제작이 필요한 마케터 등</p>
                </div>
              </div>
              <div className={styles.cardImage}>
                <img
                  src={ASSETS.connectInterdisciplinary}
                  alt="Interdisciplinary"
                />
              </div>
            </div>

            {/* Designer */}
            <div className={styles.connectCard} data-card="designer">
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitleEn}>Designer</h3>
                <h4 className={styles.cardTitleKo}>홍익대 학생들</h4>
                <div className={styles.cardDescription}>
                  <p>자신의 디자인을 널리 알리고,</p>
                  <p>작품 판매 및 프로젝트의 기회를 찾는</p>
                  <p>홍익대학교 학생들</p>
                </div>
              </div>
              <div className={styles.cardImage}>
                <img src={ASSETS.connectDesigner} alt="Designer" />
              </div>
            </div>

            {/* Enterprise */}
            <div className={styles.connectCard} data-card="enterprise">
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitleEn}>Enterprise</h3>
                <h4 className={styles.cardTitleKo}>기업 및 소상공인</h4>
                <div className={styles.cardDescription}>
                  <p>소상공인, 청년 창업가 등</p>
                  <p>브랜드를 이루는</p>
                  <p>각종 디자인이 필요한 사업가</p>
                </div>
              </div>
              <div className={styles.cardImage}>
                <img src={ASSETS.connectEnterprise} alt="Enterprise" />
              </div>
            </div>

            {/* Artist */}
            <div className={styles.connectCard} data-card="artist">
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitleEn}>Artist</h3>
                <h4 className={styles.cardTitleKo}>아티스트</h4>
                <div className={styles.cardDescription}>
                  <p>인디밴드, 무용가, 독립 영화 감독 등</p>
                  <p>작품 홍보에 독창적이고 실험적인</p>
                  <p>디자인 작업을 원하는 개인 아티스트</p>
                </div>
              </div>
              <div className={styles.cardImage}>
                <img src={ASSETS.connectArtist} alt="Artist" />
              </div>
            </div>
          </div>

          {/* IDEA Letters */}
          <div className={styles.ideaLetters}>
            <div className={styles.ideaLetter}>I</div>
            <div className={styles.ideaLetter}>D</div>
            <div className={styles.ideaLetter}>E</div>
            <div className={styles.ideaLetter}>A</div>
          </div>

          {/* Dividers */}
          <div className={styles.connectDividerH}></div>
          <div className={styles.connectDividerV}></div>
        </section>

        {/* Team Section */}
        <section className={styles.teamSection}>
          <div className={styles.teamBackground}>
            <img
              src="https://www.figma.com/api/mcp/asset/e498a81c-51e9-47fb-a79e-a89435041d85"
              alt="Team"
              className={styles.teamBackgroundImage}
            />
            <div className={styles.teamOverlay}></div>
          </div>
          <div className={styles.teamContent}>
            <h2 className={styles.teamTitle}>The Team</h2>
            <p className={styles.teamDescription}>
              우리는 디자인을 사랑하고, 창의적인 가능성을 믿는 사람들입니다.
              <br />
              학생들의 아이디어가 세상과 연결될 수 있도록 새로운 기회의 다리를
              놓습니다.
              <br />
              디자인으로 사람을 잇는 플랫폼, Team cido가 함께 만들어갑니다.
            </p>
          </div>
        </section>

        {/* Expert Interview Section */}
        <section className={styles.expertSection}>
          <div className={styles.expertSlider}>
            <Swiper
              spaceBetween={20}
              slidesPerView="auto"
              className={styles.swiper}
            >
              {/* Intro Card */}
              <SwiperSlide>
                <div className={styles.expertIntroCard}>
                  <h3 className={styles.expertIntroTitle}>
                    선별된 전문가의 참여로, 신뢰할 수 있는
                    <br />
                    피드백과 진정성 있는 연결의 장을 마련합니다.
                  </h3>
                  <p className={styles.expertIntroDescription}>
                    창의적 시도에 대한 깊이 있는 통찰, 실제 산업과 교육을
                    아우르는
                    <br />
                    경험을 가진 전문가들이 학생의 프로젝트를 함께 보고, 가능성을
                    <br />
                    발견하며 성장을 지원합니다.
                  </p>
                </div>
              </SwiperSlide>

              {/* Interview Card 1 */}
              <SwiperSlide>
                <div className={styles.expertInterviewCard}>
                  <div className={styles.expertCardImage}>
                    <img
                      src="https://www.figma.com/api/mcp/asset/7cdd2222-ec24-4968-bfbf-22e876a2d3aa"
                      alt="Interview"
                    />
                  </div>
                  <div className={styles.expertCardContent}>
                    <h4 className={styles.expertInterviewTitle}>
                      [포커스 인터뷰] 디자인 교육과
                      <br />
                      AI의 만남 ... 혁신적 전자책 실험
                    </h4>
                    <p className={styles.expertUniversity}>홍익대학교</p>
                    <p className={styles.expertName}>사카베 히토미 교수</p>
                    <button className={styles.expertButton}>
                      인터뷰 보러가기
                      <img
                        src="https://www.figma.com/api/mcp/asset/dca1e6cf-0a94-4395-ad80-6e715bbf12e5"
                        alt="arrow"
                        className={styles.expertArrow}
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>

              {/* Interview Card 2 */}
              <SwiperSlide>
                <div className={styles.expertInterviewCard}>
                  <div className={styles.expertCardImage}>
                    <img
                      src="https://www.figma.com/api/mcp/asset/7cdd2222-ec24-4968-bfbf-22e876a2d3aa"
                      alt="Interview"
                    />
                  </div>
                  <div className={styles.expertCardContent}>
                    <h4 className={styles.expertInterviewTitle}>
                      [포커스 인터뷰] 디자인 교육과
                      <br />
                      AI의 만남 ... 혁신적 전자책 실험
                    </h4>
                    <p className={styles.expertUniversity}>홍익대학교</p>
                    <p className={styles.expertName}>사카베 히토미 교수</p>
                    <button className={styles.expertButton}>
                      인터뷰 보러가기
                      <img
                        src="https://www.figma.com/api/mcp/asset/dca1e6cf-0a94-4395-ad80-6e715bbf12e5"
                        alt="arrow"
                        className={styles.expertArrow}
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBackground}>
            <img
              src="https://www.figma.com/api/mcp/asset/d488f1bb-f6d6-41df-a40f-2dcb670193fc"
              alt="시도"
              className={styles.ctaBackgroundImage}
            />
            <div className={styles.ctaOverlay}></div>
          </div>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>시도는 멈추지 않는다</h2>
            <div className={styles.ctaDescription}>
              <p>매일의 순간 속에서 무수한 시도를 합니다</p>
              <p>조심스러운 한 걸음, 실패를 딛고 다시 내딛는 용기,</p>
              <p>
                <strong>[cido]</strong>는 그{" "}
                <strong>'시도' 에서 확장된 창작의 가능성을 담은 브랜드</strong>{" "}
                입니다
              </p>
            </div>
          </div>
        </section>

        {/* Action Buttons Section */}
        <section className={styles.actionButtonsSection}>
          <button className={styles.actionButton}>작품 보러가기</button>
          <button className={styles.actionButton}>디자이너 신청하기</button>
          <button className={styles.actionButton}>디자인 의뢰하기</button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
