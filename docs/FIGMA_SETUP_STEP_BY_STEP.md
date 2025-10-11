# 🎨 Figma 디자인 토큰 설정 단계별 가이드

이 가이드는 "Cido Web" Figma 파일에 디자인 토큰을 설정하는 과정을 단계별로 안내합니다.

## 📋 예상 소요 시간: 15-30분

---

## 🎯 Step 1: Figma 파일 열기

1. **Figma 파일 접속**
   - URL: https://www.figma.com/file/2kZVje7lNQF486v2OUGpM9
   - 또는 Figma 앱에서 "Cido Web" 파일 열기

2. **"System" 페이지로 이동**
   - 좌측 페이지 목록에서 "System" 페이지 선택
   - 여기에 디자인 토큰을 만들 예정입니다

---

## 🎨 Step 2: 색상 토큰 만들기 (5분)

### 2.1 Colors 프레임 생성

1. **Frame 도구 선택** (`F` 키)
2. 캔버스에 프레임 생성
   - 이름: `Design Tokens`
   - 크기: 자유롭게 (예: 1200 x 2000)

3. 그 안에 또 하나의 프레임 생성
   - 이름: `Colors/`
   - 크기: 자유롭게

### 2.2 색상 레이어 만들기

**Colors/ 프레임 안에 사각형을 만들고 다음과 같이 설정:**

#### Primary Color
- **도구**: Rectangle (`R` 키)
- **크기**: 200 x 100 (자유롭게)
- **이름**: `Colors/primary` ⭐ (정확히 이렇게!)
- **Fill**: `#000000` (검정)
- **설명 추가** (선택): "Primary brand color"

#### Secondary Color
- **크기**: 200 x 100
- **이름**: `Colors/secondary`
- **Fill**: `#8E8E93` (회색)

#### Text Color
- **크기**: 200 x 100
- **이름**: `Colors/text`
- **Fill**: `#FFFFFF` (흰색)

#### Background Color
- **크기**: 200 x 100
- **이름**: `Colors/background`
- **Fill**: `#FFFFFF` (또는 원하는 배경색)

#### Accent Color (선택)
- **크기**: 200 x 100
- **이름**: `Colors/accent`
- **Fill**: 원하는 강조 색상 (예: `#3B82F6`)

#### Success, Warning, Error (선택)
- **이름**: `Colors/success`, `Colors/warning`, `Colors/error`
- **Fill**: 각각 녹색, 노란색, 빨간색

### 💡 중요!
- ✅ 이름은 **반드시** `Colors/` 로 시작해야 합니다
- ✅ Fill은 **Solid** 타입이어야 합니다 (그라디언트 X)
- ✅ 각 색상은 **별도의 레이어**여야 합니다

---

## 📝 Step 3: 타이포그래피 토큰 만들기 (10분)

### 3.1 Typography 프레임 생성

Design Tokens 프레임 안에 새 프레임 생성:
- **이름**: `Typography/`
- **배치**: Colors/ 프레임 아래 또는 옆

### 3.2 타이포그래피 스타일 만들기

**Typography/ 프레임 안에 텍스트 레이어를 만들고 설정:**

#### Heading 1
- **도구**: Text (`T` 키)
- **이름**: `heading-1` ⭐ (공백 없이, 하이픈 사용)
- **내용**: "Heading 1" (실제 표시될 텍스트)
- **Font**: Pretendard Variable
- **Size**: 48px
- **Weight**: Bold (700)
- **Line Height**: Auto 또는 125%
- **Letter Spacing**: -0.5px (선택)

#### Heading 2
- **이름**: `heading-2`
- **내용**: "Heading 2"
- **Font**: Pretendard Variable
- **Size**: 36px
- **Weight**: Semibold (600)

#### Heading 3
- **이름**: `heading-3`
- **내용**: "Heading 3"
- **Font**: Pretendard Variable
- **Size**: 28px
- **Weight**: Semibold (600)

#### Body Text
- **이름**: `body`
- **내용**: "Body text example"
- **Font**: Pretendard Variable
- **Size**: 16px
- **Weight**: Regular (400)
- **Line Height**: 150%

#### Body Large
- **이름**: `body-large`
- **내용**: "Large body text"
- **Font**: Pretendard Variable
- **Size**: 18px
- **Weight**: Regular (400)

#### Body Small
- **이름**: `body-small`
- **내용**: "Small body text"
- **Font**: Pretendard Variable
- **Size**: 14px
- **Weight**: Regular (400)

#### Caption
- **이름**: `caption`
- **내용**: "Caption text"
- **Font**: Pretendard Variable
- **Size**: 12px
- **Weight**: Regular (400)

#### Button Text
- **이름**: `button`
- **내용**: "Button Text"
- **Font**: Pretendard Variable
- **Size**: 14px
- **Weight**: Medium (500)

### 💡 중요!
- ✅ 레이어 이름에 **공백 사용 금지** (하이픈 `-` 사용)
- ✅ "Typography/" 접두사는 **프레임 이름**에만 사용
- ✅ 각 텍스트는 **독립된 텍스트 레이어**여야 합니다

---

## 📏 Step 4: 간격 토큰 만들기 (5분)

### 4.1 Spacing 프레임 생성

Design Tokens 프레임 안에 새 프레임 생성:
- **이름**: `Spacing/`
- **배치**: Typography/ 프레임 아래

### 4.2 간격 레이어 만들기

**Spacing/ 프레임 안에 사각형을 만들고 설정:**

#### Extra Small
- **도구**: Rectangle (`R` 키)
- **이름**: `Spacing/xs` ⭐ (정확히 이렇게!)
- **크기**: **4px** x 40px (너비가 중요!)
- **Fill**: 아무 색상 (예: 회색)

#### Small
- **이름**: `Spacing/sm`
- **크기**: **8px** x 40px

#### Medium
- **이름**: `Spacing/md`
- **크기**: **16px** x 40px

#### Large
- **이름**: `Spacing/lg`
- **크기**: **24px** x 40px

#### Extra Large
- **이름**: `Spacing/xl`
- **크기**: **32px** x 40px

#### 2XL (선택)
- **이름**: `Spacing/2xl`
- **크기**: **48px** x 40px

#### 3XL (선택)
- **이름**: `Spacing/3xl`
- **크기**: **64px** x 40px

### 💡 중요!
- ✅ 이름은 **반드시** `Spacing/` 로 시작
- ✅ **너비(width)** 값이 실제 간격 값으로 추출됩니다
- ✅ 높이는 상관없음 (보기 좋게 설정)

---

## 🎯 Step 5: 레이아웃 정리 (5분)

### 5.1 프레임 정렬

Design Tokens 프레임 안에 세 개의 섹션을 깔끔하게 배치:

```
┌─────────────────────────────────────┐
│     Design Tokens                    │
│                                      │
│  ┌──────────────────┐               │
│  │  Colors/         │               │
│  │  ▪️ primary       │               │
│  │  ▪️ secondary     │               │
│  │  ▪️ text          │               │
│  │  ▪️ background    │               │
│  └──────────────────┘               │
│                                      │
│  ┌──────────────────┐               │
│  │  Typography/     │               │
│  │  📝 heading-1    │               │
│  │  📝 heading-2    │               │
│  │  📝 body         │               │
│  └──────────────────┘               │
│                                      │
│  ┌──────────────────┐               │
│  │  Spacing/        │               │
│  │  ━ xs  (4px)     │               │
│  │  ━━ sm (8px)     │               │
│  │  ━━━━ md (16px)  │               │
│  └──────────────────┘               │
└─────────────────────────────────────┘
```

### 5.2 설명 추가 (선택)

각 섹션에 설명 텍스트 추가:
- Colors/: "Brand and semantic colors"
- Typography/: "Text styles used throughout the app"
- Spacing/: "Spacing scale for consistent layout"

---

## ✅ Step 6: 저장 및 확인

1. **파일 저장** (자동 저장되지만 확인)
2. **레이어 이름 다시 확인**
   - Colors: `Colors/primary`, `Colors/secondary` 등
   - Typography: `heading-1`, `body` 등 (접두사 없음!)
   - Spacing: `Spacing/xs`, `Spacing/md` 등

3. **완료!** ✨

---

## 🚀 Step 7: 디자인 토큰 추출

Figma 작업이 완료되면, 터미널로 돌아가서:

```bash
npm run figma:fetch
```

다음과 같이 표시되어야 합니다:

```
✅ Successfully fetched Figma file: Cido Web
🔍 Extracting design tokens...
   📦 Colors: 4-8 found ✅
   📦 Typography: 7-10 found ✅
   📦 Spacing: 5-7 found ✅
```

---

## 🎨 예시 스크린샷 설명

### Colors 섹션 예시:
```
Colors/
  🟦 Colors/primary     (#000000)
  🟦 Colors/secondary   (#8E8E93)
  🟦 Colors/text        (#FFFFFF)
  🟦 Colors/background  (#FFFFFF)
```

### Typography 섹션 예시:
```
Typography/
  Heading 1          (heading-1, 48px, Bold)
  Heading 2          (heading-2, 36px, Semibold)
  Body text          (body, 16px, Regular)
  Button Text        (button, 14px, Medium)
```

### Spacing 섹션 예시:
```
Spacing/
  ▪ xs    (4px)
  ▪▪ sm   (8px)
  ▪▪▪▪ md (16px)
  ▪▪▪▪▪▪ lg (24px)
```

---

## ❓ 자주 묻는 질문 (FAQ)

### Q: 색상 이름에 공백을 넣어도 되나요?
**A**: 아니요! `Colors/primary color` ❌ → `Colors/primary-color` ✅

### Q: 기존 컴포넌트의 색상을 재사용해도 되나요?
**A**: 네, 하지만 레이어 이름을 `Colors/`로 시작하도록 변경해야 합니다.

### Q: 색상을 몇 개나 만들어야 하나요?
**A**: 최소 4-5개 (primary, secondary, text, background, accent) 추천

### Q: 타이포그래피가 너무 많으면 어떻게 하나요?
**A**: 자주 사용하는 7-10개만 만들고, 나중에 추가할 수 있습니다.

### Q: Fill이 여러 개면 어떻게 되나요?
**A**: 첫 번째 Fill만 추출됩니다. Solid fill 하나만 설정하세요.

---

## 🎓 체크리스트

작업 전에 확인:
- [ ] Figma 파일 열림
- [ ] System 페이지 선택됨
- [ ] 편집 권한 있음

색상 (Colors):
- [ ] Colors/ 프레임 생성
- [ ] Colors/primary 레이어 (Solid fill)
- [ ] Colors/secondary 레이어
- [ ] Colors/text 레이어
- [ ] Colors/background 레이어

타이포그래피 (Typography):
- [ ] Typography/ 프레임 생성
- [ ] heading-1 텍스트 (공백 없음!)
- [ ] heading-2 텍스트
- [ ] body 텍스트
- [ ] button 텍스트

간격 (Spacing):
- [ ] Spacing/ 프레임 생성
- [ ] Spacing/xs (4px 너비)
- [ ] Spacing/sm (8px 너비)
- [ ] Spacing/md (16px 너비)
- [ ] Spacing/lg (24px 너비)

완료:
- [ ] 레이어 이름 확인
- [ ] 파일 저장
- [ ] npm run figma:fetch 실행 준비

---

## 💡 팁

1. **Auto Layout 사용**: 프레임을 Auto Layout으로 설정하면 정렬이 쉽습니다
2. **컴포넌트로 만들기**: 나중에 토큰을 컴포넌트로 전환하면 재사용이 쉽습니다
3. **설명 추가**: 각 토큰에 주석을 달아두면 팀원들이 이해하기 쉽습니다
4. **버전 관리**: Figma 버전 히스토리를 활용하여 변경 사항 추적

---

**준비되셨으면 Figma로 가서 작업을 시작하세요!** 🚀

작업 완료 후 알려주시면, 디자인 토큰 추출을 도와드리겠습니다!

