# 🎨 Figma 디자인 토큰 빠른 참조

## ⚡ 핵심 요약 (1분 체크리스트)

### ✅ 색상 (Colors)

```
레이어 타입: Rectangle (R)
레이어 이름: Colors/이름
Fill 타입: Solid (단색)

필수:
  Colors/primary
  Colors/secondary  
  Colors/text
  Colors/background
```

### ✅ 타이포그래피 (Typography)

```
레이어 타입: Text (T)
레이어 이름: 이름 (접두사 없음, 하이픈 사용)

필수:
  heading-1
  heading-2
  body
  button
```

### ✅ 간격 (Spacing)

```
레이어 타입: Rectangle (R)
레이어 이름: Spacing/이름
중요: 너비(width) = 간격 값

필수:
  Spacing/xs    (4px)
  Spacing/sm    (8px)
  Spacing/md    (16px)
  Spacing/lg    (24px)
```

---

## 🚫 흔한 실수

| ❌ 잘못된 예 | ✅ 올바른 예 |
|------------|------------|
| `Color Primary` | `Colors/primary` |
| `Colors/Primary Color` | `Colors/primary-color` |
| `Heading 1` | `heading-1` |
| `Typography/heading-1` | `heading-1` |
| `spacing-md` | `Spacing/md` |
| Gradient fill | Solid fill |
| 높이를 간격 값으로 | 너비를 간격 값으로 |

---

## 📐 권장 값

### Colors
- Primary: 브랜드 메인 색상
- Secondary: 브랜드 보조 색상
- Text: 텍스트 색상
- Background: 배경 색상
- Accent: 강조 색상
- Success: 성공 (녹색)
- Warning: 경고 (노란색)
- Error: 오류 (빨간색)

### Typography (Pretendard Variable)
- heading-1: 48px, Bold (700)
- heading-2: 36px, Semibold (600)
- heading-3: 28px, Semibold (600)
- body-large: 18px, Regular (400)
- body: 16px, Regular (400)
- body-small: 14px, Regular (400)
- caption: 12px, Regular (400)
- button: 14px, Medium (500)

### Spacing (8px 기준 스케일)
- xs: 4px (0.5x)
- sm: 8px (1x)
- md: 16px (2x)
- lg: 24px (3x)
- xl: 32px (4x)
- 2xl: 48px (6x)
- 3xl: 64px (8x)

---

## 🎯 작업 순서

1. **System 페이지** 열기
2. **Design Tokens** 프레임 생성
3. **Colors/** 프레임 → 사각형 추가
4. **Typography/** 프레임 → 텍스트 추가
5. **Spacing/** 프레임 → 사각형 추가 (너비 중요!)
6. **저장** 및 이름 확인
7. **터미널**: `npm run figma:fetch`

---

## 💻 코드에서 사용법

### CSS
```css
.element {
  background-color: var(--color-primary);
  font-size: var(--typography-heading-1-font-size);
  padding: var(--spacing-md);
}
```

### TypeScript
```tsx
import { colors, typography, spacing } from '@/styles/tokens';

<div style={{
  backgroundColor: colors.primary,
  fontSize: typography['heading-1'].fontSize,
  padding: `${spacing.md}px`
}}>
```

---

## 🔧 테스트 명령어

```bash
# 연결 테스트
node scripts/testFigmaConnection.js

# 토큰 추출
npm run figma:fetch

# 자동 감시 (개발 중)
npm run figma:watch
```

---

## 📊 성공 확인

추출 성공 시:
```
✅ Successfully fetched Figma file: Cido Web
   📦 Colors: 4-8 found
   📦 Typography: 7-10 found
   📦 Spacing: 5-7 found
```

---

## 🆘 문제 해결

**Colors가 0개?**
→ 레이어 이름이 `Colors/`로 시작하는지 확인

**Typography가 너무 많음?**
→ 프레임 이름이 아닌 텍스트 레이어 이름을 확인

**Spacing이 0개?**
→ 레이어 이름이 `Spacing/`로 시작하는지 확인

**색상 값이 이상함?**
→ Fill이 Solid 타입인지 확인

---

**자세한 내용**: `docs/FIGMA_SETUP_STEP_BY_STEP.md`

