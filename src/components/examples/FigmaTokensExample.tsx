/**
 * Figma 디자인 토큰 사용 예제 컴포넌트
 * 
 * 이 컴포넌트는 Figma에서 추출한 디자인 토큰을 
 * TypeScript와 CSS에서 어떻게 사용하는지 보여줍니다.
 */

import React from 'react';
import { colors, typography, spacing } from '@/styles/tokens';

const FigmaTokensExample: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎨 Figma 디자인 토큰 예제</h1>
      
      {/* CSS 변수 사용 예제 */}
      <section style={{ marginTop: '2rem' }}>
        <h2>CSS 변수 사용</h2>
        <div 
          className="css-example"
          style={{
            // CSS 변수는 var(--변수명) 형식으로 사용
            backgroundColor: 'var(--color-primary, #3B82F6)',
            color: 'var(--color-text, #FFFFFF)',
            padding: 'var(--spacing-md, 16px)',
            borderRadius: '8px',
            marginTop: '1rem',
          }}
        >
          <p>이 박스는 CSS 변수를 사용합니다.</p>
          <p>Figma에서 토큰을 가져오면 자동으로 적용됩니다.</p>
        </div>
      </section>

      {/* TypeScript 상수 사용 예제 */}
      <section style={{ marginTop: '2rem' }}>
        <h2>TypeScript 상수 사용</h2>
        <div 
          className="ts-example"
          style={{
            // TypeScript 토큰을 직접 사용
            backgroundColor: colors.secondary,
            color: colors.text,
            padding: `${spacing.lg}px`,
            borderRadius: '8px',
            marginTop: '1rem',
          }}
        >
          <p>이 박스는 TypeScript 상수를 사용합니다.</p>
          <p>타입 안정성과 자동 완성의 이점을 누릴 수 있습니다.</p>
        </div>
      </section>

      {/* 타이포그래피 예제 */}
      <section style={{ marginTop: '2rem' }}>
        <h2>타이포그래피</h2>
        <div style={{ marginTop: '1rem' }}>
          <p 
            className="heading-1"
            style={{
              fontFamily: typography['heading-1'].fontFamily,
              fontSize: typography['heading-1'].fontSize,
              fontWeight: typography['heading-1'].fontWeight,
            }}
          >
            큰 제목
          </p>
          <p 
            className="body"
            style={{
              fontFamily: typography.body.fontFamily,
              fontSize: typography.body.fontSize,
            }}
          >
            본문 텍스트입니다. Figma 토큰을 사용하면 일관된 타이포그래피를 유지할 수 있습니다.
          </p>
        </div>
      </section>

      {/* 사용 방법 안내 */}
      <section style={{ 
        marginTop: '3rem', 
        padding: '1.5rem', 
        backgroundColor: '#F3F4F6',
        borderRadius: '8px'
      }}>
        <h2>💡 사용 방법</h2>
        <ol style={{ lineHeight: '1.8' }}>
          <li>
            <strong>Figma 토큰 가져오기:</strong>
            <pre style={{ 
              backgroundColor: '#1F2937', 
              color: '#F9FAFB', 
              padding: '1rem', 
              borderRadius: '4px',
              marginTop: '0.5rem',
              overflow: 'auto'
            }}>
              npm run figma:fetch
            </pre>
          </li>
          <li>
            <strong>CSS에서 사용:</strong>
            <pre style={{ 
              backgroundColor: '#1F2937', 
              color: '#F9FAFB', 
              padding: '1rem', 
              borderRadius: '4px',
              marginTop: '0.5rem',
              overflow: 'auto'
            }}>
{`import '@/styles/tokens.css';

.my-component {
  background-color: var(--color-primary);
  padding: var(--spacing-md);
}`}
            </pre>
          </li>
          <li>
            <strong>TypeScript에서 사용:</strong>
            <pre style={{ 
              backgroundColor: '#1F2937', 
              color: '#F9FAFB', 
              padding: '1rem', 
              borderRadius: '4px',
              marginTop: '0.5rem',
              overflow: 'auto'
            }}>
{`import { colors, typography, spacing } from '@/styles/tokens';

const MyComponent = () => (
  <div style={{
    backgroundColor: colors.primary,
    fontSize: typography['heading-1'].fontSize,
    padding: \`\${spacing.md}px\`
  }}>
    Content
  </div>
);`}
            </pre>
          </li>
        </ol>
      </section>
    </div>
  );
};

export default FigmaTokensExample;

