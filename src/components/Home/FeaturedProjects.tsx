import React from 'react';
import { Card, Container, Badge, Button } from '@/components/ui';
import { colors, typography, spacing } from '@/styles/tokens';

interface Project {
  id: number;
  title: string;
  designer: string;
  category: string;
  image: string;
  likes: number;
  views: number;
}

const FeaturedProjects: React.FC = () => {
  // 예시 프로젝트 데이터
  const projects: Project[] = [
    {
      id: 1,
      title: 'Modern UI Design System',
      designer: '김디자인',
      category: 'UI/UX',
      image: '#3B82F6',
      likes: 245,
      views: 3420,
    },
    {
      id: 2,
      title: 'Brand Identity Design',
      designer: '이크리에이터',
      category: 'Branding',
      image: '#8B5CF6',
      likes: 189,
      views: 2150,
    },
    {
      id: 3,
      title: 'Mobile App Interface',
      designer: '박아티스트',
      category: 'Mobile',
      image: '#10B981',
      likes: 312,
      views: 4280,
    },
    {
      id: 4,
      title: 'E-commerce Platform',
      designer: '최개발자',
      category: 'Web',
      image: '#F59E0B',
      likes: 276,
      views: 3890,
    },
  ];

  return (
    <section
      style={{
        backgroundColor: colors['gray-50'],
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
            Featured Projects
          </h2>
          <p
            style={{
              fontSize: typography['body-large'].fontSize,
              color: colors['gray-600'],
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            최고의 디자이너들이 만든 프로젝트를 만나보세요
          </p>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: `${spacing.xl}px`,
            marginBottom: `${spacing['2xl']}px`,
          }}
        >
          {projects.map((project) => (
            <Card
              key={project.id}
              padding="none"
              hoverable
              clickable
              onClick={() => console.log('Project clicked:', project.id)}
            >
              {/* Image */}
              <div
                style={{
                  height: '240px',
                  backgroundColor: project.image,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  color: colors.white,
                  fontWeight: 700,
                }}
              >
                🎨
              </div>

              {/* Content */}
              <div style={{ padding: `${spacing.lg}px` }}>
                {/* Category Badge */}
                <Badge
                  variant="primary"
                  size="sm"
                  style={{ marginBottom: `${spacing.sm}px` }}
                >
                  {project.category}
                </Badge>

                {/* Title */}
                <h3
                  style={{
                    fontSize: typography['heading-5'].fontSize,
                    fontWeight: 600,
                    color: colors['text-dark'],
                    marginBottom: `${spacing.xs}px`,
                  }}
                >
                  {project.title}
                </h3>

                {/* Designer */}
                <p
                  style={{
                    fontSize: typography['body-small'].fontSize,
                    color: colors['gray-600'],
                    marginBottom: `${spacing.md}px`,
                  }}
                >
                  by {project.designer}
                </p>

                {/* Stats */}
                <div
                  style={{
                    display: 'flex',
                    gap: `${spacing.md}px`,
                    fontSize: typography['body-small'].fontSize,
                    color: colors['gray-500'],
                  }}
                >
                  <span>❤️ {project.likes}</span>
                  <span>👁️ {project.views}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center' }}>
          <Button variant="outline" size="lg" rightIcon="→">
            모든 프로젝트 보기
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProjects;

