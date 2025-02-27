import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

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
