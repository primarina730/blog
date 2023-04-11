import { client } from "@/libs/client";
import Moment from "react-moment";

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
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <p>{blog.category && blog.category.name}</p>
      <div
        dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
        className="eachContents"
      ></div>
    </main>
  );
}
