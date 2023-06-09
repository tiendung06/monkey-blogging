import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";
import { formatDate } from "../../helper";

const PostItem = ({ data }) => {
  if (!data) return null;

  return (
    <div>
      <PostImage
        url={data.image}
        alt=""
        to={data.slug}
        className="min-h-[208px] mb-5"
      />
      <div className="flex items-center justify-between mb-3">
        <PostCategory to={data.category?.slug}>
          {data.category?.name}
        </PostCategory>
        <PostMeta
          to={data.user?.id}
          authorName={data.user?.fullName}
          date={formatDate(data)}
        />
      </div>
      <PostTitle to={data?.slug}>{data.title}</PostTitle>
    </div>
  );
};

export default PostItem;
