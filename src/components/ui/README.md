# 🎨 UI 컴포넌트 라이브러리

디자인 토큰을 활용한 재사용 가능한 공통 컴포넌트 라이브러리입니다.

## 📦 포함된 컴포넌트

### Button
다양한 스타일과 크기를 지원하는 버튼 컴포넌트

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `loading`: boolean
- `leftIcon`, `rightIcon`: React.ReactNode

**사용 예제:**
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="lg" leftIcon="🚀">
  Launch
</Button>
```

---

### Card
다양한 스타일의 카드 컨테이너

**Props:**
- `variant`: 'default' | 'bordered' | 'elevated'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `hoverable`: boolean
- `clickable`: boolean

**사용 예제:**
```tsx
import { Card } from '@/components/ui';

<Card hoverable padding="lg">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

---

### Input
라벨, 에러 메시지, 아이콘을 지원하는 입력 필드

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `fullWidth`: boolean
- `leftIcon`, `rightIcon`: React.ReactNode

**사용 예제:**
```tsx
import { Input } from '@/components/ui';

<Input 
  label="Email" 
  placeholder="email@example.com"
  leftIcon="📧"
  fullWidth 
/>
```

---

### Badge
태그나 상태 표시용 배지

**Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
- `size`: 'sm' | 'md' | 'lg'
- `dot`: boolean

**사용 예제:**
```tsx
import { Badge } from '@/components/ui';

<Badge variant="success">완료</Badge>
<Badge dot variant="error" />
```

---

### Container
반응형 레이아웃 컨테이너

**Props:**
- `maxWidth`: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
- `padding`: boolean
- `center`: boolean

**사용 예제:**
```tsx
import { Container } from '@/components/ui';

<Container maxWidth="lg">
  <h1>Content</h1>
</Container>
```

---

## 🚀 시작하기

### 전체 import
```tsx
import { Button, Card, Input, Badge, Container } from '@/components/ui';
```

### 개별 import
```tsx
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
```

---

## 🎨 디자인 토큰 활용

모든 컴포넌트는 `@/styles/tokens`의 디자인 토큰을 사용합니다:

- **colors**: 색상 팔레트
- **typography**: 폰트 스타일
- **spacing**: 간격 시스템
- **borderRadius**: 모서리 둥글기
- **shadows**: 그림자 효과
- **transitions**: 애니메이션 속도

---

## 🌐 실제 예제

`/ui-showcase` 페이지에서 모든 컴포넌트의 실제 사용 예제를 확인할 수 있습니다:

```bash
npm run dev
```

→ http://localhost:8080/ui-showcase

---

## 📚 추가 정보

- 모든 컴포넌트는 TypeScript로 작성되어 타입 안전성을 제공합니다
- 접근성(a11y)을 고려한 구조
- 반응형 디자인 지원
- 커스터마이징 가능 (style props 지원)

---

## 🤝 기여하기

새로운 컴포넌트를 추가하려면:

1. 컴포넌트 파일 생성 (예: `NewComponent.tsx`)
2. 디자인 토큰 활용
3. TypeScript Props 인터페이스 정의
4. `index.ts`에 export 추가
5. `/ui-showcase`에 예제 추가

---

**Happy Coding! 🎉**

