import { client } from "../libs/client";
import Header from "./components/Header";
import styles from "../styles/WholeList.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ReturnToTop from "./components/ReturnToTop";
import Head from "next/head";

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
      <Head>
        <title>InsideEmmasCase 一覧</title>
      </Head>
      <Header />

      <div className={styles.latestsW}>
        <h2 className={styles.latestsTitle}>All Columns</h2>
        <div className={styles.toLatestsW}>
          {blog.map((blog) => (
            <li key={blog.id}>
              <Link href={`blog/${blog.id}`} legacyBehavior>
                <a href="">
                  {" "}
                  {dayjs
                    .utc(blog.publishedAt)
                    .tz("Asia/Tokyo")
                    .format("YYYY  MM/DD  ")}{" "}
                  {blog.title}
                </a>
              </Link>
            </li>
          ))}
        </div>
        <ReturnToTop />
      </div>
    </div>
  );
}
