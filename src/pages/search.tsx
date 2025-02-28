//import { useRouter } from "next/navigation"; //앱 라우터 버전일 때
import { useRouter } from "next/router";

function Page() {
  const router = useRouter();
  const { keyword } = router.query;
  //console.log(router);

  return (
    <h1>
      <span style={{ fontWeight: "bold" }}>&quot;{keyword}&quot;</span> 검색 결과
    </h1>
  );
}

export default Page;
