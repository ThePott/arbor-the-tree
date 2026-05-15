# Arbor The Tree — 입시 학원 진도 관리 시스템

[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![clsx](https://img.shields.io/badge/clsx-000000?style=for-the-badge)](https://github.com/lukeed/clsx)
[![CVA](https://img.shields.io/badge/class--variance--authority-000000?style=for-the-badge)](https://cva.style/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Floating UI](https://img.shields.io/badge/Floating_UI-1E1E1E?style=for-the-badge)](https://floating-ui.com/)
[![Husky](https://img.shields.io/badge/Husky-42B883?style=for-the-badge)](https://typicode.github.io/husky/)
[![Immer](https://img.shields.io/badge/Immer-00E7C3?style=for-the-badge&logo=immer&logoColor=black)](https://immerjs.github.io/immer/)
[![Lucide](https://img.shields.io/badge/Lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)
[![Motion](https://img.shields.io/badge/Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
[![React PDF](https://img.shields.io/badge/@react--pdf-FB0F00?style=for-the-badge)](https://react-pdf.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF4154?style=for-the-badge&logo=tanstack&logoColor=white)](https://tanstack.com/router)
[![TanStack Table](https://img.shields.io/badge/TanStack_Table-FF4154?style=for-the-badge&logo=tanstack&logoColor=white)](https://tanstack.com/table)
[![TanStack Virtual](https://img.shields.io/badge/TanStack_Virtual-FF4154?style=for-the-badge&logo=tanstack&logoColor=white)](https://tanstack.com/virtual)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Typst](https://img.shields.io/badge/Typst-239DAD?style=for-the-badge&logo=typst&logoColor=white)](https://typst.app/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-2D3748?style=for-the-badge)](https://github.com/pmndrs/zustand)

## 강사의 기억과 수기록을 넘어선 시스템적 관리

- [배포 페이지](https://arbor-the-tree-production.up.railway.app)
- [백엔드 레포지토리](https://github.com/ThePott/api-of-arbor-the-tree)
- [PDF 생성 성능 비교 페이지](https://arbor-the-tree-production.up.railway.app/test/pdf)
- [테스트 계정 로그인 페이지](https://arbor-the-tree-production.up.railway.app/test/login)

### 테스트 계정

| 계정 | ID               | Password     |
| ---- | ---------------- | ------------ |
| 원장 | test12@test.test | test1234!@#$ |
| 실장 | test13@test.test | test1234!@#$ |
| 학생 | test14@test.test | test1234!@#$ |

### 본 프로젝트 중 마주한 문제들과 그 해결 과정에 대해 알고 싶다면

- [포트폴리오](https://github.com/ThePott/git-blog/blob/main/src/job/general/portfolio/portfolio_v3/index.pdf)

---

## 1. 해결하려고 한 문제

- 강사의 기억에 의존한 진도 추적
- 비정량적 진도
- 오답 복습 관리 불가
- 병렬적으로 생성되는 학생들의 진도 갱신 사항과 강사의 직렬적 피드백 사이의 병목 현상

---

## 2. 핵심 기능

- 그리드 인풋을 이용한 문제집의 문제 좌표(쪽, 번호) 입력
- 칸반 보드를 이용해 편리한 진도 관리 및 추적
- 그리드 체크박스를 이용한 직관적인 오답 체크
- 오답체크와 진도표 및 오답과제 현황을 동기화하여 진도 관리 병목 현상 최소화

---

## 3. 라우트 별 기능 안내

```
/                      # 랜딩 페이지
├── profile            # 개인, 학원 정보 입력
├── manage
│   ├── resume         # 학생, 실장이 학원에 등록 요청한 목록 관리
│   ├── delete         # 학생, 실장 퇴원 처리
│   └── student        # 학생들에게 반 배정
├── book               # 생성된 책 목록
│   └── create         # 오답 관리에 사용할 책의 문제 좌표(쪽 번호, 문제 번호) 등록
├── progress           # 진도표
├── check              # 오답 체크 -> DB 저장 후 자동으로 progress, assignment에 반영
└── assignment         # 오답과제 목록
    └── create         # 오답과제 생성 -> 서버 사이드 PDF 생성을 통한 끊김 없는 사용 경험
```

---

## 4. 디렉토리 구조

### 한 폴더 내에서, 밖으로 export 되는 파일은 index 파일 하나로 제한

- 해당 index 파일에서 리팩터한 코드는 새 폴더를 생성하고 그 안에 index 파일로 둡니다
- 이로써 한 폴더 내에서 부모 컴포넌트와 자식 컴포넌트가 뒤섞이는 것을 방지하고 코드 간 계층 구조를 명확히 합니다

```
// 예시
page/
├── index.typ            # page/ 폴더 내에서의 최상위 컴포넌트
├── Header/
│   ├── index.tsx
│   ├── HeaderChild1/
│   │   └── index.tsx
│   └── HeaderChild2/
│       └── index.tsx
└── Footer/
    └── index.tsx
```

### flat한 라우트 파일, routes와 매칭되는 features 디렉토리 구조

- 컴포넌트 간의 위계를 라우트 간의 위계와 분리하기 위해 라우트별 feature 폴터를 flat 하게 설정했습니다
    - `fruit/` 의 하위 라우트로 `fruit/apple` 이 있다고 하여 ApplePage가 FruitPage의 자식 컴포넌트이지는 않습니다. 따라서 이 둘은 각자 다른 폴더에 있어야 합니다

```
// 예시
src/
├── routes/             # TanStack 파일 기반 라우트 (점 표기법으로 플랫하게 작성)
│   ├── fruit/
│   ├── fruit.apple/
│   └── fruit.apple.seed/
└── features/            # 해당 라우트에서만 사용되는 요소들
    ├── fruit/
    ├── fruit.apple/
    └── fruit.apple.seed/
```

---

## 5. 코드 품질을 위한 장치

- Husky pre-commit
  — `npm run format` 자동 실행 후 스테이징
- Husky pre-push
  — `npm run lint:strict && npm run build`. 일반 `lint`는 경고지만 `lint:strict`는 같은 룰을 에러로 승격해 빌드 전 차단
- normal, strict 2단게 linting rules

| pre-commit        | pre-push           |
| ----------------- | ------------------ |
| no-console: warn  | no-console: error  |
| no-debugger: warn | no-debugger: error |
