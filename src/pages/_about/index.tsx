import React from 'react';
import styles from './About.module.css';
import Image from 'next/image';
import Link from 'next/link';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Footer from '../../components/Footer/Footer';

const AboutPage = () => {
  return (
    <>
      <NavigationBar />
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>About, cido</h1>
          <p>cido는 홍익대학교 학생들의 Idea Factory, 창의적 공작소입니다. 인쇄, 간판, 그래픽, 일러스트, 북 디자인 등</p>
          <p>다양한 시각 분야에서 학생들의 실험적인 아이디어와 도전이 모여 새로운 가능성을 만드는 플랫폼입니다.</p>
          <br />
          <p>'더 나아가는' 정신 아래, 신진 디자이너와 다양한 소비자가 만나 영감을 나누고, 새로운 문화와 비즈니스를 실험합니다.</p>
          <p>큐레이션된 컬렉션, 독창적인 작품 판매, 그리고 홍익대학교 학생들의 이야기를 담은 트렌디한 플랫폼.</p>
          <br />
          <p>당신의 첫 창작, cido에서 시작하세요.</p>
        </section>

        {/* What is CIDO Section */}
        <section className={styles.whatIsCido}>
          <h2>시도는 멈추지 않는다</h2>
          <p>매일의 순간 속에서 무수한 시도를 합니다</p>
          <p>조심스러운 한 걸음, 실패를 딛고 다시 내딛는 용기,</p>
          <p>[cido]는 그 '시도' 에서 확장된 창작의 가능성을 담은 브랜드 입니다</p>
        </section>

        {/* Team Section */}
        <section className={styles.team}>
          <h2>The TEAM</h2>
          <p>시도에는 각 분야의 전문가들이 프로젝트의 성공적인 실현을 위해 함께하고 있습니다.</p>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <h3>아이디어팀</h3>
              <p>프로젝트 기획</p>
            </div>
            <div className={styles.teamMember}>
              <h3>홍익대학교</h3>
              <p>UI/UX 디자인 교수</p>
            </div>
            <div className={styles.teamMember}>
              <h3>홍익대학교</h3>
              <p>브랜딩 교수</p>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className={styles.process}>
          <h2>cido는 디자인 프로젝트를 위한 연결을 제공합니다.<br />cido에서 연결하세요!</h2>
          <div className={styles.processSteps}>
            <div className={styles.step}>
              <span className={styles.stepLabel}>I</span>
              <Image
                src="/Interdisciplinary.png"
                alt="Interdisciplinary - 학제 간 융합연구"
                width={280}
                height={200}
                objectFit="cover"
                className={styles.stepImage}
              />
              <h3>Interdisciplinary 학제 간 융합연구</h3>
              <p>UXUI 프로토타입의 필요한 개발자,<br />브랜딩이 필요한 학교 동아리,<br />컨텐츠 제작이 필요한 마케터 등</p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepLabel}>D</span>
              <Image
                src="/Designer.png"
                alt="Designer - 홍익대 학생들"
                width={280}
                height={200}
                objectFit="cover"
                className={styles.stepImage}
              />
              <h3>Designer 홍익대 학생들</h3>
              <p>자신의 디자인을 널리 알리고,<br />작품 판매 및 프로젝트의 기회를 찾는<br />홍익대학교 학생들</p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepLabel}>E</span>
              <Image
                src="/Enterprise.png"
                alt="Enterprise - 기업 및 소상공인"
                width={280}
                height={200}
                objectFit="cover"
                className={styles.stepImage}
              />
              <h3>Enterprise 기업 및 소상공인</h3>
              <p>소상공인, 청년 창업가 등<br />브랜드를 이루는<br />각종 디자인이 필요한 사업가</p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepLabel}>A</span>
              <Image
                src="/Artist.png"
                alt="Artist - 아티스트"
                width={280}
                height={200}
                objectFit="cover"
                className={styles.stepImage}
              />
              <h3>Artist 아티스트</h3>
              <p>인디밴드, 무용가, 독립 영화 감독 등<br />작품 홍보에 특장점이고 실험적인<br />디자인 작업을 원하는 개인 아티스트</p>
            </div>
          </div>
        </section>

        {/* Links Section */}
        <section className={styles.links}>
          <h2>프로젝트의 성공적인 실현을 지원합니다.</h2>
          <div className={styles.linkGrid}>
            <Link href="#" className={styles.linkCard}>
              <h3>Portfolio</h3>
              <p>프로젝트 포트폴리오를 확인하세요</p>
            </Link>
            <Link href="#" className={styles.linkCard}>
              <h3>Career</h3>
              <p>새로운 기회를 발견하세요</p>
            </Link>
            <Link href="#" className={styles.linkCard}>
              <h3>Market</h3>
              <p>다양한 프로젝트를 만나보세요</p>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
