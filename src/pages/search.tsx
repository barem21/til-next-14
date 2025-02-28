//import { useRouter } from "next/navigation"; //앱 라우터 버전일 때
import { useRouter } from "next/router";
import goods from "@/mock/goods.json";
import GoodItem from "@/components/good-item";
import styles from "@/pages/search.module.css";
import SearchLayout from "@/components/search-layout";
import { ReactNode } from "react";

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

//js에서는 함수도 객체이다.
//객체는 속성을 추가할 수 있다.
Page.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
