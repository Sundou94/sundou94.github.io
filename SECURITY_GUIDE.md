# 보안 가이드 (Security Guide)

## 📋 문서 정보
- **프로젝트명**: Digital Doppler Blog
- **최종 수정일**: 2026-01-10
- **버전**: 1.0.0

---

## 🔒 보안 아키텍처 개요

본 블로그는 **정적 사이트 생성(Static Site Generation, SSG)** 방식을 채택하여 근본적으로 보안 위협을 최소화하는 아키텍처를 구현했습니다.

### 핵심 보안 원칙

```
┌─────────────────────────────────────────────────────────┐
│  "움직이지 않는 것은 공격받지 않는다"                      │
│  (Stationary targets are harder to exploit)             │
└─────────────────────────────────────────────────────────┘
```

정적 웹 페이지는 빌드 타임에 모든 콘텐츠가 확정되며, 런타임에서는 단순히 파일을 제공하기만 합니다. 이는 마치 **"건물을 미리 완전히 짓고 손님을 맞이하는 것"**과 같아, 손님이 올 때마다 건물을 짓는 방식(Dynamic Rendering)보다 훨씬 안전합니다.

---

## 🛡️ SSG 채택을 통한 공격 표면 제거

### 1. 백엔드 공격 표면 제거

**전통적인 동적 웹사이트의 취약점:**
```
[사용자] → [웹 서버] → [애플리케이션 서버] → [데이터베이스]
           ↓             ↓                      ↓
        XSS 공격      코드 인젝션          SQL 인젝션
```

**SSG 방식의 공격 표면:**
```
[사용자] → [CDN (정적 파일)]
           ↓
        공격 표면 거의 없음
```

### 2. 주요 위협 차단

#### SQL 인젝션 (SQL Injection) ❌
- **상태**: 불가능
- **이유**: 데이터베이스가 존재하지 않음
- **근거**: 모든 데이터는 빌드 타임에 HTML로 변환됨

#### 서버 사이드 코드 인젝션 ❌
- **상태**: 불가능
- **이유**: 런타임 서버 로직이 없음
- **근거**: 사전 빌드된 HTML만 제공

#### XSS (Cross-Site Scripting) ✅ 대폭 감소
- **상태**: 빌드 타임 검증으로 차단
- **방어 전략**:
  - Astro의 자동 HTML 이스케이프
  - Content Security Policy (CSP) 헤더 적용 권장
  - Markdoc의 안전한 렌더링

#### DDoS (Distributed Denial of Service) ✅ 내성 강화
- **상태**: CDN을 통한 분산 배포로 완화
- **방어 전략**:
  - 전 세계 엣지 서버를 통한 부하 분산
  - 정적 파일은 처리 부하가 거의 없음
  - Rate Limiting은 CDN 수준에서 처리

---

## 🔐 배포 파이프라인 보안 (CI/CD Security)

SSG의 보안 강점에도 불구하고, **배포 파이프라인(CI/CD)**은 여전히 공급망 공격(Supply-chain Attack)의 대상이 될 수 있습니다.

### 최소 권한 원칙 (Principle of Least Privilege)

#### GitHub Actions 토큰 권한 최소화

**나쁜 예 ❌:**
```yaml
permissions: write-all  # 모든 권한 부여 (위험!)
```

**좋은 예 ✅:**
```yaml
permissions:
  contents: read          # 저장소 읽기만 허용
  pages: write            # GitHub Pages 배포만 허용
  id-token: write         # OIDC 토큰만 생성
```

**이유:**
- 토큰이 탈취되더라도 피해 범위가 제한됨
- 저장소 코드 수정, 삭제 등 치명적인 작업 방지
- OWASP Top 10 - "Security Misconfiguration" 방지

### GitHub Actions 워크플로우 보안

#### 1. 액션 버전 고정 (Action Pinning)

**나쁜 예 ❌:**
```yaml
- uses: actions/checkout@v4  # 태그는 변경 가능!
```

**좋은 예 ✅:**
```yaml
- uses: actions/checkout@8ade135a41bc03ea155e62e844d188df1ea18608  # SHA 해시로 고정
```

**이유:**
- 태그(`v4`)는 공격자가 변경할 수 있음
- SHA 해시는 불변(immutable)하여 공급망 공격 방지
- SLSA Framework Level 3 요구사항

#### 2. 의존성 보안 검사

```yaml
- name: Audit dependencies
  run: npm audit --production
```

### OIDC (OpenID Connect) 도입

#### 기존 방식의 문제점 (Static Secrets)

**문제:**
- GitHub Secrets에 클라우드 API 키 저장
- 키가 만료되지 않으면 영구적으로 유효
- 키가 노출되면 즉시 보안 사고

#### OIDC 방식의 장점

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123456789:role/GitHubActionsRole
    aws-region: us-east-1
    # 정적 API 키 없이 단기 토큰 사용
```

**장점:**
1. **단기 토큰**: 몇 시간 후 자동 만료
2. **Zero Static Secrets**: 저장된 비밀키 없음
3. **감사 추적**: 모든 인증 시도 로깅

#### 지원 서비스
- ✅ GitHub Pages (OIDC 기본 지원)
- ✅ Vercel
- ✅ Cloudflare Pages
- ✅ AWS S3 + CloudFront
- ✅ Azure Static Web Apps

---

## 🔒 환경 변수 및 비밀 관리

### 원칙: 소스 코드에 절대 비밀을 저장하지 마세요

#### GitHub Secrets 사용

```yaml
# .github/workflows/deploy.yml
env:
  DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

#### .gitignore에 민감한 파일 추가

```.gitignore
# 환경 변수 파일
.env
.env.local
.env.*.local

# 설정 파일 (토큰 포함 시)
config.js
config.local.js

# 클라우드 인증 정보
credentials.json
service-account-key.json
```

### 비밀키 노출 사고 대응

만약 실수로 커밋에 비밀키가 포함되었다면:

1. **즉시 해당 키를 무효화/삭제**
2. **Git 히스토리에서 제거 (BFG Repo-Cleaner 사용)**
3. **새로운 키 생성 및 GitHub Secrets에 등록**
4. **팀원에게 공지**

```bash
# Git 히스토리에서 민감한 파일 제거
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch config.js" \
  --prune-empty --tag-name-filter cat -- --all
```

---

## 🌐 CDN 및 호스팅 보안

### GitHub Pages 보안 설정

#### 1. HTTPS 강제

✅ **Settings → Pages → Enforce HTTPS** 활성화

#### 2. 커스텀 도메인 사용 시

```
# CNAME 파일
blog.yourdomain.com
```

- DNS에 CAA 레코드 추가 (Let's Encrypt 인증서 발급 제어)
- DNSSEC 활성화 (DNS 스푸핑 방지)

### Content Security Policy (CSP) 헤더

정적 사이트에서도 CSP를 적용하여 XSS 추가 방어:

```html
<!-- public/index.html 또는 Astro 레이아웃 -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' 'unsafe-inline';
               style-src 'self' 'unsafe-inline' fonts.googleapis.com;
               font-src fonts.gstatic.com;">
```

---

## 📦 의존성 보안

### 정기적인 보안 업데이트

```bash
# 취약점 스캔
npm audit

# 자동 수정 (가능한 경우)
npm audit fix

# 강제 업데이트 (주의 필요)
npm audit fix --force
```

### Dependabot 활성화

`.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### 신뢰할 수 있는 패키지만 사용

- ✅ 공식 Astro 패키지 (`@astrojs/*`)
- ✅ Keystatic 공식 패키지 (`@keystatic/*`)
- ✅ 활발히 유지보수되는 오픈소스 (GitHub Stars, 최근 커밋 확인)
- ❌ 알려지지 않은 패키지, 오래된 패키지 주의

---

## 🔍 보안 모니터링 및 감사

### GitHub Security Features 활용

1. **Code Scanning**: CodeQL을 통한 자동 취약점 스캔
2. **Secret Scanning**: 커밋에 포함된 비밀키 자동 감지
3. **Dependabot Alerts**: 취약한 의존성 경고

### 워크플로우 활성화

`.github/workflows/codeql.yml`:
```yaml
name: "CodeQL"
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * 1'  # 매주 월요일 실행

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      security-events: write
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v3
        with:
          languages: javascript, typescript
      - uses: github/codeql-action/analyze@v3
```

---

## 📚 보안 체크리스트

### 배포 전 필수 체크리스트

- [ ] `.gitignore`에 모든 민감한 파일 포함
- [ ] GitHub Secrets에 모든 비밀키 등록
- [ ] GitHub Actions 권한 최소화 (`contents: read`)
- [ ] 액션 버전 SHA 해시로 고정
- [ ] Dependabot 활성화
- [ ] HTTPS 강제 활성화
- [ ] CSP 헤더 설정 (선택)
- [ ] npm audit 통과

### 정기 보안 점검 (월 1회 권장)

- [ ] `npm audit` 실행 및 취약점 해결
- [ ] Dependabot PR 검토 및 병합
- [ ] GitHub Security Alerts 확인
- [ ] 배포 로그 이상 여부 확인

---

## 🚨 사고 대응 계획

### 비밀키 노출 시나리오

1. **발견**: GitHub Secret Scanning Alert 또는 수동 발견
2. **즉시 조치**:
   - 해당 키 무효화/삭제
   - Git 히스토리 정리
   - 새 키 발급 및 등록
3. **사후 조치**:
   - 사고 원인 분석
   - 재발 방지 조치 (pre-commit hook 등)
   - 팀 교육

### 의존성 취약점 발견 시나리오

1. **발견**: Dependabot Alert 또는 npm audit
2. **평가**: CVSS 점수 확인 (7.0 이상은 긴급)
3. **조치**:
   - 가능한 빠르게 업데이트
   - 업데이트 불가 시 패키지 교체 검토
   - 임시 방어 조치 (해당 기능 비활성화 등)

---

## 📖 참고 자료

### 보안 프레임워크 및 표준
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [SLSA Framework](https://slsa.dev/)
- [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks)

### GitHub 보안 문서
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [Securing GitHub Actions](https://docs.github.com/en/actions/security-guides)
- [Using OIDC with GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/about-security-hardening-with-openid-connect)

### Astro 보안
- [Astro Security Documentation](https://docs.astro.build/en/concepts/why-astro/#security)

---

## ✅ 결론

본 블로그의 보안 전략은 다음 세 가지 기둥 위에 구축되었습니다:

1. **설계 단계 보안 (Security by Design)**: SSG 아키텍처로 근본적 위협 제거
2. **배포 파이프라인 보안**: 최소 권한 원칙, OIDC, 액션 고정
3. **지속적인 모니터링**: Dependabot, CodeQL, 정기 감사

이 접근 방식은 **"공격받을 가능성을 사전에 제거하는 것"**이 **"공격을 막는 것"**보다 효과적이라는 보안 철학을 반영합니다.

---

**마지막 업데이트**: 2026-01-10
**담당자**: Digital Doppler Team
**문의**: [GitHub Issues](https://github.com/sundou94/sundou94.github.io/issues)
