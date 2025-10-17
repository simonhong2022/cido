import React from 'react';
import { Button, Container } from '@/components/ui';
import { colors, typography, spacing } from '@/styles/tokens';

const HeroSection: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: colors.black,
        color: colors.white,
        padding: `${spacing['5xl']}px 0`,
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${colors.accent}20 0%, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: `${spacing.xl}px`,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <span
            style={{
              display: 'inline-block',
              padding: `${spacing.xs}px ${spacing.md}px`,
              backgroundColor: `${colors.accent}20`,
              color: colors.accent,
              borderRadius: '100px',
              fontSize: typography.caption.fontSize,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Designer Community
          </span>

          {/* Main Heading */}
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 700,
              lineHeight: '1.1',
              maxWidth: '900px',
              margin: 0,
              background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.accent} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            디자이너와 함께 만드는
            <br />
            창의적인 미래
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: typography['body-large'].fontSize,
              color: colors['gray-300'],
              maxWidth: '600px',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            재능있는 디자이너들과 함께 프로젝트를 공유하고,
            <br />
            영감을 얻고, 함께 성장하세요.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              gap: `${spacing.md}px`,
              marginTop: `${spacing.lg}px`,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Button variant="primary" size="lg" leftIcon="🚀">
              시작하기
            </Button>
            <Button variant="outline" size="lg" rightIcon="→">
              더 알아보기
            </Button>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: `${spacing['3xl']}px`,
              marginTop: `${spacing['2xl']}px`,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              { number: '1000+', label: '디자이너' },
              { number: '5000+', label: '프로젝트' },
              { number: '50+', label: '기업' },
            ].map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 700,
                    color: colors.accent,
                    marginBottom: `${spacing.xs}px`,
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: typography['body-small'].fontSize,
                    color: colors['gray-400'],
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;

