# api 폴더의 이해

- Next는 서버이다.
- `흔히` FE는 Next구현 후 Vercel, AWS에 배포한다.
- `흔히` BE는 AWS에 배포한다.
  - BE는 API를 제공한다(request > DB > Response).
  - Postman, Swagger, Excel
  - Next도 서버라서 API연결이 가능하다.
    - request > DB > Response
    - 직접 DB쿼리도 가능하다.
- `흔희` DB는 AWS에 배포한다.

- api 용도이다.
- http://localhost:3000/api/hello
- https://fakestoreapi.com

## api 만들어보기

- /src/pages/api/getallgood.ts
- http://localhost:3000/api/getallgood

```ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = await fetch("https://fakestoreapi.com/products");
  const json = await data.json();
  res.status(200).json(json);
}
```
