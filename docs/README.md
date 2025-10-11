# 📚 Cido Frontend 문서

프로젝트 문서 모음입니다.

## 🎨 Figma 연동 가이드

### 시작하기

1. **[FIGMA_SETUP_STEP_BY_STEP.md](./FIGMA_SETUP_STEP_BY_STEP.md)** ⭐ **먼저 읽으세요!**
   - Figma에서 디자인 토큰을 설정하는 **완전한 단계별 가이드**
   - 15-30분 소요
   - 스크린샷 설명 포함
   - 체크리스트 제공

2. **[FIGMA_QUICK_REFERENCE.md](./FIGMA_QUICK_REFERENCE.md)** ⚡ **빠른 참조**
   - 핵심 요약 (1분)
   - 흔한 실수 정리
   - 권장 값 목록
   - 코드 사용 예제

3. **[../FIGMA_SETUP.md](../FIGMA_SETUP.md)** 📖 **상세 가이드**
   - Figma API 설정 방법
   - 환경 변수 설정
   - 문제 해결 가이드
   - 사용 방법

4. **[FIGMA_BEST_PRACTICES.md](./FIGMA_BEST_PRACTICES.md)** 💡 **모범 사례**
   - 디자이너-개발자 협업
   - 워크플로우 가이드
   - 팀 협업 팁
   - 성능 최적화

---

## 📖 문서 선택 가이드

### "처음 시작합니다"
→ **FIGMA_SETUP_STEP_BY_STEP.md** 읽고 따라하기

### "빠르게 참고하고 싶어요"
→ **FIGMA_QUICK_REFERENCE.md** 확인

### "API 설정이 필요해요"
→ **FIGMA_SETUP.md** 참조

### "팀과 협업하려고 합니다"
→ **FIGMA_BEST_PRACTICES.md** 읽기

### "문제가 생겼어요"
→ **FIGMA_SETUP.md**의 "문제 해결" 섹션

---

## 🎯 작업 흐름

```
1. API 설정
   ├─ Figma Access Token 발급
   ├─ File Key 확인
   └─ .env.local 설정
        ↓
2. Figma 파일 구조화 ⭐ 현재 단계
   ├─ Colors 섹션 만들기
   ├─ Typography 섹션 만들기
   └─ Spacing 섹션 만들기
        ↓
3. 디자인 토큰 추출
   └─ npm run figma:fetch
        ↓
4. 코드에 적용
   ├─ CSS 변수 사용
   └─ TypeScript 상수 사용
        ↓
5. 개발 & 유지보수
   └─ 필요시 npm run figma:fetch로 업데이트
```

---

## 🛠 유용한 명령어

```bash
# 연결 테스트
node scripts/testFigmaConnection.js

# 디자인 토큰 추출
npm run figma:fetch

# 자동 감시 모드
npm run figma:watch

# 개발 서버 실행
npm run dev

# 예제 페이지 확인
# http://localhost:8080/figma-example
```

---

## 📂 프로젝트 구조

```
cido-frontend/
├── docs/                           # 📚 문서 (여기!)
│   ├── README.md                   # 문서 인덱스
│   ├── FIGMA_SETUP_STEP_BY_STEP.md # ⭐ 단계별 가이드
│   ├── FIGMA_QUICK_REFERENCE.md    # ⚡ 빠른 참조
│   └── FIGMA_BEST_PRACTICES.md     # 💡 모범 사례
│
├── scripts/                        # 🔧 스크립트
│   ├── fetchFigmaTokens.js         # 토큰 추출
│   └── testFigmaConnection.js      # 연결 테스트
│
├── src/
│   ├── lib/                        # 📦 라이브러리
│   │   ├── figmaClient.ts          # Figma API 클라이언트
│   │   └── figmaTokens.ts          # 토큰 추출 유틸리티
│   │
│   ├── styles/                     # 🎨 스타일 (생성될 파일)
│   │   ├── tokens.css              # CSS 변수
│   │   ├── tokens.ts               # TypeScript 상수
│   │   └── tokens.json             # JSON 형식
│   │
│   ├── components/
│   │   └── examples/
│   │       └── FigmaTokensExample.tsx  # 사용 예제
│   │
│   └── pages/
│       └── figma-example.tsx       # 예제 페이지
│
├── .env.local                      # 환경 변수 (생성 필요)
├── .env.example                    # 환경 변수 템플릿
├── FIGMA_SETUP.md                  # Figma 설정 가이드
└── README.md                       # 프로젝트 README
```

---

## 📞 도움이 필요하신가요?

### 일반적인 질문
- 각 문서의 FAQ 섹션 확인
- `FIGMA_SETUP.md`의 "문제 해결" 섹션

### 버그 리포트
- GitHub Issues에 등록
- 에러 메시지와 함께 보고

### 기능 제안
- GitHub Discussions에 제안
- 팀 채널에서 논의

---

## 🔄 문서 업데이트

마지막 업데이트: 2025-10-10

이 문서는 프로젝트 진행에 따라 지속적으로 업데이트됩니다.

---

**즐거운 개발 되세요! 🚀**

