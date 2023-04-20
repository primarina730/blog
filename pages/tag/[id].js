import Link from "next/link";
import { client } from "../../libs/client";
import Header from "../components/Header";
import styles from "./Tag.module.css";

export default function TagId({ blog }) {
  // カテゴリーに紐付いたコンテンツがない場合に表示
  if (blog.length === 0) {
    return (
      <div>
        <Header />
        <h2>ブログコンテンツがありません</h2>
      </div>
    );
  }
  return (
    <div>
      <Header />
      <h1>{blog.id}</h1>
      <div className={styles.tag}>
        <ul>
          {blog.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>　{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "tags" });

  const paths = data.contents.map((content) => `/tag/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({
    endpoint: "blog",
    queries: { filters: `tags[contains]${id}` },
  });

  return {
    props: {
      blog: data.contents,
    },
  };
};
