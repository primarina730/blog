import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.title}>
      <Link href="/">
        <h1 className={styles.blogTitle}>Inside Emma&apos;s Case</h1>
      </Link>
      <nav>
        <ul className={styles.headerNavs}>
          <li>
            <Link href="/">my portfolio</Link>
          </li>
          <li>
            <Link href="/">contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
