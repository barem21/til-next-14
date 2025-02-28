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
      <header className={styles.header}>
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
