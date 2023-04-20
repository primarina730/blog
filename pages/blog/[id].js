import { client } from "@/libs/client";
import Moment from "react-moment";
import styles from "./blogId.module.css";
import Header from "../components/Header";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ReturnToTop from "../components/ReturnToTop";

dayjs.extend(utc);
dayjs.extend(timezone);

//SSG

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });
  const paths = data.contents.map((content) => `/blog/${content.id}`);

  return {
    paths,
    fallback: false,
  };
};

export default function BlogId({ blog }) {
  return (
    <main>
      <Header />
      <div className="blogMain">
        <h1 className={styles.blogTitle}>{blog.title}</h1>
        <a>
          {dayjs.utc(blog.publishedAt).tz("Asia/Tokyo").format("YYYY-MM-DD")}
        </a>
        <p>{blog.category && blog.category.name}</p>
        <div
          dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
          className={styles.bodyOfLetter}
        ></div>
        <ReturnToTop />
      </div>
    </main>
  );
}
