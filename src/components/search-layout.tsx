import { useState } from "react";
import styles from "/src/components/search-layout.module.css";
import { useRouter } from "next/router";

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
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
      <div>{children}</div>
    </div>
  );
};

export default SearchLayout;
