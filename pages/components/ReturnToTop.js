import Link from "next/link";
import styles from "./ReturnToTop.module.css";

export default function ReturnToTop() {
  return (
    <div className={styles.rtt}>
      <Link href="/">
        <button className={styles.button}>Topに戻る</button>
      </Link>
    </div>
  );
}
