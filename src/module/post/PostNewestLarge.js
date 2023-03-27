import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";
import { formatDate } from "../../helper";

const PostNewestLarge = ({ data }) => {
  if (!data.id) return null;

  return (
    <div className="max-w-2xl">
      <PostImage
        url={data?.image}
        alt=""
        to={data?.slug}
        className="h-auto lg:h-80 rounded-2xl"
      />
      <div className="flex items-center justify-between mb-3">
        <PostCategory to={data?.category?.slug}>
          {data?.category?.name}
        </PostCategory>
        <PostMeta
          to={data?.user?.id}
          authorName={data?.user?.fullName}
          date={formatDate(data)}
        />
      </div>
      <PostTitle to={data?.slug} size="big">
        {data?.title}
      </PostTitle>
    </div>
  );
};

export default PostNewestLarge;
