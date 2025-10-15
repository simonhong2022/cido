import React from 'react';
import Head from 'next/head';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import styles from '../styles/About.module.css';

// Assets
const ASSETS = {
  hero: '/about/image 42.png',
  visionLeftImg: 'https://www.figma.com/api/mcp/asset/d01fedb6-b4fc-465d-b486-de3f4bea09f6',
  visionMidImg: 'https://www.figma.com/api/mcp/asset/fc22e896-e80a-4cd8-a351-462e6dad3971',
  visionRightImg: 'https://www.figma.com/api/mcp/asset/b8b75c90-6cfa-46ce-9d47-19f4daa7cd5a',
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
            <img src={ASSETS.hero} alt="About hero" className={styles.heroImage} />
            <div className={styles.heroOverlay} />
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>About, cido</h1>
            <div className={styles.heroTextGroup}>
              <p className={`${styles.heroLine} ${styles.heroLineDesktop}`}>{"cido는 홍익대학교 학생들의 Idea Factory, 창의적 공작소입니다. 인쇄, 간판, 그래픽, 일러스트, 북 디자인 등 "}</p>
              <p className={`${styles.heroLine} ${styles.heroLineDesktop}`}>{"다양한 시각 분야에서 학생들의 실험적인 아이디어와 도전이 모여 새로운 가능성을 만드는 플랫폼입니다."}</p>
              <p className={`${styles.heroLine} ${styles.heroLineMobile}`}>{"cido는 홍익대학교 학생들의 Idea Factory, 창의적 공작소입니다. 인쇄, 간판, 그래픽, 일러스트, 북 디자인 등 다양한 시각 분야에서 학생들의 실험적인 아이디어와 도전이 모여 새로운 가능성을 만드는 플랫폼입니다."}</p>
              <p className={`${styles.heroLine} ${styles.heroLineDesktop}`}>&nbsp;</p>
              <p className={styles.heroLine}>{"'더 나아가는' 정신 아래, 신진 디자이너와 다양한 소비자가 만나 영감을 나누고, 새로운 문화와 비즈니스를 실험합니다. "}</p>
              <p className={styles.heroLine}>{"큐레이션된 컬렉션, 독창적인 작품 판매, 그리고 홍익대학교 학생들의 이야기를 담은 트렌디한 플랫폼."}</p>
              <p className={`${styles.heroLine} ${styles.heroLineDesktop}`}>&nbsp;</p>
              <p className={styles.heroLine}>{"당신의 첫 창작, cido에서 시작하세요."}</p>
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

        {/* CTA band */}
        <section className={styles.ctaBand}>
          <div className={styles.ctaText}>시도는 멈추지 않는다</div>
          <div className={styles.ctaButtons}>
            <button className={styles.ctaButton}>작품 보러가기</button>
            <button className={styles.ctaButton}>디자이너 신청하기</button>
            <button className={styles.ctaButton}>디자인 의뢰하기</button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
