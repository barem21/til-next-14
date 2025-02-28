# global css

- 모든 페이지에 적용할 레이아웃은 `_app.tsx`에 설정한다.

## 공통 레이아웃을 위한 컴포넌트 생성

- /src/components 폴더 생성
- /src/components/global-layout.tsx 파일 생성

```tsx
import Link from "next/link";
import { useRouter } from "next/router";

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  return (
    <div>
      <header style={{ display: "flex", gap: "20px" }}>
        <h1>✨ Shopping Mall ✨</h1>
        <div>
          <Link href={"/"}>홈으로</Link>
          <Link href={"/search?keyword=검색어"}>검색</Link>
          <Link href={"/good/1"}>상품상세</Link>

          <button type="button" onClick={handleClick}>
            메인으로
          </button>
        </div>
      </header>
      <main>{children}</main>
      <footer>copyright by small. All rights reserved.</footer>
    </div>
  );
}
```

- `_app.tsx`에 컴포넌트 적용

```tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import GlobalLayout from "@/components/global-layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </>
  );
}
```

- /src/styles/global.css 수정

```css
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
* {
  color: #242424;
  font-size: 16px;
}
a {
  text-decoration: none;
}
```

- global-layout.mobule.css 파일 생성

```css
.wrapper {
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 15px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 10px 10px;
}
.main {
  padding: 15px 0px;
}
.footer {
  padding: 15px 0px;
}
```

- /src/components/global-layout.tsx

```tsx
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/global-layout.module.css";

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className={styles.wrapper}>
      <header style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <h1>
          <Link href={"/"}>✨ Shopping Mall ✨</Link>
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link href={"/search?keyword=검색어"}>검색</Link>
          <Link href={"/good/1"}>상품상세</Link>
          <button type="button" onClick={handleClick}>
            메인으로
          </button>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>Copyright by small. All rights reserved.</footer>
    </div>
  );
}
```

# 첫화면

- /src/pages/index.tsx

```tsx
import styles from "@/pages/index.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <section>
        <h4>지금 추천하는 상품</h4>
      </section>
      <section>
        <h4>등록된 모든 상품</h4>
      </section>
    </div>
  );
}
```

- /src/pages/index.module.css

```css
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.wrapper h4 {
  margin-bottom: 0px;
}
```

## 첫화면에 보여줄 상품 목록 컴포넌트

- /src/components/good-item.tsx 파일 생성

```tsx
const GoodItem = () => {
  return <div>good-item</div>;
};

export default GoodItem;
```

## 더미 데이터

- https://fakestoreapi.com/docs
- /src/mock 폴더 생성
- /src/mock/goods.json 파일 생성

- /src/components/good-item.tsx

```tsx
export interface goodItemProps {
  id: number;
  title: string;
  price: number;
  description: string;
  crategory: string;
  image: string;
  rating: { rate: number; count: number };
}

const GoodItem = ({ title }: goodItemProps): JSX.Element => {
  return <div>{title}</div>;
};

export default GoodItem;
```

- /src/pages/index.tsx

```tsx
import styles from "@/pages/index.module.css";
import goods from "@/mock/goods.json";
import GoodItem from "@/components/good-item";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <section>
        <h4>지금 추천하는 상품</h4>
        {/* 3개만 랜덤하게 출력 */}
        {goods.slice(0, 3).map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </section>
      <section>
        <h4>등록된 모든 상품</h4>
        {/* 전체 상품 출력 */}
        {goods.map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </section>
    </div>
  );
}
```

## 데이터의 정의를 외부로 추출

- /src/types.ts 파일 생성

```ts
export interface goodDataType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}
```

- 아이템을 출력
- /src/components/good-item.tsx

```tsx
import { goodDataType } from "@/types";
import Link from "next/link";

const GoodItem = ({ title, id, image, category, rating }: goodDataType): JSX.Element => {
  return (
    <div>
      <Link href={`/good/${id}`}>
        <Image src={image} alt={title} />
        <div>
          <h5>{title}</h5>
          <div>{category}</div>
          <div>
            {rating.rate} | {rating.count}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GoodItem;
```

## 이미지를 최적화해주는 Next

- Next는 이미지를 자동으로 용량 최적화해준다.
- Next는 스크롤시 화면에 이미지가 보일 때쯤 로딩한다.
- lazy loading (지연로딩)
- 곤란한 상황 (외부경로 이미지는 설정이 필요)

### 1. Image 컴포넌트

- width, height 필수

### 2. 외부 URL 이미지 경로 사용시 설정

- `next.config.mjs` 수정

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },
};

export default nextConfig;
```

## 검색 컴포넌트 및 페이지 작성

- /src/components/search-layout.tsx

```tsx
import { useState } from "react";
import styles from "/src/components/search-layout.module.css";
import { useRouter } from "next/router";

const SearchLayout = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    console.log(search);
    if (search.trim() === "") {
      alert("검색어를 입력하세요.");
      return;
    }
    router.push(`/search?keyword=${search}`);
    setSearch("");
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <input type="text" name="keyword" value={search} placeholder="검색어를 입력하세요." onKeyDown={(e) => handleKeyEnter(e)} onChange={(e) => handleChange(e)} />
        <button onClick={handleSubmit}>검색</button>
      </div>
    </div>
  );
};

export default SearchLayout;
```

- /src/components/search-layout.module.css

```css
.wrapper {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}
.wrapper input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.wrapper button {
  width: 80px;
  border: none;
  border-radius: 5px;
  background-color: #666;
  color: #fff;
  cursor: pointer;
}
```

- `/src/pages/_app.tsx` 파일 수정

```tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import GlobalLayout from "@/components/global-layout";
import SearchLayout from "@/components/search-layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalLayout>
        <SearchLayout />
        <Component {...pageProps} />
      </GlobalLayout>
    </>
  );
}
```

## 검색 페이지

- /src/pages/search.module.css 파일 생성

```css
.wrapper h2 {
  font-size: 20px;
}
```

- /src/pages/search.tsx

```tsx
//import { useRouter } from "next/navigation"; //앱 라우터 버전일 때
import { useRouter } from "next/router";
import goods from "@/mock/goods.json";
import GoodItem from "@/components/good-item";
import styles from "@/pages/search.module.css";

function Page() {
  const router = useRouter();
  const { keyword } = router.query;
  //console.log(router);

  return (
    <div className={styles.wrapper}>
      <h2>&quot;{keyword}&quot; 검색 결과</h2>
      <div>
        {goods.map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Page;
```

## 제품 상세 페이지

- /src/pages/good/[id].module.css

```css
.wrapper {
  display: block;
}
.wrapper h2 {
  display: none;
}
.wrapper .primage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}
.wrapper .primage img {
  max-height: 350px;
}
.wrapper .prinfo h4 {
  margin-bottom: 20px;
  font-size: 24px;
}
.wrapper .category {
  font-size: 0.85em;
}
.wrapper .prinfo .description {
  margin-bottom: 20px;
  color: #999;
}
.wrapper .prprice {
  margin-bottom: 10px;
  font-weight: bold;
}
```

- /src/pages/good/[id].tsx

```tsx
import { goodDataType } from "@/types";
//import { useRouter } from "next/router";
import styles from "@/pages/good/[id].module.css";

//임시 데이터
const mockData: goodDataType = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 3.9, count: 120 },
};

function Page() {
  //const router = useRouter();
  const { id, title, price, description, category, image, rating } = mockData;
  //console.log(router);

  return (
    <div className={styles.wrapper}>
      <h2>&quot;product {id}&quot; 제품정보</h2>
      <div className={styles.prinfo}>
        <div className={styles.primage}>
          <img src={image} alt={title} />
        </div>
        <p className={styles.category}>{category.toUpperCase()}</p>
        <h4>{title}</h4>
        <p className={styles.description}>{description}</p>
        <p className={styles.prprice}>${price}</p>
        <p>
          Rating : {rating.rate} / {rating.count}
        </p>
      </div>
    </div>
  );
}

export default Page;
```

# 공통 레이아웃에 다양한 레이아웃 적용해 보기

- /src/pages/index.tsx

```tsx
import styles from "@/pages/index.module.css";
import goods from "@/mock/goods.json";
import GoodItem from "@/components/good-item";
import { ReactNode } from "react";
import SearchLayout from "@/components/search-layout";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <section>
        <h4>지금 추천하는 상품</h4>
        {/* 3개만 랜덤하게 출력 */}
        {goods.slice(0, 3).map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </section>
      <section>
        <h4>등록된 모든 상품</h4>
        {/* 전체 상품 출력 */}
        {goods.map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </section>
    </div>
  );
}

//js에서는 함수도 객체이다.
//객체는 속성을 추가할 수 있다.
Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
```

- /src/pages/good/[id].tsx

```tsx
import { goodDataType } from "@/types";
//import { useRouter } from "next/router";
import styles from "@/pages/good/[id].module.css";

//임시 데이터
const mockData: goodDataType = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 3.9, count: 120 },
};

function Page() {
  //const router = useRouter();
  const { id, title, price, description, category, image, rating } = mockData;
  //console.log(router);

  return (
    <div className={styles.wrapper}>
      <h2>&quot;product {id}&quot; 제품정보</h2>
      <div className={styles.prinfo}>
        <div className={styles.primage}>
          <img src={image} alt={title} />
        </div>
        <p className={styles.category}>{category.toUpperCase()}</p>
        <h4>{title}</h4>
        <p className={styles.description}>{description}</p>
        <p className={styles.prprice}>${price}</p>
        <p>
          Rating : {rating.rate} / {rating.count}
        </p>
      </div>
    </div>
  );
}

export default Page;
```

- `/src/pages/_app.tsx`

```tsx
import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

// 속성을 추가해준다. 확장도 한다.
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
```
