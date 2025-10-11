/**
 * 새로운 Home 페이지
 * 경로: /home-new
 * 
 * UI 컴포넌트 라이브러리를 활용한 모던한 홈 페이지
 */

import React from 'react';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import Footer from '@/components/Footer/Footer';
import HeroSection from '@/components/Home/HeroSection';
import FeaturedProjects from '@/components/Home/FeaturedProjects';
import FeaturedDesigners from '@/components/Home/FeaturedDesigners';
import CTASection from '@/components/Home/CTASection';

export default function HomeNew() {
  return (
    <div>
      <NavigationBar />
      <main>
        <HeroSection />
        <FeaturedProjects />
        <FeaturedDesigners />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

