import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";
import { formatDate } from "../../helper";

const PostNewestItem = ({ data }) => {
  if (!data.id) return null;

  return (
    <div className="flex flex-row items-start gap-x-5 max-w-2xl lg:max-w-full mb-5 pb-5 border-b border-[#ddd] last:p-0 last:m-0 last:border-0">
      <PostImage
        url={data.image}
        alt={data.title}
        to={data.slug}
        className="flex-shrink-0 w-40 mb-0 h-28 rounded-xl"
      />
      <div className="flex-1 w-full">
        <div className="flex items-center justify-between mb-3">
          <PostCategory to={data.category.slug}>
            {data.category?.name}
          </PostCategory>
          <PostMeta authorName={data.user.fullName} date={formatDate(data)} />
        </div>
        <PostTitle to={data.slug}>{data.title}</PostTitle>
      </div>
    </div>
  );
};

export default PostNewestItem;
