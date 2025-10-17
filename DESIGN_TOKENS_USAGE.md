# 🎨 디자인 토큰 사용 가이드

디자인 토큰이 자동으로 생성되었습니다! 바로 사용할 수 있습니다.

## 📦 생성된 파일

```
src/styles/
├── tokens.ts      → TypeScript에서 사용
├── tokens.css     → CSS 변수
└── tokens.json    → JSON 형식 (참고용)
```

---

## 🚀 사용 방법

### 1. TypeScript/React에서 사용

```tsx
import { colors, typography, spacing } from '@/styles/tokens';

function MyComponent() {
  return (
    <div style={{
      backgroundColor: colors.primary,
      color: colors.text,
      fontSize: typography.body.fontSize,
      padding: `${spacing.md}px`,
    }}>
      Hello World!
    </div>
  );
}
```

### 2. CSS에서 사용

CSS 변수는 이미 전역으로 import되어 있습니다.

```css
.my-class {
  background-color: var(--color-primary);
  color: var(--color-text);
  font-size: var(--typography-body-font-size);
  padding: var(--spacing-md);
}
```

### 3. Styled Components에서 사용

```tsx
import styled from 'styled-components';
import { colors, spacing } from '@/styles/tokens';

const Button = styled.button`
  background-color: ${colors.primary};
  color: ${colors.text};
  padding: ${spacing.md}px ${spacing.lg}px;
  border-radius: 8px;
`;
```

---

## 🎨 사용 가능한 토큰

### Colors (색상)

```tsx
colors.primary          // #000000 - 메인 색상
colors.secondary        // #8E8E93 - 보조 색상
colors.accent           // #3B82F6 - 강조 색상
colors.text             // #FFFFFF - 텍스트 색상
colors.background       // #000000 - 배경 색상
colors.success          // #10B981 - 성공
colors.warning          // #F59E0B - 경고
colors.error            // #EF4444 - 오류
// ... 더 많은 색상들
```

### Typography (타이포그래피)

```tsx
typography['heading-1']  // 48px, Bold
typography['heading-2']  // 36px, Semibold
typography['heading-3']  // 28px, Semibold
typography.body          // 16px, Regular
typography['body-large'] // 18px, Regular
typography.button        // 14px, Medium
typography.caption       // 12px, Regular
```

### Spacing (간격)

```tsx
spacing.xs    // 4px
spacing.sm    // 8px
spacing.md    // 16px
spacing.lg    // 24px
spacing.xl    // 32px
spacing['2xl'] // 48px
spacing['3xl'] // 64px
```

### 추가 토큰

```tsx
borderRadius.sm   // 4px
borderRadius.md   // 8px
borderRadius.lg   // 12px

shadows.sm        // 작은 그림자
shadows.md        // 중간 그림자
shadows.lg        // 큰 그림자

transitions.fast  // 150ms
transitions.base  // 200ms
transitions.slow  // 300ms
```

---

## 💡 TypeScript 자동완성

TypeScript를 사용하면 자동완성이 됩니다!

```tsx
import { colors } from '@/styles/tokens';

// 타이핑하면 자동완성 목록이 나타납니다
colors.
//     ↑ Ctrl/Cmd + Space
```

---

## 🎯 예제 페이지

실제 사용 예제를 보려면:

```bash
npm run dev
```

그리고 브라우저에서 http://localhost:8080/figma-example 접속

---

## 🔄 나중에 Figma와 동기화하려면?

1. Figma에서 디자인 토큰 페이지 만들기
   (가이드: `docs/FIGMA_SETUP_STEP_BY_STEP.md`)

2. 토큰 추출:
   ```bash
   npm run figma:fetch
   ```

3. 자동으로 `tokens.ts`, `tokens.css`, `tokens.json` 업데이트됨!

---

## 📚 더 알아보기

- **Figma 연동 가이드**: `FIGMA_SETUP.md`
- **상세 가이드**: `docs/FIGMA_SETUP_STEP_BY_STEP.md`
- **빠른 참조**: `docs/FIGMA_QUICK_REFERENCE.md`

---

**즐거운 코딩 되세요! 🚀**

