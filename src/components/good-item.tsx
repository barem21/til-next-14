import { goodDataType } from "@/types";
import Link from "next/link";
import styles from "/src/components/good-item.module.css";

const GoodItem = ({ title, id, image, category, rating }: goodDataType): JSX.Element => {
  return (
    <Link href={`/good/${id}`}>
      <div className={styles.wrapper}>
        <img src={image} alt={title} />
        <div>
          <h5>{title}</h5>
          <div>{category}</div>
          <div>
            Rating : {rating.rate} | {rating.count}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GoodItem;
