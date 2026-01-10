# 블로그 기능 명세서 (Functional Specification)

## 📋 문서 정보
- **프로젝트명**: Digital Doppler Blog
- **아키텍처**: Astro + Keystatic (Git-based CMS)
- **최종 수정일**: 2026-01-10
- **버전**: 1.0.0

---

## 🎯 프로젝트 개요

### 목적
고성능, 고보안을 갖춘 정적 블로그 플랫폼 구축. "콘텐츠의 코드화(Content as Code)" 철학을 기반으로 Git 기반 워크플로우를 통해 완벽한 버전 관리와 협업 가능성을 제공.

### 핵심 가치
1. **성능 우선**: 정적 사이트 생성(SSG)으로 초고속 로딩
2. **보안 강화**: 런타임 취약점 제거, 공급망 공격 방지
3. **개발자 경험**: TypeScript + Astro의 타입 안전성
4. **콘텐츠 관리**: Git 기반 버전 관리 및 롤백

---

## 🎨 주요 기능

### 1. 콘텐츠 작성 및 관리

#### 1.1 마크다운/Markdoc 기반 포스팅
- **사용자 스토리**: 작성자는 마크다운 문법으로 빠르게 글을 작성하고, Keystatic CMS를 통해 직관적인 편집 환경을 사용할 수 있다.
- **기능 상세**:
  - ✅ Markdoc 지원으로 확장 가능한 마크다운 구문
  - ✅ 프론트매터(Front Matter)를 통한 메타데이터 관리
  - ✅ 실시간 미리보기 (Keystatic 편집기)
  - ✅ 로컬 및 원격 Git 저장소 동기화
- **기술 스택**: Markdoc, Keystatic, Astro Content Collections

#### 1.2 Git 기반 콘텐츠 버전 관리
- **사용자 스토리**: 작성자는 모든 콘텐츠 변경 이력을 Git 커밋으로 추적하고, 필요시 이전 버전으로 롤백할 수 있다.
- **기능 상세**:
  - ✅ 각 포스트는 마크다운 파일로 저장 (`src/content/posts/`)
  - ✅ Git 커밋 히스토리로 완벽한 변경 이력 추적
  - ✅ 브랜치 전략: `main` (프로덕션), `draft` (초안)
  - ✅ Pull Request를 통한 콘텐츠 리뷰 프로세스 지원

---

### 2. 반응형 디자인 및 성능 최적화

#### 2.1 이미지 최적화
- **사용자 스토리**: 방문자는 모든 디바이스에서 최적화된 이미지를 빠르게 로딩할 수 있다.
- **기능 상세**:
  - ✅ Astro `<Image />` 컴포넌트 활용
  - ✅ 자동 WebP/AVIF 변환
  - ✅ 반응형 이미지 세트 (`srcset`, `sizes` 자동 생성)
  - ✅ 지연 로딩(Lazy Loading) 기본 적용
  - ✅ 빌드 타임 이미지 최적화
- **성능 목표**: Lighthouse Performance Score 95+

#### 2.2 반응형 레이아웃
- **사용자 스토리**: 방문자는 모바일, 태블릿, 데스크톱 어디서나 일관된 사용자 경험을 얻는다.
- **기술 스택**: CSS Grid, Flexbox, Container Queries

---

### 3. 콘텐츠 탐색 및 검색

#### 3.1 카테고리 및 태그 시스템
- **사용자 스토리**: 방문자는 관심 있는 주제별로 글을 쉽게 찾을 수 있다.
- **기능 상세**:
  - ✅ 카테고리: 대분류 (예: "도시 관찰", "사진", "도구")
  - ✅ 태그: 세부 분류 (예: "#색채", "#야경", "#데이터시각화")
  - ✅ 카테고리별 아카이브 페이지 (`/category/[slug]`)
  - ✅ 태그별 아카이브 페이지 (`/tags/[tag]`)
  - ✅ 포스트 수 집계 표시

#### 3.2 시리즈 기능
- **사용자 스토리**: 연재 글을 시리즈로 묶어 순차적으로 읽을 수 있다.
- **기능 상세**:
  - ✅ 시리즈 메타데이터 관리
  - ✅ 시리즈 네비게이션 (이전/다음 글)
  - ✅ 시리즈 목차 자동 생성

#### 3.3 클라이언트 사이드 검색
- **사용자 스토리**: 방문자는 키워드로 전체 포스트를 빠르게 검색할 수 있다.
- **기술 스택**: Pagefind (정적 검색 인덱스 생성)
- **기능 상세**:
  - ✅ 빌드 타임 검색 인덱스 생성
  - ✅ 제목, 본문, 태그 통합 검색
  - ✅ 실시간 검색 결과 표시

---

### 4. SEO 최적화

#### 4.1 메타데이터 관리
- **기능 상세**:
  - ✅ 동적 `<title>`, `<meta description>` 생성
  - ✅ Open Graph 태그 (SNS 공유 최적화)
  - ✅ Twitter Card 지원
  - ✅ Canonical URL 설정
  - ✅ 구조화 데이터 (JSON-LD): Article, BreadcrumbList

#### 4.2 사이트맵 및 RSS 피드
- **기능 상세**:
  - ✅ XML 사이트맵 자동 생성 (`sitemap.xml`)
  - ✅ RSS 2.0 피드 (`feed.xml`)
  - ✅ Atom 피드 지원
  - ✅ 최신 글 자동 업데이트

#### 4.3 성능 최적화
- **목표**:
  - ✅ Lighthouse Performance: 95+
  - ✅ First Contentful Paint (FCP): < 1.0s
  - ✅ Largest Contentful Paint (LCP): < 2.5s
  - ✅ Cumulative Layout Shift (CLS): < 0.1

---

## 🏗️ 기술 아키텍처

### 디커플드(Decoupled) 아키텍처
```
┌─────────────────────────────────────────────────────────┐
│  Content Layer (Git Repository)                         │
│  - Markdown files in src/content/posts/                 │
│  - Keystatic CMS for editing                            │
│  - Git version control                                  │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│  Build Layer (Static Site Generation)                   │
│  - Astro compiler                                       │
│  - Content Collections processing                       │
│  - Image optimization                                   │
│  - Search index generation                              │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│  Deployment Layer (CDN)                                 │
│  - GitHub Pages / Vercel / Cloudflare Pages            │
│  - Static HTML/CSS/JS                                  │
│  - Optimized assets                                    │
└─────────────────────────────────────────────────────────┘
```

### 폴더 구조
```
sundou94.github.io/
├── src/
│   ├── content/
│   │   ├── config.ts          # Content Collections 스키마
│   │   └── posts/             # 블로그 포스트 (Markdown)
│   ├── layouts/
│   │   ├── BaseLayout.astro   # 기본 레이아웃
│   │   └── PostLayout.astro   # 포스트 레이아웃
│   ├── pages/
│   │   ├── index.astro        # 홈페이지
│   │   ├── posts/
│   │   │   ├── [slug].astro   # 포스트 상세
│   │   │   └── index.astro    # 포스트 목록
│   │   ├── category/
│   │   │   └── [slug].astro   # 카테고리별 아카이브
│   │   ├── tags/
│   │   │   └── [tag].astro    # 태그별 아카이브
│   │   └── search.astro       # 검색 페이지
│   └── components/
│       ├── Header.astro
│       ├── Footer.astro
│       ├── PostCard.astro
│       └── SearchBar.astro
├── public/
│   ├── images/                # 정적 이미지
│   └── fonts/
├── keystatic.config.ts        # Keystatic CMS 설정
├── astro.config.mjs           # Astro 설정
└── package.json
```

---

## 📱 사용자 인터페이스 명세

### 페이지 구성

#### 홈페이지 (`/`)
- 최신 포스트 5개 표시 (Featured)
- 카테고리별 인기 글
- 시리즈 소개 섹션

#### 포스트 목록 (`/posts`)
- 무한 스크롤 또는 페이지네이션
- 필터: 카테고리, 태그, 날짜
- 정렬: 최신순, 인기순

#### 포스트 상세 (`/posts/[slug]`)
- 제목, 발행일, 읽는 시간
- 커버 이미지
- 본문 (Markdoc 렌더링)
- 태그, 카테고리
- 시리즈 네비게이션
- 이전/다음 글 링크

#### 카테고리 페이지 (`/category/[slug]`)
- 해당 카테고리 포스트 목록
- 카테고리 설명

#### 태그 페이지 (`/tags/[tag]`)
- 해당 태그 포스트 목록

#### 검색 페이지 (`/search`)
- 검색 입력창
- 실시간 검색 결과

---

## 🔒 보안 및 성능 철학

### 정적 사이트 생성(SSG)의 보안 이점
1. **공격 표면 제거**: 데이터베이스, 서버 사이드 로직 없음
2. **SQL 인젝션 방지**: 백엔드 데이터베이스가 존재하지 않음
3. **XSS 방지**: 빌드 타임에 모든 콘텐츠 검증
4. **DDoS 내성**: CDN을 통한 정적 파일 배포

### 성능 최적화 전략
1. **Pre-rendering**: 모든 페이지를 빌드 타임에 생성
2. **Code Splitting**: 페이지별 JavaScript 최소화
3. **Asset Optimization**: 이미지, CSS, JS 압축 및 최적화
4. **CDN 배포**: 전 세계 엣지 서버를 통한 빠른 콘텐츠 전달

---

## ✅ 개발 단계별 체크리스트

### Phase 1: 프로젝트 기초 ✅
- [x] Astro 프로젝트 초기화
- [x] TypeScript strict 모드 설정
- [x] 기능 명세서 작성

### Phase 2: CMS 통합 (예정)
- [ ] Keystatic 설치 및 설정
- [ ] 콘텐츠 컬렉션 스키마 정의
- [ ] Astro Content Collections 연동

### Phase 3: 프런트엔드 UI (예정)
- [ ] 레이아웃 컴포넌트 제작
- [ ] 페이지 구현 (홈, 포스트 목록/상세)
- [ ] 이미지 최적화 설정

### Phase 4: 보안 및 배포 (예정)
- [ ] 보안 가이드 문서 작성
- [ ] GitHub Actions 워크플로우 설정
- [ ] OIDC 배포 설정

---

## 📚 참고 자료
- [Astro Documentation](https://docs.astro.build)
- [Keystatic Documentation](https://keystatic.com)
- [Markdoc Specification](https://markdoc.dev)
- [Web Vitals](https://web.dev/vitals/)
