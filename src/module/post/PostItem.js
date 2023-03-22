import slugify from "slugify";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";
import { formatDate } from "../../helper";

const PostItem = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      <PostImage url={data.image} alt="" to={data.slug} />
      <div className="flex items-center justify-between mb-3">
        <PostCategory to={data.category?.slug}>
          {data.category?.name}
        </PostCategory>
        <PostMeta
          to={slugify(data.user?.username || "", { lower: true })}
          authorName={data.user?.fullName}
          date={formatDate(data)}
        />
      </div>
      <PostTitle to={data?.slug}>{data.title}</PostTitle>
    </div>
  );
};

export default PostItem;
