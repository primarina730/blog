import Link from "next/link";
import { client } from "../libs/client";
import Moment from "react-moment";
import img1 from "../public/images/img1.jpg";
import img2 from "../public/images/inFrontOfCastle.jpg";
import Image from "next/image";
import Header from "./components/Header";
import styles from "../styles/Home.module.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

//SSG
export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "blog",
    queries: {
      limit: 5,
    },
  });

  const tagData = await client.get({ endpoint: "tags" });

  return {
    props: {
      blog: data.contents,
      tag: tagData.contents,
    },
  };
};

export default function Home({ blog, tag }) {
  return (
    <div>
      <Header />
      <div className={styles.screens}>
        <div className={styles.leftScreen}>
          <h2>About Me</h2>
          <div className={styles.topImgs}>
            <Image src={img2} className={styles.img1} alt="私と姉の写真" />
            <Image
              src={img1}
              className={styles.img2}
              alt="ディズニーランドの写真"
            />
          </div>
          <p>動物とピアノが好きです。</p>
          <p>好奇心旺盛なので浅く広くブログを書いていきます。</p>
        </div>
        <div className={styles.rightScreen}>
          <div className={styles.latests}>
            <h2 className={styles.latestsTitle}>Latest Columns</h2>
            <div>
              {blog.map((blog) => (
                <li key={blog.id}>
                  <Link href={`blog/${blog.id}`} legacyBehavior>
                    <a href="">
                      {dayjs
                        .utc(blog.publishedAt)
                        .tz("Asia/Tokyo")
                        .format("YYYY  MM/DD  ")}
                      {blog.title}
                    </a>
                  </Link>
                </li>
              ))}
            </div>
            <a href="./WholeList" className={styles.button}>
              View more
            </a>
          </div>
          <div className={styles.tag}>
            <h2 className={styles.tagTitle}>Tag</h2>
            <div className={styles.toTags}>
              <ul>
                {tag.map((tag) => (
                  <li key={tag.id}>
                    <Link href={`/tag/${tag.id}`}>＃{tag.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
