# Digital Doppler Blog

도시를 관찰하고 기록하는 정적 블로그. Astro와 Git 기반 CMS를 사용하여 고성능, 고보안 아키텍처로 구축되었습니다.

## ✨ 특징

- 🚀 **초고속 성능**: Astro의 정적 사이트 생성(SSG)으로 빠른 로딩
- 🔒 **높은 보안성**: 런타임 취약점 제거, 공급망 공격 방지
- 📝 **Git 기반 콘텐츠**: 모든 콘텐츠를 Git으로 버전 관리
- 🎨 **반응형 디자인**: 모든 디바이스에서 최적화된 경험
- 🔍 **SEO 최적화**: Sitemap, RSS, Metadata 자동 관리
- 📦 **TypeScript**: 타입 안전성으로 개발 경험 향상

## 🛠️ 기술 스택

- **프레임워크**: [Astro](https://astro.build) v5.16+
- **콘텐츠**: [Markdoc](https://markdoc.dev) + Astro Content Collections
- **스타일링**: CSS (CSS Grid, Flexbox, Custom Properties)
- **타입**: TypeScript (strict mode)
- **배포**: GitHub Actions → GitHub Pages
- **Node.js**: v20+ (LTS)

## 🚀 빠른 시작

### 1. 저장소 클론

```bash
git clone https://github.com/sundou94/sundou94.github.io.git
cd sundou94.github.io
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:4321](http://localhost:4321) 접속

### 4. 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 디렉토리에 생성됩니다.

## 📝 새 포스트 작성

1. `src/content/posts/` 디렉토리에 새 `.mdoc` 파일 생성
2. 프론트매터 작성:

```yaml
---
title: 포스트 제목
publishDate: 2026-01-10
category: urban-observation
tags:
  - 태그1
  - 태그2
excerpt: 포스트 요약 (최대 200자)
featured: false
---
```

3. 본문을 Markdoc으로 작성
4. 변경사항 커밋 및 푸시

## 🔐 보안

이 프로젝트는 "Content as Code" 철학과 정적 사이트 생성(SSG) 방식을 통해 높은 보안성을 제공합니다.

자세한 내용은 [SECURITY_GUIDE.md](./SECURITY_GUIDE.md)를 참고하세요.

## 📚 문서

- **[FUNCTIONAL_SPEC.md](./FUNCTIONAL_SPEC.md)**: 기능 명세서 및 아키텍처
- **[SECURITY_GUIDE.md](./SECURITY_GUIDE.md)**: 보안 가이드 및 모범 사례

## 🚀 배포

GitHub Actions를 통해 자동으로 배포됩니다:

1. `main` 브랜치에 커밋 푸시
2. GitHub Actions가 자동으로 빌드 시작
3. 빌드 완료 후 GitHub Pages에 배포

---

**Made with ❤️ using Astro**

블로그: [https://sundou94.github.io](https://sundou94.github.io)
