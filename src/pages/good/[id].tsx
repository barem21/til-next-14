import { useRouter } from "next/router";

function Page() {
  const router = useRouter();
  const { id } = router.query;
  console.log(router);

  return (
    <h1>
      <span style={{ fontWeight: "bold" }}>&quot;product {id}&quot;</span> 제품정보
    </h1>
  );
}

export default Page;
