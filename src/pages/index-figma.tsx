/**
 * Home 페이지 - Figma 디자인 정확히 구현
 * 경로: /index-figma
 */

import React, { useState } from 'react';
import { Container } from '@/components/ui';

export default function HomeFigma() {
  const [currentBanner, setCurrentBanner] = useState(0);
  
  const banners = [
    { text: '시도는 멈추지 않는다.' },
    { text: '' }, // 그래픽 배너
    { text: '홍익대학교 학생들의 실험적인 시도를, 세상과 연결하는 창의적 플랫폼.' },
  ];

  return (
    <div style={{ backgroundColor: '#000000' }}>
      {/* Navigation */}
      <nav
        style={{
          backgroundColor: '#000000',
          height: '101px',
          borderBottom: '1px solid #333',
        }}
      >
        <Container maxWidth="xl">
          <div
            style={{
              height: '101px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo */}
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#ffffff',
              }}
            >
              CIDO
            </div>

            {/* Menu */}
            <div style={{ display: 'flex', gap: '40px' }}>
              {['Explore', 'Project', 'About', 'Designers', 'Community'].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '16px',
                  }}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                style={{
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  border: '1px solid #ffffff',
                  padding: '10px 24px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                디자인 의뢰하기
              </button>
              <button
                style={{
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                내 작업 업로드
              </button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Hero Banner */}
      <section
        style={{
          backgroundColor: '#000000',
          height: '875px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {currentBanner === 0 && (
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                fontFamily: 'Pretendard Variable, sans-serif',
                fontSize: '80px',
                fontWeight: 800,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '-1.6px',
              }}
            >
              시도는 멈추지 않는다.
            </h1>
            
            {/* Graphic decoration */}
            <div
              style={{
                marginTop: '40px',
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '4px',
                  backgroundColor: '#1918F8',
                }}
              />
              <div
                style={{
                  fontSize: '24px',
                  color: '#1918F8',
                  fontWeight: 'bold',
                }}
              >
                {'[ Collection ]'}
              </div>
              <div
                style={{
                  width: '40px',
                  height: '4px',
                  backgroundColor: '#1918F8',
                }}
              />
            </div>
          </div>
        )}

        {currentBanner === 1 && (
          <div
            style={{
              textAlign: 'center',
            }}
          >
            {/* 그래픽 중심 배너 */}
            <div
              style={{
                fontSize: '120px',
                color: '#1918F8',
              }}
            >
              🎨
            </div>
            <div
              style={{
                marginTop: '40px',
                fontSize: '32px',
                color: '#ffffff',
                fontWeight: 'bold',
              }}
            >
              Creative Portfolio
            </div>
          </div>
        )}

        {currentBanner === 2 && (
          <div
            style={{
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            <h1
              style={{
                fontFamily: 'Pretendard Variable, sans-serif',
                fontSize: '28px',
                fontWeight: 400,
                color: '#E5E5EA',
                margin: 0,
                letterSpacing: '-0.56px',
                lineHeight: '1.9',
              }}
            >
              홍익대학교 학생들의 실험적인 시도를,
              <br />
              세상과 연결하는 창의적 플랫폼.
            </h1>
          </div>
        )}

        {/* Banner Navigation Dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '12px',
          }}
        >
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              style={{
                width: currentBanner === index ? '40px' : '12px',
                height: '12px',
                borderRadius: '6px',
                backgroundColor: currentBanner === index ? '#ffffff' : '#666666',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
      </section>

      {/* Main Content Area - 여기에 프로젝트/디자이너 등 컨텐츠가 들어갑니다 */}
      <section
        style={{
          backgroundColor: '#ffffff',
          minHeight: '2000px',
          padding: '80px 0',
        }}
      >
        <Container maxWidth="xl">
          <div
            style={{
              textAlign: 'center',
              color: '#000000',
            }}
          >
            <h2
              style={{
                fontSize: '48px',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              Featured Projects
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#666666',
                marginBottom: '60px',
              }}
            >
              최신 프로젝트를 만나보세요
            </p>
            
            {/* 프로젝트 그리드 영역 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '30px',
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: '4/3',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                  }}
                >
                  🎨
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e0e0e0',
          padding: '60px 0',
        }}
      >
        <Container maxWidth="xl">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: '60px',
            }}
          >
            {/* Company Info */}
            <div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                }}
              >
                cido
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: '#666666',
                  lineHeight: '1.6',
                  margin: 0,
                }}
              >
                홍익대학교 학생들의 실험적인 시도를,
                <br />
                세상과 연결하는 창의적 플랫폼.
              </p>
              <p
                style={{
                  fontSize: '12px',
                  color: '#999999',
                  lineHeight: '1.8',
                  marginTop: '20px',
                }}
              >
                대표자: OOO | 010-0000-0000
                <br />
                서울특별시 동대문구 한천로6길 16 3층
                <br />
                hsm@cidographics.com
              </p>
            </div>

            {/* Links 1 */}
            <div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '20px',
                }}
              >
                바로가기
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <a
                  href="#"
                  style={{
                    color: '#666666',
                    textDecoration: 'none',
                    fontSize: '14px',
                  }}
                >
                  이용약관
                </a>
                <a
                  href="#"
                  style={{
                    color: '#666666',
                    textDecoration: 'none',
                    fontSize: '14px',
                  }}
                >
                  개인정보처리방침
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div>
              <p
                style={{
                  fontSize: '12px',
                  color: '#999999',
                  margin: 0,
                }}
              >
                Copyright © SIDE. All Rights Reserved.
              </p>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

