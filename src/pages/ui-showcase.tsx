/**
 * UI 컴포넌트 쇼케이스 페이지
 * 경로: /ui-showcase
 * 
 * 새로 만든 공통 컴포넌트들의 사용 예제를 보여줍니다.
 */

import React, { useState } from 'react';
import { Button, Card, Input, Badge, Container } from '@/components/ui';
import { spacing } from '@/styles/tokens';

export default function UIShowcasePage() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{ padding: `${spacing['2xl']}px 0`, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <h1 style={{ marginBottom: `${spacing.xl}px`, fontSize: '48px', fontWeight: 'bold' }}>
          🎨 UI 컴포넌트 쇼케이스
        </h1>
        <p style={{ marginBottom: `${spacing['2xl']}px`, fontSize: '18px', color: '#666' }}>
          디자인 토큰을 활용한 재사용 가능한 컴포넌트 라이브러리
        </p>

        {/* Buttons Section */}
        <section style={{ marginBottom: `${spacing['3xl']}px` }}>
          <h2 style={{ marginBottom: `${spacing.lg}px`, fontSize: '32px', fontWeight: '600' }}>
            Buttons
          </h2>
          
          <Card padding="lg" style={{ marginBottom: `${spacing.lg}px` }}>
            <h3 style={{ marginBottom: `${spacing.md}px` }}>Variants</h3>
            <div style={{ display: 'flex', gap: `${spacing.md}px`, flexWrap: 'wrap' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </Card>

          <Card padding="lg" style={{ marginBottom: `${spacing.lg}px` }}>
            <h3 style={{ marginBottom: `${spacing.md}px` }}>Sizes</h3>
            <div style={{ display: 'flex', gap: `${spacing.md}px`, alignItems: 'center', flexWrap: 'wrap' }}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </Card>

          <Card padding="lg" style={{ marginBottom: `${spacing.lg}px` }}>
            <h3 style={{ marginBottom: `${spacing.md}px` }}>States</h3>
            <div style={{ display: 'flex', gap: `${spacing.md}px`, flexWrap: 'wrap' }}>
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button loading={loading} onClick={handleLoadingClick}>
                {loading ? 'Loading...' : 'Click to Load'}
              </Button>
              <Button fullWidth>Full Width</Button>
            </div>
          </Card>

          <Card padding="lg">
            <h3 style={{ marginBottom: `${spacing.md}px` }}>With Icons</h3>
            <div style={{ display: 'flex', gap: `${spacing.md}px`, flexWrap: 'wrap' }}>
              <Button leftIcon="🚀">Launch</Button>
              <Button rightIcon="→">Next</Button>
              <Button leftIcon="❤️" variant="outline">Like</Button>
            </div>
          </Card>
        </section>

        {/* Cards Section */}
        <section style={{ marginBottom: `${spacing['3xl']}px` }}>
          <h2 style={{ marginBottom: `${spacing.lg}px`, fontSize: '32px', fontWeight: '600' }}>
            Cards
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: `${spacing.lg}px` }}>
            <Card variant="default" padding="lg">
              <h3 style={{ marginBottom: `${spacing.sm}px` }}>Default Card</h3>
              <p>기본 스타일의 카드입니다.</p>
            </Card>

            <Card variant="bordered" padding="lg">
              <h3 style={{ marginBottom: `${spacing.sm}px` }}>Bordered Card</h3>
              <p>테두리가 있는 카드입니다.</p>
            </Card>

            <Card variant="elevated" padding="lg">
              <h3 style={{ marginBottom: `${spacing.sm}px` }}>Elevated Card</h3>
              <p>그림자가 강조된 카드입니다.</p>
            </Card>

            <Card hoverable padding="lg">
              <h3 style={{ marginBottom: `${spacing.sm}px` }}>Hoverable Card</h3>
              <p>마우스를 올리면 효과가 나타납니다.</p>
            </Card>

            <Card clickable padding="lg" onClick={() => alert('Card clicked!')}>
              <h3 style={{ marginBottom: `${spacing.sm}px` }}>Clickable Card</h3>
              <p>클릭 가능한 카드입니다.</p>
            </Card>

            <Card padding="none">
              <div style={{ height: '150px', backgroundColor: '#3B82F6' }}></div>
              <div style={{ padding: `${spacing.md}px` }}>
                <h3 style={{ marginBottom: `${spacing.sm}px` }}>Image Card</h3>
                <p>이미지와 함께 사용하는 카드입니다.</p>
              </div>
            </Card>
          </div>
        </section>

        {/* Inputs Section */}
        <section style={{ marginBottom: `${spacing['3xl']}px` }}>
          <h2 style={{ marginBottom: `${spacing.lg}px`, fontSize: '32px', fontWeight: '600' }}>
            Inputs
          </h2>

          <Card padding="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${spacing.lg}px` }}>
              <Input
                label="이름"
                placeholder="이름을 입력하세요"
                fullWidth
              />

              <Input
                label="이메일"
                type="email"
                placeholder="email@example.com"
                helperText="이메일 주소를 입력해주세요"
                fullWidth
              />

              <Input
                label="비밀번호"
                type="password"
                placeholder="비밀번호"
                error="비밀번호는 8자 이상이어야 합니다"
                fullWidth
              />

              <Input
                label="검색"
                placeholder="검색..."
                leftIcon="🔍"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                fullWidth
              />

              <Input
                label="비활성화된 입력"
                value="수정할 수 없습니다"
                disabled
                fullWidth
              />
            </div>
          </Card>
        </section>

        {/* Badges Section */}
        <section style={{ marginBottom: `${spacing['3xl']}px` }}>
          <h2 style={{ marginBottom: `${spacing.lg}px`, fontSize: '32px', fontWeight: '600' }}>
            Badges
          </h2>

          <Card padding="lg" style={{ marginBottom: `${spacing.lg}px` }}>
            <h3 style={{ marginBottom: `${spacing.md}px` }}>Variants</h3>
            <div style={{ display: 'flex', gap: `${spacing.md}px`, flexWrap: 'wrap' }}>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </Card>

          <Card padding="lg" style={{ marginBottom: `${spacing.lg}px` }}>
            <h3 style={{ marginBottom: `${spacing.md}px` }}>Sizes</h3>
            <div style={{ display: 'flex', gap: `${spacing.md}px`, alignItems: 'center', flexWrap: 'wrap' }}>
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </Card>

          <Card padding="lg">
            <h3 style={{ marginBottom: `${spacing.md}px` }}>Dots</h3>
            <div style={{ display: 'flex', gap: `${spacing.md}px`, alignItems: 'center', flexWrap: 'wrap' }}>
              <Badge dot variant="primary" />
              <Badge dot variant="success" />
              <Badge dot variant="error" />
              <span>Notification <Badge dot variant="error" /></span>
            </div>
          </Card>
        </section>

        {/* Usage Example */}
        <section>
          <h2 style={{ marginBottom: `${spacing.lg}px`, fontSize: '32px', fontWeight: '600' }}>
            사용 예제
          </h2>

          <Card padding="lg">
            <h3 style={{ marginBottom: `${spacing.md}px` }}>Import 방법</h3>
            <pre style={{ 
              backgroundColor: '#1F2937', 
              color: '#F9FAFB', 
              padding: `${spacing.md}px`, 
              borderRadius: '8px',
              overflow: 'auto'
            }}>
{`import { Button, Card, Input, Badge, Container } from '@/components/ui';

// 사용 예제
<Button variant="primary" size="lg">
  Click Me
</Button>

<Card hoverable padding="lg">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>

<Input 
  label="Email" 
  placeholder="email@example.com"
  fullWidth 
/>`}
            </pre>
          </Card>
        </section>
      </Container>
    </div>
  );
}

