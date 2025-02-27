import { useRouter } from "next/router";

function Page() {
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

export default Page;
