# careergo 프로젝트 분석

## 1. 프로젝트 개요

- **프로젝트명:** careergo
- **설명:** AI 기반 맞춤형 자소서 생성 및 채용 정보 추천 서비스
- **주요 기능:**
    - AI 기반 맞춤형 자소서 생성
    - 채용 정보 추천 및 필터링/정렬
    - 사용자 프로필 관리
    - 자기소개서 관리 (프로필/공고 기반 생성, 수정)
- **기술 스택:**
    - **프레임워크:** Next.js (App Router)
    - **스타일링:** styled-components
    - **상태 관리:** Zustand
    - **폼 관리:** React Hook Form
    - **언어:** TypeScript

## 2. 프로젝트 구조 (주요 디렉토리)

- **`src/app`**: 라우팅 및 페이지 컴포넌트
    - `(auth)`: 로그인, 회원가입 등 인증 관련 페이지
    - `(main)`: 메인 레이아웃을 사용하는 페이지 (채용, 프로필, 자소서)
- **`src/components`**: 재사용 가능한 컴포넌트
    - `common`: 공통 UI 컴포넌트 (Button, Input 등)
    - `domain`: 각 도메인(채용, 프로필 등)에 특화된 컴포넌트
- **`src/lib/api`**: Mock API 함수
- **`src/store`**: Zustand를 사용한 전역 상태 관리
- **`src/types`**: TypeScript 타입 정의

## 3. 실행 및 테스트

- **의존성 설치:** `npm install`
- **개발 서버 실행:** `npm run dev`
- **테스트 계정:**
    - 이메일: `dev@careergo.com`
    - 비밀번호: `password123`
