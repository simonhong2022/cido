/**
 * Home 페이지 - Figma 디자인 정확히 구현
 * 참조: https://www.figma.com/design/2kZVje7lNQF486v2OUGpM9/Cido-Web?node-id=136-7356
 */

import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import MainVisual from '../components/Home/MainVisual/MainVisual';
import ProjectVisual from '../components/Home/ProjectVisual/ProjectVisual';
import ProjectCards from '../components/Home/ProjectCard/ProjectCards';
import InterviewVisual from '../components/Home/InterviewVisual/InterviewVisual';
import InterviewCards from '../components/Home/InterviewCard/InterviewCards';
import CommunityVisual from '../components/Home/CommunityVisual/CommunityVisual';
import CommunityCards from '../components/Home/CommunityCard/CommunityCards';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.mainBg}>
      {/* Navigation - 101px */}
      <NavigationBar />
      
      <main className={styles.mainContainer}>
        {/* Hero Banner - 875px - "시도는 멈추지 않는다." */}
        <MainVisual />
        
        {/* Hot_Project Section - 1224px */}
        <section style={{ backgroundColor: '#fff' }}>
          {/* Main_Banner - 782px */}
          <ProjectVisual />
          
          {/* Main_bilder - 422px */}
          <ProjectCards />
        </section>
        
              {/* 섹션 간격 - 반응형 */}
              <div className={styles.sectionGap} />
              
              {/* Frame 1261154926 (Hot Designer) - 1328px */}
        <section>
          <InterviewVisual />
          <InterviewCards />
        </section>
        
              {/* 섹션 간격 - 반응형 */}
              <div className={styles.sectionGap} />
              
              {/* Interview Section 2 - 716px */}
        <section>
          <CommunityVisual />
        </section>
        
              {/* 섹션 간격 - 반응형 */}
              <div className={styles.sectionGap} />
              
              {/* 4 Link Buttons - 797px - Figma 디자인 정확히 구현 */}
        
        {/* Community Section */}
        <CommunityCards />
      </main>
      
      {/* Footer - 363px */}
      <Footer />
    </div>
  );
}
