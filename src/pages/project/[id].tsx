import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Footer from '../../components/Footer/Footer';
import styles from './ProjectDetail.module.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// 프로젝트 데이터 타입 정의
interface Project {
  id: number;
  title: string;
  category: string;
  price: string;
  image: string;
  description?: string;
  designer?: string;
  tags?: string[];
  images?: string[];
}

// 임시 프로젝트 데이터 (실제로는 API에서 가져올 데이터)
const projectData: Project[] = [
  {
    id: 1,
    title: 'Piercing & Body Modification',
    category: 'illustration, Book Design',
    price: '64,300 won',
    image: '/project/source/piercing_body_modification.jpg',
    description: '피어싱과 바디 모디피케이션을 주제로 한 일러스트레이션 작품입니다. 다양한 형태의 바디 아트와 피어싱을 아름답게 표현했습니다.',
    designer: '최림',
    tags: ['일러스트', '바디아트', '피어싱'],
    images: [
      '/project/source/piercing_body_modification.jpg',
      '/project/source/piercing_body_modification.jpg',
      '/project/source/piercing_body_modification.jpg'
    ]
  },
  {
    id: 2,
    title: '박환 공간',
    category: 'illustration, Book Design',
    price: '64,300 won',
    image: '/project/source/park_hwan_space.png',
    description: '박환 작가의 공간을 표현한 일러스트레이션 작품입니다. 따뜻한 감성과 세심한 디테일이 돋보이는 작품입니다.',
    designer: '박환',
    tags: ['일러스트', '공간', '감성'],
    images: [
      '/project/source/park_hwan_space.png',
      '/project/source/park_hwan_space.png',
      '/project/source/park_hwan_space.png'
    ]
  },
  {
    id: 3,
    title: '무제',
    category: 'illustration, Book Design',
    price: '64,300 won',
    image: '/project/Rectangle 34626263-1.png',
    description: '추상적이고 감성적인 무제 작품입니다. 자유로운 표현과 창의적인 아이디어가 담긴 작품입니다.',
    designer: '이작가',
    tags: ['추상', '감성', '자유'],
    images: [
      '/project/Rectangle 34626263-1.png',
      '/project/Rectangle 34626263-1.png',
      '/project/Rectangle 34626263-1.png'
    ]
  },
  {
    id: 4,
    title: '가내수공업 포스터',
    category: 'illustration, Book Design',
    price: '64,300 won',
    image: '/project/source/poster_craft.png',
    description: '가내수공업의 따뜻함과 정성을 담은 포스터 디자인입니다. 수공예의 아름다움을 현대적으로 표현했습니다.',
    designer: '정디자이너',
    tags: ['포스터', '수공예', '디자인'],
    images: [
      '/project/source/poster_craft.png',
      '/project/source/poster_craft.png',
      '/project/source/poster_craft.png'
    ]
  },
  {
    id: 5,
    title: '헤쳐모여',
    category: 'illustration, Book Design',
    price: '64,300 won',
    image: '/project/Rectangle 34626263-3.png',
    description: '모험과 여행을 주제로 한 일러스트레이션 작품입니다. 다양한 캐릭터들이 함께 모여가는 이야기를 담았습니다.',
    designer: '최모험가',
    tags: ['모험', '여행', '캐릭터'],
    images: [
      '/project/Rectangle 34626263-3.png',
      '/project/Rectangle 34626263-3.png',
      '/project/Rectangle 34626263-3.png'
    ]
  },
  {
    id: 6,
    title: '캠퍼스 고민수집단',
    category: 'AI, illustration, Book Design',
    price: '64,300 won',
    image: '/project/source/Campus.png',
    description: '캠퍼스 생활의 다양한 고민들을 수집하고 공유하는 프로젝트입니다. 대학생들의 공감대를 형성하는 작품입니다.',
    designer: '김캠퍼스',
    tags: ['캠퍼스', '고민', '커뮤니티'],
    images: [
      '/project/source/Campus.png',
      '/project/source/Campus.png',
      '/project/source/Campus.png'
    ]
  },
  {
    id: 7,
    title: 'Allnsight',
    category: 'AI, Book Design',
    price: '64,300 won',
    image: '/project/source/Allnsight.png',
    description: 'AI 기술을 활용한 인사이트 잡지 디자인입니다. 미래지향적인 디자인과 혁신적인 콘텐츠 구성이 특징입니다.',
    designer: 'AI디자이너',
    tags: ['AI', '잡지', '인사이트'],
    images: [
      '/project/source/Allnsight.png',
      '/project/source/Allnsight.png',
      '/project/source/Allnsight.png'
    ]
  },
  {
    id: 8,
    title: 'Christmas Card Set',
    category: 'illustration, Book Design',
    price: '64,300 won',
    image: '/project/image_19.png',
    description: '크리스마스를 주제로 한 카드 세트 디자인입니다. 따뜻하고 아름다운 크리스마스 감성을 담았습니다.',
    designer: '산타디자이너',
    tags: ['크리스마스', '카드', '축하'],
    images: [
      '/project/image_19.png',
      '/project/image_19.png',
      '/project/image_19.png'
    ]
  },
  {
    id: 9,
    title: 'My Recipe Book',
    category: 'illustration, Book Design',
    price: '64,300 won',
    image: '/project/source/choi_lim_04.jpg',
    description: '개인적인 레시피를 담은 요리책 디자인입니다. 맛있고 아름다운 음식의 세계를 시각적으로 표현했습니다.',
    designer: '최요리사',
    tags: ['요리', '레시피', '책'],
    images: [
      '/project/source/choi_lim_04.jpg',
      '/project/source/choi_lim_04.jpg',
      '/project/source/choi_lim_04.jpg'
    ]
  }
];

const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const swiperRef = useRef<SwiperType | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState(0); // 탭 상태 관리 (0: 작품 상세, 1: 디자이너, 2: 치어링)

  const toggleAutoPlay = () => {
    if (swiperRef.current) {
      if (isPlaying) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // 프로젝트 ID로 데이터 찾기
  const project = projectData.find(p => p.id === parseInt(id as string));
  
  if (!project) {
    return (
      <div className={styles.container}>
        <Head>
          <title>프로젝트를 찾을 수 없습니다 - Cido</title>
        </Head>
        <NavigationBar />
        <div className={styles.notFound}>
          <h1>프로젝트를 찾을 수 없습니다</h1>
          <button onClick={() => router.push('/project')}>
            프로젝트 목록으로 돌아가기
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{project.title} - Cido</title>
        <meta name="description" content={project.description} />
      </Head>
      
      <NavigationBar />

      <main className={styles.main}>
          {/* Main_Img 섹션 */}
          <section className={styles.mainImgSection}>
          <div className={styles.mainImgContainer}>
            {/* Image Frame - 705x893 */}
            <div className={styles.imageFrame}>
              <img
                src={project.image}
                alt={project.title}
                className={styles.mainImage}
              />
              {/* A4 - 1 오버레이 이미지 - Figma 위치 (49, 10931) */}
              <div className={styles.a4Overlay}>
                <img src="/project/Image1.png" alt="A4 오버레이" className={styles.overlayImage} />
              </div>
            </div>
            
            {/* Information Frame - 590x893 */}
            <div className={styles.informationFrame}>
              {/* Paragraph_Container - 590x165 */}
              <div className={styles.paragraphContainer}>
                {/* Title Frame - 590x73 */}
                <div className={styles.titleFrame}>
                  {/* Text Frame - 542x73 */}
                  <div className={styles.textFrame}>
                    {/* H1 Frame - 446x33 */}
                    <div className={styles.h1Frame}>
                      <h1 className={styles.projectTitle}>{project.title}</h1>
                    </div>
                    <p className={styles.designerName}>{project.designer}</p>
                  </div>
                           {/* Icon Frame - 48x48 */}
                           <div className={styles.iconFrame}>
                             <img src="/Icon.svg" alt="좋아요" className={styles.heartIcon} />
                           </div>
                </div>
                {/* Information Text - 590x52 */}
                <div className={styles.informationText}>
                  <p>{project.description}</p>
                </div>
              </div>
              
              {/* Frame 1261154874 - 590x274 */}
              <div className={styles.purchaseFrame}>
                {/* Frame 1261154872 - 590x92 */}
                <div className={styles.quantityFrame}>
                  <span className={styles.quantityLabel}>수량</span>
                  {/* Frame 1261154871 - 590x50 */}
                  <div className={styles.quantityControlFrame}>
                           {/* Frame 1261154671 - 158x42 */}
                           <div className={styles.quantityButtonsFrame}>
                             <button className={styles.quantityBtn}>
                               <img src="/Vector 49.svg" alt="빼기" className={styles.quantityIcon} />
                             </button>
                             <span className={styles.quantityValue}>1</span>
                             <button className={styles.quantityBtn}>
                               <img src="/Union.svg" alt="더하기" className={styles.quantityIcon} />
                             </button>
                           </div>
                    <span className={styles.price}>{project.price}</span>
                  </div>
                </div>
                
                {/* Frame 1261154877 - 590x157 */}
                <div className={styles.buttonsFrame}>
                  {/* Frame 1261154876 - 590x66 */}
                  <div className={styles.actionButtonsFrame}>
                    {/* Frame 1261154623 - 287x66 */}
                    <div className={styles.addToCartFrame}>
                      <button className={styles.addToCartBtn}>장바구니 담기</button>
                    </div>
                    {/* Frame 1261154622 - 287x66 */}
                    <div className={styles.suggestFrame}>
                      <button className={styles.suggestBtn}>제안하기</button>
                    </div>
                  </div>
                  {/* Frame 1261154619 - 590x75 */}
                  <div className={styles.buyNowFrame}>
                    <button className={styles.buyNowBtn}>바로 구매하기</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design_Project 섹션 */}
        <section className={styles.designProjectSection}>
          <h2 className={styles.sectionTitle}>{project.designer} 디자이너의 프로젝트</h2>
          <div className={styles.designerProjects}>
            {[
              { title: '박환 공간', designer: '최림', image: '/project/source/park_hwan_space.png' },
              { title: '여명대학교', designer: '최림', image: '/project/source/yeomyeong_university.png' },
              { title: '무제', designer: '최림', image: '/project/Rectangle 34626263-1.png' },
              { title: '가내수공업 포스터', designer: '최림', image: '/project/source/poster_craft.png' }
            ].map((item, index) => (
              <div key={index} className={styles.designerProjectItem}>
                <img src={item.image} alt={item.title} className={styles.designerProjectImage} />
                <div className={styles.designerProjectInfo}>
                  <h3 className={styles.designerProjectTitle}>{item.title}</h3>
                  <p className={styles.designerProjectDesigner}>{item.designer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 탭 메뉴 섹션 */}
        <section className={styles.tabSection}>
          <div className={styles.tabContainer}>
            <div className={styles.tabButtons}>
              <button 
                className={`${styles.tabButton} ${activeTab === 0 ? styles.active : ''}`}
                onClick={() => setActiveTab(0)}
              >
                작품 상세
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 1 ? styles.active : ''}`}
                onClick={() => setActiveTab(1)}
              >
                디자이너
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 2 ? styles.active : ''}`}
                onClick={() => setActiveTab(2)}
              >
                치어링
              </button>
            </div>
            <div className={styles.tabContent}>
              {activeTab === 0 && (
                <p className={styles.detailDescription}>
                  '피어싱&신체개조'(지도교수: 사카베 히토미)는 개인의 개성을 대담하게 드러내는 강렬한 표현이자, 시각적 조형미를 통해 예술적 가치를 지닌 문화적 활동을 담은 작품이다. 최림 학우는 이 문화의 매력과 아름다움을 알리는 동시에, 이를 향유하는 사람들이 직면하는 편견과 오해를 개선하고자 일러스트 포스터를 제작하였다. 신체 개조가 단순한 반항의 표식이 아니라, 자기 정체성을 구축하고 삶을 창조적으로 탐구하는 과정임을 보여주고자 하였으며, 시각 예술을 통해 피어싱과 신체 개조가 지닌 다양성과 가능성을 조명하며 새로운 시각으로 바라볼 기회를 제공하고자 하였다. 포스터는 6개의 영수증이 조합된 형태로 구성되었으며, 인물 아래에는 해당 인물이 받은 시술과 피어싱의 정보가 정리되어 있다. 또한, 영수증 위에 그려진 자유로운 핸드 라이팅 타이틀은 강렬하고 자유로운 문화적 특성을 강조한다.
                </p>
              )}
              {activeTab === 1 && (
                <p className={styles.detailDescription}>
                  디자이너 정보가 여기에 표시됩니다.
                </p>
              )}
              {activeTab === 2 && (
                <p className={styles.detailDescription}>
                  치어링 정보가 여기에 표시됩니다.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 상세 이미지 섹션 */}
        <section className={styles.detailImageSection}>
          <h3 className={styles.detailImageTitle}>상세 이미지</h3>
          <img src="/project/detail_image.png" alt="상세 이미지" className={styles.detailImage} />
        </section>

        {/* 디자이너 프로필 섹션 */}
        <section className={styles.designerProfileSection}>
          {/* 제목 영역 */}
          <div className={styles.designerProfileInfo}>
            <h3 className={styles.designerProfileTitle}>디자이너</h3>
            <p className={styles.designerProfileSubtitle}>홍익대학교 디자인컨버전스학부<br />Visual Essay 과목 작품</p>
          </div>
          
          {/* 카드들 가로 배치 */}
          <div className={styles.designerProfileCardsContainer}>
            <div className={styles.designerProfileCard}>
              <div className={styles.designerProfileImage}>
                <img src="/project/source/choi_lim_04.jpg" alt="여명대학교" className={styles.profileImage} />
              </div>
              <div className={styles.designerProfileDetails}>
                <h4 className={styles.designerProfileName}>여명대학교</h4>
                <p className={styles.designerProfileSns}>@yeomyeong_university</p>
              </div>
            </div>
            
            <div className={styles.designerProfileCard}>
              <div className={styles.designerProfileImage}>
                <img src="/project/source/choi_lim_04.jpg" alt="여명대학교" className={styles.profileImage} />
              </div>
              <div className={styles.designerProfileDetails}>
                <h4 className={styles.designerProfileName}>여명대학교</h4>
                <p className={styles.designerProfileSns}>@yeomyeong_university</p>
              </div>
            </div>
            
            <div className={styles.designerProfileCard}>
              <div className={styles.designerProfileImage}>
                <img src="/project/source/choi_lim_04.jpg" alt="여명대학교" className={styles.profileImage} />
              </div>
              <div className={styles.designerProfileDetails}>
                <h4 className={styles.designerProfileName}>여명대학교</h4>
                <p className={styles.designerProfileSns}>@yeomyeong_university</p>
              </div>
            </div>
            
            <div className={styles.designerProfileCard}>
              <div className={styles.designerProfileImage}>
                <img src="/project/source/choi_lim_04.jpg" alt="여명대학교" className={styles.profileImage} />
              </div>
              <div className={styles.designerProfileDetails}>
                <h4 className={styles.designerProfileName}>여명대학교</h4>
                <p className={styles.designerProfileSns}>@yeomyeong_university</p>
              </div>
            </div>
          </div>
        </section>

        {/* 인터뷰 섹션 */}
        <section className={styles.interviewSection}>
          <h3 className={styles.interviewTitle}>인터뷰</h3>
          
          {/* 인터뷰 카드들 가로 배치 */}
          <div className={styles.interviewCardsContainer}>
            <div className={styles.interviewCard}>
              <div className={styles.interviewImageWrapper}>
                <img src="/project/AIInsight (1) 1.png" alt="인터뷰" className={styles.interviewImage} />
              </div>
              <div className={styles.interviewInfo}>
                <h4 className={styles.interviewProjectTitle}>『여명대학교』 프로젝트</h4>
                <p className={styles.interviewProjectDesigner}>여명대학교</p>
              </div>
            </div>
            
            <div className={styles.interviewCard}>
              <div className={styles.interviewImageWrapper}>
                <img src="/project/AIInsight (1) 1.png" alt="인터뷰" className={styles.interviewImage} />
              </div>
              <div className={styles.interviewInfo}>
                <h4 className={styles.interviewProjectTitle}>『여명대학교』 프로젝트</h4>
                <p className={styles.interviewProjectDesigner}>여명대학교</p>
              </div>
            </div>
            
            <div className={styles.interviewCard}>
              <div className={styles.interviewImageWrapper}>
                <img src="/project/AIInsight (1) 1.png" alt="인터뷰" className={styles.interviewImage} />
              </div>
              <div className={styles.interviewInfo}>
                <h4 className={styles.interviewProjectTitle}>『여명대학교』 프로젝트</h4>
                <p className={styles.interviewProjectDesigner}>여명대학교</p>
              </div>
            </div>
          </div>
        </section>

        {/* 추천 프로젝트 섹션 */}
        <section className={styles.recommendationSection}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>추천 프로젝트</h1>
          </div>
          
          {/* 배너 이미지 슬라이더 */}
          <div className={styles.sliderWrapper}>
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={2.8}
              spaceBetween={20}
              loop={true}
              centeredSlides={false}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={600}
              grabCursor={true}
              pagination={{
                clickable: true,
                enabled: true,
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1.2,
                  spaceBetween: 12,
                },
                744: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                1660: {
                  slidesPerView: 2.8,
                  spaceBetween: 20,
                },
              }}
              className={styles.swiper}
            >
              {[1, 2, 3, 4, 5].map((item, index) => (
                <SwiperSlide key={index} className={styles.swiperSlide}>
                  <div 
                    className={styles.bannerImageItem}
                    onClick={() => router.push('/project/1')}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src="/project/image_19.png"
                      alt="추천 프로젝트"
                      className={styles.bannerImage}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 재생/정지 버튼 */}
            <button
              className={styles.playPauseButton}
              onClick={toggleAutoPlay}
              aria-label={isPlaying ? '슬라이더 정지' : '슬라이더 재생'}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
