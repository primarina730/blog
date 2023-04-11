import Link from "next/link";
import { client } from "../libs/client";
import Moment from "react-moment";
import img1 from "../public/images/img1.jpg";
import Image from "next/image";

//SSG
export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "blog",
  });

  const categoryData = await client.get({ endpoint: "categories" });
  const tagData = await client.get({ endpoint: "tags" });

  return {
    props: {
      blog: data.contents,
      category: categoryData.contents,
      tag: tagData.contents,
    },
  };
};

export default function Home({ blog, category, tag }) {
  return (
    <div>
      <div className="styles.title">
        <h1 className="blogTitle">Inside Emma's Case</h1>
      </div>
      {/* <ul>
        {category.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul> */}

      <div className="screens">
        <div className="leftScreen">
          <Image src={img1} alt="img1" className="img1" />
        </div>
        <div className="rightScreen">
          <div className="latests">
            <h2 className="latestsTitle">Latest Columns</h2>
            <div className="toLatests">
              {blog.map((blog) => (
                <li key={blog.id} className="eachLatests">
                  <Moment format="M/D" className="date">
                    <h2 className="date">{blog.publishedAt}</h2>
                  </Moment>
                  <Link href={`blog/${blog.id}`} legacyBehavior>
                    <a href="">{blog.title}</a>
                  </Link>
                </li>
              ))}
            </div>
            <button className="button">View more</button>
          </div>
          <div className="category">
            <h2 className="categoryTitle">Tag</h2>
            <div className="toCategories">
              <ul>
                {tag.map((tag) => (
                  <li key={tag.id}>
                    <Link href={`/tag/${tag.id}`}>#{tag.name}</Link>
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
