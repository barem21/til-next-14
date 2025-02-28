# css

## inline stylesheet

- /src/pages/index.tsx

## 외부 css연결 파일 (Next에서는 page 연결할 수 없음)

- /src/pages/index.css
- `_app.tsx` 이외에는 절대로 사용할 수 없다.

```css
.title {
  text-decoration: none;
}
```

- /src/pages/index.tex

```tsx
/* 아래코드는 오류가 발생됨 */
import "./index.css";

export default function Home() {
  return <h1 style={{ color: "#666" }}>메인 페이지</h1>;
}
```

## Next에서는 module css만 page에 연결할 수 있다.

- `index.module.css`로 파일명 수정
- /src/pages/index.tex

```tsx
/* 아래코드는 정상적용됨 */
import styles from "./index.module.css";

export default function Home() {
  return <h1 className={styles.title}>메인 페이지</h1>;
}
```
