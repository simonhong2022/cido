# 🎯 Figma 연동 모범 사례

이 문서는 Figma에서 디자인 토큰을 효과적으로 관리하고 프로젝트에 적용하는 방법을 안내합니다.

## 📋 목차

1. [Figma 파일 구조화](#figma-파일-구조화)
2. [네이밍 규칙](#네이밍-규칙)
3. [워크플로우](#워크플로우)
4. [팀 협업](#팀-협업)
5. [문제 해결 팁](#문제-해결-팁)

---

## 🗂 Figma 파일 구조화

### 권장 구조

```
🎨 Design System (Figma 파일)
│
├── 📄 Cover (페이지)
│   └── 프로젝트 소개 및 사용 가이드
│
├── 📄 Design Tokens (페이지) ⭐
│   ├── 🎨 Colors/
│   │   ├── Brand Colors
│   │   ├── Semantic Colors
│   │   └── Neutral Colors
│   │
│   ├── 📝 Typography/
│   │   ├── Headings
│   │   ├── Body Text
│   │   └── Special Text
│   │
│   ├── 📏 Spacing/
│   │   └── Scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
│   │
│   └── 🎭 Effects/
│       ├── Shadows
│       └── Border Radius
│
├── 📄 Components (페이지)
│   └── UI 컴포넌트들
│
└── 📄 Screens (페이지)
    └── 화면 디자인들
```

### 디자인 토큰 페이지 상세

#### 1. Colors 프레임 구조

```
Colors/ (프레임)
│
├── Brand Colors (섹션)
│   ├── Colors/primary
│   ├── Colors/secondary
│   └── Colors/accent
│
├── Semantic Colors (섹션)
│   ├── Colors/success
│   ├── Colors/warning
│   ├── Colors/error
│   └── Colors/info
│
├── Neutral Colors (섹션)
│   ├── Colors/background
│   ├── Colors/surface
│   ├── Colors/text
│   ├── Colors/text-secondary
│   └── Colors/border
│
└── Alpha Colors (섹션)
    ├── Colors/overlay (검정, 50% opacity)
    └── Colors/scrim (검정, 25% opacity)
```

#### 2. Typography 프레임 구조

```
Typography/ (프레임)
│
├── Headings (섹션)
│   ├── heading-1 (48px, Bold)
│   ├── heading-2 (36px, Semibold)
│   ├── heading-3 (28px, Semibold)
│   ├── heading-4 (24px, Medium)
│   ├── heading-5 (20px, Medium)
│   └── heading-6 (16px, Medium)
│
├── Body (섹션)
│   ├── body-large (18px, Regular)
│   ├── body (16px, Regular)
│   └── body-small (14px, Regular)
│
└── Special (섹션)
    ├── caption (12px, Regular)
    ├── overline (12px, Bold, Uppercase)
    └── button (14px, Medium)
```

#### 3. Spacing 프레임 구조

```
Spacing/ (프레임)
│
├── Spacing/xs (4px)
├── Spacing/sm (8px)
├── Spacing/md (16px)
├── Spacing/lg (24px)
├── Spacing/xl (32px)
├── Spacing/2xl (48px)
└── Spacing/3xl (64px)
```

---

## 🏷 네이밍 규칙

### 색상 네이밍

#### ✅ Good
```
Colors/primary
Colors/secondary
Colors/success
Colors/error
Colors/text
Colors/background
```

#### ❌ Bad
```
Color Primary (공백 포함)
primary-color (접두사 없음)
Colors/Button Blue (너무 구체적)
Colors/#3B82F6 (색상 코드 사용)
```

### 타이포그래피 네이밍

#### ✅ Good
```
heading-1
heading-2
body
body-large
caption
button
```

#### ❌ Bad
```
Heading 1 (공백 포함)
H1 (너무 짧음)
Main Title (용도 중심)
48px Bold (스타일 값 직접 사용)
```

### 간격 네이밍

#### ✅ Good
```
Spacing/xs
Spacing/sm
Spacing/md
Spacing/lg
Spacing/xl
```

#### ❌ Bad
```
Spacing/4 (숫자만 사용)
Spacing/small (약어 미사용)
Spacing/16px (단위 포함)
```

---

## 🔄 워크플로우

### 디자이너 워크플로우

1. **디자인 시스템 정의**
   - Figma에서 디자인 토큰 페이지 생성
   - 색상, 타이포그래피, 간격 정의

2. **네이밍 규칙 적용**
   - 일관된 네이밍 규칙 사용
   - 계층 구조 유지

3. **토큰 업데이트 공지**
   - 팀에 변경 사항 알림
   - 변경 로그 작성

4. **검증**
   - 개발자와 함께 토큰 추출 테스트
   - 예상대로 적용되는지 확인

### 개발자 워크플로우

1. **초기 설정**
   ```bash
   # .env.local 설정
   cp .env.example .env.local
   # Figma 토큰 추가
   ```

2. **토큰 가져오기**
   ```bash
   npm run figma:fetch
   ```

3. **토큰 적용**
   ```tsx
   // CSS 변수 사용
   import '@/styles/tokens.css';
   
   // 또는 TypeScript 상수 사용
   import { colors, typography } from '@/styles/tokens';
   ```

4. **개발 중 자동 동기화 (선택)**
   ```bash
   npm run figma:watch
   ```

---

## 👥 팀 협업

### 디자이너-개발자 협업

#### 1. 초기 설정 단계

**디자이너:**
- [ ] Figma 파일 생성 및 구조화
- [ ] 디자인 토큰 정의
- [ ] 개발자에게 파일 공유 (View 권한 이상)
- [ ] File Key 전달

**개발자:**
- [ ] Figma Access Token 발급
- [ ] .env.local 설정
- [ ] 토큰 추출 테스트

#### 2. 일상적인 협업

**디자인 변경 시:**
1. 디자이너가 Figma에서 토큰 수정
2. 팀 채널에 변경 사항 공지
3. 개발자가 `npm run figma:fetch` 실행
4. 변경 사항 확인 및 적용

#### 3. 버전 관리

**권장 사항:**
- Figma 파일 버전 히스토리 활용
- 주요 변경 시 브랜치 생성
- Git에서 tokens.css, tokens.ts 파일 커밋
- PR에 디자인 변경 사항 명시

---

## 🔧 문제 해결 팁

### 토큰이 추출되지 않을 때

#### 체크리스트:

1. **레이어 이름 확인**
   ```
   ✅ Colors/primary
   ❌ primary
   ❌ Color/primary
   ```

2. **레이어 타입 확인**
   - 색상: Rectangle, Frame 등 (Solid fill 필요)
   - 타이포그래피: Text
   - 간격: Frame, Rectangle

3. **채우기 설정 확인**
   - 색상 레이어는 Solid fill이어야 함
   - Image fill, Gradient는 추출되지 않음

4. **위치 확인**
   - 숨겨진 레이어는 추출됨
   - 삭제된 레이어는 추출 안 됨

### 색상이 이상하게 추출될 때

**원인:** Figma의 색상 프로파일 차이

**해결:**
1. Figma에서 색상을 HEX로 확인
2. 추출된 tokens.css 확인
3. 필요시 수동으로 조정

### 타이포그래피가 추출되지 않을 때

**확인 사항:**
1. Text 레이어인가?
2. 스타일이 적용되어 있는가?
3. 레이어 이름이 올바른가?

---

## 📊 성능 최적화

### API 호출 최소화

```bash
# 개발 중에는 필요할 때만 실행
npm run figma:fetch

# 자동 watch는 필요할 때만 사용
npm run figma:watch
```

### 캐싱 전략

생성된 토큰 파일은 Git에 커밋하여:
- CI/CD에서 Figma API 호출 불필요
- 오프라인에서도 작업 가능
- 디자인 변경 이력 추적 가능

---

## 🎓 학습 자료

### Figma 리소스
- [Figma API 공식 문서](https://www.figma.com/developers/api)
- [Design Tokens 개념](https://www.designtokens.org/)
- [Figma Community - Design Systems](https://www.figma.com/community/design_systems)

### 코드 예제
- `/src/components/examples/FigmaTokensExample.tsx` - 사용 예제
- `/scripts/fetchFigmaTokens.js` - 추출 로직

---

## 💡 추가 팁

### 1. 디자인 토큰 우선순위

**높음:**
- 브랜드 색상
- 주요 타이포그래피
- 기본 간격

**중간:**
- 시맨틱 색상 (success, error 등)
- 보조 타이포그래피
- 그림자, 모서리 둥글기

**낮음:**
- 특수 효과
- 애니메이션 값

### 2. 점진적 적용

1. **1단계:** 색상만 추출하여 적용
2. **2단계:** 타이포그래피 추가
3. **3단계:** 간격 및 기타 토큰 추가

### 3. 레거시 코드 마이그레이션

```tsx
// Before
<div style={{ color: '#3B82F6' }}>

// After
<div style={{ color: 'var(--color-primary)' }}>
// 또는
<div style={{ color: colors.primary }}>
```

---

## 📝 체크리스트

### 디자이너용

- [ ] Figma 파일을 권장 구조로 구성
- [ ] 일관된 네이밍 규칙 사용
- [ ] 모든 토큰에 Solid fill 적용 (색상)
- [ ] 개발자와 파일 공유
- [ ] 변경 시 팀에 알림

### 개발자용

- [ ] .env.local 파일 설정
- [ ] Figma 토큰 추출 성공
- [ ] tokens.css를 전역으로 import
- [ ] 기존 하드코딩된 값을 토큰으로 교체
- [ ] 변경 사항 Git 커밋

---

**질문이나 제안이 있으시면 팀 채널에 공유해주세요! 🙌**

