# 🎨 Figma API 연동 가이드

이 프로젝트는 Figma API를 사용하여 디자인 토큰(색상, 타이포그래피, 간격 등)을 자동으로 추출하고 코드에 적용할 수 있습니다.

## 📋 목차

1. [설정 방법](#설정-방법)
2. [Figma 파일 준비](#figma-파일-준비)
3. [디자인 토큰 추출](#디자인-토큰-추출)
4. [사용 방법](#사용-방법)
5. [문제 해결](#문제-해결)

---

## 🚀 설정 방법

### 1. Figma Access Token 발급

1. [Figma 계정 설정](https://www.figma.com/settings)으로 이동
2. **Personal Access Tokens** 섹션으로 스크롤
3. **Generate new token** 클릭
4. 토큰 이름 입력 (예: "Cido Frontend Development")
5. 생성된 토큰을 복사 (⚠️ 한 번만 표시됩니다!)

### 2. Figma File Key 확인

Figma 파일의 URL에서 FILE_KEY를 추출합니다:

```
https://www.figma.com/file/abc123def456/MyDesignFile
                          ^^^^^^^^^^^^
                          이 부분이 FILE_KEY입니다
```

### 3. 환경 변수 설정

1. `.env.example` 파일을 복사하여 `.env.local` 생성:
   ```bash
   cp .env.example .env.local
   ```

2. `.env.local` 파일을 열어 다음 정보 입력:
   ```env
   FIGMA_ACCESS_TOKEN=your_figma_personal_access_token_here
   FIGMA_FILE_KEY=your_figma_file_key_here
   ```

---

## 🎯 Figma 파일 준비

디자인 토큰을 효과적으로 추출하려면 Figma 파일을 다음과 같이 구조화하세요:

### 색상 (Colors)

프레임 또는 레이어 이름을 **"Colors/"** 또는 **"색상/"**으로 시작:

```
Colors/
  ├─ Colors/primary
  ├─ Colors/secondary
  ├─ Colors/background
  ├─ Colors/text
  └─ Colors/accent
```

각 색상 레이어는 단색(Solid) 채우기를 가져야 합니다.

### 타이포그래피 (Typography)

텍스트 레이어를 생성하고 스타일 적용:

```
Typography/
  ├─ heading-1
  ├─ heading-2
  ├─ body
  ├─ caption
  └─ button
```

각 텍스트 레이어는 폰트 패밀리, 크기, 가중치 등의 스타일을 포함해야 합니다.

### 간격 (Spacing)

프레임 또는 레이어 이름을 **"Spacing/"** 또는 **"간격/"**으로 시작:

```
Spacing/
  ├─ Spacing/xs    (예: 4px 너비의 프레임)
  ├─ Spacing/sm    (예: 8px 너비의 프레임)
  ├─ Spacing/md    (예: 16px 너비의 프레임)
  ├─ Spacing/lg    (예: 24px 너비의 프레임)
  └─ Spacing/xl    (예: 32px 너비의 프레임)
```

### 예시 구조

```
📁 Design Tokens (Figma 페이지)
  │
  ├─ 📁 Colors/
  │   ├─ 🟦 Colors/primary (#3B82F6)
  │   ├─ 🟪 Colors/secondary (#8B5CF6)
  │   ├─ ⬛ Colors/background (#000000)
  │   └─ ⬜ Colors/text (#FFFFFF)
  │
  ├─ 📁 Typography/
  │   ├─ 📝 heading-1 (Pretendard, 48px, Bold)
  │   ├─ 📝 heading-2 (Pretendard, 36px, Semibold)
  │   └─ 📝 body (Pretendard, 16px, Regular)
  │
  └─ 📁 Spacing/
      ├─ ◻️ Spacing/xs (4px)
      ├─ ◻️ Spacing/sm (8px)
      └─ ◻️ Spacing/md (16px)
```

---

## 🔄 디자인 토큰 추출

### 한 번 실행

```bash
npm run figma:fetch
```

이 명령은 Figma에서 디자인 토큰을 가져와 다음 파일들을 생성합니다:

- `src/styles/tokens.css` - CSS 변수
- `src/styles/tokens.ts` - TypeScript 상수
- `src/styles/tokens.json` - JSON 형식 (디버깅용)

### 자동 동기화 (개발 중)

파일이 변경될 때마다 자동으로 토큰을 업데이트:

```bash
npm run figma:watch
```

⚠️ **주의**: 이 명령은 `.env.local` 파일이 변경될 때마다 Figma API를 호출합니다.

---

## 💻 사용 방법

### CSS에서 사용

1. CSS 파일 import:
   ```tsx
   // _app.tsx 또는 레이아웃 파일에서
   import '@/styles/tokens.css';
   ```

2. CSS 변수 사용:
   ```css
   .button {
     background-color: var(--color-primary);
     font-family: var(--typography-button-font-family);
     font-size: var(--typography-button-font-size);
     padding: var(--spacing-md);
   }
   ```

### TypeScript/JavaScript에서 사용

```tsx
import { colors, typography, spacing } from '@/styles/tokens';

const MyComponent = () => {
  return (
    <div
      style={{
        backgroundColor: colors.primary,
        fontSize: typography['heading-1'].fontSize,
        padding: `${spacing.md}px`,
      }}
    >
      Hello, Figma!
    </div>
  );
};
```

### Styled Components에서 사용

```tsx
import styled from 'styled-components';
import { colors, spacing } from '@/styles/tokens';

const Button = styled.button`
  background-color: ${colors.primary};
  padding: ${spacing.md}px ${spacing.lg}px;
  border-radius: 8px;
  color: ${colors.text};
`;
```

---

## 🛠 문제 해결

### 403 Forbidden 에러

**원인**: Access Token이 유효하지 않거나 파일에 대한 권한이 없음

**해결**:
- Access Token이 올바른지 확인
- Figma 파일에 대한 접근 권한이 있는지 확인
- 토큰이 만료되지 않았는지 확인

### 404 Not Found 에러

**원인**: File Key가 잘못되었거나 파일이 존재하지 않음

**해결**:
- Figma 파일 URL에서 File Key를 다시 확인
- 파일이 삭제되지 않았는지 확인
- 파일이 비공개인 경우 접근 권한 확인

### 토큰이 추출되지 않음

**원인**: Figma 파일의 레이어 이름이 올바른 형식이 아님

**해결**:
- 색상 레이어가 "Colors/" 또는 "색상/"으로 시작하는지 확인
- 간격 레이어가 "Spacing/" 또는 "간격/"으로 시작하는지 확인
- 텍스트 레이어가 타이포그래피 스타일을 포함하는지 확인

### 빈 토큰 파일 생성됨

**원인**: Figma 파일에 디자인 토큰 정보가 없음

**해결**:
- [Figma 파일 준비](#figma-파일-준비) 섹션의 구조대로 파일 구성
- 최소한 하나 이상의 색상이나 타이포그래피 정보 추가

---

## 📚 추가 자료

- [Figma API 문서](https://www.figma.com/developers/api)
- [Figma Access Token 생성](https://www.figma.com/developers/api#access-tokens)
- [Design Tokens 개념](https://www.designtokens.org/)

---

## 🤝 기여하기

Figma 연동 기능 개선에 기여하고 싶으시다면:

1. 이슈 생성하여 제안 사항 공유
2. Pull Request 제출
3. 문서 개선 사항 제안

---

## 📝 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.

