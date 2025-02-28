import { goodDataType } from "@/types";
//import { useRouter } from "next/router";
import styles from "@/pages/good/[id].module.css";

//임시 데이터
const mockData: goodDataType = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 3.9, count: 120 },
};

function Page() {
  //const router = useRouter();
  const { id, title, price, description, category, image, rating } = mockData;
  //console.log(router);

  return (
    <div className={styles.wrapper}>
      <h2>&quot;product {id}&quot; 제품정보</h2>
      <div className={styles.prinfo}>
        <div className={styles.primage}>
          <img src={image} alt={title} />
        </div>
        <p className={styles.category}>{category.toUpperCase()}</p>
        <h4>{title}</h4>
        <p className={styles.description}>{description}</p>
        <p className={styles.prprice}>${price}</p>
        <p>
          Rating : {rating.rate} / {rating.count}
        </p>
      </div>
    </div>
  );
}

export default Page;
