# Next.js Page Router

- React.js 를 기반으로 편리하게 개발이 가능하도록 기술 제공
- Vercel 에서 React.js 를 기반으로 개발
- https://vercel.com
- Next는 라이브러리가 아니라 `프레임워크` 이다.

## React 와 Next 의 간략한 차이

- React (라이브러리 조합의 개발)
  - 개발자가 여러가지 npm 을 직접 설치
  - 개발자가 호환성 검사
  - 개발자가 기술에 대한 스택을 결정한다.
  - 예) React Router Dom 을 쓰고, axios 쓰고, redux 쓸거야
  - 예) React Router Dom 을 쓰고, fetch 쓰고, recoil 쓸거야
  - 예) React Router Dom 을 쓰고, fetch 쓰고, zustands 쓸거야
  - 예) React Router Dom 을 쓰고, reactQuery 쓰고, context 쓸거야

### Next (프레임워크)

- 개발 기반의 대부분을 미리 정해서 세팅이 되어 있다.
- 화면의 최적화를 자동으로 지원
- 라우터도 기본적으로 지원
- 이미지 최적화도 알아서 지원
- 코드 스플릿팅도 알아서 지원
- 외부 데이터도 미리 불러와서 사전에 렌더링으로 html을 생성
- 기타 등등등

## 설치

```bash
npx create-next-app@14 . -- 14버전 설치
npx create-next-app@latest . -- 15버전 설치(최신버전)
```

# 사전 렌더링의 이해

- 사용자가 주소를 입력하면 접속 요청을 한다.
- 주소를 받은 서버는 html을 돌려준다.
- 여기서 **서버에서 html을 만드는 과정을 사전 렌더링이라고 한다.**
- 만들어진 html을 사용자에게 전달한다.

## 접속 및 반환과정

- 사용자 > 웹브라우저(접속요청) > 웹서버(html 렌더링) > html 반환

## CSR방식

- Client Side Rendering

### React 렌더링 방식

#### Step 1

- 사용자 > 웹브라우저(접속요청) > **웹서버(비어있는 html)** > html 반환 > 비어있는 화면 렌더링

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

#### Step 2

- 비어있는 html에 js파일 로딩 실행 > **웹서버(JS 번들링(압축파일)) > 전달** > 웹브라우저에서 JS실행 > html적용 후 화면 출력

```html
<script type="module" src="/src/main.tsx"></script>
```

### CSR방식의 단점

- SEO가 지원되지 않음(검색엔진 노출, SNS공유 등)
- js번들링 과정이 오래 걸릴 수 있다.
- html의 기본 페이지만 보고 있을 수 있다.
- 네트워크 속도가 느리면 더 오래 기다려야 한다.
- **FCP(First Contentful Paint)**가 느리다.

### CSR방식의 장점

- 일단 js가 로딩되었다면 무조건 빠른 화면 이동이 가능하다.

## SSR방식

- Server Side Rendering
- Next.js가 취하는 렌더링 방식
- 서버에서 htmld을 사전에 생성한다.

### Step 1

- 사용자 > 웹브라우저(접속요청) > **웹서버(html을 사전에 생성)** > html 반환 > **내용과 기본내용 포함된 html렌더링**

### Step 2

- 내용이 포함된 html에서 js파일 로딩 실행 > **웹서버(인터렉션용 js 번들파일) > 전달** > 웹브라우저에서 JS실행(하이드레이션) > html적용 후 화면 출력

#### 하이드레이션(Hydration : 물기가 스며든다, 수화 작용)

- js를 html에 반영(기능을 부여)한다.
- **TTI(Time to Interaction)**이 발생한다. (하이드레이션 적용 후 작동 가능상태)

# 결론

- Next.js는 html을 서버에서 사전에 생성하고, Hydration으로 별도 js를 번들링 제공한다.
- SEO가 원활하다.
- 기술 스택이 표준화되어 있어서 프로젝트 유지 보수가 원활하다.

# Router란?

- uri를 Router라고 한다.
  - http://www.naver.com
  - http://www.naver.com/blog/1

## Next의 공통 사항

- 파일명, 폴더명이 약속되어 있다.
- 파일명, 폴더명에 따라서 기능도 약속되어 있다.

## Pages Router 방식

- 14 버전으로 진행
- 일반화된 개발 방식(많은 기업이 도입하여 운영중)
- 반드시 `/src/pages` 폴더에 있어야 라우터 역할을 한다.
  - http://localhost:3000 접속시 `/src/pages/index.tsx`
  - http://localhost:3000/todo 접속시 `/src/pages/todo.tsx` 또는 `/src/pages/todo/index.tsx`
  - http://localhost:3000/todo?id=1&type=view 접속시 `/src/pages/todo.tsx` 또는 `/src/pages/todo/index.tsx`
  - http://localhost:3000/todo/100 접속시 `/src/pages/todo/[100].tsx`

## App Router 방식

- 15 버전으로 진행
- 향후 진행될 개선된 개발 방식
- 반드시 `/src/pages` 폴더에 있어야 라우터 역할을 한다.
  - http://localhost:3000 접속시 `/src/app/page.tsx`
  - http://localhost:3000/todo 접속시 `/src/pages/todo/page.tsx`
  - http://localhost:3000/todo?id=1&type=view 접속시 `/src/pages/todo/page.tsx`
  - http://localhost:3000/todo/100 접속시 `/src/app/todo/[100]/page.tsx`

# 프로젝트 구조

- public : 정적 파일, 최적화에서 제외
- src : root 폴더
- src/pages : 라우터로 연결시킬 파일 및 폴더 배치
- src/styles : css **파일명.module.css**가 기본이다.
- src/components 생성 : 컴포넌트 파일들(기본 `서버 컴포넌트`)

# 첫 화면 만들기

- /src/pages/index.tsx
- http://localhost:3000

```tsx
export default function Main() {
  return <h1>메인 페이지</h1>;
}
```

# `_app.tsx`

- 모든 페이지에 공통으로 들어갈 내용 작성
- 공통 레이아웃, 공통 데이터, 공통 로직
- `페이지 파일이 아니다.`
- `import "@/styles/globals.css";` Next에서 유일한 css import문

```tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>상단</header>
      <Component {...pageProps} />
      <footer>하단</footer>
    </>
  );
}
```

# `_document.tsx`

- 모든 페이지에 환경 설정하는 곳
- HTML의 구조를 담당
- 각 태그를 커스터마이징함
- 폰트, 타이틀, GA4 적용 장소

```tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

# next.config.mjs

- Next 환경설정

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

export default nextConfig;
```

# css

- /src/styles/globals.css
- /src/styles/Home.Module.css
- css는 모두 초기화
