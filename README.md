# careergo - AI 취업 준비 파트너

AI 기반 맞춤형 자소서 생성 및 채용 정보 추천 서비스 `careergo` 프로젝트입니다.

## ✨ 주요 기능

이 프로젝트는 다음 핵심 기능들을 포함하고 있습니다:

- **기반 환경 구축 및 공통 페이지:** Next.js (App Router)와 styled-components를 기반으로 프로젝트 환경이 설정되었으며, 메인 페이지와 채용 공고 페이지의 기본 구조 및 공통 레이아웃(Header, Footer)과 컴포넌트(Button, Input, Tag)가 구현되었습니다.
- **사용자 인증 시스템:** Zustand를 활용한 전역 인증 상태 관리, Mock API를 통한 로그인/회원가입/비밀번호 찾기 기능, `AuthGuard` 컴포넌트를 통한 페이지 보호, 로그인 상태에 따른 UI 동적 변경 기능이 구현되었습니다.
- **프로필 생성 및 관리:** 사용자 프로필 데이터 타입 정의, 프로필 CRUD Mock API 구현, 프로필 설정 모달 및 기본 정보 입력 스텝, 프로필 정보 표시 컴포넌트, 그리고 프로필 페이지가 구현되었습니다.
- **채용 공고 기능 고도화:** 채용 공고 데이터 타입 정의, 필터링 및 정렬 기능을 포함한 Mock API, 공용 드롭다운 컴포넌트, 채용 공고 필터/정렬 컴포넌트, 개인화 버튼 추가 및 필터링/정렬/로딩 상태 관리 로직이 구현되었습니다.
- **자기소개서 관리 시스템:** 자기소개서 관련 타입 정의, 자소서 CRUD Mock API 구현 (프로필/공고 기반 생성, 수정), 자소서 목록 및 상세 페이지, Q&A 항목 수정 기능이 구현되었습니다.

## 🚀 기술 스택

- **프레임워크:** Next.js (App Router)
- **스타일링:** styled-components
- **상태 관리:** Zustand
- **폼 관리:** React Hook Form
- **언어:** TypeScript

## 📂 프로젝트 구조 (핵심)

```
/careergo
├── /public
│   └── /images
│       └── logo.svg
├── /src
│   ├── /app
│   │   ├── /(auth)           # 인증 관련 페이지 (로그인, 회원가입 등)
│   │   ├── /(main)           # 메인 레이아웃을 사용하는 페이지
│   │   │   ├── /jobs         # 채용 공고 페이지
│   │   │   ├── /profile      # 프로필 관리 페이지
│   │   │   └── /resumes      # 자기소개서 관리 페이지
│   │   ├── globals.css
│   │   └── layout.tsx        # Root Layout
│   ├── /components
│   │   ├── /auth             # 인증 관련 컴포넌트 (AuthGuard)
│   │   ├── /common           # 재사용 가능한 공통 UI 컴포넌트 (Button, Input, Dropdown, Tag)
│   │   └── /domain           # 특정 도메인에 특화된 컴포넌트
│   │       ├── /jobs         # 채용 공고 관련 컴포넌트
│   │       ├── /main         # 메인 페이지 관련 컴포넌트
│   │       ├── /profile      # 프로필 관련 컴포넌트
│   │       ├── /resumes      # 자기소개서 관련 컴포넌트
│   │       └── /shared       # 공통 레이아웃 컴포넌트 (Header, Footer)
│   ├── /hooks                # 커스텀 React Hooks
│   ├── /lib
│   │   ├── /api              # Mock API 함수들
│   │   └── styled-registry.tsx # styled-components SSR 설정
│   ├── /store                # Zustand 상태 관리 스토어
│   ├── /styles               # 전역 스타일 및 테마 정의
│   └── /types                # TypeScript 타입 정의
├── .eslintrc.json
├── next.config.js
├── package.json
└── tsconfig.json
```

## ⚙️ 시작하기

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요:

1.  **프로젝트 디렉토리로 이동:**
    ```bash
    cd careergo
    ```

2.  **의존성 설치:**
    ```bash
    npm install
    # 또는 yarn install
    ```

3.  **개발 서버 실행:**
    ```bash
    npm run dev
    # 또는 yarn dev
    ```

4.  브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 확인합니다.

## 🧪 테스트 및 사용 방법

-   **로그인:** `http://localhost:3000/login` 에서 이메일 `dev@careergo.com`, 비밀번호 `password123`으로 로그인할 수 있습니다.
-   **채용 공고:** 로그인 후 `http://localhost:3000/jobs` 에서 필터링 및 정렬 기능을 테스트하고, 각 공고 카드에 있는 '이 공고로 자소서 생성' 버튼을 클릭하여 자소서 생성 기능을 확인합니다.
-   **프로필 관리:** 로그인 후 `http://localhost:3000/profile` 에서 프로필을 생성하거나 수정할 수 있습니다.
-   **자기소개서 관리:** 로그인 후 `http://localhost:3000/resumes` 에서 생성된 자소서 목록을 확인하고, 각 자소서를 클릭하여 상세 페이지에서 Q&A 내용을 수정할 수 있습니다.

