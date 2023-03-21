import slugify from "slugify";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";
import { formatDate } from "../../helper";

const PostNewestLarge = ({ data }) => {
  if (!data.id) return null;

  return (
    <div>
      <PostImage
        url={data?.image}
        alt=""
        to={data?.slug}
        className="mb-5 h-[250px] lg:h-[430px] rounded-2xl"
      />
      <PostCategory to={data?.category?.slug} className="mb-3">
        {data?.category?.name}
      </PostCategory>
      <PostTitle to={data?.slug} size="big" className="mb-5">
        {data?.title}
      </PostTitle>
      <PostMeta
        to={slugify(data?.user?.username || "", { lower: true })}
        authorName={data?.user?.fullName}
        date={formatDate(data)}
      />
    </div>
  );
};

export default PostNewestLarge;
