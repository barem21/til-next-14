# Pages Router

## http://localhost:3000

- /src/pages/index.tsx

```tsx
export default function Home() {
  return <h1>메인 페이지</h1>;
}
```

## http://localhost:3000/search?keyword=검색어

- 쿼리스트링 처리하기
- /src/pages/search.tsx

```tsx
//import { useRouter } from "next/navigation"; //앱 라우터 버전일 때
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { keyword } = router.query;
  //console.log(router);

  return (
    <div>
      <span style={{ fontWeight: "bold" }}>&quot;{keyword}&quot;</span> 검색
      결과
    </div>
  );
}
```

## http://localhost:3000/good/1

- params 처리하기
- /src/pages/good/[id].tsx

```tsx
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  console.log(router);

  return (
    <div>
      <span style={{ fontWeight: "bold" }}>&quot;product {id}&quot;</span>{" "}
      제품정보
    </div>
  );
}
```

## http://localhost:3000/nopage

- 없는 라우터로 이동시 Not Fount 페이지
- /src/pages/404.tsx
- 약속된 파일명으로 파일명을 반드시 지겨야 한다.

```tsx
function Page() {
  return <div>404 잘못된 페이지로 접근하셨습니다.</div>;
}

export default Page;
```

# Navitation

## Link를 이용해서 라우터를 이동하는 주메뉴 구성하기

- Link로 연결된 주소는 사전에 자동으로 html이 만들어져 있다.
- 주메뉴는 `모든 페이지`에 보여야 한다.
- `_app.tsx`이 최적의 장소가 된다.

- /src/components/Header.tsx

```tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  return (
    <header style={{ display: "flex", gap: "20px" }}>
      <Link href={"/"}>홈으로</Link>
      <Link href={"/search?keyword=검색어"}>검색</Link>
      <Link href={"/good/1"}>상품상세</Link>

      <button type="button" onClick={handleClick}>
        메인으로
      </button>
    </header>
  );
};

export default Header;
```
