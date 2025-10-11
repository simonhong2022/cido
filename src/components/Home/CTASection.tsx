import React from 'react';
import { Button, Container } from '@/components/ui';
import { colors, typography, spacing } from '@/styles/tokens';

const CTASection: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: colors.primary,
        color: colors.white,
        padding: `${spacing['5xl']}px 0`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `radial-gradient(circle, ${colors.white} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient Circles */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
          borderRadius: '50%',
          opacity: 0.2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
          borderRadius: '50%',
          opacity: 0.2,
        }}
      />

      <Container maxWidth="lg">
        <div
          style={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Icon */}
          <div
            style={{
              fontSize: '64px',
              marginBottom: `${spacing.lg}px`,
            }}
          >
            🚀
          </div>

          {/* Heading */}
          <h2
            style={{
              fontSize: '48px',
              fontWeight: 700,
              marginBottom: `${spacing.md}px`,
              lineHeight: '1.2',
            }}
          >
            지금 바로 시작하세요
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: typography['body-large'].fontSize,
              color: colors['gray-200'],
              maxWidth: '700px',
              margin: `0 auto ${spacing.xl}px`,
              lineHeight: '1.6',
            }}
          >
            수천 명의 디자이너들과 함께 프로젝트를 공유하고,
            <br />
            피드백을 받고, 함께 성장하는 커뮤니티에 참여하세요.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              gap: `${spacing.md}px`,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: `${spacing.xl}px`,
            }}
          >
            <Button
              variant="secondary"
              size="lg"
              style={{
                backgroundColor: colors.white,
                color: colors.primary,
              }}
              leftIcon="✨"
            >
              무료로 시작하기
            </Button>
            <Button
              variant="outline"
              size="lg"
              style={{
                borderColor: colors.white,
                color: colors.white,
              }}
              rightIcon="→"
            >
              데모 보기
            </Button>
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: `${spacing.xl}px`,
              justifyContent: 'center',
              flexWrap: 'wrap',
              fontSize: typography['body-small'].fontSize,
              color: colors['gray-300'],
            }}
          >
            <span>✓ 무료로 시작</span>
            <span>✓ 신용카드 불필요</span>
            <span>✓ 언제든지 취소</span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;

