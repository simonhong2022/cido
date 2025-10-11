import React from 'react';
import { Card, Container, Badge, Button } from '@/components/ui';
import { colors, typography, spacing } from '@/styles/tokens';

interface Designer {
  id: number;
  name: string;
  title: string;
  specialty: string;
  projects: number;
  followers: number;
  avatar: string;
}

const FeaturedDesigners: React.FC = () => {
  const designers: Designer[] = [
    {
      id: 1,
      name: '김디자인',
      title: 'Senior UI/UX Designer',
      specialty: 'UI/UX',
      projects: 45,
      followers: 1234,
      avatar: '#3B82F6',
    },
    {
      id: 2,
      name: '이크리에이터',
      title: 'Brand Designer',
      specialty: 'Branding',
      projects: 32,
      followers: 892,
      avatar: '#8B5CF6',
    },
    {
      id: 3,
      name: '박아티스트',
      title: 'Product Designer',
      specialty: 'Product',
      projects: 56,
      followers: 2103,
      avatar: '#10B981',
    },
    {
      id: 4,
      name: '최그래픽',
      title: 'Graphic Designer',
      specialty: 'Graphic',
      projects: 38,
      followers: 1567,
      avatar: '#F59E0B',
    },
  ];

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: `${spacing['4xl']}px 0`,
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: `${spacing['3xl']}px`,
          }}
        >
          <h2
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: colors['text-dark'],
              marginBottom: `${spacing.md}px`,
            }}
          >
            Featured Designers
          </h2>
          <p
            style={{
              fontSize: typography['body-large'].fontSize,
              color: colors['gray-600'],
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            재능있는 디자이너들을 만나보세요
          </p>
        </div>

        {/* Designers Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: `${spacing.xl}px`,
            marginBottom: `${spacing['2xl']}px`,
          }}
        >
          {designers.map((designer) => (
            <Card
              key={designer.id}
              padding="lg"
              hoverable
              clickable
              onClick={() => console.log('Designer clicked:', designer.id)}
            >
              {/* Avatar */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: designer.avatar,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: `${spacing.md}px`,
                  margin: '0 auto',
                }}
              >
                👤
              </div>

              {/* Name & Title */}
              <div style={{ textAlign: 'center', marginBottom: `${spacing.sm}px` }}>
                <h3
                  style={{
                    fontSize: typography['heading-6'].fontSize,
                    fontWeight: 600,
                    color: colors['text-dark'],
                    marginBottom: `${spacing.xs / 2}px`,
                  }}
                >
                  {designer.name}
                </h3>
                <p
                  style={{
                    fontSize: typography['body-small'].fontSize,
                    color: colors['gray-600'],
                    marginBottom: `${spacing.xs}px`,
                  }}
                >
                  {designer.title}
                </p>
              </div>

              {/* Specialty Badge */}
              <div style={{ textAlign: 'center', marginBottom: `${spacing.md}px` }}>
                <Badge variant="secondary" size="sm">
                  {designer.specialty}
                </Badge>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  paddingTop: `${spacing.md}px`,
                  borderTop: `1px solid ${colors['gray-200']}`,
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: typography['heading-6'].fontSize,
                      fontWeight: 600,
                      color: colors['text-dark'],
                    }}
                  >
                    {designer.projects}
                  </div>
                  <div
                    style={{
                      fontSize: typography.caption.fontSize,
                      color: colors['gray-500'],
                    }}
                  >
                    Projects
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: typography['heading-6'].fontSize,
                      fontWeight: 600,
                      color: colors['text-dark'],
                    }}
                  >
                    {designer.followers}
                  </div>
                  <div
                    style={{
                      fontSize: typography.caption.fontSize,
                      color: colors['gray-500'],
                    }}
                  >
                    Followers
                  </div>
                </div>
              </div>

              {/* Follow Button */}
              <Button
                variant="outline"
                size="sm"
                fullWidth
                style={{ marginTop: `${spacing.md}px` }}
              >
                Follow
              </Button>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center' }}>
          <Button variant="outline" size="lg" rightIcon="→">
            모든 디자이너 보기
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedDesigners;

