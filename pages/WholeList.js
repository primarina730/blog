import { client } from "../libs/client";
import Header from "./components/Header";
import styles from "../styles/WholeList.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "blog",
  });

  return {
    props: {
      blog: data.contents,
    },
  };
};

export default function WholeList({ blog }) {
  return (
    <div>
      <Header />

      <div className={styles.latestsW}>
        <h1 className={styles.latestsTitle}>All Columns</h1>
        <div className={styles.toLatestsW}>
          {blog.map((blog) => (
            <li key={blog.id}>
              <a>
                {dayjs
                  .utc(blog.publishedAt)
                  .tz("Asia/Tokyo")
                  .format("YYYY MM/DD")}
              </a>
              <Link href={`blog/${blog.id}`} legacyBehavior>
                <a href=""> {blog.title}</a>
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
